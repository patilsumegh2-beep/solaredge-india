"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

/**
 * Conversion dock that slides up after the hero scrolls away and hides again
 * once the visitor reaches the quote form (no point nagging them there).
 */
export function StickyCTA() {
  const reduce = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("quote");
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setAtForm(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px 0px -40% 0px" },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const visible = pastHero && !atForm;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={reduce ? { opacity: 0 } : { y: 120, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 120, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-border-strong bg-surface/80 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <p className="ml-2 hidden flex-1 text-sm font-medium text-foreground/90 sm:block">
              Ready to cut your power bill?
              <span className="text-muted"> Free quote in minutes.</span>
            </p>
            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
              <Button
                href={`tel:${site.phone.tel}`}
                variant="secondary"
                size="sm"
                data-track="call-click"
              >
                Call now
              </Button>
              <Button href={site.cta.primary.href} size="sm" data-track="cta-sticky">
                {site.cta.primary.label}
              </Button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
