"use client";
// components/CursorFollower.jsx
//
// Dot + trailing ring cursor driven by gsap.quickTo — positions are written
// straight to transforms, so there are no React re-renders per mouse move.
import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsap";

const CSS = `
  @media (hover: hover) and (pointer: fine) {
    html.has-custom-cursor, html.has-custom-cursor * { cursor: none !important; }
  }

  .cursor-dot,
  .cursor-ring {
    position: fixed; top: 0; left: 0;
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
    opacity: 0;
    transition: opacity .3s ease, scale .2s ease;
    will-change: transform;
  }
  .cursor-dot  { width: 8px;  height: 8px;  margin: -4px 0 0 -4px;   background: #fafafa; z-index: 9999; }
  .cursor-ring { width: 32px; height: 32px; margin: -16px 0 0 -16px; border: 2px solid #fafafa; z-index: 9998; }

  .cursor-visible .cursor-dot,
  .cursor-visible .cursor-ring { opacity: 1; }
  .cursor-hover .cursor-dot  { scale: .5; }
  .cursor-hover .cursor-ring { scale: 1.5; }

  @media (hover: none), (pointer: coarse) {
    .cursor-dot, .cursor-ring { display: none; }
  }
`;

const CLICKABLE = "a, button, [role='button'], input, select, textarea, label, summary, [data-cursor='hover']";

export default function CursorFollower() {
  const rootRef = useRef(null);
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = rootRef.current;
    let move = null;
    let active = true;

    loadGsap().then(gsap => {
      if (!active) return;
      const dotX  = gsap.quickTo(dotRef.current,  "x", { duration: 0.12, ease: "power3.out" });
      const dotY  = gsap.quickTo(dotRef.current,  "y", { duration: 0.12, ease: "power3.out" });
      const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" });
      const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" });
      move = (x, y) => { dotX(x); dotY(y); ringX(x); ringY(y); };
      // Hide the native cursor only once the custom one can actually move.
      document.documentElement.classList.add("has-custom-cursor");
    });

    const onMove = e => {
      if (!move) return;
      move(e.clientX, e.clientY);
      root.classList.add("cursor-visible");
    };
    const onOver  = e => root.classList.toggle("cursor-hover", !!e.target.closest?.(CLICKABLE));
    const onLeave = () => root.classList.remove("cursor-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      active = false;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true">
      <style>{CSS}</style>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
