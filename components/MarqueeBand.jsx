"use client";
/**
 * components/MarqueeBand.jsx
 * Scrolling tech-stack ticker
 */
import { MARQUEE } from "../lib/data";

const CSS = `
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-wrap { overflow: hidden; }
  .marquee-inner {
    display: flex; width: max-content;
    animation: marqueeScroll 28s linear infinite;
  }
  .marquee-item {
    font-family: 'Geist Mono', monospace;
    font-size: 12px; letter-spacing: .02em; white-space: nowrap;
    margin-right: 52px;
  }
`;

export default function MarqueeBand({ t }) {
  return (
    <>
      <style>{CSS}</style>
      <div
        className="marquee-wrap"
        style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: "12px 0" }}
      >
        <div className="marquee-inner">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span key={i} className="marquee-item" style={{ color: t.dim }}>{s}</span>
          ))}
        </div>
      </div>
    </>
  );
}
