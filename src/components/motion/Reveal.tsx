"use client";

import { m, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Animation delay in seconds (use for staggering siblings). */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  /** Play immediately on mount (for above-the-fold) instead of on scroll-in. */
  immediate?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll/-load reveal wrapper. Compositor-friendly (opacity + transform only)
 * and a no-op when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  immediate = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const target = { opacity: 1, y: 0 };
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: "-80px" } })}
    >
      {children}
    </m.div>
  );
}
