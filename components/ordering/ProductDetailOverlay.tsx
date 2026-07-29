"use client";

import Image from "next/image";
import { landingAssets } from "@/data/landingContent";
import { formatMoney } from "@/lib/ordering/money";
import { calculateUnitPrice } from "@/lib/ordering/pricing";
import type { Product, ProductExtra, ProductFormState } from "@/types/ordering";

interface ProductDetailOverlayProps {
  form: ProductFormState;
  isAdding: boolean;
  isEditing: boolean;
  isFavorite: boolean;
  onChangeExtraQty: (extra: ProductExtra, delta: number) => void;
  onChangeQuantity: (delta: number) => void;
  onClose: () => void;
  onNotesChange: (value: string) => void;
  onSelectCheese: (id: string) => void;
  onSelectVariant: (id: string) => void;
  onSubmit: () => void;
  onToggleFavorite: () => void;
  onToggleIngredient: (id: string) => void;
  product: Product;
  variantError: boolean;
}

export function ProductDetailOverlay({
  form,
  isAdding,
  isEditing,
  isFavorite,
  onChangeExtraQty,
  onChangeQuantity,
  onClose,
  onNotesChange,
  onSelectCheese,
  onSelectVariant,
  onSubmit,
  onToggleFavorite,
  onToggleIngredient,
  product,
  variantError,
}: ProductDetailOverlayProps) {
  const unitPrice = calculateUnitPrice(product, form);
  const isUnavailable = !product.available;
  const submitDisabled = isUnavailable || isAdding;

  return (
    <div className="ordering-fade fixed inset-0 z-[90] flex flex-col bg-juicy-cream">
      <div className="shrink-0">
        <div className="flex items-center justify-between px-4 py-3.5 sm:px-6">
          <button
            aria-label="Volver al menú"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-[1.5px] border-juicy-red"
            onClick={onClose}
            type="button"
          >
            <svg fill="none" height="18" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="18" className="text-juicy-red">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <p className="font-headline text-[17px] text-juicy-red">Detalle del producto</p>
          <button
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-[1.5px] border-juicy-red transition-transform"
            onClick={onToggleFavorite}
            type="button"
          >
            <svg
              fill={isFavorite ? "#C41E1E" : "none"}
              height="19"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="19"
              className="text-juicy-red"
            >
              <path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9z" />
            </svg>
          </button>
        </div>
        <div className="checker-strip" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl pb-6">
          <div className="relative aspect-[4/3] w-full">
            <Image alt={product.imageAlt} className="object-cover" fill sizes="(max-width: 768px) 100vw, 700px" src={landingAssets.burger} />
            {product.badge && (
              <span className="absolute left-3.5 top-3.5 rounded-lg bg-juicy-red px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.03em] text-white">
                {product.badge}
              </span>
            )}
          </div>

          <div className="px-4 pb-2 pt-5 sm:px-6">
            <h1 className="mb-1.5 font-headline text-[1.9rem] uppercase leading-[1.05] tracking-[0.01em] text-juicy-red">
              {product.name}
            </h1>
            <p className="text-sm leading-6 text-juicy-black">{product.description}</p>
          </div>

          {isUnavailable && (
            <div className="mx-4 mt-3.5 rounded-xl border-[1.5px] border-juicy-red bg-juicy-red/[0.08] px-3.5 py-3 text-center font-bold text-juicy-red sm:mx-6">
              Producto no disponible
            </div>
          )}

          <div className="scroll-mt-4 px-4 pt-5.5 sm:px-6" id="section-variant">
            <fieldset className="m-0 border-none p-0">
              <legend className="mb-3.5 flex w-full items-center gap-2.5">
                <div className="h-0.5 flex-1 bg-juicy-red/50" />
                <span className="whitespace-nowrap font-headline text-base tracking-[0.01em] text-juicy-red">
                  ELEGÍ EL TAMAÑO
                </span>
                <div className="h-0.5 flex-1 bg-juicy-red/50" />
                <span className="shrink-0 whitespace-nowrap rounded-full border-[1.5px] border-juicy-red-light bg-juicy-red-light/10 px-2.5 py-1 text-[11px] font-bold text-juicy-red-dark">
                  Obligatorio
                </span>
              </legend>
              <div className="grid grid-cols-3 gap-2.5">
                {product.variants.map((variant) => {
                  const checked = form.variantId === variant.id;
                  return (
                    <label
                      key={variant.id}
                      className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border-[1.5px] border-juicy-red px-1.5 py-3 ${
                        checked ? "bg-juicy-red text-white" : "bg-white text-juicy-red"
                      } ${variant.available ? "" : "opacity-45"}`}
                    >
                      <input
                        checked={checked}
                        className="mb-0.5 h-[18px] w-[18px] accent-juicy-cream"
                        disabled={!variant.available}
                        name="variant-group"
                        onChange={() => onSelectVariant(variant.id)}
                        type="radio"
                      />
                      <span className="text-sm font-bold">{variant.name}</span>
                      <span className="text-[13px] font-semibold">{formatMoney(variant.price)}</span>
                    </label>
                  );
                })}
              </div>
              {variantError && (
                <p className="mt-2.5 text-[13px] font-bold text-juicy-red" role="alert">
                  Elegí un tamaño para continuar.
                </p>
              )}
            </fieldset>
          </div>

          <div className="px-4 pt-5.5 sm:px-6">
            <div className="mb-3.5 flex items-center gap-2.5">
              <div className="h-0.5 flex-1 bg-juicy-red/50" />
              <span className="whitespace-nowrap font-headline text-base tracking-[0.01em] text-juicy-red">
                PERSONALIZÁ TU BURGER
              </span>
              <div className="h-0.5 flex-1 bg-juicy-red/50" />
            </div>
            {product.ingredients.map((ingredient) => {
              const checked = ingredient.removable ? !form.removedIngredientIds.includes(ingredient.id) : true;
              return (
                <label
                  key={ingredient.id}
                  className={`flex min-h-11 items-center gap-3 border-b-2 border-dashed border-juicy-cream-dark py-2.5 ${
                    ingredient.removable ? "cursor-pointer" : "cursor-default opacity-60"
                  }`}
                >
                  <input
                    checked={checked}
                    className="h-5 w-5 shrink-0 accent-juicy-red"
                    disabled={!ingredient.removable}
                    onChange={() => onToggleIngredient(ingredient.id)}
                    type="checkbox"
                  />
                  <span className="text-sm text-juicy-black">{ingredient.name}</span>
                </label>
              );
            })}
            <p className="mt-2 text-xs text-juicy-gray">Podés quitar ingredientes sin modificar el precio.</p>
          </div>

          {product.cheeseOptions && product.cheeseOptions.length > 0 && (
            <div className="px-4 pt-5.5 sm:px-6">
              <fieldset className="m-0 border-none p-0">
                <legend className="mb-3.5 flex w-full items-center gap-2.5">
                  <div className="h-0.5 flex-1 bg-juicy-red/50" />
                  <span className="whitespace-nowrap font-headline text-base tracking-[0.01em] text-juicy-red">
                    ELEGÍ EL QUESO
                  </span>
                  <div className="h-0.5 flex-1 bg-juicy-red/50" />
                </legend>
                <div className="grid grid-cols-3 gap-2.5">
                  {product.cheeseOptions.map((cheese) => {
                    const checked = form.cheeseOptionId === cheese.id;
                    return (
                      <label
                        key={cheese.id}
                        className={`flex items-center justify-center gap-2 rounded-full border-[1.5px] border-juicy-red px-1.5 py-3 ${
                          checked ? "bg-juicy-red text-white" : "bg-white text-juicy-red"
                        } ${cheese.available ? "cursor-pointer" : "cursor-default opacity-45"}`}
                      >
                        <input
                          checked={checked}
                          className="h-4 w-4 accent-juicy-cream"
                          disabled={!cheese.available}
                          name="cheese-group"
                          onChange={() => onSelectCheese(cheese.id)}
                          type="radio"
                        />
                        <span className="text-[13px] font-bold">{cheese.name}</span>
                      </label>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-juicy-gray">Sin costo adicional.</p>
              </fieldset>
            </div>
          )}

          {product.extras && product.extras.length > 0 && (
            <div className="px-4 pt-5.5 sm:px-6">
              <div className="mb-3.5 flex items-center gap-2.5">
                <div className="h-0.5 flex-1 bg-juicy-red/50" />
                <span className="whitespace-nowrap font-headline text-base tracking-[0.01em] text-juicy-red">
                  SUMALE EXTRAS
                </span>
                <div className="h-0.5 flex-1 bg-juicy-red/50" />
              </div>
              {product.extras.map((extra) => {
                const qty = form.extraQuantities[extra.id] || 0;
                return (
                  <div
                    key={extra.id}
                    className="flex min-h-11 items-center justify-between gap-2.5 border-b-2 border-dashed border-juicy-cream-dark py-2.5"
                  >
                    <span className="text-sm text-juicy-black">{extra.name}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[13px] font-bold text-juicy-red">+{formatMoney(extra.price)}</span>
                      {qty === 0 ? (
                        <button
                          aria-label={`Agregar ${extra.name}`}
                          className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-[1.5px] border-juicy-red text-juicy-red disabled:opacity-40"
                          disabled={!extra.available}
                          onClick={() => onChangeExtraQty(extra, 1)}
                          type="button"
                        >
                          +
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            aria-label={`Quitar ${extra.name}`}
                            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-[1.5px] border-juicy-red text-juicy-red"
                            onClick={() => onChangeExtraQty(extra, -1)}
                            type="button"
                          >
                            −
                          </button>
                          <span className="min-w-4 text-center text-sm font-bold">{qty}</span>
                          <button
                            aria-label={`Agregar ${extra.name}`}
                            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-[1.5px] border-juicy-red text-juicy-red disabled:opacity-40"
                            disabled={!extra.available || qty >= extra.maxQuantity}
                            onClick={() => onChangeExtraQty(extra, 1)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="px-4 pt-5.5 sm:px-6">
            <div className="mb-3.5 flex items-center gap-2.5">
              <div className="h-0.5 flex-1 bg-juicy-red/50" />
              <span className="whitespace-nowrap font-headline text-base tracking-[0.01em] text-juicy-red">
                ACLARACIONES
              </span>
              <div className="h-0.5 flex-1 bg-juicy-red/50" />
            </div>
            <label className="sr-only" htmlFor="product-notes">
              Aclaraciones para tu pedido
            </label>
            <textarea
              className="w-full resize-none rounded-2xl border-[1.5px] border-juicy-red bg-white px-3.5 py-3 text-sm text-juicy-black outline-none"
              id="product-notes"
              maxLength={120}
              onChange={(event) => onNotesChange(event.target.value)}
              placeholder="Ej.: sin sal, salsa aparte..."
              rows={3}
              value={form.notes}
            />
            <p className="mt-1.5 text-right text-[11px] text-juicy-gray">{form.notes.length}/120</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-juicy-red/15 bg-juicy-cream px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center gap-2.5">
          <div className="flex shrink-0 items-center gap-0.5 rounded-full border-[1.5px] border-juicy-red p-1">
            <button
              aria-label="Reducir cantidad"
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-juicy-red disabled:opacity-40"
              disabled={form.quantity <= 1}
              onClick={() => onChangeQuantity(-1)}
              type="button"
            >
              −
            </button>
            <span className="min-w-5.5 text-center font-extrabold text-juicy-black">{form.quantity}</span>
            <button
              aria-label="Aumentar cantidad"
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-juicy-red disabled:opacity-40"
              disabled={form.quantity >= 10}
              onClick={() => onChangeQuantity(1)}
              type="button"
            >
              +
            </button>
          </div>
          <button
            className={`h-13 flex-1 rounded-full text-sm font-bold tracking-[0.015em] text-white ${
              submitDisabled ? "bg-juicy-gray" : "bg-juicy-red hover:bg-juicy-red-dark"
            }`}
            disabled={submitDisabled}
            onClick={onSubmit}
            type="button"
          >
            {isAdding
              ? "Guardando…"
              : `${isEditing ? "GUARDAR CAMBIOS" : "AGREGAR AL PEDIDO"} · ${formatMoney(unitPrice * form.quantity)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
