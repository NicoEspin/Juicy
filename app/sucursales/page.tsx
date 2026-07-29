import type { Metadata } from "next";
import Link from "next/link";
import { locationsContent } from "@/data/landingContent";
import type { LocationItem } from "@/types/landing";

export const metadata: Metadata = {
  title: "Sucursales",
  description:
    "Elegí tu sucursal de Juicy Hamburgers en Villa Carlos Paz para ver el menú y hacer tu pedido por WhatsApp.",
  alternates: {
    canonical: "/sucursales",
  },
  openGraph: {
    title: "Sucursales | Juicy Hamburgers",
    description: "Elegí tu sucursal de Juicy Hamburgers y arrancá tu pedido.",
    url: "/sucursales",
  },
};

function resolveWhatsAppHref(location: LocationItem) {
  if (location.whatsappHref) return location.whatsappHref;
  const digits = location.phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "#";
}

export default function SucursalesPage() {
  return (
    <main id="main-content" className="grain-surface relative min-h-screen overflow-hidden bg-juicy-cream py-14 sm:py-16">
      <div className="checker-strip absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="section-shell relative z-10 space-y-8 py-6">
        <header className="max-w-3xl space-y-4">
          <p className="section-kicker">
            <span className="inline-block h-2 w-2 rounded-full bg-juicy-red" />
            Elegí dónde pedir
          </p>
          <h1 className="text-wrap-balance font-headline text-[clamp(2.6rem,7vw,4.8rem)] uppercase leading-[0.9] tracking-[0.03em] text-juicy-black">
            ¿Desde qué sucursal pedís hoy?
          </h1>
          <p className="max-w-2xl border-l-2 border-juicy-red pl-4 text-sm leading-6 text-juicy-gray sm:text-base">
            Cada sucursal tiene su propio menú, precios y WhatsApp. Elegí la tuya para ver la carta completa y armar
            tu pedido.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locationsContent.locations.map((location) => (
            <BranchCard key={location.id} location={location} />
          ))}
        </div>
      </div>

      <div className="checker-strip absolute inset-x-0 bottom-0" aria-hidden="true" />
    </main>
  );
}

function BranchCard({ location }: { location: LocationItem }) {
  const isOrderable = location.status === "open" && location.menuAvailable && location.slug;

  return (
    <article className="flex flex-col rounded-[1.65rem] border border-black/[0.08] bg-white p-5 shadow-[0_20px_42px_rgba(26,16,8,0.11)]">
      <span
        className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] ${
          isOrderable ? "bg-juicy-red text-white" : "border border-black/[0.1] bg-juicy-cream text-juicy-gray"
        }`}
      >
        {location.badge}
      </span>

      <h2 className="font-headline text-[clamp(1.8rem,3.2vw,2.4rem)] uppercase leading-none tracking-[0.02em] text-juicy-black">
        {location.city} · {location.zone}
      </h2>

      <p className="mt-2 text-sm leading-6 text-juicy-gray">{location.blurb}</p>

      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">Dirección</dt>
          <dd className="mt-0.5 text-juicy-black/82">{location.address}</dd>
        </div>
        <div>
          <dt className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">Horarios</dt>
          <dd className="mt-0.5 text-juicy-black/82">{location.hours}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-col gap-2.5">
        {isOrderable ? (
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-full bg-juicy-red px-4 py-2.5 text-[0.82rem] font-bold uppercase tracking-[0.06em] text-white transition-transform hover:-translate-y-0.5 hover:bg-juicy-red-dark"
            href={`/sucursales/${location.slug}`}
          >
            Ver menú y pedir
          </Link>
        ) : (
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-juicy-red px-4 py-2.5 text-[0.82rem] font-bold uppercase tracking-[0.06em] text-juicy-red transition-colors hover:bg-juicy-red hover:text-white"
            href="/#locations"
          >
            Sumarme a la lista de espera
          </Link>
        )}

        {isOrderable && (
          <div className="flex gap-2.5">
            <a
              className="flex-1 rounded-full border border-black/[0.12] px-3 py-2 text-center text-[0.72rem] font-bold uppercase tracking-[0.06em] text-juicy-black hover:border-juicy-red/40"
              href={location.mapsHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Cómo llegar
            </a>
            <a
              className="flex-1 rounded-full border border-black/[0.12] px-3 py-2 text-center text-[0.72rem] font-bold uppercase tracking-[0.06em] text-juicy-black hover:border-juicy-red/40"
              href={resolveWhatsAppHref(location)}
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
