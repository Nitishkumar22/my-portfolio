"use client";
// hooks/useTypewriter.js
import { useState, useEffect } from "react";

export function useTypewriter(words, speed = 85) {
  const [idx,  setIdx]  = useState(0);
  const [char, setChar] = useState(0);
  const [del,  setDel]  = useState(false);
  const [out,  setOut]  = useState("");

  useEffect(() => {
    const w = words[idx % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setOut(w.slice(0, char + 1));
        if (char + 1 === w.length) setTimeout(() => setDel(true), 1800);
        else setChar(c => c + 1);
      } else {
        setOut(w.slice(0, char - 1));
        if (char === 0) { setDel(false); setIdx(i => (i + 1) % words.length); }
        else setChar(c => c - 1);
      }
    }, del ? 38 : speed);
    return () => clearTimeout(t);
  });

  return out;
}
