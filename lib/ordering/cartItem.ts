import { calculateLineTotal, calculateUnitPrice, createConfigurationFingerprint } from "@/lib/ordering/pricing";
import type { CartItem, Product, ProductFormState } from "@/types/ordering";

export function emptyForm(product: Product): ProductFormState {
  return {
    variantId: product.variants.length === 1 ? product.variants[0].id : null,
    removedIngredientIds: [],
    cheeseOptionId: product.cheeseOptions?.[0]?.id ?? null,
    extraQuantities: {},
    notes: "",
    quantity: 1,
  };
}

export function buildCartItem(
  product: Product,
  form: ProductFormState,
  branchId: string,
  existingId?: string,
  existingCreatedAt?: string,
): CartItem {
  const variant = product.variants.find((v) => v.id === form.variantId);
  if (!variant) {
    throw new Error(`buildCartItem: no variant selected for product ${product.id}`);
  }

  const cheese = product.cheeseOptions?.find((c) => c.id === form.cheeseOptionId);
  const removedIngredients = product.ingredients
    .filter((ingredient) => form.removedIngredientIds.includes(ingredient.id))
    .map((ingredient) => ({ id: ingredient.id, name: ingredient.name }));

  const extras = Object.keys(form.extraQuantities)
    .filter((id) => form.extraQuantities[id] > 0)
    .map((id) => {
      const extra = product.extras?.find((e) => e.id === id);
      return {
        id,
        name: extra?.name ?? id,
        unitPrice: extra?.price ?? 0,
        quantity: form.extraQuantities[id],
      };
    });

  const unitPrice = calculateUnitPrice(product, form);
  const nowIso = new Date().toISOString();

  return {
    id: existingId ?? `ci-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    productId: product.id,
    productSlug: product.slug,
    branchId,
    name: product.name,
    variant: { id: variant.id, name: variant.name, price: variant.price },
    selectedOptions: cheese
      ? [{ groupId: "cheese", optionId: cheese.id, name: cheese.name, priceModifier: cheese.priceModifier }]
      : [],
    removedIngredients,
    extras,
    notes: form.notes,
    quantity: form.quantity,
    unitPrice,
    lineTotal: calculateLineTotal(unitPrice, form.quantity),
    fingerprint: createConfigurationFingerprint(form),
    createdAt: existingCreatedAt ?? nowIso,
    updatedAt: nowIso,
  };
}
