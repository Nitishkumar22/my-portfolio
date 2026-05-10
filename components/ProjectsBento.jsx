"use client";
// components/ProjectsBento.jsx
import { PROJECTS } from "../lib/data";

const CSS = `
  @keyframes cardFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .bento-section { padding: 5rem 1.5rem; }
  .bento-inner   { max-width: 1100px; margin: 0 auto; }
  .bento-header  {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 32px; flex-wrap: wrap; gap: 12px;
  }
  .bento-title { font-family: 'Geist', sans-serif; font-weight: 700; letter-spacing: -.04em; }
  .bento-all   { font-family: 'Geist', sans-serif; font-size: 13px; background: none; border: none; cursor: pointer; transition: color .2s; }

  .bento-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
  }
  .bento-card {
    border-radius: 14px; padding: 1.75rem; position: relative; overflow: hidden;
    transition: transform .3s cubic-bezier(.4,0,.2,1);
    animation: cardFadeUp .55s both;
  }
  .bento-card:hover { transform: translateY(-4px); }
  .bento-card.large { grid-column: span 2; }

  .bento-year { position: absolute; top: 18px; right: 18px; font-family: 'Geist Mono', monospace; font-size: 11px; }
  .bento-num  { font-family: 'Geist', sans-serif; font-size: 56px; font-weight: 700; letter-spacing: -.05em; line-height: 1; margin-bottom: 16px; user-select: none; }
  .bento-name { font-family: 'Geist', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: -.03em; margin-bottom: 10px; }
  .bento-desc { font-size: 14px; line-height: 1.7; margin-bottom: 20px; }
  .bento-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
  .bento-tag  { padding: 3px 10px; border-radius: 100px; font-size: 11px; font-family: 'Geist Mono', monospace; }
  .bento-link { font-size: 13px; font-family: 'Geist', sans-serif; text-decoration: none; transition: color .2s; }

  @media(max-width:620px) { .bento-card.large { grid-column: span 1; } }
  @media(max-width:480px) { .bento-grid { grid-template-columns: 1fr; } .bento-card.large { grid-column: span 1; } }
`;

export default function ProjectsBento({ t, navigate }) {
  return (
    <>
      <style>{CSS}</style>
      <section className="bento-section">
        <div className="bento-inner">
          <div className="bento-header">
            <h2 className="bento-title" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: t.text }}>
              My Projects
            </h2>
            <button
              className="bento-all"
              style={{ color: t.muted }}
              onClick={() => navigate("projects")}
              onMouseOver={e => e.currentTarget.style.color = t.text}
              onMouseOut={e => e.currentTarget.style.color = t.muted}
            >
              View all →
            </button>
          </div>

          <div className="bento-grid">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className={`bento-card ${p.size === "large" ? "large" : ""}`}
                style={{
                  background: t.card,
                  border: `1px solid ${t.border}`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <span className="bento-year" style={{ color: t.dim }}>{p.year}</span>
                <div className="bento-num" style={{ color: t.dim }}>0{i + 1}</div>
                <h3 className="bento-name" style={{ color: t.text }}>{p.title}</h3>
                <p className="bento-desc" style={{ color: t.muted, maxWidth: p.size === "large" ? 480 : "100%" }}>
                  {p.desc}
                </p>
                <div className="bento-tags">
                  {p.tags.map(tag => (
                    <span key={tag} className="bento-tag" style={{ border: `1px solid ${t.border}`, color: t.dim }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-link"
                  style={{ color: t.muted }}
                  onMouseOver={e => e.currentTarget.style.color = t.text}
                  onMouseOut={e => e.currentTarget.style.color = t.muted}
                >
                  Visit website ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
