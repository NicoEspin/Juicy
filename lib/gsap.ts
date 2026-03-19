import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function initGsap() {
  if (registered || typeof window === "undefined") {
    return gsap;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    start: "top 80%",
    toggleActions: "play none none reverse",
  });
  registered = true;

  return gsap;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
