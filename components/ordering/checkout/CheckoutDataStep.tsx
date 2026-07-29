"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { Branch, CheckoutDraft, CheckoutErrors, FulfillmentType } from "@/types/ordering";

interface CheckoutDataStepProps {
  branch: Branch;
  draft: CheckoutDraft;
  errors: CheckoutErrors;
  onOpenBranchSheet: () => void;
  onSetCashAmount: (value: string) => void;
  onSetFulfillmentType: (type: FulfillmentType) => void;
  onSetOrderNotes: (value: string) => void;
  onSetPaymentMethod: (id: string) => void;
  onSetScheduledDate: (value: string) => void;
  onSetScheduledSlot: (value: string) => void;
  onSetTimePreference: (pref: CheckoutDraft["timePreference"]) => void;
  onToggleSaveCustomerData: () => void;
  onUpdateAddressField: (field: keyof CheckoutDraft["address"], value: string) => void;
  onUpdateCustomerField: (field: "fullName" | "phone", value: string) => void;
  scheduleSlots: string[];
}

const fieldClassName =
  "h-[46px] w-full rounded-xl border-[1.5px] border-juicy-red bg-white px-3 text-sm text-juicy-black outline-none";
const fieldLabelClassName = "mb-1 block text-xs text-juicy-gray";

function SectionTitle({ children }: { children: ReactNode }) {
  return <p className="mb-3 mt-2 font-headline text-base tracking-[0.01em] text-juicy-red">{children}</p>;
}

function AddDetailLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      className="mb-4 flex items-center gap-2 text-[13px] font-bold text-juicy-red"
      onClick={onClick}
      type="button"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-juicy-red text-xs leading-none">
        +
      </span>
      {label}
    </button>
  );
}

function DeliveryIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="19">
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 18h6l2-6h4M12 12l2-4h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PickupIcon() {
  return (
    <svg fill="none" height="19" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="19">
      <path d="M4 10v9h16v-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6l2-4h16l2 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" strokeLinecap="round" />
    </svg>
  );
}

