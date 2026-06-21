# CLAUDE.md — Helios Solar AI Agent Guide

> Read this before touching any file. It cuts ~60% of re-derivation cost.

---

## Project identity

| Field | Value |
|---|---|
| Site | Helios Solar — premium residential solar installer |
| Location | San Diego, CA · CSLB #1098245 |
| Stack | Next.js 15 (App Router) · Tailwind v4 · Framer Motion · TypeScript |
| Dev server | `node "D:/solar business site/node_modules/next/dist/bin/next" dev "D:/solar business site" -p 3000` |
| Preview config | `.claude/launch.json` → entry named `"solar"` |

---

## Single source of truth

**ALL brand content lives in one file: `src/content/site.ts`**

- Name, phone, email, address, areas served
- Trust signals (installs, rating, warrantyYears, totalSaved)
- Tagline (lead + accent for hero headline)
- Nav items, certifications, benefits, process steps, financing plans

To rebrand: edit `site.ts` + design tokens in `src/app/globals.css` `@theme` block. Nothing else.

---

## Architecture rules (never violate)

### CSP / nonce (CRITICAL)
- `src/middleware.ts` MUST stay in `src/`, NOT project root (root is ignored when `src/` exists)
- `layout.tsx` MUST call `await headers()` to force dynamic rendering for nonce propagation
- No `unsafe-inline` for scripts. Ever.
- Dev-only: `unsafe-eval` for HMR. Prod: `strict-dynamic` only.

### Tailwind v4
- Design tokens → `src/app/globals.css` `@theme {}` block
- Custom utilities → `@layer utilities {}` in same file
- **CRITICAL**: `@source "../**/*.{ts,tsx}";` at top of globals.css — without this, utilities aren't generated when dev server launches from sibling CWD
- No `tailwind.config.js` — v4 is CSS-first

### Forms / lead API
- Schema: `src/lib/schemas.ts` — shared Zod, client + server
- Honeypot field `company` must be `z.string().max(200).optional()` — NOT `max(0)` (Zod rejects it before route can silently drop)
- Time-trap: `elapsedMs < 2500` → silent 200
- Rate limit: 5 req / 10 min per IP (sliding window, in-memory Map)
- Route: `src/app/api/lead/route.ts`

### Component rules
- Server components by default. Add `"use client"` only for: hooks, browser APIs, event handlers
- Motion: `Reveal` wraps scroll/load reveals. Uses `immediate` prop for above-fold
- Fonts: `Montserrat` → CSS var `--font-montserrat` → `.font-tesla` utility class (Tesla headline style)
- Icons: `src/components/ui/Icon.tsx` — inline SVG by name key

---

## File ownership

| File | Owner | Notes |
|---|---|---|
| `src/content/site.ts` | Content | Single source of truth |
| `src/app/globals.css` | Design | Tokens + utilities |
| `src/middleware.ts` | Security | Nonce CSP — do not move |
| `src/lib/schemas.ts` | API | Zod schema — keep honeypot as max(200) |
| `src/app/api/lead/route.ts` | API | Rate limit + honeypot + Turnstile |
| `public/hero.jpg` | Assets | Extracted from client reference HTML |
| `src/components/hero/HeroBackdrop.tsx` | Hero | Set `HERO_PHOTO` to swap image |
| `TODO.md` | Tracking | Update after each phase |

---

## Design system tokens (globals.css @theme)

```
--color-base:     #050816  (deep space bg)
--color-surface:  #0f172a  (card bg)
--color-accent:   #00e5ff  (electric cyan — primary brand)
--color-gold:     #ffc857  (savings figures only — functional)
--color-success:  #22c55e  (success states only — functional)
--font-montserrat → .font-tesla  (hero headlines)
--font-sora       → --font-display  (section headings)
--font-inter      → --font-sans  (body)
```

---

## Hero architecture (current state)

```
Hero.tsx          "use client" — mouse parallax, aurora blobs layout
HeroBackdrop.tsx  photo + Ken Burns animation (.animate-ken)
HeroCard.tsx      "use client" — animated counter stat cards
HeroDust.tsx      "use client" — canvas floating cyan particles
```

Parallax: CSS vars `--mx`/`--my` set via `useEffect` mousemove → aurora wrapper + content + cards shift on 3 depth layers.

Photo swap: set `HERO_PHOTO` in `HeroBackdrop.tsx` + drop file in `public/`.

---

## Current phase status

| Phase | Status | Key files |
|---|---|---|
| 1 Foundation | ✅ Done | layout, middleware, globals.css, site.ts |
| 2 Hero | ✅ Done | Hero.tsx, HeroBackdrop, HeroCard, HeroDust |
| 3 Sections | ✅ Done | Benefits, EnergyFlow, Process, TrustBar |
| 4 Lead gen | ✅ Done | QuoteForm, SavingsCalculator, api/lead |
| 5 SEO/a11y | ✅ Done | FAQ, testimonials, OG, privacy, /terms, cookie consent, exit intent |
| 6 Perf/deploy | ✅ Done | next/image hero, dynamic islands, DEPLOY.md, sitemap, robots |

See `TODO.md` for detailed checklist.

---

## Common errors + fixes

| Error | Fix |
|---|---|
| Middleware silently ignored | Move `middleware.ts` to `src/` |
| Tailwind utilities missing (21 kB CSS) | Add `@source "../**/*.{ts,tsx}";` to globals.css |
| Honeypot returns 400 | Change `z.string().max(0)` → `max(200)` in schemas.ts |
| Dynamic rendering broken / nonce missing | Add `await headers()` to `layout.tsx` |
| Windows npm path error in preview | Use `node "...next/dist/bin/next"` not `npm run dev` |
| Canvas variables shadowing React | Rename `use` → `usage` in client components |

---

## Slash commands (`.claude/commands/`)

| Command | Purpose |
|---|---|
| `/commit` | Write conventional commit message |
| `/review` | Code review focused on solar site patterns |
| `/phase` | Build the next unfinished phase |
| `/rebrand` | Step-by-step rebrand workflow |
| `/lighthouse` | Lighthouse audit + remediation guide |
| `/seo-check` | SEO audit against Phase 5 checklist |

---

## Sub-agent definitions (`agents/`)

| Agent | Role |
|---|---|
| `designer.md` | UI/component changes, Tailwind, motion |
| `seo.md` | Metadata, structured data, OG, sitemap |
| `security.md` | CSP, headers, form hardening review |
| `performance.md` | Lighthouse, bundle size, lazy loading |

---

## Evals & benchmarks

- `evals/seo-checklist.md` — SEO pass gate before Phase 6
- `evals/a11y-checklist.md` — a11y pass gate
- `evals/security-checklist.md` — security pass gate
- `benchmarks/lighthouse.md` — score history (update after each build)
