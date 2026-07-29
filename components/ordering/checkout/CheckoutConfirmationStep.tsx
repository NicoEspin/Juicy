import { formatMoney } from "@/lib/ordering/money";
import type { Branch, Cart, CartItem, CheckoutDraft } from "@/types/ordering";

interface CheckoutConfirmationStepProps {
  branch: Branch;
  cart: Cart;
  deliveryFeeLabel: string;
  draft: CheckoutDraft;
  onEdit: () => void;
  orderTotalLabel: string;
  showDeliveryLine: boolean;
  subtotalLabel: string;
}

function detailLine(item: CartItem) {
  const bits: string[] = [];
  if (item.variant?.name) bits.push(item.variant.name);
  const cheese = item.selectedOptions.find((option) => option.groupId === "cheese");
  if (cheese) bits.push(cheese.name);
  if (item.extras.length) bits.push(item.extras.map((extra) => `${extra.quantity}× ${extra.name}`).join(", "));
  return bits.join(" · ");
}

function SummaryCard({
  label,
  lines,
  onEdit,
}: {
  label: string;
  lines: (string | null)[];
  onEdit: () => void;
}) {
  return (
    <div className="mb-3 rounded-2xl border border-juicy-red/15 bg-white p-3.5">
      <div className="flex items-start justify-between gap-2.5">
        <div>
          <p className="mb-0.5 text-[11px] tracking-[0.03em] text-juicy-gray">{label}</p>
          {lines.filter(Boolean).map((line, index) => (
            <p
              key={index}
              className={index === 0 ? "text-sm font-bold text-juicy-black" : "text-xs text-juicy-gray"}
            >
              {line}
            </p>
          ))}
        </div>
        <button
          className="min-h-11 whitespace-nowrap text-[13px] font-bold text-juicy-red"
          onClick={onEdit}
          type="button"
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export function CheckoutConfirmationStep({
  branch,
  cart,
  deliveryFeeLabel,
  draft,
  onEdit,
  orderTotalLabel,
  showDeliveryLine,
  subtotalLabel,
}: CheckoutConfirmationStepProps) {
  const paymentMethod = branch.paymentMethods.find((method) => method.id === draft.paymentMethodId);
  const fulfillmentDetail =
    draft.fulfillmentType === "delivery"
      ? `${draft.address.street}, ${draft.address.neighborhood}`
      : branch.address;
  const timeLabel =
    draft.timePreference === "asap"
      ? `Lo antes posible (${draft.fulfillmentType === "delivery" ? branch.estimatedDeliveryTime : branch.estimatedPickupTime})`
      : `Programado — ${draft.scheduledDate} · ${draft.scheduledSlot}`;

  return (
    <div className="pt-1.5">
      <p className="mb-3.5 mt-2 font-headline text-[17px] tracking-[0.01em] text-juicy-red">REVISÁ TU PEDIDO</p>

      <SummaryCard label="SUCURSAL" lines={[`${branch.name} — ${branch.city}`, branch.address]} onEdit={onEdit} />
      <SummaryCard
        label="ENTREGA"
        lines={[draft.fulfillmentType === "delivery" ? "Envío" : "Retiro en local", fulfillmentDetail, timeLabel]}
        onEdit={onEdit}
      />
      <SummaryCard label="DATOS" lines={[draft.customer.fullName, draft.customer.phone]} onEdit={onEdit} />
      <SummaryCard
        label="FORMA DE PAGO"
        lines={[
          paymentMethod?.name ?? "",
          draft.paymentMethodId === "efectivo" && draft.cashAmount
            ? `Paga con ${formatMoney(draft.cashAmount)}`
            : null,
        ]}
        onEdit={onEdit}
      />

      <p className="mb-2.5 mt-3 font-headline text-[15px] tracking-[0.01em] text-juicy-red">PRODUCTOS</p>
      {cart.items.map((item) => {
        const removedLabel = item.removedIngredients.length
          ? `Sin ${item.removedIngredients.map((r) => r.name.toLowerCase()).join(", ")}`
          : null;
        return (
          <div key={item.id} className="border-b-2 border-dashed border-juicy-cream-dark py-2.5">
            <div className="flex justify-between text-sm font-bold text-juicy-black">
              <span>
                {item.quantity}× {item.name}
              </span>
              <span>{formatMoney(item.lineTotal)}</span>
            </div>
            {detailLine(item) && <p className="text-xs text-juicy-gray">{detailLine(item)}</p>}
            {removedLabel && <p className="text-xs text-juicy-gray">{removedLabel}</p>}
            {item.notes && <p className="text-xs italic text-juicy-gray">&quot;{item.notes}&quot;</p>}
          </div>
        );
      })}

      <div className="mt-3 pt-2.5">
        <div className="mb-1.5 flex justify-between text-sm text-juicy-black">
          <span>Subtotal</span>
          <span>{subtotalLabel}</span>
        </div>
        {showDeliveryLine && (
          <div className="mb-1.5 flex justify-between text-sm text-juicy-black">
            <span>Envío</span>
            <span>{deliveryFeeLabel}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-extrabold text-juicy-red">
          <span>Total estimado</span>
          <span>{orderTotalLabel}</span>
        </div>
      </div>
      <p className="mt-2.5 text-xs leading-5 text-juicy-gray">
        El total es estimado. La sucursal confirmará disponibilidad, demora y precio final por WhatsApp.
      </p>
    </div>
  );
}
