import { MenuShowcaseMotion } from "@/components/animations/MenuShowcaseMotion";
import { MenuBurgerCard } from "@/components/ui/MenuBurgerCard";
import { menuShowcaseContent } from "@/data/landingContent";

const menuId = "menu-showcase";

export function MenuSection() {
  const [featured, compact, closing] = menuShowcaseContent.items;

  return (
    <section
      id={menuId}
      aria-labelledby="menu-showcase-title"
      className="grain-surface relative overflow-x-clip overflow-y-hidden bg-juicy-cream py-14 sm:py-16 lg:min-h-screen lg:py-6"
    >
      {/* ─── Structural rules ─── */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-black/[0.07]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-black/[0.07]" />

      {/* ─── Checker strip top ─── */}
      <div aria-hidden="true" className="checker-strip absolute inset-x-0 top-0" />

      {/* ─── Diagonal ghost text watermark ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span
          data-menu-wm
          className="menu-wm-text select-none font-headline text-[22vw] uppercase leading-none tracking-tighter text-black/[0.028] rotate-[-10deg] whitespace-nowrap"
        >
          JUICY&nbsp;JUICY
        </span>
      </div>

      {/* ─── Atmospheric warm glow ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(196,30,30,0.07),transparent_65%)] blur-3xl"
      />

      <div className="section-shell relative z-10 flex flex-col gap-8 lg:min-h-[calc(100svh-3rem)] lg:gap-6">

        {/* ════ HEADER ════ */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8 xl:gap-12">

          {/* Left — big headline block */}
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-4">
              <div className="section-kicker" data-menu-kicker>
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-juicy-red animate-pulse" />
                {menuShowcaseContent.kicker}
              </div>
              {/* Córdoba origin stamp */}
              <div
                data-menu-origin
                className="menu-origin-stamp"
                aria-label="Hecho en Carlos Paz, Córdoba"
              >
                <span className="menu-origin-inner font-headline text-[0.6rem] uppercase tracking-[0.2em] text-juicy-red leading-tight">
                  Carlos<br />Paz
                </span>
              </div>
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-juicy-red/40" />
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-juicy-gray">
                {menuShowcaseContent.eyebrow}
              </p>
              <span className="h-px flex-1 bg-black/10" />
            </div>

            {/* Main headline — split for animation */}
            <h2
              id="menu-showcase-title"
              data-menu-title
              className="text-wrap-balance font-headline text-[clamp(3.6rem,10vw,7.5rem)] uppercase leading-[0.86] tracking-[0.015em] text-juicy-black"
            >
              <span data-menu-title-line className="block overflow-hidden">
                <span className="block">{menuShowcaseContent.titleLine1}</span>
              </span>
              <span data-menu-title-line className="block overflow-hidden">
                <span className="block text-juicy-red">{menuShowcaseContent.titleLine2}</span>
              </span>
              <span data-menu-title-line className="block overflow-hidden">
                <span className="block">{menuShowcaseContent.titleLine3}</span>
              </span>
            </h2>

            {/* Inline quote — voz local */}
            <blockquote
              data-menu-quote
              className="menu-quote-block"
            >
              <p className="font-headline text-[clamp(1.15rem,2.5vw,1.45rem)] uppercase leading-tight tracking-[0.04em] text-juicy-black/70 italic">
                &quot;{menuShowcaseContent.localQuote}&quot;
              </p>
              <cite className="mt-2 block text-[0.65rem] font-bold uppercase tracking-[0.25em] text-juicy-red not-italic">
                — {menuShowcaseContent.localQuoteCite}
              </cite>
            </blockquote>
          </div>

          {/* Right — description + stats */}
          <div
            data-menu-copy
            className="flex max-w-xl flex-col gap-4 lg:max-w-[24rem]"
          >
            <p className="border-l-2 border-juicy-red pl-4 text-sm leading-7 text-juicy-gray sm:text-base">
              {menuShowcaseContent.description}
            </p>

            {/* Stats row — small data points */}
            <div className="grid grid-cols-3 gap-2" data-menu-stats>
              {menuShowcaseContent.stats.map((s) => (
                <div
                  key={s.label}
                  className="menu-stat-chip"
                >
                  <span className="font-headline text-2xl uppercase leading-none text-juicy-black">
                    {s.value}
                  </span>
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-juicy-gray leading-tight">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ CARDS GRID ════ */}
        <div className="grid gap-4 md:gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:items-start lg:gap-5 xl:gap-6">

          {/* ── COMPACT ── */}
          <MenuBurgerCard
            className="lg:col-span-4 min-h-[22rem] lg:min-h-[24.5rem]"
            imageClassName="scale-[0.9] rotate-[4deg]"
            item={compact}
            variant="compact"
          />

          {/* ── FEATURED (hero card) ── */}
          <div className="lg:col-span-4">
            <div className="relative h-full">
              {featured.isBestSeller && (
                <div
                  data-menu-badge
                  className="menu-badge absolute -right-4 top-8 z-30 lg:-left-5 lg:right-auto"
                >
                  <span className="menu-badge-inner font-headline text-[1.1rem] uppercase leading-tight tracking-[0.04em] text-white text-center">
                    #1<br />Siempre
                  </span>
                </div>
              )}
              <MenuBurgerCard
                className="min-h-[28rem] lg:min-h-[24.5rem]"
                imageClassName="scale-[1.06]"
                item={featured}
                variant="featured"
              />
            </div>
          </div>

          {/* ── CLOSING ── */}
          <MenuBurgerCard
            className="lg:col-span-4 min-h-[22rem] lg:min-h-[24.5rem]"
            imageClassName="rotate-[-3deg]"
            item={closing}
            variant="compact"
          />

          {/* ── RED PANEL ── */}
          <aside
            data-menu-panel
            className="menu-red-panel relative overflow-hidden rounded-[1.75rem] lg:col-span-12"
            aria-label="Acceso al menú completo"
          >
            {/* Grid overlay */}
            <div aria-hidden="true" className="red-panel-grid absolute inset-0 opacity-60" />

            {/* Glows */}
            <div aria-hidden="true" className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-black/20 blur-3xl" />

            {/* Checker strip top */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-3"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0, rgba(255,255,255,0.22) 12px, transparent 12px, transparent 24px)",
              }}
            />

            {/* Diagonal number — editorial touch */}
            <div
              aria-hidden="true"
              className="absolute -right-6 top-1/2 -translate-y-1/2 font-headline text-[12rem] leading-none text-white/[0.04] select-none rotate-[-15deg]"
            >
              #1
            </div>

            <div className="relative flex flex-col gap-5 p-6 pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:p-6 lg:pt-9 xl:gap-10">
              {/* Top */}
              <div className="space-y-5 lg:max-w-[40rem]">
                <p className="section-kicker border-white/20 bg-white/10 text-white/90">
                  🇦🇷 Desde 2019
                </p>

                <h3 className="font-headline text-[clamp(2.6rem,4.8vw,4.2rem)] uppercase leading-[0.88] tracking-[0.02em] text-white">
                  {menuShowcaseContent.panelTitle}
                </h3>

                {/* Divider — decorative */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-white/20" />
                  <span className="font-headline text-xs uppercase tracking-widest text-white/40">✦</span>
                  <div className="h-px flex-1 bg-white/20" />
                </div>

                <p className="text-sm leading-7 text-white/70">
                  {menuShowcaseContent.panelDescription}
                </p>

                {/* Social proof / testimonial pill */}
                <div className="menu-testimonial-pill">
                  <div className="flex -space-x-2">
                    {["🧑", "👩", "🧔"].map((e, i) => (
                      <span
                        key={i}
                        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-juicy-red bg-white/10 text-sm"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                  <p className="text-[0.7rem] font-bold text-white/80 leading-tight">
                    +800 clientes<br />
                    <span className="font-normal text-white/50">en Carlos Paz</span>
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="space-y-3 lg:w-[20rem] lg:shrink-0">
                <a
                  className="menu-panel-cta group inline-flex w-full items-center justify-between gap-3 border-2 border-white/30 bg-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-juicy-red"
                  href={menuShowcaseContent.cta.href}
                >
                  <span>{menuShowcaseContent.cta.label}</span>
                  <svg
                    className="transition-transform duration-200 group-hover:translate-x-1.5"
                    width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* WhatsApp CTA — muy argentino */}
                <a
                  href={menuShowcaseContent.cta.whatsapp}
                  className="group inline-flex w-full items-center justify-center gap-2 py-2 text-[0.72rem] font-bold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Pedí por WhatsApp
                </a>

                <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/35">
                  {menuShowcaseContent.cta.helper}
                </p>
              </div>
            </div>
          </aside>

        </div>

      </div>

      {/* ════ BOTTOM BAND — Marquee de ingredientes ════ */}
      <div
        data-menu-marquee
        className="marquee-fade relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden border-t border-black/[0.06] pt-6 lg:mt-6"
        aria-hidden="true"
      >
        <div className="menu-marquee-track flex w-max gap-8 whitespace-nowrap" data-no-js>
          {[...menuShowcaseContent.marqueeItems, ...menuShowcaseContent.marqueeItems].map(
            (item, i) => (
              <span
                key={`${item}-${i}`}
                aria-hidden={i >= menuShowcaseContent.marqueeItems.length ? "true" : undefined}
                className="inline-flex items-center gap-3 font-headline text-[1.1rem] uppercase tracking-[0.12em] text-juicy-black/25"
              >
                {item}
                <span className="text-juicy-red/40">✦</span>
              </span>
            )
          )}
        </div>
      </div>

      <MenuShowcaseMotion targetId={menuId} />
    </section>
  );
}
