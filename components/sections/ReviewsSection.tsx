import Image from "next/image";
import { ReviewsReveal } from "@/components/animations/ReviewsReveal";
import { CheckerBorder } from "@/components/ui/CheckerBorder";
import { landingAssets, socialProofContent } from "@/data/landingContent";

const sectionId = "reviews";

function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, index) => (
    <span key={`star-${index}`} aria-hidden="true">
      {index < rating ? "★" : "☆"}
    </span>
  ));
}

export function ReviewsSection() {
  return (
    <section
      id={sectionId}
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
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
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
              data-reviews-title
              className="text-wrap-balance font-headline text-[clamp(3.3rem,9vw,6.4rem)] uppercase leading-[0.9] tracking-[0.03em] text-juicy-black"
            >
              {socialProofContent.title}
            </h2>
          </div>

          <p
            data-reviews-description
            className="max-w-xl text-base leading-7 text-juicy-gray sm:text-lg"
          >
            {socialProofContent.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <ul className="grid gap-4 md:grid-cols-2" role="list">
              {socialProofContent.reviews.map((review) => (
                <li key={review.id}>
                  <article
                    data-review-card
                    className="h-full rounded-[1.6rem] border border-black/[0.08] bg-white/[0.82] p-5 shadow-[0_18px_34px_rgba(26,16,8,0.08)] backdrop-blur sm:p-6"
                    aria-labelledby={`review-author-${review.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-juicy-red">
                          {review.source}
                        </p>
                        <h3
                          id={`review-author-${review.id}`}
                          className="mt-1 font-headline text-3xl uppercase leading-none tracking-[0.03em] text-juicy-black"
                        >
                          {review.author}
                        </h3>
                      </div>
                      <p className="text-lg leading-none text-juicy-red">
                        {renderStars(review.rating)}
                      </p>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-juicy-black/80 sm:text-base">
                      {review.quote}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.08] pt-3 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                      <span>{review.sourceHandle}</span>
                      <span>{review.date}</span>
                    </div>

                    {review.note ? (
                      <p className="mt-3 rounded-lg border border-black/[0.07] bg-black/[0.03] px-3 py-2 text-[0.68rem] leading-5 text-juicy-gray">
                        {review.note}
                      </p>
                    ) : null}
                  </article>
                </li>
              ))}
            </ul>

            <ul className="grid gap-3 sm:grid-cols-3" role="list">
              {socialProofContent.trustMetrics.map((metric) => (
                <li key={metric.id}>
                  <article
                    data-trust-card
                    className="h-full rounded-[1.25rem] border border-black/[0.08] bg-juicy-cream/80 px-4 py-4"
                  >
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

          <aside className="rounded-[1.8rem] border border-black/[0.08] bg-[linear-gradient(170deg,rgba(255,255,255,0.95),rgba(250,247,240,0.92))] p-5 shadow-[0_22px_42px_rgba(26,16,8,0.1)] sm:p-6">
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

            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3" role="list">
              {socialProofContent.instagramItems.map((item) => (
                <li key={item.id}>
                  <article
                    data-instagram-card
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
      <ReviewsReveal targetId={sectionId} />
    </section>
  );
}
