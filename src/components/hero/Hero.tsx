"use client";

import { useRef, useEffect } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroDust } from "./HeroDust";
import { HeroCard } from "./HeroCard";

const EASE = "cubic-bezier(.22,.61,.36,1)";

const PARALLAX_STYLE = (mx: string, my: string): React.CSSProperties => ({
  transform: `translate(calc(${mx} * 20px), calc(${my} * 16px))`,
  transition: `transform .5s ${EASE}`,
});

const stats = [
  { value: site.trust.installs, suffix: "+", label: "Homes powered", dot: true,  enterDelay: 700,  floatOffset: 0   },
  { value: 92,                  suffix: "%", label: "Lower energy bills",   dot: false, enterDelay: 850,  floatOffset: 0.6 },
  { value: site.trust.warrantyYears, suffix: "-yr", label: "Warranty included", dot: false, enterDelay: 1000, floatOffset: 1.2 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate overflow-hidden bg-black text-white"
      style={
        {
          minHeight: "100svh",
          "--mx": "0",
          "--my": "0",
        } as React.CSSProperties
      }
    >
      {/* 1. Photo backdrop with Ken Burns zoom */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <HeroBackdrop />
      </div>

      {/* 2. Dual-axis scrim: top-fade + left-side vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[9]"
        style={{
          background: [
            "linear-gradient(180deg, rgba(0,0,0,.52) 0%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 44%, rgba(0,0,0,.90) 100%)",
            "linear-gradient(90deg,  rgba(0,0,0,.68) 0%, rgba(0,0,0,.14) 46%, rgba(0,0,0,0) 72%)",
          ].join(", "),
        }}
      />

      {/* 3. Aurora glow blobs (parallax) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[8] overflow-hidden"
        style={{
          transform: "translate(calc(var(--mx,0) * 20px), calc(var(--my,0) * 16px))",
          transition: `transform .5s ${EASE}`,
        }}
      >
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      {/* 4. Floating cyan dust particles (canvas) */}
      <HeroDust />

      {/* 5. Film grain texture */}
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 z-[2]" />

      {/* 6. Bottom-left content block (parallax) */}
      <div
        className="absolute bottom-0 left-0 z-[5] px-[clamp(20px,5vw,60px)] pb-[clamp(52px,8vh,100px)] max-w-[780px]"
        style={{
          transform: "translate(calc(var(--mx,0) * 6px), calc(var(--my,0) * 4px))",
          transition: `transform .5s ${EASE}`,
        }}
      >
        <Reveal immediate>
          <span className="hero-eyebrow">Premium Home Solar</span>
        </Reveal>

        <Reveal immediate delay={0.14}>
          <h1
            className="font-tesla mt-5 font-medium leading-[1.01] tracking-tight"
            style={{
              fontSize: "clamp(40px, 7vw, 86px)",
              textShadow: "0 2px 30px rgba(0,0,0,.38)",
            }}
          >
            {site.tagline.lead}
            <br className="hidden sm:block" />{" "}
            <em className="hero-grad not-italic">{site.tagline.accent}</em>
          </h1>
        </Reveal>

        <Reveal immediate delay={0.28}>
          <p
            className="mt-5 max-w-[520px] leading-relaxed text-white/90"
            style={{
              fontSize: "clamp(16px, 1.5vw, 19px)",
              textShadow: "0 1px 16px rgba(0,0,0,.4)",
            }}
          >
            {site.tagline.sub}
          </p>
        </Reveal>

        <Reveal immediate delay={0.42}>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#quote" data-track="cta-hero-primary" className="hero-btn-primary">
              Get Free Quote
            </a>
            <a href="#benefits" data-track="cta-hero-ghost" className="hero-btn-ghost">
              How It Works
            </a>
          </div>
        </Reveal>
      </div>

      {/* 7. Right-side floating glass stat cards (hidden on mobile) */}
      <div className="pointer-events-none absolute right-[clamp(16px,4vw,54px)] top-1/2 z-[5] hidden -translate-y-1/2 lg:block">
        <div
          className="flex flex-col gap-4 pointer-events-auto"
          style={{
            transform: "translate(calc(var(--mx,0) * 22px), calc(var(--my,0) * 18px))",
            transition: `transform .5s ${EASE}`,
          }}
        >
          {stats.map((s) => (
            <HeroCard key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* 8. Scroll indicator */}
      <div className="hero-scroll-cue pointer-events-none absolute bottom-6 left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-tesla text-[11px] font-semibold uppercase tracking-[3px] text-white/75">
          Scroll
        </span>
        <span className="hero-chev" aria-hidden />
      </div>
    </section>
  );
}
