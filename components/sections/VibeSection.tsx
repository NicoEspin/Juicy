import { CheckerBorder } from "@/components/ui/CheckerBorder";
import { VibeMarquee } from "@/components/animations/VibeMarquee";
import { vibeContent } from "@/data/landingContent";

const vibeId = "the-vibe";

export function VibeSection() {
  return (
    <section
      id={vibeId}
      aria-labelledby="vibe-title"
      className="grain-surface overflow-x-clip bg-[linear-gradient(180deg,#df3434_0%,#c41e1e_50%,#8b1010_100%)] py-16 text-juicy-white sm:py-20"
    >
      <CheckerBorder className="opacity-95" />
      <div className="section-shell space-y-8 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="section-kicker border-white/[0.18] bg-white/[0.08] text-juicy-white">
              <span className="inline-block h-2 w-2 rounded-full bg-juicy-white" />
              {vibeContent.kicker}
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/72">
              {vibeContent.eyebrow}
            </p>
            <h2
              id="vibe-title"
              className="text-wrap-balance font-headline text-[clamp(3.8rem,10vw,7rem)] uppercase leading-[0.9] tracking-[0.03em]"
            >
              {vibeContent.title}
            </h2>
          </div>

          <div className="max-w-xl space-y-3">
            <p className="text-base leading-7 text-white/80 sm:text-lg">
              {vibeContent.description}
            </p>
            <p className="text-sm leading-6 text-white/64">{vibeContent.note}</p>
          </div>
        </div>

      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <VibeMarquee items={vibeContent.items} targetId={vibeId} />
      </div>

      <CheckerBorder className="opacity-95" />
    </section>
  );
}
