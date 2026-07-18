"use client";
// components/NavBar.jsx
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_CSS = `
  .nav-root {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 60px;
    display: flex; align-items: center;
    transition: background .3s, border-color .3s, backdrop-filter .3s;
  }
  .nav-root.scrolled {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .nav-inner {
    max-width: 1100px; margin: 0 auto; padding: 0 1.5rem;
    width: 100%;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-family: 'Geist', sans-serif;
    font-size: 16px; font-weight: 700; letter-spacing: -.04em;
    display: flex; align-items: center; gap: 8px;
    cursor: pointer; border: none; background: none;
  }
  .nav-logo-box {
    width: 30px; height: 30px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; flex-shrink: 0;
    transition: background .3s, color .3s;
  }
  .nav-links { display: flex; align-items: center; gap: 24px; }
  .nav-link {
    font-family: 'Geist', sans-serif;
    font-size: 14px; font-weight: 400; letter-spacing: -.01em;
    border: none; background: none; cursor: pointer;
    position: relative; padding-bottom: 2px;
    transition: color .2s;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px; background: currentColor;
    transition: width .25s ease;
  }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .nav-resume {
    font-family: 'Geist', sans-serif; font-size: 13px;
    text-decoration: none; transition: color .2s;
  }
  @media(max-width:600px) {
    .nav-resume { display: none; }
    .nav-links  { gap: 16px; }
  }
`;

export default function NavBar({ page, setPage, dark, setDark, t }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = p => { setPage(p); window.scrollTo(0, 0); };

  return (
    <>
      <style>{NAV_CSS}</style>
      <nav
        className={`nav-root${scrolled ? " scrolled" : ""}`}
        style={{
          borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
          background: scrolled
            ? (dark ? "rgba(9,9,11,.9)" : "rgba(255,255,255,.9)")
            : "transparent",
        }}
      >
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => nav("home")} style={{ color: t.text }}>
            <span className="nav-logo-box" style={{ background: t.text, color: t.inv }}>NK</span>
            Nitish
          </button>

          <div className="nav-links">
            {[["About","about"],["Projects","projects"],["Designs","designs"]].map(([label,id]) => (
              <button
                key={id}
                className={`nav-link ${page === id ? "active" : ""}`}
                onClick={() => nav(id)}
                style={{ color: page === id ? t.text : t.muted }}
              >
                {label}
              </button>
            ))}

            <a href="/Nitish_Kumar_DevOps_Cv.pdf" download="Nitish_Kumar_DevOps_Cv.pdf" className="nav-resume" style={{ color: t.muted }}
              onMouseOver={e => e.currentTarget.style.color = t.text}
              onMouseOut={e => e.currentTarget.style.color = t.muted}>
              Resume ↓
            </a>

            <ThemeToggle t={t} />
          </div>
        </div>
      </nav>
    </>
  );
}
