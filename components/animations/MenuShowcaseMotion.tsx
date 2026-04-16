"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";

interface MenuShowcaseMotionProps {
  targetId: string;
}

export function MenuShowcaseMotion({ targetId }: MenuShowcaseMotionProps) {
  useEffect(() => {
    initGsap();

    const root = document.getElementById(targetId);
    if (!root) return;

    const reduceMotion = prefersReducedMotion();
    const isMobile = window.matchMedia("(max-width: 1023.98px)").matches;

    // ─── Element refs ──────────────────────────────────────────────
    const kicker = root.querySelector<HTMLElement>("[data-menu-kicker]");
    const origin = root.querySelector<HTMLElement>("[data-menu-origin]");
    const titleLines = root.querySelectorAll<HTMLElement>(
      "[data-menu-title-line] span",
    );
    const quote = root.querySelector<HTMLElement>("[data-menu-quote]");
    const copy = root.querySelector<HTMLElement>("[data-menu-copy]");
    const stats = root.querySelector<HTMLElement>("[data-menu-stats]");
    const cards = root.querySelectorAll<HTMLElement>("[data-menu-card]");
    const badge = root.querySelector<HTMLElement>("[data-menu-badge]");
    const panel = root.querySelector<HTMLElement>("[data-menu-panel]");
    const panelCopy = root.querySelector<HTMLElement>("[data-menu-panel-copy]");
    const panelActions = root.querySelector<HTMLElement>("[data-menu-panel-actions]");
    const wm = root.querySelector<HTMLElement>("[data-menu-wm]");
    const marquee = root.querySelector<HTMLElement>("[data-menu-marquee]");
    const marqueeTrack = root.querySelector<HTMLElement>(".menu-marquee-track");

    const cleanupFns: Array<() => void> = [];
    let marqueeTween: gsap.core.Tween | null = null;
    let marqueeResizeRaf = 0;

    const startMenuMarqueeLoop = () => {
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

      const speedPxPerSecond = 92;
      const duration = singleSetWidth / speedPxPerSecond;

      marqueeTween = gsap.to(marqueeTrack, {
        x: -singleSetWidth,
        duration,
        ease: "none",
        repeat: -1,
      });
    };

    const ctx = gsap.context(() => {
      // ─── Reduced motion: show everything immediately ─────────────
      if (reduceMotion) {
        const all = [
          kicker,
          origin,
          quote,
          copy,
          stats,
          badge,
          panel,
          panelCopy,
          panelActions,
          marquee,
          ...Array.from(cards),
          ...Array.from(titleLines),
        ].filter(Boolean);
        gsap.set(all, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
          clipPath: "none",
        });
        return;
      }

      // ─── Watermark parallax ──────────────────────────────────────
      if (wm) {
        gsap.to(wm, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }

      // ─── Kicker + origin stamp ───────────────────────────────────
      gsap.from([kicker, origin], {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      // ─── Title lines — clip reveal (upward wipe) ─────────────────
      gsap.from(titleLines, {
        yPercent: 110,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 76%", once: true },
      });

      // ─── Quote — fade + slight left shift ───────────────────────
      gsap.from(quote, {
        opacity: 0,
        x: -20,
        duration: 0.65,
        ease: "power3.out",
        delay: 0.25,
        scrollTrigger: { trigger: root, start: "top 74%", once: true },
      });

      // ─── Copy block ──────────────────────────────────────────────
      gsap.from(copy, {
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 74%", once: true },
      });

      // ─── Stats — cascade up ──────────────────────────────────────
      if (stats) {
        const chips = stats.querySelectorAll<HTMLElement>(".menu-stat-chip");
        gsap.from(chips, {
          opacity: 0,
          y: 20,
          scale: 0.92,
          stagger: 0.08,
          duration: 0.5,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        });
      }

      // ─── Cards — cascade with vertical lift only ────────────────
      gsap.from(cards, {
        opacity: 0,
        y: isMobile ? 40 : 70,
        scale: isMobile ? 0.96 : 1,
        stagger: isMobile ? 0.1 : 0.15,
        duration: isMobile ? 0.7 : 0.85,
        ease: isMobile ? "power2.out" : "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });

      // ─── Badge — pop in with spring, then subtle loop ────────────
      if (badge) {
        gsap.from(badge, {
          opacity: 0,
          scale: 0.5,
          rotation: -30,
          duration: 0.75,
          ease: "back.out(2.5)",
          scrollTrigger: { trigger: root, start: "top 68%", once: true },
        });

        gsap.to(badge, {
          y: -5,
          rotation: isMobile ? 3 : 6,
          duration: isMobile ? 2.8 : 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // ─── Red panel — slide + fade from right ─────────────────────
      if (panel) {
        gsap.from(panel, {
          opacity: 0,
          x: isMobile ? 0 : 50,
          y: isMobile ? 28 : 0,
          scale: isMobile ? 0.98 : 0.97,
          duration: isMobile ? 0.72 : 0.8,
          ease: isMobile ? "power2.out" : "power3.out",
          scrollTrigger: { trigger: root, start: "top 66%", once: true },
        });

        gsap.from([panelCopy, panelActions].filter(Boolean), {
          opacity: 0,
          y: 18,
          stagger: 0.1,
          duration: 0.46,
          ease: "power2.out",
          scrollTrigger: { trigger: panel, start: "top 82%", once: true },
        });
      }

      // ─── Marquee — infinite scroll ───────────────────────────────
      if (marqueeTrack) {
        // Fade in the container
        gsap.from(marquee, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: marquee, start: "top 90%", once: true },
        });

        startMenuMarqueeLoop();
      }

      // ─── Card hover: image lift + tilt ──────────────────────────
      if (!isMobile) {
        cards.forEach((card) => {
          const image = card.querySelector<HTMLElement>("[data-menu-image]");
          if (!image) return;

          const enter = () => {
            gsap.to(image, {
              scale: 1.07,
              rotation: 2.5,
              y: -14,
              filter: "drop-shadow(0 36px 56px rgba(18,12,6,0.24))",
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
            });
            gsap.to(card, {
              y: -5,
              duration: 0.32,
              ease: "power2.out",
              overwrite: true,
            });
          };

          const leave = () => {
            gsap.to(image, {
              scale: 1,
              rotation: 0,
              y: 0,
              filter: "drop-shadow(0 0px 0px transparent)",
              duration: 0.48,
              ease: "power2.inOut",
              overwrite: true,
            });
            gsap.to(card, {
              y: 0,
              duration: 0.4,
              ease: "power2.inOut",
              overwrite: true,
            });
          };

          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          card.addEventListener("focusin", enter);
          card.addEventListener("focusout", leave);

          cleanupFns.push(() => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
            card.removeEventListener("focusin", enter);
            card.removeEventListener("focusout", leave);
          });
        });
      }

      // ─── Panel interactive tilt on mouse move ────────────────────
      if (panel && !isMobile) {
        const onMove = (e: MouseEvent) => {
          const rect = panel.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / rect.width;
          const dy = (e.clientY - cy) / rect.height;

          gsap.to(panel, {
            rotateY: dx * 4,
            rotateX: -dy * 3,
            transformPerspective: 900,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(panel, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power2.inOut",
            overwrite: true,
          });
        };

        panel.addEventListener("mousemove", onMove);
        panel.addEventListener("mouseleave", onLeave);

        cleanupFns.push(() => {
          panel.removeEventListener("mousemove", onMove);
          panel.removeEventListener("mouseleave", onLeave);
        });
      }
    }, root);

    const handleResize = () => {
      cancelAnimationFrame(marqueeResizeRaf);
      marqueeResizeRaf = window.requestAnimationFrame(startMenuMarqueeLoop);
    };

    if (marqueeTrack) {
      if (reduceMotion) {
        marqueeTrack.removeAttribute("data-no-js");
        gsap.set(marqueeTrack, { x: 0 });
      } else {
        window.addEventListener("resize", handleResize);
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(marqueeResizeRaf);
      marqueeTween?.kill();
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === root || t.trigger === marquee) t.kill();
      });
    };
  }, [targetId]);

  return null;
}
