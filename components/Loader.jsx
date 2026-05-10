"use client";
/**
 * components/Loader.jsx
 *
 * Signature handwriting animation — matches the screen recording exactly.
 * "Nitish Kumar" is drawn stroke-by-stroke in cursive using SVG
 * stroke-dashoffset technique, then fades to filled text, then slides up.
 *
 * Font: "Great Vibes" (Google Fonts) — closest match to the video's
 *       signature cursive style.
 */
import { useState, useEffect } from "react";

/* ── Inline CSS so this component is self-contained ── */
const LOADER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

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
    font-family: 'Great Vibes', cursive;
    font-size: 110px;
    fill: transparent;
    stroke: #ffffff;
    stroke-width: 1.2px;
    --path-len: 4800;
    stroke-dasharray: 4800;
    stroke-dashoffset: 4800;
    /* Phase 1: draw the stroke */
    animation: signatureDraw 1.8s cubic-bezier(0.4, 0, 0.6, 1) 0.2s forwards;
  }

  .sig-text.filling {
    /* Phase 2: fill the text */
    animation:
      signatureDraw 1.8s cubic-bezier(0.4, 0, 0.6, 1) 0.2s forwards,
      signatureFillIn 0.4s ease 2s forwards;
  }

  .sig-text.filled {
    fill: #ffffff;
    stroke: transparent;
  }

  .loader-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #555;
  }
  .loader-dot:nth-child(1) { animation: loaderDotBlink 1.1s 0s   ease-in-out infinite; }
  .loader-dot:nth-child(2) { animation: loaderDotBlink 1.1s .18s ease-in-out infinite; }
  .loader-dot:nth-child(3) { animation: loaderDotBlink 1.1s .36s ease-in-out infinite; }
`;

export default function Loader({ onDone }) {
  // phase: 0 = drawing | 1 = filling | 2 = filled | 3 = sliding out
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 0.2s delay + 1.8s draw = 2s → start fill
    const t1 = setTimeout(() => setPhase(1), 2000);
    // fill runs 0.4s → at 2.4s show filled
    const t2 = setTimeout(() => setPhase(2), 2400);
    // hold briefly then exit
    const t3 = setTimeout(() => setPhase(3), 2700);
    // notify parent
    const t4 = setTimeout(() => onDone(),    3200);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [onDone]);

  const textClass =
    phase === 0 ? "sig-text" :
    phase === 1 ? "sig-text filling" :
    "sig-text filled";

  return (
    <>
      <style>{LOADER_CSS}</style>
      <div
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
            ? "loaderSlideOut .85s cubic-bezier(.76,0,.24,1) forwards"
            : "none",
        }}
      >
        {/* ── Signature SVG ── */}
        <svg
          viewBox="0 0 760 160"
          style={{ width:"min(85vw,680px)", overflow:"visible" }}
          aria-label="Nitish Kumar"
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
