"use client";
// components/SiteShell.jsx
//
// Persistent client shell rendered by the root layout:
// Loader → Cursor → Smooth scroll → NavBar → <route> → Footer
//
// Pages are real routes (/, /about, /projects, /designs) so every page ships
// as its own static HTML file that crawlers and AI agents can read.
import { createContext, useCallback, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { DARK, LIGHT } from "../lib/theme";
import { ROUTES } from "../lib/site";
import { useIsClient } from "../hooks/useIsClient";

import Loader         from "./Loader";
import NavBar         from "./NavBar";
import Footer         from "./Footer";
import CursorFollower from "./CursorFollower";
import SmoothScroll   from "./SmoothScroll";
import AgentTools     from "./AgentTools";

const SiteContext = createContext(null);

export function useSite() {
  return useContext(SiteContext);
}

export default function SiteShell({ children }) {
  const { theme } = useTheme();
  const router    = useRouter();
  const pathname  = usePathname();
  const isClient  = useIsClient();
  const [loading,   setLoading]   = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [firstPath] = useState(pathname);

  // Static HTML is always dark; switch to the stored theme after hydration.
  const dark = isClient && theme ? theme === "dark" : true;

  // Only animate route changes after the first page — the initial HTML must
  // paint fully visible so it counts for LCP.
  const animateIn = pathname !== firstPath;

  const T        = dark ? DARK : LIGHT;
  const onReveal = useCallback(() => setIntroDone(true), []);
  const onDone   = useCallback(() => { setLoading(false); setIntroDone(true); }, []);
  const navigate = useCallback(p => router.push(ROUTES[p]?.path ?? "/"), [router]);

  return (
    <SiteContext.Provider value={{ t: T, dark, navigate, introDone }}>
      <CursorFollower />
      <SmoothScroll paused={loading} />
      <AgentTools navigate={navigate} />

      {/* Decorative overlay only — the page underneath is rendered and
          visible from the first paint. */}
      {loading && <Loader onReveal={onReveal} onDone={onDone} />}

      <div
        style={{
          background: T.bg,
          color:      T.text,
          minHeight:  "100vh",
          fontFamily: "var(--font-geist), 'Geist', sans-serif",
          transition: "background .35s, color .35s",
        }}
      >
        <NavBar dark={dark} t={T} />

        <main
          key={pathname}
          className={animateIn ? "route-enter" : undefined}
          style={{ paddingTop: 60 }}
        >
          {children}
        </main>

        <Footer t={T} />
      </div>
    </SiteContext.Provider>
  );
}
