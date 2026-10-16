"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTypewriter } from "../hooks/useTypewriter";
import { TYPEWRITER_ROLES } from "../lib/data";
import { useSite } from "./SiteShell";
import HeroShader from "./HeroShader";
import { loadGsap } from "../lib/gsap";

const HERO_CSS = `
  @keyframes heroCursorBlink {
    0%,100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes orbFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%      { transform: translate(70px, -50px) scale(1.1); }
    66%      { transform: translate(-50px, 35px) scale(0.95); }
  }
  @keyframes orbFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25%      { transform: translate(-90px, 55px) scale(1.06); }
    75%      { transform: translate(60px, -40px) scale(1.12); }
  }
  /* transform + opacity only, so it stays on the compositor */
  @keyframes badgeDotPulse {
    0%       { transform: scale(1);   opacity: .5; }
    70%, 100% { transform: scale(2.6); opacity: 0; }
  }

  .hero-section {
    min-height: 94vh; display: flex; align-items: center;
    padding: 6rem 1.5rem 3rem;
    position: relative; overflow: hidden;
  }
  .hero-orb {
    position: absolute; border-radius: 50%;
    pointer-events: none; will-change: transform;
  }
  .hero-inner {
    max-width: 1100px; margin: 0 auto; width: 100%;
    position: relative; z-index: 1;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 14px; border-radius: 100px;
    font-family: 'Geist Mono', monospace; font-size: 12px;
    margin-bottom: 32px;
  }
  .hero-badge-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #22c55e;
    flex-shrink: 0; position: relative;
  }
  .hero-badge-dot::after {
    content: ""; position: absolute; inset: 0; border-radius: 50%;
    background: #22c55e;
    animation: badgeDotPulse 2.4s ease-out infinite;
  }
  .hero-orbs { position: absolute; inset: 0; pointer-events: none; transition: opacity 1.2s ease; }
  .hero-line { display: block; will-change: transform; }
  .hero-heading {
    font-family: 'Geist', sans-serif; font-weight: 700;
    line-height: .94; letter-spacing: -.05em;
    margin-bottom: 28px;
  }
  .hero-role {
    font-family: 'Geist Mono', monospace;
    letter-spacing: -.01em;
    margin-bottom: 24px;
  }
  .hero-role-cursor {
    display: inline-block;
    animation: heroCursorBlink 1s step-end infinite;
  }
  .hero-desc {
    font-size: 16px; line-height: 1.85; max-width: 560px;
    margin-bottom: 40px;
  }
  .hero-ctas {
    display: flex; gap: 12px; flex-wrap: wrap;
    margin-bottom: 64px;
  }
  .hero-btn-primary, .hero-btn-secondary { display: inline-block; }
  .hero-btn-primary {
    padding: 12px 28px; border-radius: 10px;
    font-weight: 500; font-size: 14px;
    font-family: 'Geist', sans-serif;
    border: none; cursor: pointer;
    transition: opacity .2s, transform .2s, box-shadow .2s;
  }
  .hero-btn-primary:hover {
    opacity: .88; transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0,0,0,.35);
  }
  .hero-btn-secondary {
    padding: 12px 28px; border-radius: 10px;
    font-weight: 400; font-size: 14px;
    font-family: 'Geist', sans-serif;
    background: transparent; cursor: pointer;
    transition: border-color .2s, color .2s, transform .2s;
  }
  .hero-btn-secondary:hover { transform: translateY(-2px); }

  .hero-stats {
    display: flex;
  }
  .hero-stat { flex: 1; padding: 24px 0; }
  .hero-stat-n {
    font-family: 'Geist', sans-serif; font-size: 30px;
    font-weight: 700; letter-spacing: -.04em;
  }
  .hero-stat-l { font-size: 13px; margin-top: 4px; }

  @media(max-width:500px) {
    .hero-stats { flex-direction: column; }
    .hero-stat {
      border-right: none !important;
      border-bottom-width: 1px; border-bottom-style: solid;
      padding-left: 0 !important;
    }
  }
`;

