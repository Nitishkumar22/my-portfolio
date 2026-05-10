"use client";
// app-pages/DesignsPage.jsx
import { useState } from "react";
import { DESIGNS } from "../lib/data";

const CSS = `
  @keyframes designFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .designs-page { max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem 6rem; }
  .designs-top  { margin-bottom: 48px; animation: designFadeIn .55s both; }
  .designs-tag  { font-family: 'Geist Mono', monospace; font-size: 11px; margin-bottom: 10px; }
  .designs-h1   { font-family: 'Geist', sans-serif; font-weight: 700; letter-spacing: -.05em; line-height: .94; margin-bottom: 16px; }
  .designs-sub  { font-size: 15px; line-height: 1.8; max-width: 480px; }

  .designs-filters { display: flex; gap: 8px; margin-bottom: 40px; flex-wrap: wrap; animation: designFadeIn .55s .1s both; }
  .designs-filter  {
    padding: 7px 18px; border-radius: 100px; font-size: 13px;
    background: transparent; cursor: pointer;
    font-family: 'Geist', sans-serif; transition: all .2s;
  }

  .designs-masonry { columns: 3 200px; gap: 12px; }

  .design-card {
    position: relative; overflow: hidden; border-radius: 12px;
    cursor: pointer; break-inside: avoid; margin-bottom: 12px;
    animation: designFadeIn .55s both;
  }
  .design-card img {
    width: 100%; display: block; min-height: 80px; object-fit: cover;
    transition: transform .5s cubic-bezier(.4,0,.2,1);
  }
  .design-card:hover img { transform: scale(1.05); }

  .design-reveal {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,.82) 0%, transparent 55%);
    opacity: 0; transition: opacity .3s;
    display: flex; flex-direction: column;
    justify-content: flex-end; padding: 14px;
  }
  .design-card:hover .design-reveal { opacity: 1; }
  .design-reveal-name { font-family: 'Geist', sans-serif; font-size: 14px; font-weight: 600; color: #fafafa; margin-bottom: 4px; }
  .design-reveal-cat  {
    display: inline-block; padding: 2px 9px; border-radius: 100px; font-size: 10px;
    background: rgba(255,255,255,.15); color: rgba(255,255,255,.8);
    font-family: 'Geist Mono', monospace;
  }

  .design-meta { padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; }
  .design-meta-name { font-size: 12px; font-weight: 500; font-family: 'Geist', sans-serif; }
  .design-meta-cat  { font-size: 10px; font-family: 'Geist Mono', monospace; padding: 2px 8px; border-radius: 100px; }
`;

export function DesignsPage({ t }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All","UI/UX","Graphic","Motion"];
  const filtered = filter === "All" ? DESIGNS : DESIGNS.filter(d => d.cat === filter);

  return (
    <>
      <style>{CSS}</style>
      <div className="designs-page">
        <div className="designs-top">
          <div className="designs-tag" style={{ color: t.dim }}>// creative work</div>
          <h1 className="designs-h1" style={{ fontSize: "clamp(2.5rem,8vw,5.5rem)", color: t.text }}>
            Design<br /><span style={{ color: t.muted }}>Showcase.</span>
          </h1>
          <p className="designs-sub" style={{ color: t.muted }}>
            A collection of my best creative works — blending aesthetics, motion,
            and storytelling through visual design.
          </p>
        </div>

        <div className="designs-filters">
          {cats.map(c => (
            <button
              key={c}
              className="designs-filter"
              onClick={() => setFilter(c)}
              style={{
                border: `1px solid ${filter === c ? t.muted : t.border}`,
                color: filter === c ? t.text : t.muted,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="designs-masonry">
          {filtered.map((d, i) => (
            <div
              key={d.title + i}
              className="design-card"
              style={{ border: `1px solid ${t.border}`, animationDelay: `${i * 0.04}s` }}
            >
              <img
                src={d.src}
                alt={d.title}
                onError={e => { e.currentTarget.style.display = "none"; }}
              />
              <div className="design-reveal">
                <div className="design-reveal-name">{d.title}</div>
                <span className="design-reveal-cat">{d.cat}</span>
              </div>
              <div className="design-meta">
                <span className="design-meta-name" style={{ color: t.text }}>{d.title}</span>
                <span
                  className="design-meta-cat"
                  style={{ border: `1px solid ${t.border}`, color: t.dim }}
                >
                  {d.cat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
