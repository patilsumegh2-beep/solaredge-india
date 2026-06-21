"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/** Procedurally drawn solar-cell texture — no external asset (CSP-friendly). */
function usePanelTexture() {
  return useMemo(() => {
    const w = 480;
    const h = 768;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#1e4f7e");
    bg.addColorStop(1, "#0c2c4c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const cols = 6;
    const rows = 10;
    const pad = 16;
    const cw = (w - pad * 2) / cols;
    const ch = (h - pad * 2) / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = pad + c * cw;
        const y = pad + r * ch;
        const cell = ctx.createLinearGradient(x, y, x + cw, y + ch);
        cell.addColorStop(0, "#2a6aa0");
        cell.addColorStop(1, "#143b62");
        ctx.fillStyle = cell;
        ctx.fillRect(x + 2, y + 2, cw - 4, ch - 4);
        // subtle specular highlight in each cell
        ctx.fillStyle = "rgba(180,230,255,0.10)";
        ctx.fillRect(x + 3, y + 3, cw - 6, (ch - 6) * 0.4);
      }
    }

    ctx.strokeStyle = "rgba(0,229,255,0.85)";
    ctx.lineWidth = 2.5;
    for (let c = 0; c <= cols; c++) {
      const x = pad + c * cw;
      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, h - pad);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      const y = pad + r * ch;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(w - pad, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

function Panel() {
  const group = useRef<THREE.Group>(null);
  const tex = usePanelTexture();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    g.rotation.y = 0.3 + Math.sin(t * 0.22) * 0.2;
    g.rotation.x = 0.4 + Math.sin(t * 0.4) * 0.03;
    g.position.y = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={group} scale={1.05}>
      {/* aluminium frame */}
      <mesh>
        <boxGeometry args={[3.0, 0.05, 4.75]} />
        <meshStandardMaterial color="#33486a" metalness={0.85} roughness={0.35} />
      </mesh>
      {/* glass surface with cells (top) — nearly fills the frame to leave only a thin rim */}
      <mesh position={[0, 0.027, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.9, 4.65]} />
        <meshStandardMaterial
          map={tex ?? undefined}
          emissiveMap={tex ?? undefined}
          emissive={new THREE.Color("#00c2de")}
          emissiveIntensity={0.7}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function Energy({ count = 36 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, [count]);
  const speeds = useMemo(
    () => Array.from({ length: count }, () => 0.2 + Math.random() * 0.5),
    [count],
  );

  useFrame((_, delta) => {
    const attr = ref.current?.geometry.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (!attr) return;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + (speeds[i] ?? 0.3) * delta;
      if (y > 2.8) y = -2.8;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#5cf2ff"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Hero3D() {
  const [active, setActive] = useState(true);

  // Pause the render loop when the tab is hidden or the window loses focus.
  useEffect(() => {
    const sync = () => setActive(!document.hidden);
    const blur = () => setActive(false);
    sync();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("blur", blur);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("blur", blur);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.1, 7], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 7, 6]} intensity={2.1} color="#e6f0ff" />
      <pointLight position={[-5, 1.5, 4]} intensity={32} distance={30} decay={2} color="#00e5ff" />
      <pointLight position={[4, 3, 5]} intensity={14} distance={24} decay={2} color="#bae6fd" />
      <Panel />
      <Energy />
    </Canvas>
  );
}
