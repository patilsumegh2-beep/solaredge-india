import type { ReactNode } from "react";

/** Minimal, consistent line-icon set (stroke = currentColor). */
const ICONS: Record<string, ReactNode> = {
  bolt: <path d="M13 2.5 5.5 13.5H11l-1 8 8.5-11.5H13z" />,
  savings: <path d="M13 2.5 5.5 13.5H11l-1 8 8.5-11.5H13z" />,
  independence: (
    <>
      <path d="M12 3.5v7" />
      <path d="M7.6 6.8a6.2 6.2 0 1 0 8.8 0" />
    </>
  ),
  value: (
    <>
      <path d="M4 11.2 12 4.5l8 6.7" />
      <path d="M6.2 10v9.5h11.6V10" />
      <path d="M12 17.6v-4M10.2 15.2 12 13.4l1.8 1.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 19 6v5.2c0 4.4-3 6.8-7 8.6-4-1.8-7-4.2-7-8.6V6z" />
      <path d="M9 11.8l2 2 4-4" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19.2c-1-7 5-13.2 14-13.2.3 8.6-5.6 14.4-14 13.2z" />
      <path d="M5.2 19c3.8-1 6.8-3.8 8.8-7.8" />
    </>
  ),
  monitor: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10 14.5v2.5M12.5 12v5M15 13.5v3.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.7 4.7l1.7 1.7M17.6 17.6l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.7 19.3l1.7-1.7M17.6 6.4l1.7-1.7" />
    </>
  ),
  panel: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1" />
      <path d="M4 9h16M4 12.5h16M9.3 5v11M14.6 5v11" />
      <path d="M12 16v3M9 21h6" />
    </>
  ),
  inverter: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M7 12c1.2-2.6 2.4-2.6 3.6 0s2.4 2.6 3.6 0" />
      <path d="M16.4 9.4h1.6" />
    </>
  ),
  battery: (
    <>
      <rect x="3.5" y="8" width="14" height="8" rx="1.5" />
      <path d="M17.5 10.8h2v2.4h-2" />
      <path d="M6.5 10.5v3M9.5 10.5v3M12.5 10.5v3" />
    </>
  ),
  home: (
    <>
      <path d="M4 11.2 12 4.5l8 6.7" />
      <path d="M6.2 10v9.5h11.6V10" />
      <path d="M10 19.5v-5.5h4v5.5" />
    </>
  ),
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {ICONS[name] ?? null}
    </svg>
  );
}
