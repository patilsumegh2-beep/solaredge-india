"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const KEY = "helios-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const accept = () => { localStorage.setItem(KEY, "accepted"); setVisible(false); };
  const decline = () => { localStorage.setItem(KEY, "declined"); setVisible(false); };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-2xl border border-border bg-surface/95 p-5 shadow-2xl backdrop-blur-sm sm:left-6 sm:right-auto sm:w-[420px]"
    >
      <p className="text-sm leading-relaxed text-muted">
        We use essential cookies only. No tracking, no ads.{" "}
        <a href={site.legal.privacyHref} className="text-accent underline-offset-2 hover:underline">
          Privacy policy
        </a>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={accept}
          className="flex-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#1a0c00] transition-opacity hover:opacity-90"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
