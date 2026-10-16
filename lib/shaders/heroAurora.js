// lib/shaders/heroAurora.js
// GLSL for the hero backdrop: two drifting, noise-warped colour fields
// (indigo + purple, matching the site accent) that lean toward the cursor.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;     // 0..1, eased on the CPU
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform float uIntensity; // lower in light mode

  varying vec2 vUv;

  // 2D simplex noise — Ashima Arts / Stefan Gustavson (MIT)
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p  = p * 2.02 + 17.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
    vec2 m = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5);
    float t = uTime * 0.05;

    // Domain warp so the blobs feel liquid rather than circular
    vec2 warp = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 4.0));
    vec2 q = p + 0.35 * warp + 0.08 * (m - p);

    vec2 cA = vec2(-0.55 * aspect * 0.6, 0.28) + 0.18 * vec2(sin(t * 4.0), cos(t * 3.0));
    vec2 cB = vec2( 0.50 * aspect * 0.6, -0.30) + 0.20 * vec2(cos(t * 3.4), sin(t * 2.6));

    float a = smoothstep(0.75, 0.0, length(q - cA));
    float b = smoothstep(0.65, 0.0, length(q - cB));
    float glow = smoothstep(0.45, 0.0, length(p - m)) * 0.35;

    vec3  col   = uColorA * a + uColorB * b + mix(uColorA, uColorB, 0.5) * glow;
    float alpha = clamp((a + b * 0.8 + glow) * uIntensity, 0.0, 1.0);

    // Tiny dither to kill gradient banding
    alpha += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;

    gl_FragColor = vec4(col * alpha, alpha); // premultiplied
  }
`;
