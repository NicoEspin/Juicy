"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocationsMap } from "@/components/maps/LocationsMap";
import { CheckerBorder } from "@/components/ui/CheckerBorder";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";
import type { LocationsContent, LocationItem } from "@/types/landing";

interface LocationsSectionClientProps {
  content: LocationsContent;
}

type WaitlistState = { status: "idle" } | { status: "success"; name: string };

const sectionId = "locations";

function formatLocationTitle(location: LocationItem) {
  return `${location.city} · ${location.zone}`;
}

export function LocationsSectionClient({ content }: LocationsSectionClientProps) {
  const openLocations = useMemo(
    () => content.locations.filter((location) => location.status === "open"),
    [content.locations],
  );

  const baLocation = useMemo(
    () => content.locations.find((location) => location.status === "soon"),
    [content.locations],
  );

  const [activeLocationId, setActiveLocationId] = useState(openLocations[0]?.id ?? "");
  const [waitlistState, setWaitlistState] = useState<WaitlistState>({ status: "idle" });

  const activeLocation = useMemo(
    () => content.locations.find((location) => location.id === activeLocationId),
    [activeLocationId, content.locations],
  );

  useEffect(() => {
    initGsap();

    const root = document.getElementById(sectionId);
    if (!root) {
      return;
    }

    const reduceMotion = prefersReducedMotion();
    const cards = root.querySelectorAll<HTMLElement>("[data-loc-card]");
    const mapWrap = root.querySelector<HTMLElement>("[data-map-wrap]");
    const waitlistCard = root.querySelector<HTMLElement>("[data-waitlist-card]");

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([mapWrap, waitlistCard, ...Array.from(cards)], {
          opacity: 1,
          x: 0,
          y: 0,
          clearProps: "all",
        });
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.58,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 74%",
        },
      });

      gsap.from(mapWrap, {
        opacity: 0,
        x: -30,
        duration: 0.62,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });

      gsap.from(waitlistCard, {
        opacity: 0,
        x: 30,
        duration: 0.62,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });
    }, root);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === root) {
          trigger.kill();
        }
      });
    };
  }, []);

  function onWaitlistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = String(new FormData(form).get("name") ?? "").trim();
    if (!name) {
      return;
    }

    setWaitlistState({ status: "success", name });
    form.reset();
  }

  return (
    <section
      id={sectionId}
      aria-labelledby="locations-title"
      className="grain-surface relative overflow-hidden bg-juicy-cream py-20 sm:py-24"
    >
      <CheckerBorder position="top" />

      <div className="section-shell relative z-10 space-y-10 py-10">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="section-kicker">
              <span className="inline-block h-2 w-2 rounded-full bg-juicy-red" />
              {content.kicker}
            </p>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-juicy-gray">
              {content.eyebrow}
            </p>
            <h2
              id="locations-title"
              className="text-wrap-balance font-headline text-[clamp(3.2rem,8vw,6rem)] uppercase leading-[0.9] tracking-[0.03em] text-juicy-black"
            >
              {content.title}
            </h2>
          </div>
          <p className="max-w-lg border-l-2 border-juicy-red pl-4 text-sm leading-7 text-juicy-gray sm:text-base">
            {content.description}
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          {openLocations.map((location, index) => {
            const isActive = location.id === activeLocationId;
            return (
              <article
                key={location.id}
                data-loc-card
                className={`rounded-[1.6rem] border p-5 transition-all sm:p-6 ${
                  isActive
                    ? "border-juicy-red bg-white shadow-[0_20px_40px_rgba(26,16,8,0.12)]"
                    : "border-black/[0.08] bg-white/[0.76]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-headline text-[clamp(1.8rem,3vw,2.5rem)] uppercase leading-none tracking-[0.02em] text-juicy-black">
                      {formatLocationTitle(location)}
                    </p>
                    <p className="text-sm leading-6 text-juicy-gray">{location.blurb}</p>
                  </div>
                  <span className="rounded-full border border-black/[0.1] bg-juicy-cream px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-juicy-red">
                    0{index + 1}
                  </span>
                </div>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.63rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                      Dirección
                    </dt>
                    <dd className="mt-1 text-juicy-black/82">{location.address}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.63rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                      Horarios
                    </dt>
                    <dd className="mt-1 text-juicy-black/82">{location.hours}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.63rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                      Contacto
                    </dt>
                    <dd className="mt-1 text-juicy-black/82">{location.phone}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveLocationId(location.id)}
                    className={`rounded-full px-4 py-2 text-[0.74rem] font-bold uppercase tracking-[0.08em] ${
                      isActive
                        ? "bg-juicy-red text-white"
                        : "bg-black/[0.06] text-juicy-black hover:bg-black/[0.12]"
                    }`}
                  >
                    Ver en mapa
                  </button>
                  <a
                    href={location.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-black/[0.12] px-4 py-2 text-[0.74rem] font-bold uppercase tracking-[0.08em] text-juicy-black"
                  >
                    Cómo llegar
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <article
            data-map-wrap
            className="relative overflow-hidden rounded-[1.9rem] border border-black/[0.08] bg-white p-5 shadow-[0_24px_50px_rgba(26,16,8,0.12)] sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-headline text-[clamp(2rem,3.6vw,3rem)] uppercase leading-none tracking-[0.02em] text-juicy-black">
                  {content.mapTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-juicy-gray">{content.mapNote}</p>
              </div>
              <span className="rounded-full border border-black/[0.1] bg-juicy-cream px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-juicy-red">
                Real map
              </span>
            </div>

            <LocationsMap
              activeLocationId={activeLocationId}
              locations={openLocations}
              onSelectLocation={setActiveLocationId}
            />

            <div className="mt-4 rounded-[1rem] border border-black/[0.08] bg-juicy-cream/75 px-4 py-3">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-juicy-gray">
                Selección activa
              </p>
              <p className="mt-1 font-headline text-3xl uppercase leading-none tracking-[0.03em] text-juicy-black">
                {activeLocation ? formatLocationTitle(activeLocation) : "Sin selección"}
              </p>
              <p className="mt-1 text-sm text-juicy-gray">{activeLocation?.address}</p>
            </div>
          </article>

          {baLocation ? (
            <article
              data-waitlist-card
              className="relative overflow-hidden rounded-[1.9rem] border border-juicy-red/30 bg-juicy-black p-6 text-white shadow-[0_24px_50px_rgba(26,16,8,0.2)] sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-6 font-headline text-[7rem] uppercase leading-none text-white/[0.04]"
              >
                BA
              </div>
              <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-headline text-[clamp(2rem,4vw,2.8rem)] uppercase leading-none tracking-[0.03em]">
                      {formatLocationTitle(baLocation)}
                    </p>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/68">{baLocation.blurb}</p>
                  </div>
                  <span className="rounded-full bg-juicy-red px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white">
                    Pendiente
                  </span>
                </div>

                <div className="h-px bg-white/12" />

                {waitlistState.status === "success" ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-[1rem] border border-white/12 bg-white/8 p-4"
                  >
                    <p className="font-headline text-xl uppercase tracking-[0.03em] text-white">
                      {content.waitlist.successTitle}
                    </p>
                    <p className="mt-1 text-sm text-white/65">
                      {waitlistState.name}, {content.waitlist.successBody}
                    </p>
                  </div>
                ) : (
                  <form className="space-y-3" onSubmit={onWaitlistSubmit} noValidate>
                    <div>
                      <label
                        htmlFor="waitlist-name"
                        className="mb-1 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/60"
                      >
                        Nombre
                      </label>
                      <input
                        id="waitlist-name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Tu nombre"
                        className="w-full rounded-xl border border-white/12 bg-white/8 px-3 py-2.5 text-sm text-white placeholder:text-white/32"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="waitlist-email"
                        className="mb-1 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/60"
                      >
                        Email
                      </label>
                      <input
                        id="waitlist-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="nombre@email.com"
                        className="w-full rounded-xl border border-white/12 bg-white/8 px-3 py-2.5 text-sm text-white placeholder:text-white/32"
                      />
                    </div>

                    <label className="flex items-start gap-2 text-xs leading-5 text-white/55">
                      <input
                        name="consent"
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent accent-juicy-red"
                      />
                      <span>{content.waitlist.checkboxLabel}</span>
                    </label>

                    <button type="submit" className="cta-primary w-full justify-center">
                      {content.waitlist.submitLabel}
                    </button>

                    <p className="text-[0.62rem] leading-5 text-white/38">{content.waitlist.privacyHint}</p>
                  </form>
                )}
              </div>
            </article>
          ) : null}
        </div>
      </div>

      <CheckerBorder position="bottom" />
    </section>
  );
}
