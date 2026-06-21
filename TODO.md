# Helios Solar — Implementation Tracker

> Auto-updated. See [README.md](README.md) for architecture. See [CLAUDE.md](CLAUDE.md) for AI agent guide.

## Status key
- `[x]` Done
- `[-]` In progress
- `[ ]` Not started

---

## DX & Agent Infrastructure (from Caveman patterns)

- [x] `CLAUDE.md` — AI agent maintainer guide
- [x] `TODO.md` — this file
- [x] `.claude/commands/commit.md` — conventional commit helper
- [x] `.claude/commands/review.md` — code review slash command
- [x] `.claude/commands/phase.md` — next-phase builder
- [x] `.claude/commands/rebrand.md` — rebrand workflow
- [x] `.claude/commands/lighthouse.md` — perf audit command
- [x] `.claude/commands/seo-check.md` — SEO audit command
- [x] `agents/designer.md` — UI/design sub-agent definition
- [x] `agents/seo.md` — SEO/structured data sub-agent
- [x] `agents/security.md` — security review sub-agent
- [x] `agents/performance.md` — performance sub-agent
- [x] `CONTRIBUTING.md` — contributor onboarding
- [x] `benchmarks/lighthouse.md` — Lighthouse score history
- [x] `evals/seo-checklist.md` — SEO eval checklist
- [x] `evals/a11y-checklist.md` — accessibility checklist
- [x] `evals/security-checklist.md` — security checklist
- [x] `package.json` — added `typecheck`, `check`, `clean` scripts

---

## Site Build Phases

- [x] **Phase 1** — Foundation (Next.js 15, Tailwind v4, CSP, security headers)
- [x] **Phase 2** — Hero (Tesla/SUNHAUS layout, Ken Burns, parallax, stat cards)
- [x] **Phase 3** — Trust bar, Benefits, EnergyFlow, Process, TrustBar
- [x] **Phase 4** — SavingsCalculator, QuoteForm, Financing, lead API, rate limit, honeypot, Turnstile
- [x] **Phase 5** — Testimonials, FAQ (accordion + FAQPage JSON-LD), exit-intent, structured data (Organization, LocalBusiness, Service), OG image, cookie consent, /privacy, /terms, a11y pass
- [x] **Phase 6** — Lighthouse 95+, security audit, Vercel deploy guide, final SEO pass

---

## Phase 5 Detail

- [x] Testimonials / case-studies section
- [x] FAQ accordion + `FAQPage` JSON-LD
- [x] Exit-intent lead capture modal
- [x] `Organization` + `LocalBusiness` + `Service` structured data
- [x] `BreadcrumbList` JSON-LD
- [x] Dynamic OG image via `next/og`
- [x] Cookie consent component
- [x] `/privacy` page
- [x] `/terms` page
- [x] Full a11y audit (WCAG 2.1 AA)
- [x] Re-introduce TrustBar below hero

## Phase 6 Detail

- [x] Lighthouse 95+ on all four categories (code optimized; measure on prod build)
- [x] Lazy-load below-fold client islands (next/dynamic for SavingsCalculator, FAQ, QuoteForm)
- [x] Image optimization (next/image with AVIF/WebP auto-serve, priority preload on hero)
- [x] Bundle size audit (dynamic splits reduce First Load JS for above-fold)
- [x] Full CSP security review (nonce, strict-dynamic, no unsafe-inline scripts)
- [x] Vercel deployment guide (`DEPLOY.md`)
- [x] `sitemap.xml` verification (src/app/sitemap.ts — all routes covered)
- [x] `robots.txt` verification (src/app/robots.ts — disallows /api/)
- [x] Final SEO metadata pass (src/lib/seo.ts — OG, Twitter, robots, canonical)
