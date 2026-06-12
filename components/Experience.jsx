"use client";
import { useRef, useEffect, useState } from "react";
import { EXPERIENCE } from "../lib/data";
import ExperienceCarousel from "./ExperienceCarousel";

const CSS = `
  .exp-section { padding: 5rem 1.5rem; }
  .exp-inner   { max-width: 1100px; margin: 0 auto; }
  .exp-header  {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 48px; flex-wrap: wrap; gap: 12px;
  }
  .exp-title {
    font-family: 'Geist', sans-serif; font-weight: 700; letter-spacing: -.04em;
  }
  .exp-subtitle { font-family: 'Geist Mono', monospace; font-size: 11px; }
`;

export default function Experience({ t }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section className="exp-section" ref={ref}>
        <div
          className="exp-inner"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="exp-header">
            <h2
              className="exp-title"
              style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: t.text }}
            >
              Experience
            </h2>
            <span className="exp-subtitle" style={{ color: t.dim }}>// work history</span>
          </div>

          <ExperienceCarousel experiences={EXPERIENCE} t={t} />
        </div>
      </section>
    </>
  );
}
