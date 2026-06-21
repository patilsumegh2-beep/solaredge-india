type Pt = [number, number];

/** Four corners of the panel in perspective: top-left, top-right, bottom-right, bottom-left. */
const A: Pt = [205, 120];
const B: Pt = [470, 165];
const C: Pt = [420, 470];
const D: Pt = [120, 405];

const COLS = 6;
const ROWS = 10;

const lerp = (p: Pt, q: Pt, t: number): Pt => [
  p[0] + (q[0] - p[0]) * t,
  p[1] + (q[1] - p[1]) * t,
];

/** Bilinear interpolation across the panel quad (u,v in 0..1). */
const at = (u: number, v: number): Pt => lerp(lerp(A, B, u), lerp(D, C, u), v);

/**
 * Static, self-hosted hero visual. Paints instantly (good LCP) and is the
 * permanent fallback on mobile / reduced-motion where the WebGL panel is skipped.
 */
export function HeroPoster() {
  const vLines = Array.from({ length: COLS + 1 }, (_, i) => {
    const u = i / COLS;
    const [x1, y1] = at(u, 0);
    const [x2, y2] = at(u, 1);
    return { x1, y1, x2, y2 };
  });
  const hLines = Array.from({ length: ROWS + 1 }, (_, i) => {
    const v = i / ROWS;
    const [x1, y1] = at(0, v);
    const [x2, y2] = at(1, v);
    return { x1, y1, x2, y2 };
  });

  return (
    <svg
      viewBox="0 0 560 560"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a solar panel generating energy"
    >
      <defs>
        <radialGradient id="hp-glow" cx="62%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.42" />
          <stop offset="45%" stopColor="#1e6fae" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#050816" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hp-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#11365a" />
          <stop offset="100%" stopColor="#081a2d" />
        </linearGradient>
        <filter id="hp-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ambient glow */}
      <rect width="560" height="560" fill="url(#hp-glow)" />

      {/* sun */}
      <circle cx="430" cy="120" r="34" fill="#5cf2ff" opacity="0.18" filter="url(#hp-soft)" />
      <circle cx="430" cy="120" r="16" fill="#aef4ff" opacity="0.9" />

      {/* panel body */}
      <polygon
        points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]} ${D[0]},${D[1]}`}
        fill="url(#hp-panel)"
        stroke="#7fb4d6"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* cyan cell seams */}
      <g stroke="#00e5ff" strokeOpacity="0.5" strokeWidth="1.5">
        {vLines.map((l, i) => (
          <line key={`v${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
        {hLines.map((l, i) => (
          <line key={`h${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>

      {/* support post */}
      <path d="M 270 437 L 285 520 L 320 520 L 300 432 Z" fill="#0e2034" stroke="#1e2f49" strokeWidth="2" />

      {/* rising energy motes */}
      <g fill="#5cf2ff">
        <circle cx="350" cy="250" r="3" opacity="0.9" />
        <circle cx="300" cy="200" r="2.5" opacity="0.7" />
        <circle cx="390" cy="300" r="2" opacity="0.6" />
        <circle cx="250" cy="290" r="2.5" opacity="0.8" />
      </g>
    </svg>
  );
}
