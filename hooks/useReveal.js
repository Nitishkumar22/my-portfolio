"use client";
// hooks/useReveal.js
// GSAP ScrollTrigger reveal for every [data-reveal] element inside `scopeRef`.
// Content is visible in the static HTML and only hidden once GSAP has loaded,
// so crawlers and no-JS visitors always see it.
import { useEffect } from "react";
import { loadScrollTrigger } from "../lib/gsap";

export function useReveal(scopeRef, { y = 24, stagger = 0.08 } = {}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx = null;
    let active = true;

    loadScrollTrigger().then(({ gsap, ScrollTrigger }) => {
      if (!active || !scopeRef.current) return;
      ctx = gsap.context(() => {
        const items = gsap.utils.toArray("[data-reveal]");
        if (!items.length) return;

        // Pause CSS transitions (hover effects) so they don't fight the tween.
        gsap.set(items, { autoAlpha: 0, y, transition: "none" });

        ScrollTrigger.batch(items, {
          start: "top 90%",
          once:  true,
          onEnter: batch => gsap.to(batch, {
            autoAlpha: 1, y: 0,
            duration:  0.8,
            ease:      "power3.out",
            stagger,
            clearProps: "transform,opacity,visibility,transition",
          }),
        });
      }, scopeRef.current);
    });

    return () => {
      active = false;
      ctx?.revert();
    };
  }, [scopeRef, y, stagger]);
}
