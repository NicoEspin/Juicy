"use client";

import { useCallback, useEffect, useState } from "react";
import { generateOrderReference } from "@/lib/ordering/orderReference";
import { calculateDeliveryFee, calculateOrderTotal, calculateSubtotal } from "@/lib/ordering/pricing";
import { readJSON, removeKey, STORAGE_KEYS, writeJSON } from "@/lib/ordering/storage";
import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from "@/lib/ordering/whatsapp";
import type {
  Branch,
  Cart,
  CheckoutCustomer,
  CheckoutDraft,
  CheckoutErrors,
  FulfillmentType,
  SavedOrder,
  TimePreference,
  WhatsappAttempt,
} from "@/types/ordering";

function formatPhone(raw: string) {
  return raw.replace(/\s+/g, " ").trim();
}

export function useCheckoutDraft(branch: Branch, cart: Cart, onOrderSent: (order: SavedOrder) => void) {
  const [draft, setDraft] = useState<CheckoutDraft | null>(null);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [whatsappAttempt, setWhatsappAttempt] = useState<WhatsappAttempt | null>(null);
  const [showWhatsappReturnDialog, setShowWhatsappReturnDialog] = useState(false);
  const [isSendingWhatsapp, setIsSendingWhatsapp] = useState(false);

  // A user who opened WhatsApp and came back mid-session should be asked to confirm
  // whether they actually sent it, instead of losing that state on reload.
  useEffect(() => {
    const attempt = readJSON<WhatsappAttempt>(STORAGE_KEYS.whatsappAttempt);
    if (attempt && attempt.version === 1 && attempt.branchId === branch.id) {
      // localStorage doesn't exist during SSR, so this can only be read post-mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWhatsappAttempt(attempt);
      setShowWhatsappReturnDialog(true);
    }
  }, [branch.id]);

  const persistDraft = useCallback((next: CheckoutDraft) => {
    writeJSON(STORAGE_KEYS.checkoutDraft, next);
    setDraft(next);
  }, []);

  const updateDraft = useCallback((patch: Partial<CheckoutDraft>) => {
    setDraft((current) => {
      if (!current) return current;
      const next: CheckoutDraft = { ...current, ...patch, updatedAt: new Date().toISOString() };
      writeJSON(STORAGE_KEYS.checkoutDraft, next);
      return next;
    });
  }, []);

  const openCheckout = useCallback((): boolean => {
    if (!cart.items.length || !cart.branchId) return false;

    const stored = readJSON<CheckoutDraft>(STORAGE_KEYS.checkoutDraft);
    if (stored && stored.version === 1 && stored.branchId === cart.branchId) {
      setDraft(stored);
      setErrors({});
      return true;
    }

    let customer: CheckoutCustomer = { fullName: "", phone: "" };
    let saveCustomerData = false;
    const savedCustomer = readJSON<CheckoutCustomer>(STORAGE_KEYS.customer);
    if (savedCustomer) {
      customer = savedCustomer;
      saveCustomerData = true;
    }

    const fresh: CheckoutDraft = {
      version: 1,
      branchId: cart.branchId,
      currentStep: "order",
      fulfillmentType: branch.deliveryEnabled ? "delivery" : "pickup",
      customer,
      address: { street: "", floorOrApartment: "", neighborhood: "", reference: "" },
      timePreference: "asap",
      scheduledDate: "",
      scheduledSlot: "",
      paymentMethodId: "efectivo",
      cashAmount: null,
      orderNotes: "",
      saveCustomerData,
      orderReference: generateOrderReference(),
      updatedAt: new Date().toISOString(),
    };
    persistDraft(fresh);
    setErrors({});
    return true;
  }, [branch.deliveryEnabled, cart.branchId, cart.items.length, persistDraft]);

  const closeCheckout = useCallback(() => setDraft(null), []);

  const checkoutBack = useCallback(() => {
    if (!draft) return;
    if (draft.currentStep === "confirmation") updateDraft({ currentStep: "data" });
    else if (draft.currentStep === "data") updateDraft({ currentStep: "order" });
    else closeCheckout();
  }, [draft, updateDraft, closeCheckout]);

  const goToDataStep = useCallback(() => updateDraft({ currentStep: "data" }), [updateDraft]);
  const editStep = useCallback(
    (step: CheckoutDraft["currentStep"]) => updateDraft({ currentStep: step }),
    [updateDraft],
  );

  const setFulfillmentType = useCallback(
    (type: FulfillmentType) => updateDraft({ fulfillmentType: type }),
    [updateDraft],
  );

  const updateAddressField = useCallback((field: keyof CheckoutDraft["address"], value: string) => {
    setDraft((current) => {
      if (!current) return current;
      const next: CheckoutDraft = {
        ...current,
        address: { ...current.address, [field]: value },
        updatedAt: new Date().toISOString(),
      };
      writeJSON(STORAGE_KEYS.checkoutDraft, next);
      return next;
    });
  }, []);

  const setTimePreference = useCallback(
    (pref: TimePreference) => updateDraft({ timePreference: pref }),
    [updateDraft],
  );
  const setScheduledDate = useCallback((value: string) => updateDraft({ scheduledDate: value }), [updateDraft]);
  const setScheduledSlot = useCallback((value: string) => updateDraft({ scheduledSlot: value }), [updateDraft]);

  const updateCustomerField = useCallback((field: keyof CheckoutCustomer, value: string) => {
    setDraft((current) => {
      if (!current) return current;
      const next: CheckoutDraft = {
        ...current,
        customer: { ...current.customer, [field]: value },
        updatedAt: new Date().toISOString(),
      };
      writeJSON(STORAGE_KEYS.checkoutDraft, next);
      return next;
    });
  }, []);

  const toggleSaveCustomerData = useCallback(() => {
    setDraft((current) => {
      if (!current) return current;
      const next: CheckoutDraft = {
        ...current,
        saveCustomerData: !current.saveCustomerData,
        updatedAt: new Date().toISOString(),
      };
      writeJSON(STORAGE_KEYS.checkoutDraft, next);
      return next;
    });
  }, []);

  const setPaymentMethod = useCallback((id: string) => updateDraft({ paymentMethodId: id }), [updateDraft]);
  const setCashAmount = useCallback(
    (value: string) => updateDraft({ cashAmount: value ? Number(value) : null }),
    [updateDraft],
  );
  const setOrderNotes = useCallback(
    (value: string) => updateDraft({ orderNotes: value.slice(0, 200) }),
    [updateDraft],
  );

  const validateDataStep = useCallback((): CheckoutErrors => {
    if (!draft) return {};
    const found: CheckoutErrors = {};

    if (draft.fulfillmentType === "delivery") {
      if (!draft.address.street.trim()) found.street = "Ingresá tu dirección.";
      if (!draft.address.neighborhood.trim()) found.neighborhood = "Ingresá el barrio.";
    }
    if (draft.timePreference === "scheduled") {
      if (!draft.scheduledDate) found.scheduledDate = "Elegí una fecha.";
      if (!draft.scheduledSlot) found.scheduledSlot = "Elegí un horario.";
    }
    if (!draft.customer.fullName.trim()) found.fullName = "Ingresá tu nombre y apellido.";
    const digits = draft.customer.phone.replace(/\D/g, "");
    if (digits.length < 8) found.phone = "Ingresá un teléfono válido.";

    return found;
  }, [draft]);

  const submitDataStep = useCallback((): boolean => {
    if (!draft) return false;
    const found = validateDataStep();
    if (Object.keys(found).length) {
      setErrors(found);
      return false;
    }

    if (draft.saveCustomerData) writeJSON(STORAGE_KEYS.customer, draft.customer);
    else removeKey(STORAGE_KEYS.customer);

    setErrors({});
    updateDraft({
      customer: { fullName: formatPhone(draft.customer.fullName), phone: formatPhone(draft.customer.phone) },
      currentStep: "confirmation",
    });
    return true;
  }, [draft, updateDraft, validateDataStep]);

  const sendWhatsapp = useCallback(() => {
    if (!draft || isSendingWhatsapp) return;
    setIsSendingWhatsapp(true);

    const subtotal = calculateSubtotal(cart);
    const deliveryFee = calculateDeliveryFee(branch, draft.fulfillmentType);
    const total = calculateOrderTotal(subtotal, deliveryFee);
    const message = buildWhatsAppOrderMessage(branch, cart, draft, { subtotal, deliveryFee, total }, draft.orderReference);
    const url = buildWhatsAppUrl(branch, message);

    const attempt: WhatsappAttempt = {
      version: 1,
      orderReference: draft.orderReference,
      branchId: branch.id,
      message,
      whatsappUrl: url,
      openedAt: new Date().toISOString(),
    };
    writeJSON(STORAGE_KEYS.whatsappAttempt, attempt);
    setWhatsappAttempt(attempt);
    window.open(url, "_blank");

    setTimeout(() => {
      setIsSendingWhatsapp(false);
      setShowWhatsappReturnDialog(true);
    }, 500);
  }, [branch, cart, draft, isSendingWhatsapp]);

  const reopenWhatsapp = useCallback(() => {
    if (whatsappAttempt) window.open(whatsappAttempt.whatsappUrl, "_blank");
  }, [whatsappAttempt]);

  const keepEditingOrder = useCallback(() => setShowWhatsappReturnDialog(false), []);

  const confirmWhatsappSent = useCallback(() => {
    if (!draft) return;

    const subtotal = calculateSubtotal(cart);
    const deliveryFee = calculateDeliveryFee(branch, draft.fulfillmentType);
    const total = calculateOrderTotal(subtotal, deliveryFee);

    const order: SavedOrder = {
      version: 1,
      reference: draft.orderReference,
      branchId: branch.id,
      branchName: branch.name,
      items: cart.items,
      checkout: draft,
      totals: { subtotal, deliveryFee, total },
      status: "whatsapp-sent-by-user",
      createdAt: new Date().toISOString(),
    };

    const history = readJSON<SavedOrder[]>(STORAGE_KEYS.orders) ?? [];
    history.unshift(order);
    writeJSON(STORAGE_KEYS.orders, history.slice(0, 20));
    removeKey(STORAGE_KEYS.whatsappAttempt);
    removeKey(STORAGE_KEYS.checkoutDraft);

    setWhatsappAttempt(null);
    setShowWhatsappReturnDialog(false);
    setDraft(null);
    onOrderSent(order);
  }, [branch, cart, draft, onOrderSent]);

  return {
    draft,
    errors,
    whatsappAttempt,
    showWhatsappReturnDialog,
    isSendingWhatsapp,
    openCheckout,
    closeCheckout,
    checkoutBack,
    goToDataStep,
    editStep,
    setFulfillmentType,
    updateAddressField,
    setTimePreference,
    setScheduledDate,
    setScheduledSlot,
    updateCustomerField,
    toggleSaveCustomerData,
    setPaymentMethod,
    setCashAmount,
    setOrderNotes,
    submitDataStep,
    sendWhatsapp,
    reopenWhatsapp,
    keepEditingOrder,
    confirmWhatsappSent,
  };
}
