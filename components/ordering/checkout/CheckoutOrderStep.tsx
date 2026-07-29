"use client";

import Image from "next/image";
import { useState } from "react";
import { landingAssets } from "@/data/landingContent";
import { formatMoney } from "@/lib/ordering/money";
import type { Cart, CartItem } from "@/types/ordering";

interface CheckoutOrderStepProps {
  cart: Cart;
  deliveryFeeLabel: string;
  onChangeQty: (itemId: string, delta: number) => void;
  onClose: () => void;
  onContinue: () => void;
  onEditItem: (item: CartItem) => void;
  onRemoveItem: (itemId: string) => void;
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

export function CheckoutOrderStep({
  cart,
  deliveryFeeLabel,
  onChangeQty,
  onClose,
  onContinue,
  onEditItem,
  onRemoveItem,
  orderTotalLabel,
  showDeliveryLine,
  subtotalLabel,
}: CheckoutOrderStepProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-5 py-16 text-center">
        <p className="font-headline text-lg text-juicy-red">Tu carrito está vacío</p>
        <button
          className="min-h-11 rounded-full bg-juicy-red px-6 font-bold text-white"
          onClick={onClose}
          type="button"
        >
          Volver al menú
        </button>
      </div>
    );
  }

  return (
    <div className="pt-1.5">
      <p className="mb-3.5 mt-2 font-headline text-[17px] tracking-[0.01em] text-juicy-red">TU PEDIDO</p>

      {cart.items.map((item) => {
        const removedLabel = item.removedIngredients.length
          ? `Sin ${item.removedIngredients.map((r) => r.name.toLowerCase()).join(", ")}`
          : null;

        return (
          <div key={item.id} className="mb-3 rounded-2xl border border-juicy-red/15 bg-white p-3">
            <div className="flex gap-2.5">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <Image alt="" className="object-cover" fill sizes="56px" src={landingAssets.burger} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <p className="text-sm font-bold text-juicy-black">
                    {item.quantity}× {item.name}
                  </p>
                  <p className="whitespace-nowrap text-sm font-extrabold text-juicy-red">
                    {formatMoney(item.lineTotal)}
                  </p>
                </div>
                {detailLine(item) && <p className="mt-0.5 text-xs text-juicy-gray">{detailLine(item)}</p>}
                {removedLabel && <p className="text-xs text-juicy-gray">{removedLabel}</p>}
                {item.notes && <p className="text-xs italic text-juicy-gray">&quot;{item.notes}&quot;</p>}
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between border-t-2 border-dashed border-juicy-cream-dark pt-2.5">
              <div className="flex items-center gap-0.5 rounded-full border-[1.5px] border-juicy-red p-0.5">
                <button
                  aria-label="Reducir cantidad"
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-juicy-red disabled:opacity-40"
                  disabled={item.quantity <= 1}
                  onClick={() => onChangeQty(item.id, -1)}
                  type="button"
                >
                  −
                </button>
                <span className="min-w-4.5 text-center text-sm font-bold">{item.quantity}</span>
                <button
                  aria-label="Aumentar cantidad"
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-juicy-red"
                  onClick={() => onChangeQty(item.id, 1)}
                  type="button"
                >
                  +
                </button>
              </div>
              <div className="flex gap-3.5">
                <button
                  className="min-h-11 text-[13px] font-bold text-juicy-red"
                  onClick={() => onEditItem(item)}
                  type="button"
                >
                  Editar
                </button>
                <button
                  aria-label="Eliminar producto"
                  className="flex min-h-11 min-w-11 items-center justify-center text-juicy-red"
                  onClick={() => setConfirmingId(item.id)}
                  type="button"
                >
                  <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
                    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
                  </svg>
                </button>
              </div>
            </div>

            {confirmingId === item.id && (
              <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg bg-juicy-red/[0.08] p-2.5">
                <span className="text-xs text-juicy-black">¿Eliminar este producto?</span>
                <div className="flex gap-2">
                  <button
                    className="rounded-full border-[1.5px] border-juicy-red px-3 py-1.5 text-xs font-bold text-juicy-red"
                    onClick={() => setConfirmingId(null)}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    className="rounded-full bg-juicy-red px-3 py-1.5 text-xs font-bold text-white"
                    onClick={() => {
                      onRemoveItem(item.id);
                      setConfirmingId(null);
                    }}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-2 border-t-2 border-dashed border-juicy-cream-dark pt-3.5">
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
        <div className="mt-2 flex justify-between text-[17px] font-extrabold text-juicy-red">
          <span>Total estimado</span>
          <span>{orderTotalLabel}</span>
        </div>
      </div>

      <button
        className="mt-4.5 h-13 w-full rounded-full bg-juicy-red text-sm font-bold tracking-[0.015em] text-white hover:bg-juicy-red-dark"
        onClick={onContinue}
        type="button"
      >
        Continuar con mis datos
      </button>
    </div>
  );
}
