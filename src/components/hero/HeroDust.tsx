"use client";

import { useRef, useEffect } from "react";

export function HeroDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const hero = cv.parentElement!;
    let W = 0, H = 0;
    let dots: Array<{ x: number; y: number; r: number; s: number; a: number; p: number }> = [];
    let animId = 0;

    function resize() {
      W = cv!.width = hero.clientWidth;
      H = cv!.height = hero.clientHeight;
      dots = Array.from({ length: Math.round(W / 22) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.2 + 0.5,
        s: Math.random() * 0.45 + 0.12,
        a: Math.random() * 0.42 + 0.14,
        p: Math.random() * Math.PI * 2,
      }));
    }

    function loop() {
      ctx!.clearRect(0, 0, W, H);
      for (const d of dots) {
        d.y -= d.s;
        d.p += 0.018;
        if (d.y < -6) d.y = H + 6;
        const alpha = d.a * (0.55 + 0.45 * Math.sin(d.p));
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(34,197,94,${alpha.toFixed(3)})`;
        ctx!.shadowColor = "rgba(74,222,128,0.65)";
        ctx!.shadowBlur = 7;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;
      animId = requestAnimationFrame(loop);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-[2]"
      aria-hidden
    />
  );
}
