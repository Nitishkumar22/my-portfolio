"use client";
/**
 * components/Loader.jsx
 *
 * Signature handwriting animation (~1.75s, once per session, skippable).
 * "Nitish Kumar" is drawn stroke-by-stroke in cursive using SVG
 * stroke-dashoffset technique, then fades to filled text, then slides up.
 *
 * Font: "Great Vibes" — self-hosted via next/font in app/layout.js
 *       (exposed as --font-signature), so it is preloaded and never
 *       render-blocking.
 *
 * The loader is a fixed overlay; the page underneath is already rendered.
 */
import { useState, useEffect, useCallback } from "react";

// Timeline (seconds). Total = SLIDE_AT + SLIDE ≈ 1.75s — was 3.2s.
const DRAW_DELAY = 0.05;
const DRAW       = 0.9;
const FILL       = 0.2;
const HOLD       = 0.05;
const SLIDE      = 0.55;
const FILL_AT    = DRAW_DELAY + DRAW;   // 0.95
const FILLED_AT  = FILL_AT + FILL;      // 1.15
const SLIDE_AT   = FILLED_AT + HOLD;    // 1.2

// Shown once per browser session; later loads in the same tab skip it.
// The inline script in app/layout.js adds `loader-seen` to <html> before
// first paint, so returning visitors never see a flash of the overlay.
export const LOADER_SEEN_KEY = "nk-loader-seen";

/* ── Inline CSS so this component is self-contained ── */
const LOADER_CSS = `
  @keyframes signatureDraw {
    from { stroke-dashoffset: var(--path-len); }
    to   { stroke-dashoffset: 0; }
  }

  @keyframes signatureFillIn {
    from { fill: transparent; }
    to   { fill: #ffffff; }
  }

  @keyframes loaderSlideOut {
    from { transform: translateY(0); }
    to   { transform: translateY(-100%); }
  }

  @keyframes loaderDotBlink {
    0%,100% { opacity: .15; transform: scale(.6); }
    50%     { opacity: .7;  transform: scale(1); }
  }

  .sig-text {
    font-family: var(--font-signature), 'Great Vibes', cursive;
    font-size: 110px;
    fill: transparent;
    stroke: #ffffff;
    stroke-width: 1.2px;
    --path-len: 4800;
    stroke-dasharray: 4800;
    stroke-dashoffset: 4800;
    /* Phase 1: draw the stroke */
    animation: signatureDraw ${DRAW}s cubic-bezier(0.4, 0, 0.6, 1) ${DRAW_DELAY}s forwards;
  }

  .sig-text.filling {
    /* Phase 2: fill the text */
    animation:
      signatureDraw ${DRAW}s cubic-bezier(0.4, 0, 0.6, 1) ${DRAW_DELAY}s forwards,
      signatureFillIn ${FILL}s ease ${FILL_AT}s forwards;
  }

  .sig-text.filled {
    fill: #ffffff;
    stroke: transparent;
  }

  html.loader-seen .site-loader { display: none; }

  .loader-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #555;
  }
  .loader-dot:nth-child(1) { animation: loaderDotBlink 1.1s 0s   ease-in-out infinite; }
  .loader-dot:nth-child(2) { animation: loaderDotBlink 1.1s .18s ease-in-out infinite; }
  .loader-dot:nth-child(3) { animation: loaderDotBlink 1.1s .36s ease-in-out infinite; }
`;

export default function Loader({ onReveal, onDone }) {
  // phase: 0 = drawing | 1 = filling | 2 = filled | 3 = sliding out
  const [phase, setPhase] = useState(0);

  const skip = useCallback(() => setPhase(p => Math.max(p, 3)), []);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(LOADER_SEEN_KEY) === "1"; } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    try { sessionStorage.setItem(LOADER_SEEN_KEY, "1"); } catch {}

    const t1 = setTimeout(() => setPhase(p => Math.max(p, 1)), FILL_AT * 1000);
    const t2 = setTimeout(() => setPhase(p => Math.max(p, 2)), FILLED_AT * 1000);
    const t3 = setTimeout(skip, SLIDE_AT * 1000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone, skip]);

  // Slide-out phase (reached on schedule or by skipping): reveal the page
  // immediately, unmount once the slide has finished.
  useEffect(() => {
    if (phase !== 3) return;
    onReveal?.();
    const t = setTimeout(onDone, SLIDE * 1000);
    return () => clearTimeout(t);
  }, [phase, onReveal, onDone]);

  // Click, key press or scroll skips straight to the slide-out.
  useEffect(() => {
    const opts = { once: true, passive: true };
    window.addEventListener("pointerdown", skip, opts);
    window.addEventListener("keydown", skip, opts);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchmove", skip, opts);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
    };
  }, [skip]);

  const textClass =
    phase === 0 ? "sig-text" :
    phase === 1 ? "sig-text filling" :
    "sig-text filled";

  return (
    <>
      <style>{LOADER_CSS}</style>
      <div
        className="site-loader"
        role="presentation"
        style={{
          position:  "fixed",
          inset:     0,
          zIndex:    9999,
          background:"#141414",
          display:   "flex",
          flexDirection: "column",
          alignItems:"center",
          justifyContent:"center",
          gap: 36,
          animation: phase === 3
            ? `loaderSlideOut ${SLIDE}s cubic-bezier(.76,0,.24,1) forwards`
            : "none",
        }}
      >
        {/* ── Signature SVG ── */}
        <svg
          viewBox="0 0 760 160"
          style={{ width:"min(85vw,680px)", overflow:"visible" }}
          aria-hidden="true"
        >
          <text
            x="380"
            y="130"
            textAnchor="middle"
            className={textClass}
          >
            Nitish Kumar
          </text>
        </svg>

        {/* ── Subtle dot indicator ── */}
        <div style={{ display:"flex", gap:7 }}>
          <div className="loader-dot" />
          <div className="loader-dot" />
          <div className="loader-dot" />
        </div>
      </div>
    </>
  );
}
