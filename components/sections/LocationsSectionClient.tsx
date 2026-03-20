"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import mapPinImage from "@/app/assets/mappin.webp";
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
      className="grain-surface relative overflow-hidden bg-juicy-cream py-12 sm:py-14 lg:py-14"
    >
      <CheckerBorder position="top" />

      <div className="section-shell relative z-10 space-y-6 py-6 sm:py-7 lg:space-y-7">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="section-kicker">
              <span className="inline-block h-2 w-2 rounded-full bg-juicy-red" />
              {content.kicker}
            </p>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-juicy-gray">
              {content.eyebrow}
            </p>
            <h2
              id="locations-title"
              className="text-wrap-balance font-headline text-[clamp(2.8rem,7.2vw,5.2rem)] uppercase leading-[0.9] tracking-[0.03em] text-juicy-black"
            >
              {content.title}
            </h2>
          </div>
          <p className="max-w-lg border-l-2 border-juicy-red pl-4 text-sm leading-6 text-juicy-gray sm:text-[0.96rem] sm:leading-7">
            {content.description}
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
          <article
            data-map-wrap
            className="relative overflow-hidden rounded-[1.65rem] border border-black/[0.08] bg-white p-4 shadow-[0_20px_42px_rgba(26,16,8,0.11)] sm:p-5 lg:col-span-5"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-headline text-[clamp(1.8rem,3.2vw,2.5rem)] uppercase leading-none tracking-[0.02em] text-juicy-black">
                  {content.mapTitle}
                </p>
                <p className="mt-1.5 text-sm leading-5.5 text-juicy-gray">{content.mapNote}</p>
              </div>
              <span className="rounded-full border border-black/[0.1] bg-juicy-cream px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-juicy-red">
                Real map
              </span>
            </div>

            <div className="h-[290px] overflow-hidden rounded-[1.15rem] border border-black/[0.08] sm:h-[320px] lg:h-[300px] xl:h-[320px]">
              <Map
                center={
                  activeLocation?.coordinates
                    ? [activeLocation.coordinates.lng, activeLocation.coordinates.lat]
                    : [-64.497, -31.424]
                }
                zoom={13.4}
                maxZoom={17}
                minZoom={11}
                theme="light"
                className="h-full w-full"
              >
                <MapControls position="bottom-right" showLocate={false} showFullscreen={false} />
                {openLocations.map((location) => {
                  if (!location.coordinates) {
                    return null;
                  }

                  const isActive = location.id === activeLocationId;

                  return (
                    <MapMarker
                      key={location.id}
                      longitude={location.coordinates.lng}
                      latitude={location.coordinates.lat}
                      onClick={() => setActiveLocationId(location.id)}
                    >
                      <MarkerContent>
                        <button
                          type="button"
                          aria-label={`Ver ${formatLocationTitle(location)} en el mapa`}
                          className={`rounded-full p-0 transition-transform duration-200 ${
                            isActive
                              ? "scale-110"
                              : "opacity-95 hover:scale-105"
                          }`}
                        >
                          <Image
                            src={mapPinImage}
                            alt=""
                            aria-hidden="true"
                            className={`h-auto w-11 drop-shadow-[0_8px_14px_rgba(26,16,8,0.25)] ${
                              isActive ? "drop-shadow-[0_10px_18px_rgba(196,30,30,0.38)]" : ""
                            }`}
                            sizes="44px"
                          />
                        </button>
                      </MarkerContent>
                      <MarkerPopup offset={20} closeButton>
                        <div className="space-y-1">
                          <p className="font-headline text-lg uppercase leading-none tracking-[0.03em] text-juicy-black">
                            {formatLocationTitle(location)}
                          </p>
                          <p className="text-xs text-juicy-gray">{location.address}</p>
                        </div>
                      </MarkerPopup>
                    </MapMarker>
                  );
                })}
              </Map>
            </div>

            <div className="mt-3 rounded-[0.9rem] border border-black/[0.08] bg-juicy-cream/75 px-3.5 py-2.5">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-juicy-gray">
                Selección activa
              </p>
              <p className="mt-1 font-headline text-[1.7rem] uppercase leading-none tracking-[0.03em] text-juicy-black">
                {activeLocation ? formatLocationTitle(activeLocation) : "Sin selección"}
              </p>
              <p className="mt-0.5 text-sm text-juicy-gray">{activeLocation?.address}</p>
            </div>
          </article>

          <div className="grid gap-4 lg:col-span-7 lg:grid-cols-2">
            {openLocations.map((location, index) => {
              const isActive = location.id === activeLocationId;
              return (
                <article
                  key={location.id}
                  data-loc-card
                  className={`rounded-[1.45rem] border p-4 transition-all sm:p-5 ${
                    isActive
                      ? "border-juicy-red bg-white shadow-[0_20px_40px_rgba(26,16,8,0.12)]"
                      : "border-black/[0.08] bg-white/[0.76]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-headline text-[clamp(1.45rem,2.2vw,2rem)] uppercase leading-none tracking-[0.02em] text-juicy-black">
                        {formatLocationTitle(location)}
                      </p>
                      <p className="text-sm leading-5.5 text-juicy-gray">{location.blurb}</p>
                    </div>
                    <span className="rounded-full border border-black/[0.1] bg-juicy-cream px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-juicy-red">
                      0{index + 1}
                    </span>
                  </div>

                  <dl className="mt-3 grid gap-2.5 text-sm sm:grid-cols-2">
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

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveLocationId(location.id)}
                      className={`group relative inline-flex items-center gap-2 overflow-hidden border-2 px-4 py-2 text-[0.74rem] font-bold uppercase tracking-[0.08em] transition-colors ${
                        isActive
                          ? "border-juicy-red bg-juicy-red text-white"
                          : "border-juicy-red bg-juicy-red text-white"
                      }`}
                    >
                      <span className="relative z-10">Ver en mapa</span>
                      <svg
                        className="relative z-10 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 10h12M12 5l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-juicy-black transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100" />
                    </button>
                    <a
                      href={location.mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center border-2 border-juicy-black px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-juicy-black transition-colors hover:bg-juicy-black hover:text-juicy-cream"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {baLocation ? (
            <article
              data-waitlist-card
              className="relative overflow-hidden rounded-[1.65rem] border border-juicy-red/30 bg-juicy-black p-5 text-white shadow-[0_22px_44px_rgba(26,16,8,0.2)] sm:p-6 lg:col-span-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-6 font-headline text-[7rem] uppercase leading-none text-white/[0.04]"
              >
                BA
              </div>
              <div className="relative space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-headline text-[clamp(1.8rem,3.5vw,2.4rem)] uppercase leading-none tracking-[0.03em]">
                      {formatLocationTitle(baLocation)}
                    </p>
                    <p className="mt-1.5 max-w-md text-sm leading-5.5 text-white/68">{baLocation.blurb}</p>
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

                    <button
                      type="submit"
                      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden border-2 border-juicy-red bg-juicy-red px-5 py-3 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(196,30,30,0.35)] transition-transform hover:-translate-y-0.5"
                    >
                      <span className="relative z-10">{content.waitlist.submitLabel}</span>
                      <svg
                        className="relative z-10 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 10h12M12 5l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-juicy-black transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100" />
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
