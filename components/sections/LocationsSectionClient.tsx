"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

// ─── Inline SVG map of Argentina (schematic, not real geo) ───────────────────
function ArgentinaMapSVG() {
  return (
    <svg
      viewBox="0 0 200 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Simplified silhouette */}
      <path
        d="M100 8 C130 10 158 22 168 48 C178 72 172 96 164 118
           C158 134 168 148 170 164 C172 182 160 198 150 212
           C138 228 136 244 128 256 C118 270 108 282 100 296
           C92 282 82 270 72 256 C64 244 62 228 50 212
           C40 198 28 182 30 164 C32 148 42 134 36 118
           C28 96 22 72 32 48 C42 22 70 10 100 8Z"
        fill="rgba(196,30,30,0.06)"
        stroke="rgba(196,30,30,0.18)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Internal contour detail */}
      <path
        d="M100 30 C120 34 142 46 148 68 C154 90 144 108 140 126
           C136 142 148 158 146 174 C144 190 132 202 124 216
           C114 230 108 246 100 258
           C92 246 86 230 76 216 C68 202 56 190 54 174
           C52 158 64 142 60 126 C56 108 46 90 52 68
           C58 46 80 34 100 30Z"
        fill="rgba(196,30,30,0.04)"
        stroke="rgba(196,30,30,0.10)"
        strokeWidth="0.8"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

export function LocationsSectionClient({
  content,
}: LocationsSectionClientProps) {
  const [activeLocationId, setActiveLocationId] = useState(
    content.locations[0]?.id ?? "",
  );
  const [waitlistState, setWaitlistState] = useState<WaitlistState>({
    status: "idle",
  });

  const pulseRef = useRef<HTMLDivElement | null>(null);
  const pinGroupRef = useRef<HTMLDivElement | null>(null);
  const mapInfoRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const openLocations = content.locations.filter((l) => l.status === "open");
  const baLocation = content.locations.find((l) => l.status === "soon");

  const activeLocation = useMemo(
    () => content.locations.find((l) => l.id === activeLocationId),
    [activeLocationId, content.locations],
  );

  // ─── Section entrance ────────────────────────────────────────────────────
  useEffect(() => {
    initGsap();
    const root = document.getElementById(sectionId);
    if (!root) return;

    const reduceMotion = prefersReducedMotion();

    const header = root.querySelector<HTMLElement>("[data-loc-header]");
    const mapWrap = root.querySelector<HTMLElement>("[data-map-wrap]");
    const cards = root.querySelectorAll<HTMLElement>("[data-loc-card]");
    const baCard = root.querySelector<HTMLElement>("[data-waitlist-card]");
    const badges = root.querySelectorAll<HTMLElement>("[data-loc-badge]");
    const statNums = root.querySelectorAll<HTMLElement>("[data-stat-num]");

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            header,
            mapWrap,
            baCard,
            ...Array.from(cards),
            ...Array.from(badges),
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, clearProps: "all" },
        );
        return;
      }

      // Header — lines wipe up
      if (header) {
        const lines = header.querySelectorAll<HTMLElement>("[data-loc-line]");
        gsap.from(lines, {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root, start: "top 78%" },
        });
        gsap.from(header.querySelector("[data-loc-kicker]"), {
          opacity: 0,
          y: 14,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 80%" },
        });
      }

      // Map slides in from left
      gsap.from(mapWrap, {
        opacity: 0,
        x: -40,
        scale: 0.97,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });

      // Cards cascade from right
      gsap.from(cards, {
        opacity: 0,
        x: 36,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 68%" },
      });

      // BA card — fade in last
      gsap.from(baCard, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 62%" },
      });

      // Badges pop
      gsap.from(badges, {
        scale: 0.7,
        opacity: 0,
        stagger: 0.07,
        duration: 0.45,
        ease: "back.out(2)",
        scrollTrigger: { trigger: root, start: "top 68%" },
      });

      // Stat numbers — count-up feel via opacity cascade
      gsap.from(statNums, {
        opacity: 0,
        y: 10,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 64%" },
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === root) t.kill();
      });
    };
  }, []);

  // ─── Active location change ───────────────────────────────────────────────
  useEffect(() => {
    if (!activeLocation || prefersReducedMotion()) return;

    // Animate map info panel
    if (mapInfoRef.current) {
      gsap.fromTo(
        mapInfoRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" },
      );
    }

    // Pulse ring burst on pin change
    if (pulseRef.current) {
      gsap.fromTo(
        pulseRef.current,
        { scale: 0.8, opacity: 0.9 },
        { scale: 2.2, opacity: 0, duration: 0.7, ease: "power2.out" },
      );
    }
  }, [activeLocation]);

  function onWaitlistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = String(new FormData(form).get("name") ?? "").trim();
    if (!name) return;
    setWaitlistState({ status: "success", name });
    form.reset();
  }

  function handleLocationSelect(id: string) {
    setActiveLocationId(id);
  }

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <section
      id={sectionId}
      ref={sectionRef}
      aria-labelledby="locations-title"
      className="grain-surface relative overflow-hidden bg-juicy-cream py-20 sm:py-28"
    >
      <CheckerBorder position="top" />

      {/* Atmospheric background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(196,30,30,0.06),transparent_65%)] blur-3xl"
      />

      <div className="section-shell relative z-10 space-y-14 py-10">
        {/* ════ HEADER ════ */}
        <div
          data-loc-header
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          {/* Left — headline */}
          <div className="max-w-2xl space-y-5">
            {/* Kicker */}
            <div data-loc-kicker className="flex items-center gap-3">
              <div className="section-kicker">
                <span className="inline-block h-[7px] w-[7px] animate-pulse rounded-full bg-juicy-red" />
                {content.kicker}
              </div>
       
            </div>

            {/* Eyebrow */}
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-juicy-gray">
              {content.eyebrow}
            </p>

            {/* Title — per-line clip animation */}
            <h2
              id="locations-title"
              className="font-headline text-[clamp(3.4rem,9.5vw,7rem)] uppercase leading-[0.87] tracking-[0.02em] text-juicy-black"
            >
              {content.title.split("\n").map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span
                    data-loc-line
                    className={`block ${i === 1 ? "text-juicy-red" : ""}`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* Right — description + quick stats */}
          <div className="flex flex-col gap-6 max-w-sm lg:mb-2">
            <p className="border-l-2 border-juicy-red pl-4 text-sm leading-7 text-juicy-gray sm:text-base">
              {content.description}
            </p>

            {/* Mini stat strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "2", label: "Locales" },
                { value: "VCP", label: "Carlos Paz" },
                { value: "BA", label: "Próximo" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 rounded-xl border border-black/[0.08] bg-white/70 px-3 py-2.5 backdrop-blur-sm"
                >
                  <span
                    data-stat-num
                    className="font-headline text-2xl uppercase leading-none text-juicy-black"
                  >
                    {s.value}
                  </span>
                  <span className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-juicy-gray">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ MAIN GRID — Map left, cards right ════ */}
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* ── MAP PANEL ── */}
          <div data-map-wrap className="lg:sticky lg:top-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.07] bg-white shadow-[0_30px_60px_rgba(26,16,8,0.12)]">
              {/* Grid overlay */}
              <div
                aria-hidden="true"
                className="red-panel-grid absolute inset-0 opacity-30"
              />

              {/* Top bar — editorial label */}
              <div className="relative flex items-center justify-between border-b border-black/[0.06] px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-juicy-red" />
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-juicy-gray">
                    {content.mapTitle}
                  </span>
                </div>
                <span className="rounded-full border border-black/[0.1] bg-juicy-cream px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-juicy-red">
                  Argentina
                </span>
              </div>

              {/* Map area */}
              <div className="relative p-6 pb-4">
                {/* Schematic map container */}
                <div className="relative mx-auto h-[320px] w-[200px]">
                  <ArgentinaMapSVG />

                  {/* Location pins */}
                  {content.locations.map((loc, i) => {
                    const isActive = loc.id === activeLocationId;
                    const isOpen = loc.status === "open";

                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => handleLocationSelect(loc.id)}
                        aria-label={`Ver ${formatLocationTitle(loc)}`}
                        aria-pressed={isActive}
                        className="absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-juicy-red focus-visible:ring-offset-2"
                        style={{
                          left: `${loc.mapPoint.x}%`,
                          top: `${loc.mapPoint.y}%`,
                        }}
                      >
                        {/* Pulse ring (active only) */}
                        {isActive && (
                          <>
                            <span
                              className="absolute inset-0 -m-3 animate-ping rounded-full border border-juicy-red/40"
                              aria-hidden="true"
                            />
                            <div
                              ref={pulseRef}
                              className="absolute inset-0 -m-4 rounded-full bg-juicy-red/10"
                              aria-hidden="true"
                            />
                          </>
                        )}

                        {/* Pin body */}
                        <div
                          className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 font-headline text-sm uppercase leading-none transition-all duration-300 ${
                            isActive
                              ? "scale-125 border-juicy-red bg-juicy-red text-white shadow-[0_8px_24px_rgba(196,30,30,0.4)]"
                              : isOpen
                                ? "border-juicy-red/40 bg-white text-juicy-red shadow-sm hover:scale-110 hover:border-juicy-red hover:bg-juicy-red/10"
                                : "border-black/20 bg-white/80 text-juicy-gray shadow-sm hover:scale-110"
                          }`}
                        >
                          {i + 1}
                        </div>

                        {/* Label chip */}
                        <div
                          className={`absolute left-1/2 mt-1 top-full -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                            isActive
                              ? "border-juicy-red/30 bg-white text-juicy-red shadow-sm"
                              : "border-black/10 bg-white/80 text-juicy-gray"
                          }`}
                        >
                          {loc.city.split(" ")[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Map info card — active location */}
                <div
                  ref={mapInfoRef}
                  className="mt-4 rounded-[1.25rem] border border-black/[0.07] bg-juicy-cream/80 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-juicy-gray">
                        Selección activa
                      </p>
                      <p className="mt-1 font-headline text-[1.7rem] uppercase leading-none tracking-[0.02em] text-juicy-black">
                        {activeLocation
                          ? formatLocationTitle(activeLocation)
                          : "Sin selección"}
                      </p>
                      {activeLocation?.address && (
                        <p className="mt-1.5 text-xs leading-5 text-juicy-gray">
                          {activeLocation.address}
                        </p>
                      )}
                    </div>
                    {activeLocation?.status === "open" && (
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200">
                        Abierto
                      </span>
                    )}
                    {activeLocation?.status === "soon" && (
                      <span className="shrink-0 rounded-full bg-juicy-red/10 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-juicy-red ring-1 ring-juicy-red/20">
                        Pronto
                      </span>
                    )}
                  </div>

                  {activeLocation?.hours && (
                    <div className="mt-3 flex items-center gap-2 border-t border-black/[0.05] pt-3">
                      <svg
                        className="h-3 w-3 shrink-0 text-juicy-gray"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M8 4.5v4l2.5 2"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                      <p className="text-[0.68rem] text-juicy-gray">
                        {activeLocation.hours}
                      </p>
                    </div>
                  )}
                </div>

                {/* Disclaimer */}
                <p className="mt-3 text-center text-[0.6rem] font-bold uppercase tracking-[0.16em] text-black/25">
                  {content.mapNote}
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Location cards + BA card ── */}
          <div className="flex flex-col gap-4">
            {/* Open locations */}
            {openLocations.map((loc, i) => {
              const isActive = loc.id === activeLocationId;

              return (
                <article
                  key={loc.id}
                  data-loc-card
                  className={`group relative overflow-hidden rounded-[1.75rem] border transition-all duration-300 ${
                    isActive
                      ? "border-juicy-red bg-white shadow-[0_24px_48px_rgba(26,16,8,0.12)]"
                      : "border-black/[0.08] bg-white/70 hover:border-black/[0.14] hover:bg-white hover:shadow-[0_16px_32px_rgba(26,16,8,0.08)]"
                  }`}
                >
                  {/* Active: red left rail */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-1 rounded-l-[1.75rem] bg-juicy-red transition-transform duration-300 origin-top ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <div className="p-5 sm:p-6">
                    {/* Card header row */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Number circle */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-headline text-lg uppercase leading-none transition-colors duration-200 ${
                            isActive
                              ? "border-juicy-red bg-juicy-red text-white"
                              : "border-black/[0.12] bg-juicy-cream text-juicy-black"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-headline text-[clamp(1.6rem,4vw,2.4rem)] uppercase leading-none tracking-[0.02em] text-juicy-black">
                            {formatLocationTitle(loc)}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-juicy-gray">
                            {loc.blurb}
                          </p>
                        </div>
                      </div>

                      <span
                        data-loc-badge
                        className={`rounded-full border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] transition-colors duration-200 ${
                          isActive
                            ? "border-juicy-red/30 bg-juicy-red/8 text-juicy-red"
                            : "border-black/[0.08] bg-juicy-cream text-juicy-gray"
                        }`}
                      >
                        {loc.badge}
                      </span>
                    </div>

                    {/* Data grid */}
                    <dl className="mt-5 grid gap-y-3 gap-x-6 text-sm sm:grid-cols-2">
                      {[
                        { label: "Dirección", value: loc.address },
                        { label: "Horarios", value: loc.hours },
                        { label: "Contacto", value: loc.phone },
                      ].map((d) => (
                        <div key={d.label}>
                          <dt className="text-[0.63rem] font-bold uppercase tracking-[0.2em] text-juicy-gray/70">
                            {d.label}
                          </dt>
                          <dd className="mt-0.5 text-juicy-black/80">
                            {d.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Actions */}
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleLocationSelect(loc.id)}
                        aria-pressed={isActive}
                        className={`rounded-full px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] transition-all duration-200 ${
                          isActive
                            ? "bg-juicy-red text-white shadow-[0_6px_16px_rgba(196,30,30,0.28)]"
                            : "bg-black/[0.05] text-juicy-black hover:bg-black/[0.09]"
                        }`}
                      >
                        Ver en mapa
                      </button>
                      <a
                        href={loc.mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.12] px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-juicy-black transition-colors hover:border-juicy-red/30 hover:text-juicy-red"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <circle
                            cx="8"
                            cy="6"
                            r="1.5"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                        </svg>
                        Cómo llegar
                      </a>
                    </div>
                  </div>

                  {/* Hover: bottom line sweep */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-juicy-red/40 transition-transform duration-[350ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100"
                  />
                </article>
              );
            })}

            {/* ── BA CARD — "Próximamente" dramatic moment ── */}
            {baLocation && (
              <article
                data-waitlist-card
                className="relative overflow-hidden rounded-[1.75rem]"
              >
                {/* Dark background with grain texture feel */}
                <div className="absolute inset-0 bg-juicy-black" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(196,30,30,0.22),transparent_60%)]"
                />
                {/* Checker strip top */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(196,30,30,0.6) 0, rgba(196,30,30,0.6) 10px, transparent 10px, transparent 20px)",
                  }}
                />
                {/* Giant ghost text */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -bottom-8 select-none font-headline text-[9rem] uppercase leading-none text-white/[0.03] tracking-tight"
                >
                  BA
                </div>

                <div className="relative p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-headline text-[clamp(1.8rem,4.5vw,2.8rem)] uppercase leading-none tracking-[0.02em] text-white">
                        {formatLocationTitle(baLocation)}
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">
                        {baLocation.blurb}
                      </p>
                    </div>
                    <span
                      data-loc-badge
                      className="rounded-full border border-juicy-red/40 bg-juicy-red px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white"
                    >
                      {baLocation.badge}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="font-headline text-[0.6rem] uppercase tracking-[0.3em] text-white/30">
                      ✦ Sumate a la lista ✦
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Two-column: headline + form */}
                  <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <div className="space-y-3">
                      <h3 className="font-headline text-[clamp(2rem,4vw,2.8rem)] uppercase leading-[0.92] tracking-[0.02em] text-white">
                        {content.waitlist.title}
                      </h3>
                      <p className="text-sm leading-6 text-white/55">
                        {content.waitlist.description}
                      </p>
                      {/* Social proof micro */}
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex -space-x-1.5">
                          {["🧑", "👩", "🧔", "👱"].map((e, idx) => (
                            <span
                              key={idx}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs"
                            >
                              {e}
                            </span>
                          ))}
                        </div>
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/40">
                          +120 ya anotados
                        </p>
                      </div>
                    </div>

                    {waitlistState.status === "success" ? (
                      <div
                        role="status"
                        aria-live="polite"
                        className="flex flex-col items-center justify-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-6 py-8 text-center"
                      >
                        <span className="text-3xl">🔥</span>
                        <p className="font-headline text-xl uppercase tracking-[0.04em] text-white">
                          {content.waitlist.successTitle}
                        </p>
                        <p className="text-sm text-white/55">
                          {waitlistState.name}, {content.waitlist.successBody}
                        </p>
                      </div>
                    ) : (
                      <form
                        className="space-y-3"
                        onSubmit={onWaitlistSubmit}
                        noValidate
                      >
                        <div>
                          <label
                            htmlFor="waitlist-name"
                            className="mb-1.5 block text-[0.63rem] font-bold uppercase tracking-[0.2em] text-white/50"
                          >
                            Nombre
                          </label>
                          <input
                            id="waitlist-name"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="Tu nombre"
                            className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-juicy-red/50 focus:bg-white/10 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="waitlist-email"
                            className="mb-1.5 block text-[0.63rem] font-bold uppercase tracking-[0.2em] text-white/50"
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
                            className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-juicy-red/50 focus:bg-white/10 focus:outline-none transition-colors"
                          />
                        </div>

                        <label className="flex items-start gap-2 text-xs leading-5 text-white/45">
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
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-juicy-red px-5 py-3 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(196,30,30,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(196,30,30,0.45)]"
                        >
                          {content.waitlist.submitLabel}
                          <svg
                            className="transition-transform duration-200 group-hover:translate-x-1"
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 8h10M9 4l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        <p className="text-[0.6rem] leading-5 text-white/30">
                          {content.waitlist.privacyHint}
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>

      <CheckerBorder position="bottom" />
    </section>
  );
}
