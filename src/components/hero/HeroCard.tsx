"use client";

import { useRef, useEffect } from "react";

type HeroCardProps = {
  value: number;
  suffix: string;
  label: string;
  dot?: boolean;
  /** ms before the counter starts (matches the card-in animation delay). */
  enterDelay: number;
  /** s offset for the bob-float animation so cards don't all bob in sync. */
  floatOffset: number;
};

export function HeroCard({ value, suffix, label, dot, enterDelay, floatOffset }: HeroCardProps) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = numRef.current;
      if (!el) return;
      const dur = 1700;
      const start = performance.now();
      function tick(now: number) {
        const p = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        el!.textContent = Math.round(value * ease).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, enterDelay);

    return () => clearTimeout(timer);
  }, [value, suffix, enterDelay]);

  return (
    <div
      className="hero-card"
      style={{
        animation: [
          `card-in .9s cubic-bezier(.22,.61,.36,1) ${enterDelay}ms forwards`,
          `bob-float 6s ease-in-out ${floatOffset}s infinite`,
        ].join(", "),
      }}
    >
      <div className="font-tesla text-[34px] font-semibold leading-none tracking-tight text-white">
        <span ref={numRef}>0{suffix}</span>
      </div>
      <div className="mt-2 text-[13px] font-medium text-white/80">
        {dot && (
          <span
            aria-hidden
            className="mr-2 inline-block h-2 w-2 rounded-full bg-[#5ce08a]"
            style={{ boxShadow: "0 0 10px #5ce08a" }}
          />
        )}
        {label}
      </div>
    </div>
  );
}
