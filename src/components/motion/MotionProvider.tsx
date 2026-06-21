"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

/**
 * Loads only the DOM animation feature bundle (not the full Framer Motion lib)
 * and enforces use of the lightweight `m` components via `strict`.
 * `MotionConfig reducedMotion="user"` makes every animation honor the OS setting.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
