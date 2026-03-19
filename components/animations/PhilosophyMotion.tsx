"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";

interface PhilosophyMotionProps {
  targetId: string;
}

export function PhilosophyMotion({ targetId }: PhilosophyMotionProps) {
  useEffect(() => {
    initGsap();

    const root = document.getElementById(targetId);
    if (!root) return;

    const reduceMotion = prefersReducedMotion();

    const context = gsap.context(() => {
      const dog = root.querySelector<HTMLElement>("[data-philosophy-dog]");
      const chars = root.querySelectorAll<HTMLElement>(
        "[data-philosophy-char]",
      );
      const body = root.querySelector<HTMLElement>("[data-philosophy-copy]");
      const pillars = root.querySelectorAll<HTMLElement>(
        "[data-philosophy-pillar]",
      );
      const manifesto = root.querySelector<HTMLElement>(
        "[data-philosophy-manifesto]",
      );

      const targets = [
        dog,
        body,
        manifesto,
        ...Array.from(chars),
        ...Array.from(pillars),
      ].filter((el): el is HTMLElement => Boolean(el));

      if (reduceMotion) {
        gsap.set(targets, { clearProps: "all", opacity: 1, x: 0, y: 0 });
        manifesto?.classList.add("is-visible");
        return;
      }

      // ─── Dog entrance + perpetual float ────────────────────────
      if (dog) {
        gsap.from(dog, {
          x: -80,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
          },
        });

        // Breathe + rock subtly forever
        gsap.to(dog, {
          y: -14,
          rotation: 2.5,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // ─── Headline chars stagger ─────────────────────────────────
      gsap.from(chars, {
        opacity: 0,
        y: 32,
        rotationX: -40,
        stagger: { each: 0.02, from: "start" },
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
        },
      });

      // ─── Body copy ──────────────────────────────────────────────
      gsap.from(body, {
        opacity: 0,
        x: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });

      // ─── Pillars cascade with slight rotation ──────────────────
      gsap.from(pillars, {
        opacity: 0,
        y: 44,
        rotation: (i) => (i % 2 === 0 ? -1.5 : 1.5),
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 65%",
        },
      });

      // ─── Manifesto line reveal ──────────────────────────────────
      if (manifesto) {
        ScrollTrigger.create({
          trigger: manifesto,
          start: "top 88%",
          onEnter: () => manifesto.classList.add("is-visible"),
          onLeaveBack: () => manifesto.classList.remove("is-visible"),
        });
      }

      // ─── Subtle parallax on the dog col ────────────────────────
      if (dog) {
        gsap.to(dog, {
          y: "+=20",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, root);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === root) t.kill();
      });
    };
  }, [targetId]);

  return null;
}
