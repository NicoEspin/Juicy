import Image from "next/image";
import { CheckerBorder } from "@/components/ui/CheckerBorder";
import { footerContent, landingAssets } from "@/data/landingContent";

export function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden bg-juicy-black text-juicy-white">
      <CheckerBorder position="top" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-8 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(232,64,64,0.24),transparent_70%)] blur-3xl"
      />

      <div className="section-shell relative z-10 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src={landingAssets.logo}
                alt="Logo Juicy Hamburgers"
                className="h-auto w-16"
                sizes="64px"
              />
              <div>
                <p className="font-display text-4xl leading-none text-juicy-white">Juicy</p>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white/60">
                  Taste the Difference
                </p>
              </div>
            </div>

            <h2 className="font-headline text-[clamp(3rem,7vw,4.8rem)] uppercase leading-[0.9] tracking-[0.03em]">
              {footerContent.brandTitle}
            </h2>

            <p className="max-w-xl text-sm leading-7 text-white/72 sm:text-base">
              {footerContent.brandDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {footerContent.socialLinks.map((socialLink) => (
                <a
                  key={socialLink.id}
                  href={socialLink.href}
                  className="rounded-full border border-white/[0.14] bg-white/[0.06] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/78 hover:border-white/30 hover:text-white"
                >
                  {socialLink.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <section aria-labelledby="footer-nav-title" className="space-y-3">
              <h3
                id="footer-nav-title"
                className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/58"
              >
                Navegación
              </h3>
              <ul className="space-y-2" role="list">
                {footerContent.navigation.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-white/82 hover:text-white"
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-juicy-red" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="footer-locations-title" className="space-y-3">
              <h3
                id="footer-locations-title"
                className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/58"
              >
                Sucursales
              </h3>
              <ul className="space-y-3" role="list">
                {footerContent.locations.map((location) => (
                  <li key={location.id} className="rounded-xl border border-white/[0.12] bg-white/[0.05] px-3 py-2">
                    <p className="font-headline text-2xl uppercase leading-none tracking-[0.03em] text-white">
                      {location.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/68">{location.address}</p>
                    <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/55">
                      {location.hours}
                    </p>
                    {location.note ? (
                      <p className="mt-1 text-[0.62rem] leading-5 text-white/44">{location.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="footer-hours-title" className="space-y-3 sm:col-span-2">
              <h3
                id="footer-hours-title"
                className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/58"
              >
                {footerContent.scheduleTitle}
              </h3>
              <p className="rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm leading-6 text-white/68">
                {footerContent.scheduleSummary}
              </p>
            </section>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.12] pt-6">
          <p className="max-w-4xl text-[0.68rem] leading-5 text-white/50">{footerContent.legalLine}</p>

          <div className="flex items-end gap-2">
            <Image
              src={landingAssets.pet}
              alt="Juicy Dog decorativo"
              className="h-auto w-14 opacity-90"
              sizes="56px"
            />
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/46">
              Juicy Dog approves
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
