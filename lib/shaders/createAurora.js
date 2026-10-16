// lib/shaders/createAurora.js
// Three.js scene for the hero aurora. Imported lazily by HeroShader, with
// named imports so the bundler can tree-shake the rest of three.
import {
  Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial,
  Vector2, WebGLRenderer,
} from "three";
import { vertexShader, fragmentShader } from "./heroAurora";

export function createAurora({ colorA, colorB, intensity }) {
  const renderer = new WebGLRenderer({
    alpha: true, antialias: false, powerPreference: "low-power", premultipliedAlpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const uniforms = {
    uTime:      { value: 0 },
    uRes:       { value: new Vector2(1, 1) },
    uMouse:     { value: new Vector2(0.5, 0.5) },
    uColorA:    { value: new Color(colorA) },
    uColorB:    { value: new Color(colorB) },
    uIntensity: { value: intensity },
  };

  const scene    = new Scene();
  const camera   = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    uniforms, vertexShader, fragmentShader,
    transparent: true, depthTest: false, depthWrite: false,
    premultipliedAlpha: true,
  });
  scene.add(new Mesh(geometry, material));

  return {
    canvas: renderer.domElement,
    uniforms,
    setSize(width, height) {
      renderer.setSize(width, height, false);
      uniforms.uRes.value.set(width, height);
    },
    render() {
      renderer.render(scene, camera);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
