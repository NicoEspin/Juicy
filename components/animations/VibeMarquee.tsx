"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { landingAssets } from "@/data/landingContent";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";
import type { VibeGalleryItem } from "@/types/landing";

interface VibeMarqueeProps {
  items: VibeGalleryItem[];
  targetId: string;
}

function VibeCard({ item }: { item: VibeGalleryItem }) {
  const image = landingAssets[item.assetKey];

  return (
    <article
      className={`vibe-card-surface ${item.accent} flex w-[18rem] shrink-0 flex-col rounded-[1.8rem] border border-white/[0.16] p-4 text-juicy-black backdrop-blur md:w-[21rem]`}
    >
      <div className="relative overflow-hidden rounded-[1.35rem] border border-black/[0.06] bg-juicy-cream/80 p-4">
        <div
          aria-hidden="true"
          className="absolute inset-x-[16%] top-[18%] h-[58%] rounded-full bg-[radial-gradient(circle,rgba(196,30,30,0.2),transparent_70%)] blur-2xl"
        />
        <Image
          alt=""
          aria-hidden="true"
          className="relative z-10 mx-auto h-auto w-full max-w-[230px] object-contain"
          sizes="(max-width: 768px) 65vw, 18rem"
          src={image}
        />
      </div>
      <div className="space-y-3 px-1 pb-1 pt-4">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-juicy-red">
          {item.eyebrow}
        </p>
        <h3 className="font-headline text-4xl uppercase leading-none tracking-[0.03em]">
          {item.title}
        </h3>
        <p className="text-sm leading-6 text-juicy-black/75">{item.caption}</p>
        <p className="rounded-[1rem] border border-black/[0.08] bg-white/[0.7] px-3 py-2 text-xs leading-5 text-juicy-gray">
          {item.placeholder}
        </p>
      </div>
    </article>
  );
}

export function VibeMarquee({ items, targetId }: VibeMarqueeProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    initGsap();

    const root = rootRef.current;
    const track = trackRef.current;
    const section = document.getElementById(targetId);
    if (!root || !track || !section) {
      return;
    }

    const reduceMotion = prefersReducedMotion();

    if (reduceMotion) {
      root.style.overflowX = "auto";
      gsap.set(track, { x: 0 });

      return () => {
        root.style.overflowX = "";
      };
    }

    const tweens: gsap.core.Tween[] = [];
    let resizeRaf = 0;

    const clearTweens = () => {
      tweens.forEach((tween) => tween.kill());
      tweens.length = 0;
    };

    const startLoop = () => {
      clearTweens();

      const singleSetWidth = track.scrollWidth / 2;
      if (!singleSetWidth || !Number.isFinite(singleSetWidth)) {
        return;
      }

      gsap.set(track, { x: 0, force3D: true });

      const speedPxPerSecond = 88;
      const duration = singleSetWidth / speedPxPerSecond;

      const loopTween = gsap.to(track, {
        x: -singleSetWidth,
        duration,
        ease: "none",
        repeat: -1,
      });

      tweens.push(loopTween);
    };

    const context = gsap.context(() => {
      gsap.from(root.querySelectorAll("[data-vibe-item]"), {
        opacity: 0,
        y: 26,
        stagger: 0.06,
        duration: 0.52,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
        },
      });

      startLoop();
    }, section);

    const handleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = window.requestAnimationFrame(startLoop);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(resizeRaf);
      clearTweens();
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [targetId]);

  return (
    <div ref={rootRef} className="marquee-fade overflow-hidden py-2">
      <div ref={trackRef} className="flex w-max gap-5 py-2">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            data-vibe-item
            aria-hidden={index >= items.length ? "true" : undefined}
          >
            <VibeCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
