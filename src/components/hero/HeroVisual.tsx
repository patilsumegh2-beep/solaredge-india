"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroPoster } from "./HeroPoster";

// The WebGL island is code-split and never server-rendered. It mounts only
// after the page is idle and only when conditions allow (see below).
const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => null,
});

export function HeroVisual() {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");

    // Static poster on mobile and for reduced-motion users; WebGL elsewhere.
    const decide = () => setShow3D(!reduce.matches && desktop.matches);

    // Defer the decision/mount until the browser is idle so the poster paints
    // first and the 3D bundle never competes with LCP.
    const ric = (
      window as unknown as {
        requestIdleCallback?: (c: () => void, o?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    if (ric) ric(decide, { timeout: 1500 });
    else window.setTimeout(decide, 600);
    reduce.addEventListener("change", decide);
    desktop.addEventListener("change", decide);
    return () => {
      reduce.removeEventListener("change", decide);
      desktop.removeEventListener("change", decide);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* Always-painted poster = instant LCP + permanent fallback. */}
      <div className="absolute inset-0">
        <HeroPoster />
      </div>
      {/* WebGL upgrade fades in over the poster once mounted. */}
      {show3D && (
        <div className="absolute inset-0 motion-safe:animate-[fadeIn_0.9s_ease-out]">
          <Hero3D />
        </div>
      )}
    </div>
  );
}
