"use client";
// components/SmoothScroll.jsx
//
// Locomotive Scroll v5 (which is built on Lenis) driven by GSAP's ticker,
// so Lenis, Locomotive's `data-scroll` parallax and GSAP ScrollTrigger all
// share a single requestAnimationFrame loop.
//
// Everything is loaded with dynamic imports after hydration, desktop only,
// so none of it sits on the critical rendering path.
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadScrollTrigger } from "../lib/gsap";

let instance = null;

export function getLenis() {
  return instance?.lenisInstance ?? null;
}

export function lockScroll(locked) {
  if (!instance) return;
  if (locked) instance.stop();
  else        instance.start();
}

export default function SmoothScroll({ paused = false }) {
  const pathname  = usePathname();
  const pausedRef = useRef(paused);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices keep native scrolling (Lenis and Locomotive parallax are
    // off on touch anyway), so don't download them there.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let cancelled = false;
    let loco = null;

    // Locomotive scans [data-scroll] elements once on init, so recreate it
    // for every route — the new page's parallax elements get picked up.
    Promise.all([import("locomotive-scroll"), loadScrollTrigger()]).then(([{ default: LocomotiveScroll }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      // Lenis owns the timing; GSAP lag smoothing would fight it.
      gsap.ticker.lagSmoothing(0);
      loco = new LocomotiveScroll({
        lenisOptions:        { lerp: 0.1, smoothWheel: true },
        scrollCallback:      ScrollTrigger.update,
        autoStart:           !pausedRef.current,
        initCustomTicker:    render => gsap.ticker.add(render),
        destroyCustomTicker: render => gsap.ticker.remove(render),
      });
      instance = loco;
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      loco?.destroy();
      if (instance === loco) instance = null;
    };
  }, [pathname]);

  useEffect(() => {
    pausedRef.current = paused;
    lockScroll(paused);
  }, [paused]);

  return null;
}
