# Helios Solar — Premium Solar Energy Website

A production-grade, conversion-focused marketing site for a solar installer.
Built **fast-core + 3D-island**: static-first pages with a single lazy-loaded
WebGL hero, hardened security headers, and a Zod-validated lead pipeline.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 (CSS-first tokens in `globals.css`) |
| Motion | Framer Motion (lazy-loaded features, reduced-motion aware) |
| 3D | React Three Fiber + drei (one lazy island — Phase 2) |
| Validation | Zod (shared client + server schemas — Phase 4) |
| Fonts | `next/font` (self-hosted Inter + Sora — no Google runtime calls) |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as phases land
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Architecture

```
src/
  app/
    layout.tsx        # fonts, metadata, header/footer shell, skip link
    page.tsx          # homepage (sections fill in across phases)
    globals.css       # design tokens + base layer (Tailwind v4 @theme)
    sitemap.ts        # dynamic sitemap
    robots.ts         # robots policy
    icon.svg          # favicon
  components/
    layout/           # Header, Footer
    ui/               # Button, Container, Section primitives
  content/
    site.ts           # SINGLE SOURCE OF TRUTH — brand, copy, data
  lib/
    seo.ts            # shared metadata
    utils.ts          # cn() class merger
middleware.ts         # per-request nonce CSP
next.config.ts        # static security headers
```

## Rebrand

Edit **`src/content/site.ts`** — name, phone, email, colors-data, areas, nav,
trust signals. Visual tokens (palette, type, radii) live in
`src/app/globals.css` under `@theme`.

## Security

- **CSP** with a per-request nonce (`middleware.ts`) — no `script-src 'unsafe-inline'`.
- **HSTS, X-Frame-Options: DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP**
  via `next.config.ts`.
- Secrets only in `.env.local` (git-ignored); only `NEXT_PUBLIC_*` reaches the browser.
- Form hardening (server Zod validation, rate limiting, honeypot, Turnstile) lands in Phase 4.

## Phase status

- [x] **Phase 1 — Foundation** (this commit)
- [ ] Phase 2 — Hero + 3D island + motion
- [ ] Phase 3 — Conversion sections
- [ ] Phase 4 — Lead gen + form security
- [ ] Phase 5 — SEO, structured data, OG, privacy/consent, a11y
- [ ] Phase 6 — Performance, security review, deployment + checklists
