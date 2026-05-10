"use client";
/**
 * app/page.jsx  —  Main entry point
 *
 * Orchestrates: Loader → NavBar → Pages → Footer
 * All child components live in /components and /app-pages.
 */
import { useState, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";

import { DARK, LIGHT }        from "../lib/theme";

import Loader          from "../components/Loader";
import NavBar          from "../components/NavBar";
import Hero            from "../components/Hero";
import MarqueeBand     from "../components/MarqueeBand";
import Experience      from "../components/Experience";
import ProjectsBento   from "../components/ProjectsBento";
import SkillsGrid      from "../components/SkillsGrid";
import Footer          from "../components/Footer";
import CursorFollower  from "../components/CursorFollower";

import { AboutPage }    from "../app-pages/AboutPage";
import { ProjectsPage } from "../app-pages/ProjectsPage";
import { DesignsPage }  from "../app-pages/DesignsPage";

export default function Portfolio() {
  const { theme } = useTheme();
  const [dark,    setDark]    = useState(true);
  const [page,    setPage]    = useState("home");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && theme) {
      setDark(theme === "dark");
    }
  }, [theme, mounted]);

  const T        = dark ? DARK : LIGHT;
  const onDone   = useCallback(() => setLoading(false), []);
  const navigate = useCallback(p => { setPage(p); window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* ── Custom cursor ── */}
      <CursorFollower />

      {/* ── Signature loader ── */}
      {loading && <Loader onDone={onDone} />}

      {/* ── Site shell ── */}
      <div
        style={{
          background:  T.bg,
          color:       T.text,
          minHeight:   "100vh",
          fontFamily:  "var(--font-geist), 'Geist', sans-serif",
          transition:  "background .35s, color .35s",
          opacity:     loading ? 0 : 1,
        }}
      >
        <NavBar
          page={page} setPage={setPage}
          dark={dark}  setDark={setDark}
          t={T}
        />

        <main style={{ paddingTop: 60 }}>
          {/* HOME assembles all home sections */}
          {page === "home" && (
            <>
              <Hero          t={T} navigate={navigate} />
              <MarqueeBand   t={T} />
              <Experience    t={T} />
              <ProjectsBento t={T} navigate={navigate} />
              <SkillsGrid    t={T} dark={dark} />
            </>
          )}

          {page === "about"    && <AboutPage    t={T} />}
          {page === "projects" && <ProjectsPage t={T} />}
          {page === "designs"  && <DesignsPage  t={T} />}
        </main>

        <Footer t={T} navigate={navigate} />
      </div>
    </>
  );
}
