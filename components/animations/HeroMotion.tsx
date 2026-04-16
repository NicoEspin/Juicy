"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";

interface HeroMotionProps {
  targetId: string;
}

export function HeroMotion({ targetId }: HeroMotionProps) {
  useEffect(() => {
    initGsap();

    const root = document.getElementById(targetId);
    if (!root) return;

    const reduceMotion = prefersReducedMotion();
    const isMobile = window.matchMedia("(max-width: 1023.98px)").matches;

    const burgerWrap = root.querySelector<HTMLElement>("[data-hero-burger-wrap]");
    const burger = root.querySelector<HTMLElement>("[data-hero-burger]");
    const logo = root.querySelector<HTMLElement>("[data-hero-logo]");
    const mobileLines = root.querySelectorAll<HTMLElement>("[data-hero-mobile-line]");
    const blob = root.querySelector<HTMLElement>("[data-hero-blob]");
    const words = root.querySelectorAll<HTMLElement>("[data-hero-word]");
    const ctas = root.querySelectorAll<HTMLElement>("[data-hero-cta]");
    const tag = root.querySelector<HTMLElement>("[data-hero-tag]");
    const eyebrow = root.querySelector<HTMLElement>("[data-hero-eyebrow]");
    const accent = root.querySelector<HTMLElement>("[data-hero-accent]");
    const body = root.querySelector<HTMLElement>("[data-hero-body]");
    const badges = root.querySelector<HTMLElement>("[data-hero-badges]");
    const cards = root.querySelectorAll<HTMLElement>("[data-hero-card]");
    const marqueeTrack = root.querySelector<HTMLElement>("[data-hero-marquee]");

    let marqueeTween: gsap.core.Tween | null = null;
    let marqueeResizeRaf = 0;

    const startHeroMarqueeLoop = () => {
      if (!marqueeTrack || reduceMotion) {
        return;
      }

      marqueeTween?.kill();
      marqueeTrack.removeAttribute("data-no-js");

      const singleSetWidth = marqueeTrack.scrollWidth / 2;
      if (!singleSetWidth || !Number.isFinite(singleSetWidth)) {
        return;
      }

      gsap.set(marqueeTrack, { x: 0, force3D: true });

      const speedPxPerSecond = 110;
      const duration = singleSetWidth / speedPxPerSecond;

      marqueeTween = gsap.to(marqueeTrack, {
        x: -singleSetWidth,
        duration,
        ease: "none",
        repeat: -1,
      });
    };

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            burgerWrap,
            burger,
            logo,
            blob,
            tag,
            eyebrow,
            accent,
            body,
            badges,
            ...Array.from(mobileLines),
            ...Array.from(words),
            ...Array.from(ctas),
            ...Array.from(cards),
          ].filter(Boolean),
          { clearProps: "all", opacity: 1 },
        );
        return;
      }

      if (!burger || !logo || !tag || ctas.length === 0)
        return;

      // ─── Entrance timeline ─────────────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: isMobile ? "expo.out" : "power4.out" },
      });

      if (isMobile) {
        tl
          .from(logo, { opacity: 0, y: -18, scale: 0.94, duration: 0.5 })
          .fromTo(
            blob,
            { opacity: 0, scale: 0.72 },
            { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" },
            "<",
          )
          .from(
            mobileLines,
            {
              opacity: 0,
              yPercent: 14,
              stagger: 0.08,
              duration: 0.58,
            },
            "-=0.12",
          )
          .fromTo(
            burgerWrap ?? burger,
            { opacity: 0, y: 32, scale: 0.9, rotate: -3 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              duration: 0.92,
              ease: "power3.out",
            },
            "-=0.34",
          )
          .fromTo(
            tag,
            { opacity: 0, y: 8, rotation: -12, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              rotation: -4,
              scale: 1,
              duration: 0.44,
              ease: "back.out(1.7)",
            },
            "-=0.56",
          )
          .from(
            [eyebrow, accent, body].filter(Boolean),
            { opacity: 0, y: 18, stagger: 0.08, duration: 0.42 },
            "-=0.22",
          )
          .from(
            ctas,
            { opacity: 0, y: 16, stagger: 0.08, duration: 0.38 },
            "-=0.18",
          )
          .from(
            badges,
            { opacity: 0, y: 12, duration: 0.34, ease: "power2.out" },
            "-=0.12",
          );
      } else {
        tl
          .fromTo(
            burger,
            { opacity: 0, scale: 0.82, y: 60 },
            { opacity: 1, scale: 1, y: 0, duration: 1.15 },
          )
          .from(logo, { opacity: 0, x: -72, duration: 0.75 }, "-=0.9")
          .from(eyebrow, { opacity: 0, y: 16, duration: 0.45 }, "-=0.55")
          .from(
            words,
            {
              opacity: 0,
              yPercent: 108,
              stagger: 0.1,
              duration: 0.7,
              ease: "expo.out",
            },
            "-=0.38",
          )
          .from(
            [accent, body].filter(Boolean),
            { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 },
            "-=0.4",
          )
          .from(
            ctas,
            { opacity: 0, y: 18, stagger: 0.08, duration: 0.42 },
            "-=0.28",
          )
          .from(badges, { opacity: 0, y: 10, duration: 0.35 }, "-=0.22")
          .fromTo(
            tag,
            { opacity: 0, rotation: 22, scale: 0.78, x: 28 },
            {
              opacity: 1,
              rotation: -8,
              scale: 1,
              x: 0,
              duration: 0.6,
              ease: "back.out(2.2)",
            },
            "-=0.45",
          )
          .from(
            cards,
            {
              opacity: 0,
              scale: 0.85,
              y: 14,
              stagger: 0.12,
              duration: 0.45,
              ease: "back.out(1.8)",
            },
            "-=0.38",
          );
      }

      // ─── Parallax on scroll ─────────────────────────────────────
      if (burgerWrap) {
        gsap.to(burgerWrap, {
          y: isMobile ? 20 : 40,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Subtle card float loop
      if (isMobile) {
        gsap.to(tag, {
          y: -4,
          rotation: -2,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      } else {
        gsap.to(cards, {
          y: -8,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.6, from: "random" },
        });
      }
    }, root);

    const handleResize = () => {
      cancelAnimationFrame(marqueeResizeRaf);
      marqueeResizeRaf = window.requestAnimationFrame(startHeroMarqueeLoop);
    };

    if (marqueeTrack) {
      if (reduceMotion) {
        marqueeTrack.removeAttribute("data-no-js");
        gsap.set(marqueeTrack, { x: 0 });
      } else {
        startHeroMarqueeLoop();
        window.addEventListener("resize", handleResize);
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(marqueeResizeRaf);
      marqueeTween?.kill();
      context.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === root) t.kill();
      });
    };
  }, [targetId]);

  return null;
}
