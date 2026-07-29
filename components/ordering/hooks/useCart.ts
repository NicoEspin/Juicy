"use client";

import { useCallback, useEffect, useState } from "react";
import { buildCartItem } from "@/lib/ordering/cartItem";
import { calculateLineTotal } from "@/lib/ordering/pricing";
import { readJSON, STORAGE_KEYS, writeJSON } from "@/lib/ordering/storage";
import type { Cart, CartItem, Product, ProductFormState } from "@/types/ordering";

function emptyCart(branchId: string): Cart {
  return { version: 1, branchId, items: [], updatedAt: null };
}

export function useCart(branchId: string) {
  const [cart, setCart] = useState<Cart>(() => emptyCart(branchId));

  // The cart is scoped to a single branch at a time (matches "switching branches
  // empties the cart" behavior) — if storage belongs to another branch, present an
  // empty cart until the user actually adds something for this one.
  useEffect(() => {
    const stored = readJSON<Cart>(STORAGE_KEYS.cart);
    // localStorage doesn't exist during SSR, so hydrating the real cart has to happen post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(stored && stored.version === 1 && stored.branchId === branchId ? stored : emptyCart(branchId));
  }, [branchId]);

  const persist = useCallback((next: Cart) => {
    writeJSON(STORAGE_KEYS.cart, next);
    setCart(next);
  }, []);

  const saveItems = useCallback(
    (items: CartItem[]) => {
      persist({ version: 1, branchId, items, updatedAt: new Date().toISOString() });
    },
    [branchId, persist],
  );

  const quickAdd = useCallback(
    (product: Product) => {
      const form: ProductFormState = {
        variantId: product.variants[0].id,
        removedIngredientIds: [],
        cheeseOptionId: product.cheeseOptions?.[0]?.id ?? null,
        extraQuantities: {},
        notes: "",
        quantity: 1,
      };
      const candidate = buildCartItem(product, form, branchId);
      const items = cart.items.slice();
      const idx = items.findIndex(
        (item) => item.productId === product.id && item.fingerprint === candidate.fingerprint,
      );

      if (idx >= 0) {
        const quantity = items[idx].quantity + 1;
        items[idx] = {
          ...items[idx],
          quantity,
          lineTotal: calculateLineTotal(items[idx].unitPrice, quantity),
          updatedAt: new Date().toISOString(),
        };
      } else {
        items.push(candidate);
      }

      saveItems(items);
    },
    [branchId, cart.items, saveItems],
  );

  const addOrUpdate = useCallback(
    (product: Product, form: ProductFormState, editingItemId: string | null) => {
      const items = cart.items.slice();

      if (editingItemId) {
        const idx = items.findIndex((item) => item.id === editingItemId);
        if (idx >= 0) {
          items[idx] = buildCartItem(product, form, branchId, editingItemId, items[idx].createdAt);
        }
      } else {
        const candidate = buildCartItem(product, form, branchId);
        const idx = items.findIndex(
          (item) => item.productId === product.id && item.fingerprint === candidate.fingerprint,
        );

        if (idx >= 0) {
          const quantity = items[idx].quantity + form.quantity;
          items[idx] = {
            ...items[idx],
            quantity,
            lineTotal: calculateLineTotal(items[idx].unitPrice, quantity),
            updatedAt: new Date().toISOString(),
          };
        } else {
          items.push(candidate);
        }
      }

      saveItems(items);
    },
    [branchId, cart.items, saveItems],
  );

  const changeQuantity = useCallback(
    (itemId: string, delta: number) => {
      const items = cart.items.map((item) => {
        if (item.id !== itemId) return item;
        const quantity = Math.max(1, Math.min(20, item.quantity + delta));
        return {
          ...item,
          quantity,
          lineTotal: calculateLineTotal(item.unitPrice, quantity),
          updatedAt: new Date().toISOString(),
        };
      });
      saveItems(items);
    },
    [cart.items, saveItems],
  );

  const removeItem = useCallback(
    (itemId: string) => {
      saveItems(cart.items.filter((item) => item.id !== itemId));
    },
    [cart.items, saveItems],
  );

  const clear = useCallback(() => {
    persist(emptyCart(branchId));
  }, [branchId, persist]);

  return { cart, quickAdd, addOrUpdate, changeQuantity, removeItem, clear };
}