export default function Hero({ t, dark }) {
  const role = useTypewriter(TYPEWRITER_ROLES);
  const { introDone } = useSite();
  const rootRef  = useRef(null);
  const introRef = useRef(null);
  const [shaderOn, setShaderOn] = useState(false);

  const introDoneRef = useRef(introDone);

  // Intro timeline: GSAP is fetched after hydration and the timeline is built
  // paused, then played once the loader starts lifting. Everything is painted
  // visible in the static HTML first. Large text (heading, role, description)
  // only moves — it never fades — so it stays a valid LCP candidate.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx = null;
    let active = true;

    loadGsap().then(gsap => {
      if (!active || !rootRef.current) return;
      ctx = gsap.context(() => {
        introRef.current = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
          .from(".hero-badge", { y: 16, autoAlpha: 0, duration: 0.6 })
          .from(".hero-line",  { y: 48, duration: 1.1, stagger: 0.09, ease: "power4.out" }, "-=0.4")
          .from([".hero-role", ".hero-desc"], { y: 24, duration: 0.9, stagger: 0.07 }, "-=0.9")
          .from(".hero-ctas",  { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.6")
          .from(".hero-stat",  { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, "-=0.45");
      }, rootRef.current);
      if (introDoneRef.current) introRef.current.play();
    });

    return () => {
      active = false;
      ctx?.revert();
      introRef.current = null;
    };
  }, []);

  useEffect(() => {
    introDoneRef.current = introDone;
    if (introDone) introRef.current?.play();
  }, [introDone]);

  const orb1 = dark
    ? "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.28) 0%, transparent 62%)"
    : "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.10) 0%, transparent 62%)";
  const orb2 = dark
    ? "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.20) 0%, transparent 62%)"
    : "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.07) 0%, transparent 62%)";
  const dotGrid = dark
    ? "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)"
    : "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)";

  return (
    <>
      <style>{HERO_CSS}</style>
      <section
        ref={rootRef}
        className="hero-section"
        style={{ backgroundImage: dotGrid, backgroundSize: "32px 32px" }}
      >
        {/* WebGL aurora (desktop) — replaces the CSS orbs once it is running */}
        <HeroShader dark={dark} start={introDone} onReady={() => setShaderOn(true)} />

        {/* CSS orbs — fallback for mobile / reduced motion / no WebGL.
            The wrappers carry Locomotive parallax; the inner orbs keep
            their CSS float animation. */}
        <div className="hero-orbs" aria-hidden="true" style={{ opacity: shaderOn ? 0 : 1 }}>
          <div data-scroll data-scroll-speed="-0.15" style={{ position: "absolute", inset: 0 }}>
            {/* Orb 1 — indigo, top-left */}
            <div
              className="hero-orb"
              style={{
                width: 820, height: 820,
                top: "-260px", left: "-200px",
                background: orb1,
                animation: "orbFloat1 18s ease-in-out infinite",
              }}
            />
          </div>
          <div data-scroll data-scroll-speed="0.1" style={{ position: "absolute", inset: 0 }}>
            {/* Orb 2 — purple, bottom-right */}
            <div
              className="hero-orb"
              style={{
                width: 620, height: 620,
                bottom: "-80px", right: "-60px",
                background: orb2,
                animation: "orbFloat2 24s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <div className="hero-inner" data-scroll data-scroll-speed="0.06">

          {/* Status badge */}
          <div className="hero-badge" style={{ border: `1px solid ${t.border}`, color: t.muted }}>
            <span className="hero-badge-dot" />
            Available for new opportunities
          </div>

          {/* Heading */}
          <h1
            className="hero-heading"
            style={{ fontSize: "clamp(3rem,8.5vw,7rem)", color: t.text }}
          >
            <span className="hero-line">I&apos;m Nitish Kumar</span>
            <span className="hero-line" style={{ color: t.muted }}>MERN Stack Developer</span>
            <span className="hero-line" style={{ color: t.dim }}>&amp; DevOps Engineer.</span>
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
            <Link
              href="/projects"
              className="hero-btn-primary"
              style={{ background: t.text, color: t.inv }}
            >
              Let&apos;s Connect
            </Link>
            <Link
              href="/about"
              className="hero-btn-secondary"
              style={{ border: `1px solid ${t.border}`, color: t.muted }}
              onMouseOver={e => { e.currentTarget.style.borderColor = t.muted; e.currentTarget.style.color = t.text; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.muted; }}
            >
              About Me
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ borderTop: `1px solid ${t.border}` }}>
            {[
              ["2.5+", "Years of experience"],
              ["10+",  "Projects delivered"],
              ["3",    "Industries served"],
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
