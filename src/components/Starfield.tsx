// Ambient Three.js particle field rendered behind the terminal UI.
// Procedural only - no external assets. Safe fallbacks:
//  - renders nothing if WebGL is unavailable
//  - pauses when the tab is hidden
//  - renders a static frame under prefers-reduced-motion
import { useEffect, useRef } from "react";
import * as THREE from "three";

const CYAN = new THREE.Color("#00f5ff");
const GREEN = new THREE.Color("#39ff14");

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Starfield() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let disposed = false;
    const raf = { id: 0 };

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // WebGL unavailable - no background, site still works
    }

    const reduced = prefersReducedMotion();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 24;

    // Count particles proportional to viewport area (cheap density scaling).
    const area = window.innerWidth * window.innerHeight;
    const count = Math.min(1600, Math.max(500, Math.round(area / 1400)));

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute in a flattened sphere shell so the camera sits inside it.
      const r = 14 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.45; // flatten
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.4 + Math.random() * 1.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    // Procedural soft-dot sprite (no asset files).
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(255,255,255,0.6)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    }
    const sprite = new THREE.CanvasTexture(spriteCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.55,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: false,
      color: CYAN,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Secondary green drift layer, sparser.
    const greenGeo = new THREE.BufferGeometry();
    const gCount = Math.floor(count / 4);
    const gPos = new Float32Array(gCount * 3);
    for (let i = 0; i < gCount; i++) {
      const r = 18 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      gPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      gPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      gPos[i * 3 + 2] = r * Math.cos(phi);
    }
    greenGeo.setAttribute("position", new THREE.BufferAttribute(gPos, 3));
    const greenMat = new THREE.PointsMaterial({
      size: 0.8,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: GREEN,
      opacity: 0.28,
      sizeAttenuation: true,
    });
    const greenPoints = new THREE.Points(greenGeo, greenMat);
    scene.add(greenPoints);

    const resize = () => {
      if (!host || disposed) return;
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer!.setSize(w, h);
      renderer!.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    host.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";

    // Pointer parallax (lerped toward cursor).
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf.id);
      else if (!reduced) tick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let t = 0;
    const tick = () => {
      if (disposed) return;
      t += 0.0016;
      points.rotation.y = t * 0.32;
      points.rotation.x = Math.sin(t * 0.21) * 0.06;
      greenPoints.rotation.y = -t * 0.18;
      // Lerp camera toward pointer for a subtle parallax depth cue.
      camera.position.x += (target.x * 1.6 - camera.position.x) * 0.03;
      camera.position.y += (-target.y * 1.0 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer!.render(scene, camera);
      raf.id = requestAnimationFrame(tick);
    };

    if (!reduced) {
      tick();
    } else {
      renderer.render(scene, camera); // single static frame
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf.id);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      greenGeo.dispose();
      material.dispose();
      greenMat.dispose();
      sprite.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />;
}
