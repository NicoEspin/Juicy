"use client";

import { CheckoutConfirmationStep } from "@/components/ordering/checkout/CheckoutConfirmationStep";
import { CheckoutDataStep } from "@/components/ordering/checkout/CheckoutDataStep";
import { CheckoutOrderStep } from "@/components/ordering/checkout/CheckoutOrderStep";
import type { useCheckoutDraft } from "@/components/ordering/hooks/useCheckoutDraft";
import { SCHEDULE_SLOTS } from "@/data/branches";
import { formatMoney } from "@/lib/ordering/money";
import { calculateDeliveryFee, calculateOrderTotal, calculateSubtotal } from "@/lib/ordering/pricing";
import type { Branch, Cart, CartItem, CheckoutStep } from "@/types/ordering";

interface CheckoutOverlayProps {
  branch: Branch;
  cart: Cart;
  checkout: ReturnType<typeof useCheckoutDraft>;
  onChangeQty: (itemId: string, delta: number) => void;
  onEditItem: (item: CartItem) => void;
  onOpenBranchSheet: () => void;
  onRemoveItem: (itemId: string) => void;
}

const STEP_LABELS: { id: CheckoutStep; label: string }[] = [
  { id: "order", label: "Pedido" },
  { id: "data", label: "Datos" },
  { id: "confirmation", label: "Confirmación" },
];

export function CheckoutOverlay({
  branch,
  cart,
  checkout,
  onChangeQty,
  onEditItem,
  onOpenBranchSheet,
  onRemoveItem,
}: CheckoutOverlayProps) {
  const { draft } = checkout;
  if (!draft) return null;

  const subtotal = calculateSubtotal(cart);
  const deliveryFee = calculateDeliveryFee(branch, draft.fulfillmentType);
  const total = calculateOrderTotal(subtotal, deliveryFee);
  const showDeliveryLine = draft.fulfillmentType === "delivery";

  const sharedTotals = {
    subtotalLabel: formatMoney(subtotal),
    deliveryFeeLabel: formatMoney(deliveryFee),
    orderTotalLabel: formatMoney(total),
    showDeliveryLine,
  };

  return (
    <div className="ordering-fade fixed inset-0 z-[95] flex flex-col bg-juicy-cream">
      <div className="shrink-0">
        <div className="flex items-center justify-between px-4 py-3.5 sm:px-6">
          <button
            aria-label="Volver"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-[1.5px] border-juicy-red"
            onClick={checkout.checkoutBack}
            type="button"
          >
            <svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18" className="text-juicy-red">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <p className="font-headline text-[19px] tracking-[0.01em] text-juicy-red">FINALIZAR PEDIDO</p>
          <div className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-[1.5px] border-juicy-red text-juicy-red">
            <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </div>
        </div>
        <div className="checker-strip" />
        <div className="flex items-center justify-center gap-4 px-4 py-4 sm:px-6">
          {STEP_LABELS.map((step) => {
            const active = step.id === draft.currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center gap-1">
                <span
                  aria-current={active ? "step" : undefined}
                  className={`text-sm font-bold ${active ? "text-juicy-red" : "text-juicy-gray"}`}
                >
                  {step.label}
                </span>
                {active && <div className="h-0.5 w-5 rounded-full bg-juicy-red-light" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {draft.currentStep === "order" && (
            <CheckoutOrderStep
              cart={cart}
              onChangeQty={onChangeQty}
              onClose={checkout.closeCheckout}
              onContinue={checkout.goToDataStep}
              onEditItem={onEditItem}
              onRemoveItem={onRemoveItem}
              {...sharedTotals}
            />
          )}

          {draft.currentStep === "data" && (
            <CheckoutDataStep
              branch={branch}
              draft={draft}
              errors={checkout.errors}
              onOpenBranchSheet={onOpenBranchSheet}
              onSetCashAmount={checkout.setCashAmount}
              onSetFulfillmentType={checkout.setFulfillmentType}
              onSetOrderNotes={checkout.setOrderNotes}
              onSetPaymentMethod={checkout.setPaymentMethod}
              onSetScheduledDate={checkout.setScheduledDate}
              onSetScheduledSlot={checkout.setScheduledSlot}
              onSetTimePreference={checkout.setTimePreference}
              onToggleSaveCustomerData={checkout.toggleSaveCustomerData}
              onUpdateAddressField={checkout.updateAddressField}
              onUpdateCustomerField={checkout.updateCustomerField}
              scheduleSlots={SCHEDULE_SLOTS}
            />
          )}

          {draft.currentStep === "confirmation" && (
            <CheckoutConfirmationStep
              branch={branch}
              cart={cart}
              draft={draft}
              onEdit={() => checkout.editStep("data")}
              {...sharedTotals}
            />
          )}
        </div>
      </div>

      {draft.currentStep === "data" && (
        <div className="shrink-0 border-t border-juicy-red/15 bg-juicy-cream px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:px-6">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <div className="shrink-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.03em] text-juicy-gray">Total</p>
              <p className="text-base font-extrabold text-juicy-red">{sharedTotals.orderTotalLabel}</p>
            </div>
            <button
              className="h-13 flex-1 rounded-full bg-juicy-red text-sm font-bold tracking-[0.015em] text-white hover:bg-juicy-red-dark"
              onClick={checkout.submitDataStep}
              type="button"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {draft.currentStep === "confirmation" && (
        <div className="shrink-0 border-t border-juicy-red/15 bg-juicy-cream px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:px-6">
          <div className="mx-auto max-w-2xl">
            <button
              className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-[#25603F] text-[15px] font-bold text-white disabled:opacity-70"
              disabled={checkout.isSendingWhatsapp}
              onClick={checkout.sendWhatsapp}
              type="button"
            >
              <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
                <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.7 14.3c-.2.6-1.4 1.2-1.9 1.2-.5 0-1.1.2-3.6-1-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.3-.3.6-.3.8-.3h.6c.2 0 .5-.1.7.5.3.7.9 2.2 1 2.4.1.2.1.4 0 .6-.2.4-.3.5-.5.8-.2.2-.4.5-.2.9.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.5-.3.8-.2.3.1 1.9.9 2.2 1.1.3.1.5.2.6.3.1.2.1.9-.1 1.5z" />
              </svg>
              <span>ENVIAR PEDIDO POR WHATSAPP · {sharedTotals.orderTotalLabel}</span>
            </button>
            <p className="mt-2 text-center text-[11px] text-juicy-gray">
              El pedido queda confirmado cuando la sucursal te responde.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
