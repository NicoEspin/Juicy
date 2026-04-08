"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialColumnItem {
  id: string;
  author: string;
  quote: string;
  rating: number;
}

interface TestimonialsColumns1Props {
  testimonials: TestimonialColumnItem[];
  className?: string;
}

const COLUMN_BREAKPOINTS = {
  md: 768,
  xl: 1280,
} as const;

function getColumnCount(width: number) {
  if (width >= COLUMN_BREAKPOINTS.xl) {
    return 3;
  }

  if (width >= COLUMN_BREAKPOINTS.md) {
    return 2;
  }

  return 1;
}

function splitTestimonials(items: TestimonialColumnItem[], columnCount: number) {
  return Array.from({ length: columnCount }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % columnCount === columnIndex),
  );
}

function renderStars(rating: number) {
  return Array.from({ length: rating }).map((_, index) => (
    <Star key={`${rating}-${index}`} className="size-3.5 fill-current" aria-hidden="true" />
  ));
}

const AVATAR_STYLES = [
  "bg-[#C41E1E] text-white",
  "bg-[#8B1010] text-white",
  "bg-[#E84040] text-white",
  "bg-[#1A1008] text-[#FAF7F0]",
  "bg-[#F0EBE0] text-[#8B1010]",
  "bg-[#D9BFA3] text-[#1A1008]",
] as const;

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function getAvatarStyle(name: string) {
  const hash = Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0);

  return AVATAR_STYLES[hash % AVATAR_STYLES.length];
}

function TestimonialCard({
  testimonial,
  muted,
}: {
  testimonial: TestimonialColumnItem;
  muted?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[1.8rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(250,247,240,0.92))] p-4 shadow-[0_18px_40px_rgba(26,16,8,0.12)] sm:p-5",
        muted && "opacity-70",
      )}
      aria-label={`${testimonial.author}, ${testimonial.rating} estrellas`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-juicy-red/60 to-transparent"
      />
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-2xl font-headline text-[1.6rem] uppercase tracking-[0.05em] ring-1 ring-black/8 sm:size-16 sm:text-[1.8rem]",
            getAvatarStyle(testimonial.author),
          )}
        >
          {getInitials(testimonial.author)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-headline text-[2rem] uppercase leading-none tracking-[0.03em] text-juicy-black">
            {testimonial.author}
          </h3>
          <div className="mt-2 flex items-center gap-1 text-juicy-red">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-juicy-black/80 sm:text-[0.98rem]">
        {testimonial.quote}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/8 pt-3 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-juicy-gray">
        <span>Taste the Difference</span>
     
      </div>
    </article>
  );
}

export function TestimonialsColumns1({ testimonials, className }: TestimonialsColumns1Props) {
  const shouldReduceMotion = useReducedMotion();
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const updateColumnCount = () => setColumnCount(getColumnCount(window.innerWidth));

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);

    return () => {
      window.removeEventListener("resize", updateColumnCount);
    };
  }, []);

  const columns = useMemo(
    () => splitTestimonials(testimonials, columnCount),
    [columnCount, testimonials],
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_top,rgba(232,64,64,0.1),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(240,235,224,0.9))] px-4 py-4 shadow-[0_26px_60px_rgba(26,16,8,0.14)] sm:px-5 sm:py-5 lg:px-6 lg:py-6",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(196,30,30,0.06)_45%,rgba(255,255,255,0)_100%)]"
      />
      <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column, columnIndex) => {
          const loopItems = shouldReduceMotion ? column : [...column, ...column];
          const direction = columnIndex % 2 === 0 ? -1 : 1;
          const duration = 30 + columnIndex * 4;

          return (
            <div
              key={`column-${columnIndex}`}
              className="relative h-[28rem] overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/40 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:h-[32rem]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#faf7f0] via-[#faf7f0]/80 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#f0ebe0] via-[#f0ebe0]/84 to-transparent"
              />

              <motion.div
                className="space-y-3"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                      }
                }
              >
                {loopItems.map((testimonial, itemIndex) => {
                  const isDuplicate = !shouldReduceMotion && itemIndex >= column.length;

                  return (
                    <div key={`${testimonial.id}-${itemIndex}`} aria-hidden={isDuplicate || undefined}>
                      <TestimonialCard testimonial={testimonial} muted={isDuplicate} />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
