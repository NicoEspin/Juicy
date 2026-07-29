import { formatMoney } from "@/lib/ordering/money";
import type { Branch, Cart, CheckoutDraft, OrderTotals } from "@/types/ordering";

export function buildWhatsAppOrderMessage(
  branch: Branch,
  cart: Cart,
  draft: CheckoutDraft,
  totals: OrderTotals,
  reference: string,
): string {
  const lines: string[] = [];

  lines.push("🍔 *NUEVO PEDIDO WEB — JUICY*");
  lines.push("");
  lines.push(`*Referencia:* ${reference}`);
  lines.push(`*Sucursal:* ${branch.name}`);
  lines.push(`*Modalidad:* ${draft.fulfillmentType === "delivery" ? "Envío" : "Retiro en local"}`);
  lines.push(
    `*Momento:* ${
      draft.timePreference === "asap"
        ? "Lo antes posible"
        : `Programado — ${draft.scheduledDate} · ${draft.scheduledSlot}`
    }`,
  );
  lines.push("");
  lines.push("*CLIENTE*");
  lines.push(`Nombre: ${draft.customer.fullName}`);
  lines.push(`Teléfono: ${draft.customer.phone}`);

  if (draft.fulfillmentType === "delivery" && draft.address) {
    lines.push("");
    lines.push("*DIRECCIÓN*");
    lines.push(draft.address.street);
    lines.push(`Barrio: ${draft.address.neighborhood}`);
    if (draft.address.floorOrApartment) lines.push(`Piso/Depto: ${draft.address.floorOrApartment}`);
    if (draft.address.reference) lines.push(`Referencia: ${draft.address.reference}`);
  }

  lines.push("");
  lines.push("*PEDIDO*");
  cart.items.forEach((item) => {
    lines.push("");
    lines.push(`${item.quantity}× ${item.name}${item.variant?.name ? ` ${item.variant.name.toLowerCase()}` : ""}`);
    const cheeseOpt = item.selectedOptions.find((o) => o.groupId === "cheese");
    if (cheeseOpt) lines.push(`• Queso: ${cheeseOpt.name}`);
    if (item.removedIngredients.length) {
      lines.push(`• Quitar: ${item.removedIngredients.map((r) => r.name).join(", ")}`);
    }
    if (item.extras.length) {
      lines.push(`• Extras: ${item.extras.map((e) => `${e.quantity}× ${e.name}`).join(", ")}`);
    }
    if (item.notes) lines.push(`• Aclaración: ${item.notes}`);
    lines.push(`• Total: ${formatMoney(item.lineTotal)}`);
  });

  lines.push("");
  lines.push("*RESUMEN*");
  lines.push(`Subtotal: ${formatMoney(totals.subtotal)}`);
  if (draft.fulfillmentType === "delivery") lines.push(`Envío: ${formatMoney(totals.deliveryFee)}`);
  lines.push(`*TOTAL ESTIMADO: ${formatMoney(totals.total)}*`);
  lines.push("");

  const paymentMethod = branch.paymentMethods.find((p) => p.id === draft.paymentMethodId);
  lines.push(`*Forma de pago preferida:* ${paymentMethod ? paymentMethod.name : ""}`);
  if (draft.paymentMethodId === "efectivo" && draft.cashAmount) {
    lines.push(`Paga con: ${formatMoney(draft.cashAmount)}`);
  }
  if (draft.orderNotes) lines.push(`*Nota general:* ${draft.orderNotes}`);
  lines.push("");
  lines.push("El pedido queda sujeto a confirmación de la sucursal.");

  return lines.join("\n");
}

export function buildWhatsAppUrl(branch: Branch, message: string): string {
  return `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