function FulfillmentCard({
  active,
  icon,
  onSelect,
  subtitle,
  title,
}: {
  active: boolean;
  icon: ReactNode;
  onSelect: () => void;
  subtitle: string;
  title: string;
}) {
  return (
    <button
      aria-pressed={active}
      className={`flex w-full items-center gap-3 rounded-2xl border-[1.5px] p-3.5 text-left transition-colors ${
        active ? "border-juicy-red bg-juicy-red/[0.06]" : "border-black/10 bg-white"
      }`}
      onClick={onSelect}
      type="button"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          active ? "bg-juicy-red text-white" : "bg-juicy-cream text-juicy-red"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-juicy-black">{title}</span>
        <span className="block truncate text-xs text-juicy-gray">{subtitle}</span>
      </span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          active ? "border-juicy-red" : "border-black/20"
        }`}
      >
        {active && <span className="h-2.5 w-2.5 rounded-full bg-juicy-red" />}
      </span>
    </button>
  );
}

export function CheckoutDataStep({
  branch,
  draft,
  errors,
  onOpenBranchSheet,
  onSetCashAmount,
  onSetFulfillmentType,
  onSetOrderNotes,
  onSetPaymentMethod,
  onSetScheduledDate,
  onSetScheduledSlot,
  onSetTimePreference,
  onToggleSaveCustomerData,
  onUpdateAddressField,
  onUpdateCustomerField,
  scheduleSlots,
}: CheckoutDataStepProps) {
  const [showAddressDetails, setShowAddressDetails] = useState(
    () => !!(draft.address.floorOrApartment || draft.address.reference),
  );
  const [showSchedule, setShowSchedule] = useState(() => draft.timePreference === "scheduled");
  const [showNotes, setShowNotes] = useState(() => !!draft.orderNotes);

  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (!firstErrorField) return;
    document.getElementById(`checkout-field-${firstErrorField}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [errors]);

  const todayIso = new Date().toISOString().slice(0, 10);
  const asapEta = draft.fulfillmentType === "delivery" ? branch.estimatedDeliveryTime : branch.estimatedPickupTime;

  const fulfillmentOptions = (
    [
      branch.deliveryEnabled
        ? {
            id: "delivery" as const,
            title: "Envío a domicilio",
            subtitle: `Llega en ${branch.estimatedDeliveryTime}`,
            icon: <DeliveryIcon />,
          }
        : null,
      branch.pickupEnabled
        ? {
            id: "pickup" as const,
            title: "Retiro en el local",
            subtitle: `${branch.address} · Listo en ${branch.estimatedPickupTime}`,
            icon: <PickupIcon />,
          }
        : null,
    ] as const
  ).filter((option): option is NonNullable<typeof option> => option !== null);

  return (
    <div className="pt-1.5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm text-juicy-black">
          Pedís en <span className="font-bold">{branch.name}</span>
        </p>
        <button
          className="min-h-11 whitespace-nowrap text-[13px] font-bold text-juicy-red"
          onClick={onOpenBranchSheet}
          type="button"
        >
          Cambiar
        </button>
      </div>

      <SectionTitle>¿CÓMO QUERÉS RECIBIRLO?</SectionTitle>
      <div className="mb-4 flex flex-col gap-2.5">
        {fulfillmentOptions.map((option) => (
          <FulfillmentCard
            key={option.id}
            active={draft.fulfillmentType === option.id}
            icon={option.icon}
            onSelect={() => onSetFulfillmentType(option.id)}
            subtitle={option.subtitle}
            title={option.title}
          />
        ))}
      </div>

      {draft.fulfillmentType === "delivery" && (
        <>
          <SectionTitle>¿DÓNDE TE LO LLEVAMOS?</SectionTitle>
          <div className="mb-3" id="checkout-field-street">
            <label className={fieldLabelClassName} htmlFor="f-street">
              Dirección
            </label>
            <input
              className={fieldClassName}
              id="f-street"
              onChange={(event) => onUpdateAddressField("street", event.target.value)}
              placeholder="Calle y número"
              value={draft.address.street}
            />
            {errors.street && (
              <p className="mt-1 text-xs text-juicy-red" role="alert">
                {errors.street}
              </p>
            )}
          </div>
          <div className="mb-3" id="checkout-field-neighborhood">
            <label className={fieldLabelClassName} htmlFor="f-neighborhood">
              Barrio
            </label>
            <input
              className={fieldClassName}
              id="f-neighborhood"
              onChange={(event) => onUpdateAddressField("neighborhood", event.target.value)}
              placeholder="Barrio"
              value={draft.address.neighborhood}
            />
            {errors.neighborhood && (
              <p className="mt-1 text-xs text-juicy-red" role="alert">
                {errors.neighborhood}
              </p>
            )}
          </div>

          {!showAddressDetails ? (
            <AddDetailLink label="Agregar piso o referencia (opcional)" onClick={() => setShowAddressDetails(true)} />
          ) : (
            <div className="mb-4 grid grid-cols-2 gap-2.5">
              <div>
                <label className={fieldLabelClassName} htmlFor="f-floor">
                  Piso o depto
                </label>
                <input
                  className={fieldClassName}
                  id="f-floor"
                  onChange={(event) => onUpdateAddressField("floorOrApartment", event.target.value)}
                  placeholder="Ej: 2A"
                  value={draft.address.floorOrApartment}
                />
              </div>
              <div>
                <label className={fieldLabelClassName} htmlFor="f-reference">
                  Referencia
                </label>
                <input
                  className={fieldClassName}
                  id="f-reference"
                  onChange={(event) => onUpdateAddressField("reference", event.target.value)}
                  placeholder="Ej: Portón negro"
                  value={draft.address.reference}
                />
              </div>
            </div>
          )}
        </>
      )}

      <SectionTitle>¿CUÁNDO?</SectionTitle>
      {!showSchedule ? (
        <div className="mb-4 flex items-center justify-between gap-2 rounded-2xl border border-black/10 bg-white px-3.5 py-3">
          <div>
            <p className="text-sm font-bold text-juicy-black">Lo antes posible</p>
            <p className="text-xs text-juicy-gray">{asapEta}</p>
          </div>
          {branch.schedulingEnabled && (
            <button
              className="min-h-11 whitespace-nowrap text-[13px] font-bold text-juicy-red"
              onClick={() => {
                setShowSchedule(true);
                onSetTimePreference("scheduled");
              }}
              type="button"
            >
              Programar
            </button>
          )}
        </div>
      ) : (
        <div className="mb-4 rounded-2xl border-[1.5px] border-juicy-red bg-white p-3.5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-juicy-black">Programar pedido</p>
            <button
              className="min-h-11 whitespace-nowrap text-[13px] font-bold text-juicy-red"
              onClick={() => {
                setShowSchedule(false);
                onSetTimePreference("asap");
              }}
              type="button"
            >
              Lo antes posible
            </button>
          </div>
          <div id="checkout-field-scheduledDate">
            <input
              className={`${fieldClassName} mb-2`}
              min={todayIso}
              onChange={(event) => onSetScheduledDate(event.target.value)}
              type="date"
              value={draft.scheduledDate}
            />
            {errors.scheduledDate && (
              <p className="mb-2 text-xs text-juicy-red" role="alert">
                {errors.scheduledDate}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2" id="checkout-field-scheduledSlot">
            {scheduleSlots.map((slot) => {
              const active = draft.scheduledSlot === slot;
              return (
                <button
                  key={slot}
                  className={`rounded-full border-[1.5px] border-juicy-red px-3 py-2 text-xs font-bold ${
                    active ? "bg-juicy-red text-white" : "bg-juicy-cream text-juicy-red"
                  }`}
                  onClick={() => onSetScheduledSlot(slot)}
                  type="button"
                >
                  {slot}
                </button>
              );
            })}
          </div>
          {errors.scheduledSlot && (
            <p className="mt-1.5 text-xs text-juicy-red" role="alert">
              {errors.scheduledSlot}
            </p>
          )}
        </div>
      )}

      <SectionTitle>TUS DATOS</SectionTitle>
      <div className="mb-3" id="checkout-field-fullName">
        <label className={fieldLabelClassName} htmlFor="f-name">
          Nombre y apellido
        </label>
        <input
          className={fieldClassName}
          id="f-name"
          onChange={(event) => onUpdateCustomerField("fullName", event.target.value)}
          value={draft.customer.fullName}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-juicy-red" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>
      <div className="mb-2.5" id="checkout-field-phone">
        <label className={fieldLabelClassName} htmlFor="f-phone">
          Teléfono
        </label>
        <input
          className={fieldClassName}
          id="f-phone"
          onChange={(event) => onUpdateCustomerField("phone", event.target.value)}
          value={draft.customer.phone}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-juicy-red" role="alert">
            {errors.phone}
          </p>
        )}
      </div>
      <label className="mb-5 flex min-h-11 cursor-pointer items-center gap-2.5">
        <input
          checked={draft.saveCustomerData}
          className="h-5 w-5 accent-juicy-red"
          onChange={onToggleSaveCustomerData}
          type="checkbox"
        />
        <span className="text-[13px] text-juicy-black">Guardar estos datos para mi próximo pedido</span>
      </label>

      <SectionTitle>¿CÓMO QUERÉS PAGAR?</SectionTitle>
      <div className="mb-2 overflow-hidden rounded-2xl border-[1.5px] border-juicy-red">
        {branch.paymentMethods.map((method, index) => (
          <label
            key={method.id}
            className={`flex min-h-11 items-center gap-3 px-3.5 py-3 ${
              index < branch.paymentMethods.length - 1 ? "border-b-2 border-dashed border-juicy-cream-dark" : ""
            } ${draft.paymentMethodId === method.id ? "bg-juicy-red/[0.08]" : "bg-juicy-cream"}`}
          >
            <input
              checked={draft.paymentMethodId === method.id}
              className="h-5 w-5 accent-juicy-red"
              name="payment-method"
              onChange={() => onSetPaymentMethod(method.id)}
              type="radio"
            />
            <span className="text-sm font-bold text-juicy-black">{method.name}</span>
          </label>
        ))}
      </div>
      <p className="mb-3.5 text-xs text-juicy-gray">La sucursal confirmará la forma de pago por WhatsApp.</p>

      {draft.paymentMethodId === "efectivo" && (
        <div className="mb-4">
          <label className={fieldLabelClassName} htmlFor="f-cash">
            ¿Con cuánto vas a pagar? — Opcional
          </label>
          <input
            className={fieldClassName}
            id="f-cash"
            min={0}
            onChange={(event) => onSetCashAmount(event.target.value)}
            placeholder="Ej: 20000"
            type="number"
            value={draft.cashAmount ?? ""}
          />
        </div>
      )}

      <SectionTitle>NOTA PARA EL PEDIDO</SectionTitle>
      {!showNotes ? (
        <AddDetailLink label="Agregar una nota (opcional)" onClick={() => setShowNotes(true)} />
      ) : (
        <>
          <label className="sr-only" htmlFor="f-order-notes">
            Nota general para el pedido
          </label>
          <textarea
            className="w-full resize-none rounded-2xl border-[1.5px] border-juicy-red bg-white px-3.5 py-3 text-sm text-juicy-black outline-none"
            id="f-order-notes"
            maxLength={200}
            onChange={(event) => onSetOrderNotes(event.target.value)}
            placeholder="¿Querés aclararnos algo?"
            rows={3}
            value={draft.orderNotes}
          />
          <p className="mt-1.5 text-right text-[11px] text-juicy-gray">{draft.orderNotes.length}/200</p>
        </>
      )}
    </div>
  );
}
