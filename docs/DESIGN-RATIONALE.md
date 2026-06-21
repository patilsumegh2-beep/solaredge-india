# Helios Solar — Design Rationale & Decisions

A living record of *why* the site is built the way it is. Synthesises the
strongest patterns from **Tesla Energy** (craft) and **Enphase** (conversion)
for a **local solar installer whose goal is qualified lead generation.**

---

## 1. Competitive synthesis (Tesla × Enphase)

| | Tesla Energy | Enphase | Helios target |
|---|---|---|---|
| Visual craft / luxury | 10 | 7 | 9 |
| Emotional storytelling | 9 | 6 | 8 |
| Motion design | 9 | 6 | 8 |
| Lead-gen architecture | 5 | 9 | 10 |
| Education / de-risking | 5 | 9 | 8 |
| Trust mechanisms | 6 | 9 | 9 |
| Mobile | 8 | 7 | 9 |
| **Overall** | **≈8.3** | **≈8.1** | **≈9.3** |

**Blend: 70% Tesla (the feel) + 30% Enphase (the machinery).**

- **From Tesla:** deep-space canvas, one idea per viewport, oversized type,
  single electric accent, slow/purposeful motion, cinematic 3D.
- **From Enphase:** trust bar, education ("how it works"), transparent process,
  financing clarity, calculator lead-magnet, recurring conversion paths.

### Weaknesses eliminated
- Tesla's thin local lead capture → above-fold quote CTA + sticky dock + scroll re-ask.
- Tesla's low proof/education → trust bar, how-it-works, process, (coming) case studies + FAQ.
- Enphase's visual overload → Tesla restraint, disciplined hierarchy, generous whitespace.
- Both sites' price opacity → (coming) savings calculator + financing transparency.

---

## 2. Design system

### Color tokens (`src/app/globals.css` → `@theme`)
| Token | Value | Use |
|---|---|---|
| `--color-base` | `#050816` | Page canvas |
| `--color-surface` | `#0F172A` | Cards |
| `--color-foreground` | `#F4F8FF` | Text (comfortable near-white, not harsh `#FFF`) |
| `--color-accent` | `#00E5FF` | Primary electric-blue accent |
| `--color-gold` | `#FFC857` | **Functional only** — savings $ figures, star ratings |
| `--color-success` | `#22C55E` | **Functional only** — success/savings states |

> Decision: gold & green are *never decorative* (the earlier "vibe-coded" green
> badge was removed). They appear only where they reinforce a savings/trust message.

### Typography
Display: **Sora** (headings) · Body: **Inter** — both self-hosted via `next/font`
(no Google runtime calls; better privacy + CSP). Fluid scale via Tailwind `text-*`.

### Motion guidelines
- `LazyMotion` + `m` components (load only the animation feature bundle).
- Animate **transform/opacity only** (compositor-friendly).
- Every animation honors `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`
  + a global reduced-motion CSS reset).
- Reveals are subtle (0.6s, expo-out), staggered; hero plays on load, sections on scroll-in.

---

## 3. Architecture decisions

- **Stack:** Next.js 15 (App Router, TS) · Tailwind v4 · Framer Motion · React Three Fiber · Zod.
- **"Fast core + 3D island":** static-first pages; the **only** WebGL context is the
  hero panel — code-split, idle/viewport/reduced-motion/mobile-gated, with an SVG poster
  as the LCP element. Homepage First Load JS ≈ **116 kB**.
- **One 3D context rule:** section #8 (energy visualization) is rendered as a
  scroll-animated **SVG/CSS** energy-flow diagram, *not* a second WebGL canvas — keeps
  Lighthouse 95+ realistic on mobile.

---

## 4. Security decisions (running log)

| Decision | Rationale |
|---|---|
| **Nonce-based CSP** in `src/middleware.ts` | Strict `script-src 'self' 'nonce' 'strict-dynamic'` — no `unsafe-inline` scripts. Per-request nonce. |
| Middleware lives in `src/` | With a `src/` dir, a root `middleware.ts` is silently ignored. Verified registered (`ƒ Middleware`). |
| Root layout `await headers()` | Forces dynamic rendering so the per-request nonce lands on prerendered scripts (else CSP blocks hydration). Verified: all script tags carry the matching nonce. |
| Static headers in `next.config.ts` | HSTS (preload), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP. |
| `style-src 'unsafe-inline'` (only) | Required by Framer/inline style attrs; far lower risk than script inline. |
| Secrets in `.env.local` only | Only `NEXT_PUBLIC_*` reaches the browser; nothing committed. |
| Self-hosted fonts | No third-party origins in CSP; GDPR-friendly. |
| **Server-side Zod validation** (`/api/lead`) | Single schema shared client+server; the client is never trusted. Bad input → generic 400 (no leakage). |
| **Rate limiting** | 5 requests / 10 min per IP (in-memory; Upstash path documented). Verified → 429. |
| **Honeypot + time-trap** | Hidden `company` field + sub-2.5s submit → silently accepted-and-dropped (bots get no signal). Verified. |
| **CSRF** | Same-origin `Origin` check enforced in production. |
| **CAPTCHA** | Cloudflare Turnstile, env-toggled (`TURNSTILE_SECRET_KEY`); siteverify on the server. |
| **No injection surface** | Email is plain-text only (no HTML built from input); header fields stripped of CR/LF; React auto-escapes all rendered output; no `dangerouslySetInnerHTML`. |
| Secrets server-only | Resend/Turnstile keys never reach the client; graceful no-op when unset. |

**Verified (curl + browser):** valid → 200, invalid → 400, honeypot → silent 200,
time-trap → silent 200, 6th rapid request → 429, `GET` → 405, full multi-step
submit → 200 with the lead captured server-side.

---

## 5. Phase status
- [x] P1 Foundation · [x] P2 Hero + 3D + motion · [x] P3 Trust/Benefits/How-it-works/Process
- [x] P4 Savings calculator + multi-step quote + financing + form security
- [ ] P5 Case studies + testimonials + FAQ + exit-intent + full SEO/schema
- [ ] P6 Performance + security review + deployment + checklists
