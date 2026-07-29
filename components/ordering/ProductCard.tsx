import Image from "next/image";
import { landingAssets } from "@/data/landingContent";
import { formatMoney } from "@/lib/ordering/money";
import type { Product } from "@/types/ordering";

interface ProductCardProps {
  onOpenDetail: () => void;
  product: Product;
}

function compactMoney(amount: number) {
  return formatMoney(amount).replace(/\s/g, "");
}

export function ProductCard({ onOpenDetail, product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_14px_rgba(90,40,10,0.1)]">
      <div className="relative aspect-[4/3] w-full shrink-0">
        <Image
          alt={product.imageAlt}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 200px"
          src={landingAssets.burger}
        />
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-juicy-red px-2 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.03em] text-white shadow-sm">
            {product.badge}
          </span>
        )}
        {product.promoLabel && (
          <span className="absolute right-2.5 top-2.5 rounded-md bg-juicy-gold px-2 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.03em] text-juicy-black shadow-sm">
            {product.promoLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <button
          className="cursor-pointer bg-transparent p-0 text-center [font-family:inherit]"
          onClick={onOpenDetail}
          type="button"
        >
          <p className="font-headline text-base uppercase leading-tight tracking-[0.01em] text-juicy-red">
            {product.name}
          </p>
          <p className="mt-1 min-h-[2rem] text-xs leading-tight text-juicy-gray">
            {product.description}
          </p>
        </button>

        <div className="my-2.5 border-t-2 border-dashed border-juicy-cream-dark" />

        <div
          className="mb-2.5 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${product.variants.length}, minmax(0, 1fr))` }}
        >
          {product.variants.map((variant) => (
            <div key={variant.id} className="min-w-0 text-center">
              {variant.promoPrice ? (
                <>
                  <p className="truncate text-[0.5rem] font-semibold text-juicy-gray line-through">
                    {compactMoney(variant.price)}
                  </p>
                  <p className="truncate text-[0.68rem] font-extrabold text-juicy-red">
                    {compactMoney(variant.promoPrice)}
                  </p>
                </>
              ) : (
                <p className="truncate text-[0.68rem] font-extrabold text-juicy-red">
                  {compactMoney(variant.price)}
                </p>
              )}
              <p className="truncate text-[0.52rem] font-bold uppercase tracking-[0.03em] text-juicy-gray">
                {variant.name}
              </p>
            </div>
          ))}
        </div>

        <button
          aria-label={`Ver detalle de ${product.name}`}
          className="mt-auto flex h-11 items-center justify-center gap-2 rounded-full bg-juicy-red text-sm font-bold text-white transition-colors hover:bg-juicy-red-dark"
          onClick={onOpenDetail}
          type="button"
        >
          <span>Agregar</span>
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/20 text-sm leading-none">
            +
          </span>
        </button>
      </div>
    </article>
  );
}
