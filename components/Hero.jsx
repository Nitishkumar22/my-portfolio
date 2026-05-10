"use client";
// components/Hero.jsx
import { useTypewriter } from "../hooks/useTypewriter";
import { TYPEWRITER_ROLES } from "../lib/data";

const HERO_CSS = `
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroCursorBlink {
    0%,100% { opacity: 1; } 50% { opacity: 0; }
  }

  .hero-section {
    min-height: 94vh; display: flex; align-items: center;
    padding: 6rem 1.5rem 3rem;
  }
  .hero-inner { max-width: 1100px; margin: 0 auto; width: 100%; }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 14px; border-radius: 100px;
    font-family: 'Geist Mono', monospace; font-size: 12px;
    margin-bottom: 32px;
    animation: heroFadeUp .55s both;
  }
  .hero-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
  }
  .hero-heading {
    font-family: 'Geist', sans-serif; font-weight: 700;
    line-height: .94; letter-spacing: -.05em;
    margin-bottom: 28px;
    animation: heroFadeUp .55s .07s both;
  }
  .hero-role {
    font-family: 'Geist Mono', monospace;
    letter-spacing: -.01em;
    margin-bottom: 24px;
    animation: heroFadeUp .55s .14s both;
  }
  .hero-role-cursor {
    display: inline-block;
    animation: heroCursorBlink 1s step-end infinite;
  }
  .hero-desc {
    font-size: 16px; line-height: 1.85; max-width: 560px;
    margin-bottom: 40px;
    animation: heroFadeUp .55s .21s both;
  }
  .hero-ctas {
    display: flex; gap: 12px; flex-wrap: wrap;
    margin-bottom: 64px;
    animation: heroFadeUp .55s .28s both;
  }
  .hero-btn-primary {
    padding: 12px 28px; border-radius: 10px;
    font-weight: 500; font-size: 14px;
    font-family: 'Geist', sans-serif;
    border: none; cursor: pointer;
    transition: opacity .2s, transform .2s;
  }
  .hero-btn-primary:hover { opacity: .75; transform: translateY(-1px); }

  .hero-btn-secondary {
    padding: 12px 28px; border-radius: 10px;
    font-weight: 400; font-size: 14px;
    font-family: 'Geist', sans-serif;
    background: transparent; cursor: pointer;
    transition: border-color .2s, color .2s, transform .2s;
  }
  .hero-btn-secondary:hover { transform: translateY(-1px); }

  .hero-stats {
    display: flex;
    animation: heroFadeUp .55s .35s both;
  }
  .hero-stat { flex: 1; padding: 24px 0; }
  .hero-stat-n {
    font-family: 'Geist', sans-serif; font-size: 30px;
    font-weight: 700; letter-spacing: -.04em;
  }
  .hero-stat-l { font-size: 13px; margin-top: 4px; }

  @media(max-width:500px) {
    .hero-stats { flex-direction: column; }
    .hero-stat { border-right: none !important; border-bottom-width: 1px; border-bottom-style: solid; padding-left: 0 !important; }
  }
`;

export default function Hero({ t, navigate }) {
  const role = useTypewriter(TYPEWRITER_ROLES);

  return (
    <>
      <style>{HERO_CSS}</style>
      <section className="hero-section">
        <div className="hero-inner">

          {/* Status badge */}
          <div className="hero-badge" style={{ border: `1px solid ${t.border}`, color: t.muted }}>
            <span className="hero-badge-dot" />
            Available for new opportunities
          </div>

          {/* Heading */}
          <h1
            className="hero-heading"
            style={{
              fontSize: "clamp(3rem,8.5vw,7rem)",
              color: t.text,
            }}
          >
            I'm Nitish Kumar<br />
            <span style={{ color: t.muted }}>MERN Stack Developer</span><br />
            <span style={{ color: t.dim }}>&amp; DevOps Engineer.</span>
          </h1>

          {/* Typewriter role */}
          <div
            className="hero-role"
            style={{ fontSize: "clamp(.9rem,1.8vw,1rem)", color: t.muted }}
          >
            <span style={{ color: t.text }}>→</span>{" "}{role}
            <span className="hero-role-cursor" style={{ color: t.muted }}>_</span>
          </div>

          {/* Description */}
          <p className="hero-desc" style={{ color: t.muted }}>
            I craft reliable, maintainable applications with modern frameworks and
            DevOps best practices. From responsive frontends to automated CI/CD
            pipelines — solutions that scale beautifully and work flawlessly.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <button
              className="hero-btn-primary"
              onClick={() => navigate("projects")}
              style={{ background: t.text, color: t.inv }}
            >
              Let&apos;s Connect
            </button>
            <button
              className="hero-btn-secondary"
              onClick={() => navigate("about")}
              style={{ border: `1px solid ${t.border}`, color: t.muted }}
              onMouseOver={e => { e.currentTarget.style.borderColor = t.muted; e.currentTarget.style.color = t.text; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.muted; }}
            >
              About Me
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ borderTop: `1px solid ${t.border}` }}>
            {[
              ["2.5+","Years of experience"],
              ["10+", "Projects delivered"],
              ["3",   "Industries served"],
            ].map(([n, l], i) => (
              <div
                key={l}
                className="hero-stat"
                style={{
                  borderRight: i < 2 ? `1px solid ${t.border}` : "none",
                  paddingLeft: i > 0 ? 28 : 0,
                }}
              >
                <div className="hero-stat-n" style={{ color: t.text }}>{n}</div>
                <div className="hero-stat-l" style={{ color: t.muted }}>{l}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
