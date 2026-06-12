"use client";
import { useState, useEffect, useRef } from "react";
import { SKILL_ICONS } from "../lib/data";

const CSS = `
  @keyframes skillReveal {
    from { opacity: 0; transform: translateY(14px) scale(0.86); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .skills-section { padding: 5rem 1.5rem; }
  .skills-inner   { max-width: 1100px; margin: 0 auto; }
  .skills-header  {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 44px; flex-wrap: wrap; gap: 12px;
  }
  .skills-title    { font-family: 'Geist', sans-serif; font-weight: 700; letter-spacing: -.04em; }
  .skills-subtitle { font-family: 'Geist Mono', monospace; font-size: 11px; }

  .skills-grid {
    display: flex; flex-wrap: wrap; gap: 22px; justify-content: center;
  }
  .skill-wrap {
    display: flex; flex-direction: column; align-items: center; gap: 7px;
    cursor: default;
  }
  .skill-icon-box {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    transition: transform .28s cubic-bezier(.4,0,.2,1), box-shadow .28s;
    overflow: hidden;
  }
  .skill-wrap:hover .skill-icon-box {
    transform: translateY(-6px) scale(1.1);
    box-shadow: 0 8px 24px rgba(99,102,241,0.35);
  }
  .skill-img {
    width: 100%; height: 100%; display: block; border-radius: 14px;
  }
  .skill-label {
    font-family: 'Geist', sans-serif; font-size: 11px;
    text-align: center; max-width: 64px; line-height: 1.3;
    transition: color .2s;
  }
  .skill-wrap:hover .skill-label { color: #818cf8 !important; }
`;

export default function SkillsGrid({ t, dark }) {
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
      <section className="skills-section" style={{ background: t.surface }} ref={ref}>
        <div className="skills-inner">
          <div
            className="skills-header"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(18px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h2
              className="skills-title"
              style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: t.text }}
            >
              Skills
            </h2>
            <span className="skills-subtitle" style={{ color: t.dim }}>// tech stack</span>
          </div>

          <div className="skills-grid">
            {SKILL_ICONS.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-wrap"
                title={skill.name}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(14px) scale(0.86)",
                  transition: `opacity 0.5s ${i * 0.04}s ease, transform 0.5s ${i * 0.04}s ease`,
                }}
              >
                <div
                  className="skill-icon-box"
                  style={{
                    border: `1px solid ${t.border}`,
                    background: dark ? "#1c1c1e" : "#f0f0f2",
                  }}
                >
                  <img
                    className="skill-img"
                    src={skill.custom || `https://skillicons.dev/icons?i=${skill.id}`}
                    alt={skill.name}
                    style={{ padding: skill.custom ? "8px" : "0" }}
                    onError={e => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <span className="skill-label" style={{ color: t.muted }}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
