"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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

const sectionId = "locations";

function formatLocationTitle(location: LocationItem) {
  return `${location.city} · ${location.zone}`;
}

function resolveWhatsAppHref(location: LocationItem) {
  if (location.whatsappHref) {
    return location.whatsappHref;
  }

  const digits = location.phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "#";
}

export function LocationsSectionClient({ content }: LocationsSectionClientProps) {
  const openLocations = useMemo(
    () => content.locations.filter((location) => location.status === "open"),
    [content.locations],
  );

  const [activeLocationId, setActiveLocationId] = useState(openLocations[0]?.id ?? "");

  const activeLocation = useMemo(
    () => openLocations.find((location) => location.id === activeLocationId) ?? openLocations[0],
    [activeLocationId, openLocations],
  );

  useEffect(() => {
    initGsap();

    const root = document.getElementById(sectionId);
    if (!root) {
      return;
    }

    const reduceMotion = prefersReducedMotion();
    const header = root.querySelector<HTMLElement>("[data-loc-header]");
    const mapWrap = root.querySelector<HTMLElement>("[data-map-wrap]");
    const infoWrap = root.querySelector<HTMLElement>("[data-loc-info]");
    const selectors = root.querySelectorAll<HTMLElement>("[data-loc-selector]");

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [header, mapWrap, infoWrap, ...Array.from(selectors)].filter(Boolean),
          {
            opacity: 1,
            y: 0,
            x: 0,
            clearProps: "all",
          },
        );
        return;
      }

      gsap.from(header, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(mapWrap, {
        opacity: 0,
        x: -36,
        duration: 0.62,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 74%",
          once: true,
        },
      });

      gsap.from(infoWrap, {
        opacity: 0,
        x: 36,
        duration: 0.62,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 74%",
          once: true,
        },
      });

      gsap.from(selectors, {
        opacity: 0,
        y: 14,
        stagger: 0.08,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
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

  if (!activeLocation) {
    return null;
  }

  return (
    <section
      id={sectionId}
      aria-labelledby="locations-title"
      className="grain-surface relative overflow-hidden bg-juicy-cream py-12 sm:py-14"
    >
      <CheckerBorder position="top" />

      <div className="section-shell relative z-10 space-y-6 py-6 sm:py-7 lg:space-y-7">
        <header
          data-loc-header
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6"
        >
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

        <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
          <article
            data-map-wrap
            className="relative overflow-hidden rounded-[1.65rem] border border-black/[0.08] bg-white p-4 shadow-[0_20px_42px_rgba(26,16,8,0.11)] sm:p-5 lg:col-span-7"
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

            <div className="h-[320px] overflow-hidden rounded-[1.15rem] border border-black/[0.08] sm:h-[340px]">
              <Map
                key={activeLocation.id}
                center={
                  activeLocation.coordinates
                    ? [activeLocation.coordinates.lng, activeLocation.coordinates.lat]
                    : [-64.497, -31.424]
                }
                zoom={13.6}
                maxZoom={17}
                minZoom={11}
                theme="light"
                className="h-full w-full"
              >
                <MapControls
                  position="bottom-right"
                  showLocate={false}
                  showFullscreen={false}
                />

                {openLocations.map((location) => {
                  if (!location.coordinates) {
                    return null;
                  }

                  const isActive = location.id === activeLocation.id;

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
                            isActive ? "scale-110" : "opacity-95 hover:scale-105"
                          }`}
                        >
                          <Image
                            src={mapPinImage}
                            alt=""
                            aria-hidden="true"
                            className={`h-auto w-11 drop-shadow-[0_8px_14px_rgba(26,16,8,0.25)] ${
                              isActive
                                ? "drop-shadow-[0_10px_18px_rgba(196,30,30,0.38)]"
                                : ""
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
          </article>

          <aside
            data-loc-info
            className="rounded-[1.65rem] border border-black/[0.08] bg-white p-4 shadow-[0_20px_42px_rgba(26,16,8,0.11)] sm:p-5 lg:col-span-5"
          >
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-juicy-gray">
              Selector de sucursal
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {openLocations.map((location) => {
                const isActive = location.id === activeLocation.id;

                return (
                  <button
                    key={location.id}
                    data-loc-selector
                    type="button"
                    onClick={() => setActiveLocationId(location.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] transition-colors ${
                      isActive
                        ? "border-juicy-red bg-juicy-red text-white"
                        : "border-black/[0.12] bg-juicy-cream text-juicy-black hover:border-juicy-red/35"
                    }`}
                  >
                    {location.zone}
                  </button>
                );
              })}
            </div>

            <article className="mt-4 rounded-[1.1rem] border border-black/[0.08] bg-juicy-cream/75 p-4">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-juicy-gray">
                Sucursal seleccionada
              </p>
              <h3 className="mt-1 font-headline text-[clamp(1.8rem,3.4vw,2.8rem)] uppercase leading-none tracking-[0.03em] text-juicy-black">
                {formatLocationTitle(activeLocation)}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-juicy-gray">{activeLocation.blurb}</p>

              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="text-[0.63rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                    Dirección
                  </dt>
                  <dd className="mt-1 text-juicy-black/82">{activeLocation.address}</dd>
                </div>
                <div>
                  <dt className="text-[0.63rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                    Horarios
                  </dt>
                  <dd className="mt-1 text-juicy-black/82">{activeLocation.hours}</dd>
                </div>
                <div>
                  <dt className="text-[0.63rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
                    WhatsApp
                  </dt>
                  <dd className="mt-1 text-juicy-black/82">{activeLocation.phone}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={activeLocation.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden border-2 border-juicy-red bg-juicy-red px-4 py-2 text-[0.74rem] font-bold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Cómo llegar</span>
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
                </a>

                <a
                  href={resolveWhatsAppHref(activeLocation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-juicy-black px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-juicy-black transition-colors hover:bg-juicy-black hover:text-juicy-cream"
                >
                  WhatsApp
                </a>
              </div>
            </article>
          </aside>
        </div>
      </div>

      <CheckerBorder position="bottom" />
    </section>
  );
}
