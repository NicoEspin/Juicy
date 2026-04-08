import Image from "next/image";
import { CheckerBorder } from "@/components/ui/CheckerBorder";
import { TestimonialsColumns1 } from "@/components/ui/testimonials-columns-1";
import { landingAssets, socialProofContent } from "@/data/landingContent";

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="grain-surface relative overflow-hidden bg-juicy-white py-20 sm:py-24"
    >
      <CheckerBorder position="top" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(196,30,30,0.35) 25%, transparent 25%), linear-gradient(-45deg, rgba(196,30,30,0.35) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(196,30,30,0.35) 75%), linear-gradient(-45deg, transparent 75%, rgba(196,30,30,0.35) 75%)",
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 0 11px, 11px -11px, -11px 0px",
        }}
      />

      <div className="section-shell relative z-10 space-y-8 py-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:items-end">
          <div className="max-w-3xl space-y-4">
            <p className="section-kicker">
              <span className="inline-block h-2 w-2 rounded-full bg-juicy-red" />
              {socialProofContent.kicker}
            </p>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-juicy-gray">
              {socialProofContent.eyebrow}
            </p>
            <h2
              id="reviews-title"
              className="text-wrap-balance font-headline text-[clamp(3.3rem,9vw,6.4rem)] uppercase leading-[0.9] tracking-[0.03em] text-juicy-black"
            >
              {socialProofContent.title}
            </h2>
            <p className="max-w-xl font-accent text-[1.2rem] italic leading-7 text-juicy-red sm:text-[1.45rem]">
              Gente que entra por hambre, vuelve por identidad y ya pregunta cuando aterriza Buenos Aires.
            </p>
          </div>

          <div className="space-y-4 rounded-[1.8rem] border border-black/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(250,247,240,0.9))] p-5 shadow-[0_18px_40px_rgba(26,16,8,0.08)] sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-juicy-gray">
              Señales que ya empujan conversión
            </p>
            <p className="max-w-xl text-base leading-7 text-juicy-gray sm:text-lg">
              {socialProofContent.description}
            </p>
            <ul className="grid gap-3 sm:grid-cols-3" role="list">
              {socialProofContent.trustMetrics.map((metric) => (
                <li key={metric.id}>
                  <article className="h-full rounded-[1.25rem] border border-black/[0.08] bg-juicy-cream/85 px-4 py-4">
                    <p className="font-headline text-4xl uppercase leading-none tracking-[0.03em] text-juicy-red">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-juicy-gray">{metric.helper}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(16.5rem,0.65fr)] xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] xl:items-start">
          <TestimonialsColumns1 testimonials={socialProofContent.reviews} />
          <aside className="rounded-[1.8rem] border border-black/[0.08] bg-[linear-gradient(170deg,rgba(255,255,255,0.95),rgba(250,247,240,0.92))] p-5 shadow-[0_22px_42px_rgba(26,16,8,0.1)] sm:p-6 lg:max-w-[21rem] lg:justify-self-end xl:max-w-[22.5rem]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-juicy-red">
                  {socialProofContent.instagramTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-juicy-gray sm:text-base">
                  {socialProofContent.instagramDescription}
                </p>
              </div>
              <span className="rounded-full border border-black/[0.1] bg-white px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                Placeholder
              </span>
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3" role="list">
              {socialProofContent.instagramItems.map((item) => (
                <li key={item.id}>
                  <article
                    className="group overflow-hidden rounded-[1rem] border border-black/[0.08] bg-white"
                    aria-label={`${item.title}: ${item.caption}`}
                  >
                    <div className="relative aspect-square overflow-hidden bg-juicy-cream/85 p-3">
                      <Image
                        alt={`Placeholder visual para ${item.title}`}
                        src={landingAssets[item.assetKey]}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 40vw, 11rem"
                      />
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.62rem] font-bold uppercase tracking-[0.12em] text-juicy-black">
                        {item.title}
                      </p>
                      <p className="mt-1 min-h-8 text-[0.62rem] leading-4 text-juicy-gray">
                        {item.placeholderNote}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <CheckerBorder position="bottom" />
    </section>
  );
}
