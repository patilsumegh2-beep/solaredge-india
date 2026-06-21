import Image from "next/image";

/**
 * Full-bleed hero backdrop. Renders a real photo when one is supplied at
 * `public/hero.jpg`, otherwise a stylized dusk SVG scene.
 *
 * PHOTO SWAP → set HERO_PHOTO = "/hero.jpg". Everything else stays.
 */
const HERO_PHOTO: string | null = "/hero.jpg";

export function HeroBackdrop() {
  if (HERO_PHOTO) {
    return (
      <Image
        src={HERO_PHOTO}
        alt="Luxury modern home with a full solar panel system at golden hour"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="animate-ken object-cover object-[center_42%]"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 700 900"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Modern home with a solar roof at dusk, energy flowing to a home battery"
    >
      <defs>
        <linearGradient id="hb-sky2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050816" />
          <stop offset="40%" stopColor="#0c1430" />
          <stop offset="68%" stopColor="#2a2f5a" />
          <stop offset="84%" stopColor="#9a5f4f" />
          <stop offset="100%" stopColor="#f0b06a" />
        </linearGradient>
        <radialGradient id="hb-sun" cx="32%" cy="64%" r="30%">
          <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#ffb24d" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffb24d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hb-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a3a5e" />
          <stop offset="100%" stopColor="#0a1c34" />
        </linearGradient>
        <filter id="hb-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hb-soft"><feGaussianBlur stdDeviation="9" /></filter>
        <radialGradient id="hb-vig" cx="50%" cy="42%" r="75%">
          <stop offset="55%" stopColor="#050816" stopOpacity="0" />
          <stop offset="100%" stopColor="#050816" stopOpacity="0.85" />
        </radialGradient>
      </defs>

      <rect width="700" height="900" fill="url(#hb-sky2)" />
      <ellipse cx="225" cy="560" rx="260" ry="190" fill="url(#hb-sun)" />
      <circle cx="225" cy="566" r="34" fill="#ffe3ad" opacity="0.9" />

      {/* clouds */}
      <g fill="#1a1530" opacity="0.5" filter="url(#hb-soft)">
        <ellipse cx="170" cy="230" rx="120" ry="22" />
        <ellipse cx="470" cy="180" rx="100" ry="18" />
        <ellipse cx="360" cy="300" rx="150" ry="20" />
      </g>

      {/* distant mountains */}
      <path d="M0 600 L120 510 L240 585 L360 500 L500 590 L620 520 L700 575 L700 900 L0 900 Z" fill="#10162e" opacity="0.85" />
      <path d="M0 660 L160 590 L300 650 L460 575 L600 645 L700 610 L700 900 L0 900 Z" fill="#0a0f22" />

      {/* house — modern two-story, lower-right */}
      <g>
        <rect x="300" y="560" width="320" height="250" fill="#0b1120" />
        <rect x="360" y="470" width="210" height="110" fill="#0e1628" />
        {/* warm windows */}
        <g fill="#ffce86">
          <rect x="322" y="600" width="58" height="78" rx="3" opacity="0.92" />
          <rect x="398" y="600" width="34" height="78" rx="3" opacity="0.8" />
          <rect x="510" y="612" width="74" height="64" rx="3" opacity="0.9" />
          <rect x="382" y="500" width="54" height="44" rx="3" opacity="0.85" />
          <rect x="470" y="500" width="70" height="44" rx="3" opacity="0.85" />
        </g>
        {/* door */}
        <rect x="446" y="700" width="40" height="110" rx="2" fill="#161f33" />
        <rect x="450" y="704" width="32" height="102" rx="2" fill="#2a3550" opacity="0.6" />

        {/* solar roof plane */}
        <polygon points="360,470 600,440 600,420 360,450" fill="#243a59" />
        <polygon points="360,450 600,420 600,332 360,362" fill="url(#hb-panel)" />
        <g stroke="#00e5ff" strokeOpacity="0.45" strokeWidth="1.2">
          <line x1="400" y1="356" x2="400" y2="444" />
          <line x1="440" y1="351" x2="440" y2="439" />
          <line x1="480" y1="346" x2="480" y2="434" />
          <line x1="520" y1="341" x2="520" y2="429" />
          <line x1="560" y1="336" x2="560" y2="424" />
          <line x1="360" y1="392" x2="600" y2="362" />
          <line x1="360" y1="420" x2="600" y2="390" />
        </g>
      </g>

      {/* wall battery */}
      <g>
        <rect x="404" y="660" width="34" height="68" rx="6" fill="#0c1626" stroke="#22344f" strokeWidth="1.5" />
        <rect x="416" y="676" width="10" height="16" rx="2" fill="#00e5ff" opacity="0.85" />
      </g>

      {/* glowing energy line: roof → battery → ground */}
      <g filter="url(#hb-glow)">
        <path
          id="hb-flow"
          d="M470 360 C 470 470, 421 540, 421 660 M421 728 C 421 770, 360 800, 300 812"
          fill="none"
          stroke="#5fe9ff"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="animate-energy"
        />
      </g>
      <circle r="3.6" fill="#d9fbff" filter="url(#hb-glow)">
        <animateMotion dur="2.8s" repeatCount="indefinite">
          <mpath href="#hb-flow" />
        </animateMotion>
      </circle>

      {/* path lights */}
      <g fill="#ffd79a">
        <circle cx="300" cy="850" r="3" opacity="0.8" />
        <circle cx="360" cy="862" r="3" opacity="0.7" />
        <circle cx="540" cy="840" r="3" opacity="0.7" />
      </g>

      <rect width="700" height="900" fill="url(#hb-vig)" />
    </svg>
  );
}
