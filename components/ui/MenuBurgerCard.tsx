import Image from "next/image";
import { landingAssets } from "@/data/landingContent";
import type { MenuBurgerItem } from "@/types/landing";
// assetKey is resolved against the real landingAssets shape: "burger" | "logo" | "pet"

interface MenuBurgerCardProps {
  className?: string;
  imageClassName?: string;
  item: MenuBurgerItem;
  variant?: "featured" | "compact";
}

export function MenuBurgerCard({
  className = "",
  imageClassName = "",
  item,
  variant = "compact",
}: MenuBurgerCardProps) {
  const image = landingAssets[item.assetKey as keyof typeof landingAssets];
  const isFeatured = variant === "featured";

  return (
    <article
      className={`menu-card group relative flex h-full flex-col overflow-hidden border border-black/[0.07] bg-white ${className}`.trim()}
      data-menu-card
      aria-labelledby={`menu-card-${item.id}`}
    >
      {/* ── Corner fold — paper effect ── */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 z-30 h-10 w-10"
        style={{
          background:
            "linear-gradient(225deg, var(--juicy-cream-dark) 50%, transparent 50%)",
        }}
      />

      {/* ── Top label chip ── */}
      <div
        aria-hidden="true"
        className="absolute left-4 top-4 z-20 border border-black/[0.07] bg-juicy-cream px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.26em] text-juicy-gray"
      >
        {item.label}
      </div>

      {/* ── Calidad stamp — diagonal text ── */}
      {item.qualityTag && (
        <div
          aria-hidden="true"
          className="menu-quality-tag"
        >
          {item.qualityTag}
        </div>
      )}

      {/* ── Atmospheric red glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] top-[10%] h-[52%] rounded-full bg-[radial-gradient(circle,rgba(196,30,30,0.12),transparent_65%)] blur-2xl transition-opacity duration-500 group-hover:opacity-150"
      />

      {/* ── Burger image ── */}
      <div
        className={`relative shrink-0 ${
          isFeatured
            ? "min-h-[240px] sm:min-h-[280px] lg:min-h-[250px]"
            : "min-h-[180px] sm:min-h-[205px] lg:min-h-[170px]"
        } overflow-hidden`}
      >
        {/* Drop shadow disc */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 z-0 h-8 w-[72%] -translate-x-1/2 rounded-full bg-black/[0.18] blur-2xl transition-all duration-500 group-hover:w-[80%] group-hover:bg-black/[0.22]"
        />

        {/* Number tag — editorial */}
        <div
          aria-hidden="true"
          className="absolute bottom-3 right-4 z-20 font-headline text-[2.5rem] leading-none text-black/[0.06] select-none"
        >
          0{item.menuNumber ?? 1}
        </div>

        <Image
          alt={item.imageAlt}
          className={`relative z-10 mx-auto h-auto w-full max-w-[460px] object-contain transition-[transform,filter] duration-500 ease-out will-change-transform ${imageClassName}`}
          data-menu-image
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 30vw"
          src={image}
          priority={isFeatured}
        />
      </div>

      {/* ── Content ── */}
      <div
        className={`relative z-10 flex flex-1 flex-col gap-4 px-5 pb-6 pt-3 sm:px-6 ${
          isFeatured ? "sm:pb-7" : ""
        }`}
      >
        {/* Name + price row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3
              id={`menu-card-${item.id}`}
              className={`font-headline uppercase leading-none tracking-[0.015em] text-juicy-black ${
                isFeatured
                  ? "text-[clamp(2.5rem,5.3vw,4rem)]"
                  : "text-[clamp(2.05rem,4.2vw,3rem)]"
              }`}
            >
              {item.name}
            </h3>
            <p
              className={`mt-2 leading-6 text-juicy-gray ${isFeatured ? "text-sm sm:text-base" : "text-sm"}`}
            >
              {item.description}
            </p>
          </div>

          {/* Price stamp */}
          <div className="menu-price-stamp shrink-0 flex flex-col items-center">
            <span className="font-headline text-xl uppercase leading-none tracking-[0.04em] text-white">
              {item.price}
            </span>
            {item.priceNote && (
              <span className="mt-0.5 text-[0.5rem] font-bold uppercase tracking-[0.15em] text-white/70">
                {item.priceNote}
              </span>
            )}
          </div>
        </div>

        {/* Divider — double line editorial */}
        <div className="relative h-px bg-black/[0.06]">
          <div className="absolute inset-x-0 top-[3px] h-px bg-black/[0.03]" />
        </div>

        {/* Ingredient tags — pill chips */}
        {item.ingredients && (
          <div className="flex flex-wrap gap-1.5">
            {item.ingredients.map((ing) => (
              <span
                key={ing}
                className="menu-ingredient-chip"
              >
                {ing}
              </span>
            ))}
          </div>
        )}

        {/* Detail + quality note */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="max-w-[30ch] text-xs leading-5 text-black/45">
            {item.detail}
          </p>
          <span className="inline-block border border-juicy-red/25 px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-juicy-red/65">
            {item.placeholderNote}
          </span>
        </div>
      </div>

      {/* ── Hover: red bottom bar wipe ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-juicy-red transition-transform duration-[350ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100"
      />

      {/* ── Hover: top red accent flash ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-right scale-x-0 bg-juicy-red/60 transition-transform duration-[400ms] delay-75 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100 group-hover:origin-left"
      />

      {/* ── Hover: subtle vignette overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,30,30,0.05),transparent_60%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
      />
    </article>
  );
}
