"use client";
// components/SkillsGrid.jsx
// 3D skill icons via skillicons.dev
import { SKILL_ICONS } from "../lib/data";

const CSS = `
  @keyframes iconFloat {
    0%,100% { transform: translateY(0) scale(1); }
    50%     { transform: translateY(-6px) scale(1.06); }
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
  .skill-img {
    width: 52px; height: 52px; border-radius: 14px; display: block;
    transition: transform .25s;
  }
  .skill-wrap:hover .skill-img { animation: iconFloat .65s ease-in-out; }
  .skill-label {
    font-family: 'Geist', sans-serif; font-size: 11px;
    text-align: center; max-width: 64px; line-height: 1.3;
  }
`;

export default function SkillsGrid({ t, dark }) {
  return (
    <>
      <style>{CSS}</style>
      <section className="skills-section" style={{ background: t.surface }}>
        <div className="skills-inner">
          <div className="skills-header">
            <h2 className="skills-title" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: t.text }}>
              Skills
            </h2>
            <span className="skills-subtitle" style={{ color: t.dim }}>// tech stack</span>
          </div>

          <div className="skills-grid">
            {SKILL_ICONS.map(skill => (
              <div key={skill.name} className="skill-wrap" title={skill.name}>
                <img
                  className="skill-img"
                  src={skill.custom || `https://skillicons.dev/icons?i=${skill.id}`}
                  alt={skill.name}
                  style={{
                    border: `1px solid ${t.border}`,
                    background: dark ? "#1c1c1e" : "#f0f0f2",
                    padding: skill.custom ? "8px" : "0",
                  }}
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
                <span className="skill-label" style={{ color: t.muted }}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
