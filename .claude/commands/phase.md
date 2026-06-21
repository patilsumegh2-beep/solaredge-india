# /phase — Build Next Unfinished Phase

Identify the next incomplete phase from TODO.md and implement it fully.

## Steps

1. Read `TODO.md` — find the first phase section with `[ ]` items
2. Read `CLAUDE.md` — load architecture constraints before touching any file
3. Read `src/content/site.ts` — load all brand/content data
4. Read relevant existing sections for pattern consistency
5. Implement all `[ ]` items for that phase
6. Verify with preview server (start `solar` config if not running)
7. Check console for errors
8. Run typecheck: `cd "D:/solar business site" && npx tsc --noEmit`
9. Update `TODO.md` — mark completed items `[x]`
10. Write conventional commit (`/commit`)

## Phase 5 specifics (current next phase)

Components to build:
- `src/components/sections/Testimonials.tsx` — 3 review cards with star rating, photo, name, city
- `src/components/sections/FAQ.tsx` — accordion + `FAQPage` JSON-LD (use `src/content/site.ts` for Q&A data)
- `src/components/sections/ExitIntent.tsx` — modal triggered on mouseout (above viewport), offers free guide PDF
- `src/components/seo/StructuredData.tsx` — Organization + LocalBusiness + Service + BreadcrumbList JSON-LD
- `src/app/opengraph-image.tsx` — dynamic OG via `next/og` (1200×630, brand colors)
- `src/components/layout/CookieConsent.tsx` — minimal banner, localStorage persisted
- `src/app/privacy/page.tsx` — privacy policy page
- `src/app/terms/page.tsx` — terms of service page

Add to `page.tsx`:
- Re-introduce `TrustBar` below `Hero`
- Add `Testimonials` after `Financing`
- Add `FAQ` before `QuoteForm`
- Add `ExitIntent` (renders as portal, logic in layout)

## Architecture reminders
- All new content (FAQ questions, testimonial data) goes in `src/content/site.ts`
- JSON-LD: render as `<script type="application/ld+json">` inside component, include nonce from `headers()`
- FAQ accordion: use `details`/`summary` for zero-JS fallback OR Framer Motion `AnimatePresence`
- OG image: export `generateImageMetadata` if multiple routes need it
