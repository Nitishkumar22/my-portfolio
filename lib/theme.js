// lib/theme.js
// Design tokens — matches your original dark aesthetic (zinc-950 base)

export const DARK = {
  bg:      "#09090b",
  surface: "#111113",
  card:    "#18181b",
  border:  "rgba(255,255,255,.07)",
  text:    "#fafafa",
  muted:   "#a1a1aa",
  dim:     "#84848d", // ≥ 4.5:1 on bg/surface/card (was #3f3f46, 1.9:1)
  inv:     "#09090b",
};

export const LIGHT = {
  bg:      "#ffffff",
  surface: "#fafafa",
  card:    "#f4f4f5",
  border:  "rgba(0,0,0,.08)",
  text:    "#09090b",
  muted:   "#71717a",
  dim:     "#d4d4d8",
  inv:     "#ffffff",
};
