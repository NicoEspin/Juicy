"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import type { Promotion } from "@/types/ordering";

interface PromoBannerProps {
  promotions: Promotion[];
}

const AUTOPLAY_MS = 5000;
const TRANSITION_MS = 420;
const SWIPE_THRESHOLD_RATIO = 0.18;
const PANEL_BACKGROUND = "linear-gradient(160deg, #e84040 0%, #c41e1e 48%, #8b1010 100%)";
const SLIDE_HEIGHT_CLASSNAME = "h-[104px] overflow-hidden sm:h-32";

function DeliveryIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="22">
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 18h6l2-6h4M12 12l2-4h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiscountIcon() {
  return (
    <svg fill="none" height="22" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="22">
      <path d="M20 12 12.6 4.6a2 2 0 0 0-1.4-.6H5a1 1 0 0 0-1 1v6.2a2 2 0 0 0 .6 1.4L12 20a2 2 0 0 0 2.8 0L20 14.8a2 2 0 0 0 0-2.8z" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PromoSlide({ promo }: { promo: Promotion }) {
  if (promo.kind === "image") {
    return (
      <div className="relative h-full w-full">
        <Image alt={promo.alt} className="object-cover" fill sizes="100vw" src={promo.image} />
      </div>
    );
  }

  return (
    <div className="flex h-full items-center gap-3.5 px-5" style={{ background: PANEL_BACKGROUND }}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-juicy-gold text-juicy-black">
        {promo.icon === "delivery" ? <DeliveryIcon /> : <DiscountIcon />}
      </span>
      <div className="min-w-0">
        <p className="truncate font-headline text-lg uppercase tracking-[0.01em] text-white">{promo.title}</p>
        <p className="truncate text-[13px] text-white/80">{promo.description}</p>
      </div>
    </div>
  );
}

export function PromoBanner({ promotions }: PromoBannerProps) {
  if (promotions.length === 0) return null;

  if (promotions.length === 1) {
    return (
      <div className={SLIDE_HEIGHT_CLASSNAME}>
        <PromoSlide promo={promotions[0]} />
      </div>
    );
  }

  return <PromoCarousel promotions={promotions} />;
}

function PromoCarousel({ promotions }: { promotions: Promotion[] }) {
  const count = promotions.length;
  const loopSlides = [...promotions, ...promotions, ...promotions];

  const [index, setIndex] = useState(count);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isInteracting = isDragging || isHovering;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const suppressTransitionRef = useRef(false);

  const goTo = (next: number) => setIndex(next);

  // Once a transition lands on one of the buffer copies, snap invisibly (no
  // transition) back to the equivalent slot in the middle copy — this is what
  // makes the loop feel infinite in both directions instead of resetting to 0.
  useLayoutEffect(() => {
    if (!suppressTransitionRef.current || !trackRef.current) return;
    const track = trackRef.current;
    track.style.transitionDuration = "0ms";
    void track.offsetHeight;
    track.style.transitionDuration = "";
    suppressTransitionRef.current = false;
  }, [index]);

  // Any index change — manual swipe, dot tap, or autoplay itself — reschedules
  // a fresh timer, which is exactly what makes the countdown "reset" visually.
  useEffect(() => {
    if (isInteracting || prefersReducedMotion()) return;
    const timer = setTimeout(() => setIndex((current) => current + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, isInteracting]);

  // Checked on a timer (not a `transitionend` listener) — the snap only needs to
  // happen once the slide transition would have visually finished, and a timer
  // fires reliably regardless of paint/compositor timing.
  useEffect(() => {
    const inSafeRange = index >= count && index < count * 2;
    if (inSafeRange) return;
    const timer = setTimeout(() => {
      suppressTransitionRef.current = true;
      setIndex((current) => (current >= count * 2 ? current - count : current + count));
    }, TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [index, count]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragStartXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStartXRef.current === null) return;
    setDragOffset(event.clientX - dragStartXRef.current);
  }

  function handlePointerUp() {
    if (dragStartXRef.current === null) return;
    const width = containerRef.current?.offsetWidth ?? 1;
    if (dragOffset < -width * SWIPE_THRESHOLD_RATIO) setIndex(index + 1);
    else if (dragOffset > width * SWIPE_THRESHOLD_RATIO) setIndex(index - 1);
    dragStartXRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  }

  const activeDot = ((index % count) + count) % count;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={trackRef}
        className="flex cursor-grab touch-pan-y select-none active:cursor-grabbing"
        onPointerCancel={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
          transition: isDragging ? "none" : `transform ${TRANSITION_MS}ms cubic-bezier(0.65,0,0.35,1)`,
        }}
      >
        {loopSlides.map((promo, slideIndex) => (
          <div key={slideIndex} className={`w-full shrink-0 ${SLIDE_HEIGHT_CLASSNAME}`}>
            <PromoSlide promo={promo} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5 px-5">
        {promotions.map((promo, dotIndex) => (
          <button
            key={promo.id}
            aria-label={`Ir a la promoción ${dotIndex + 1}`}
            className="pointer-events-auto h-1 max-w-10 flex-1 overflow-hidden rounded-full bg-white/40 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
            onClick={() => goTo(count + dotIndex)}
            type="button"
          >
            {dotIndex === activeDot && (
              <span
                key={index}
                className="ordering-progress-fill block h-full w-full rounded-full bg-white"
                style={{
                  animationDuration: `${AUTOPLAY_MS}ms`,
                  animationPlayState: isInteracting ? "paused" : "running",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
