"use client";

import { useCallback, useEffect, useState } from "react";
import { emptyForm } from "@/lib/ordering/cartItem";
import type { CartItem, Product, ProductExtra, ProductFormState } from "@/types/ordering";

function formFromCartItem(product: Product, item: CartItem): ProductFormState {
  return {
    variantId: item.variant.id,
    removedIngredientIds: item.removedIngredients.map((ingredient) => ingredient.id),
    cheeseOptionId:
      item.selectedOptions.find((option) => option.groupId === "cheese")?.optionId ??
      product.cheeseOptions?.[0]?.id ??
      null,
    extraQuantities: item.extras.reduce<Record<string, number>>((acc, extra) => {
      acc[extra.id] = extra.quantity;
      return acc;
    }, {}),
    notes: item.notes,
    quantity: item.quantity,
  };
}

export function useProductForm(product: Product | undefined, editingCartItem: CartItem | undefined) {
  const [form, setForm] = useState<ProductFormState | null>(null);
  const [variantError, setVariantError] = useState(false);

  useEffect(() => {
    if (!product) {
      setForm(null);
      return;
    }
    setForm(editingCartItem ? formFromCartItem(product, editingCartItem) : emptyForm(product));
    setVariantError(false);
    // Re-derive only when the target product or the item being edited changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id, editingCartItem?.id]);

  const selectVariant = useCallback((variantId: string) => {
    setForm((current) => (current ? { ...current, variantId } : current));
    setVariantError(false);
  }, []);

  const toggleIngredient = useCallback((ingredientId: string) => {
    setForm((current) => {
      if (!current) return current;
      const has = current.removedIngredientIds.includes(ingredientId);
      return {
        ...current,
        removedIngredientIds: has
          ? current.removedIngredientIds.filter((id) => id !== ingredientId)
          : current.removedIngredientIds.concat(ingredientId),
      };
    });
  }, []);

  const selectCheese = useCallback((optionId: string) => {
    setForm((current) => (current ? { ...current, cheeseOptionId: optionId } : current));
  }, []);

  const changeExtraQty = useCallback((extra: ProductExtra, delta: number) => {
    setForm((current) => {
      if (!current) return current;
      const currentQty = current.extraQuantities[extra.id] || 0;
      const nextQty = Math.max(0, Math.min(extra.maxQuantity, currentQty + delta));
      return { ...current, extraQuantities: { ...current.extraQuantities, [extra.id]: nextQty } };
    });
  }, []);

  const setNotes = useCallback((notes: string) => {
    setForm((current) => (current ? { ...current, notes: notes.slice(0, 120) } : current));
  }, []);

  const changeQuantity = useCallback((delta: number) => {
    setForm((current) => {
      if (!current) return current;
      const next = Math.max(1, Math.min(10, current.quantity + delta));
      return { ...current, quantity: next };
    });
  }, []);

  return {
    form,
    variantError,
    setVariantError,
    selectVariant,
    toggleIngredient,
    selectCheese,
    changeExtraQty,
    setNotes,
    changeQuantity,
  };
}
