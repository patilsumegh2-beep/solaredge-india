"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const KEY = "helios-exit-intent-shown";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem(KEY)) {
        setOpen(true);
        sessionStorage.setItem(KEY, "1");
        document.removeEventListener("mouseleave", onMouseOut);
      }
    };

    const t = setTimeout(() => {
      document.addEventListener("mouseleave", onMouseOut);
    }, 5000);

    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onMouseOut);
    };
  }, []);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Before you go"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />

      <div className="glass relative z-10 w-full max-w-md rounded-2xl p-8 text-center">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted hover:text-foreground transition-colors text-xl leading-none"
        >
          ×
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Wait — free offer
        </p>
        <h2 className="mt-3 text-2xl font-bold text-balance">
          Get your personalized savings estimate — free, no obligation.
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Most {site.address.city} homeowners save $2,000–$5,000/yr. Takes 30 seconds.
        </p>

        <a
          href="#quote"
          onClick={close}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-[#1a0c00] transition-opacity hover:opacity-90"
        >
          See my savings estimate →
        </a>
        <button
          onClick={close}
          className="mt-3 text-xs text-muted hover:text-foreground transition-colors"
        >
          No thanks, I'll pay full utility bills
        </button>
      </div>
    </div>
  );
}
