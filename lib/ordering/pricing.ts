import type {
  Branch,
  Cart,
  FulfillmentType,
  Product,
  ProductFormState,
} from "@/types/ordering";

export function calculateUnitPrice(product: Product, form: ProductFormState): number {
  const variant = (product.variants || []).find((v) => v.id === form.variantId);
  let total = variant ? variant.price : 0;

  const cheese = (product.cheeseOptions || []).find((c) => c.id === form.cheeseOptionId);
  if (cheese) total += cheese.priceModifier;

  const extras = product.extras || [];
  Object.keys(form.extraQuantities).forEach((id) => {
    const qty = form.extraQuantities[id] || 0;
    const extra = extras.find((e) => e.id === id);
    if (extra && qty > 0) total += extra.price * qty;
  });

  return total;
}

export function calculateLineTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

export function calculateSubtotal(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.lineTotal, 0);
}

export function calculateDeliveryFee(
  branch: Branch | null | undefined,
  fulfillmentType: FulfillmentType,
): number {
  return fulfillmentType === "delivery" && branch ? branch.deliveryFee : 0;
}

export function calculateOrderTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + deliveryFee;
}

export function createConfigurationFingerprint(form: ProductFormState): string {
  const removedKey = form.removedIngredientIds.slice().sort().join(",");
  const extrasKey = Object.keys(form.extraQuantities)
    .filter((id) => (form.extraQuantities[id] || 0) > 0)
    .sort()
    .map((id) => `${id}:${form.extraQuantities[id]}`)
    .join(",");

  return [form.variantId, form.cheeseOptionId, removedKey, extrasKey, form.notes.trim()].join("|");
}
