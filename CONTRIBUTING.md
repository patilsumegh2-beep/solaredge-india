# Contributing to Helios Solar

> AI agent: read `CLAUDE.md` first. It has architecture rules, file ownership, and common errors.

## Quick start

```bash
npm install
cp .env.example .env.local   # add real values for email/Turnstile
npm run dev                  # http://localhost:3000
```

## Branch strategy

```
main         production-ready, deployed
feature/*    new features — PR to main
fix/*        bug fixes — PR to main
phase/*      build phases — PR to main when phase complete
```

## Before opening a PR

```bash
npm run check          # typecheck + lint
npm run build          # ensure production build passes
```

Run `/review` slash command to self-review against the security and architecture checklist.

## Commit convention

Format: `type(scope): short description` (≤72 chars)

```
feat(hero): add Ken Burns photo animation
fix(form): honeypot returns 400 instead of silent 200
perf(css): reduce globals.css from 42kB to 28kB
security(csp): tighten img-src to self only
seo(schema): add LocalBusiness JSON-LD
docs(claude): update Phase 5 status in CLAUDE.md
```

Use `/commit` slash command to generate the message automatically.

## Rebrand workflow

See `.claude/commands/rebrand.md` — the entire site can be rebranded by editing two files.

## Phase gates

Each phase must pass its eval checklist before moving to the next:
- Phase 5 → `evals/seo-checklist.md` + `evals/a11y-checklist.md`
- Phase 6 → all three checklists + `benchmarks/lighthouse.md` ≥ 95 on all four categories

## File ownership

Don't change `src/middleware.ts` location (must be `src/`, not root).
Don't add `tailwind.config.js` (this is a Tailwind v4 CSS-first project).
Don't add `unsafe-inline` to `script-src` in middleware.
