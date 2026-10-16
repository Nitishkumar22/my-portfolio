"use client";
// components/HeroShader.jsx
//
// Three.js + GLSL aurora behind the hero. Performance rules:
//  - three is dynamically imported only after the intro, on idle, so it
//    never competes with first paint or hydration;
//  - desktop / fine-pointer only, and skipped for reduced motion or Save-Data
//    (those visitors keep the CSS orbs);
//  - renders only while the hero is on screen and the tab is visible.
import { useEffect, useRef } from "react";

const COLORS = { a: "#6366f1", b: "#a855f7" };

function shouldRender() {
  const mq = q => window.matchMedia(q).matches;
  if (mq("(prefers-reduced-motion: reduce)")) return false;
  if (!mq("(hover: hover) and (pointer: fine)")) return false;
  if (navigator.connection?.saveData) return false;
  return true;
}

export default function HeroShader({ dark, start, onReady }) {
  const hostRef  = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    if (!start || !shouldRender()) return;

    let disposed = false;
    const idle = window.requestIdleCallback ?? (cb => setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;

    const idleId = idle(async () => {
      const { createAurora } = await import("../lib/shaders/createAurora");
      const host = hostRef.current;
      if (disposed || !host) return;

      let aurora;
      try {
        aurora = createAurora({ colorA: COLORS.a, colorB: COLORS.b, intensity: dark ? 0.55 : 0.22 });
      } catch {
        return; // no WebGL → CSS orbs stay
      }
      const { canvas, uniforms } = aurora;
      canvas.setAttribute("aria-hidden", "true");
      Object.assign(canvas.style, { width: "100%", height: "100%", display: "block" });
      host.appendChild(canvas);

      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        aurora.setSize(width, height);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const target = { x: 0.5, y: 0.5 };
      const onMove = e => {
        const r = host.getBoundingClientRect();
        target.x = (e.clientX - r.left) / r.width;
        target.y = 1 - (e.clientY - r.top) / r.height;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let raf = 0, onScreen = true, last = performance.now();
      const loop = now => {
        raf = 0;
        if (!onScreen || document.hidden) return;
        uniforms.uTime.value += Math.min((now - last) / 1000, 0.05);
        last = now;
        const mouse = uniforms.uMouse.value;
        mouse.x += (target.x - mouse.x) * 0.05;
        mouse.y += (target.y - mouse.y) * 0.05;
        aurora.render();
        raf = requestAnimationFrame(loop);
      };
      const play = () => {
        if (!raf && onScreen && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); }
      };

      const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; play(); });
      io.observe(host);
      document.addEventListener("visibilitychange", play);

      stateRef.current = {
        uniforms,
        dispose() {
          cancelAnimationFrame(raf);
          io.disconnect();
          ro.disconnect();
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("visibilitychange", play);
          aurora.dispose();
          canvas.remove();
        },
      };

      play();
      onReady?.();
    });

    return () => {
      disposed = true;
      cancelIdle(idleId);
      stateRef.current?.dispose();
      stateRef.current = null;
    };
    // `dark` is applied through the uniform below without rebuilding
  }, [start]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const s = stateRef.current;
    if (s) s.uniforms.uIntensity.value = dark ? 0.55 : 0.22;
  }, [dark]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}
