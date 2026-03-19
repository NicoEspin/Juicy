"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";

interface ReviewsRevealProps {
  targetId: string;
}

export function ReviewsReveal({ targetId }: ReviewsRevealProps) {
  useEffect(() => {
    initGsap();

    const root = document.getElementById(targetId);
    if (!root) {
      return;
    }

    const reduceMotion = prefersReducedMotion();
    const title = root.querySelector<HTMLElement>("[data-reviews-title]");
    const description = root.querySelector<HTMLElement>("[data-reviews-description]");
    const reviewCards = root.querySelectorAll<HTMLElement>("[data-review-card]");
    const metricCards = root.querySelectorAll<HTMLElement>("[data-trust-card]");
    const instaCards = root.querySelectorAll<HTMLElement>("[data-instagram-card]");

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            title,
            description,
            ...Array.from(reviewCards),
            ...Array.from(metricCards),
            ...Array.from(instaCards),
          ].filter(Boolean),
          { clearProps: "all", opacity: 1, y: 0, x: 0, scale: 1 },
        );
        return;
      }

      gsap.from([title, description], {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.56,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 76%",
        },
      });

      gsap.from(reviewCards, {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.62,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });

      gsap.from(metricCards, {
        opacity: 0,
        y: 16,
        scale: 0.94,
        stagger: 0.08,
        duration: 0.44,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: root,
          start: "top 66%",
        },
      });

      gsap.from(instaCards, {
        opacity: 0,
        y: 26,
        stagger: 0.07,
        duration: 0.52,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 64%",
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
  }, [targetId]);

  return null;
}
