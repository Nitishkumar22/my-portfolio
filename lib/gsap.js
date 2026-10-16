// lib/gsap.js
// GSAP and ScrollTrigger are fetched on demand so neither sits in the
// initial bundle. Each loader resolves once and is shared by all callers.
let gsapPromise = null;
let stPromise   = null;

export function loadGsap() {
  gsapPromise ??= import("gsap").then(mod => mod.gsap);
  return gsapPromise;
}

export function loadScrollTrigger() {
  stPromise ??= Promise.all([loadGsap(), import("gsap/ScrollTrigger")]).then(([gsap, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
  });
  return stPromise;
}
