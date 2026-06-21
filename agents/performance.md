# Performance Agent — Helios Solar

> Role: Lighthouse optimization, bundle size, lazy loading, Core Web Vitals.
> Invoke when: Phase 6, before deployment, after adding heavy dependencies.

## Current performance profile

| Metric | Target | Notes |
|---|---|---|
| First Load JS | < 130 kB | Check with `npm run build` output |
| LCP | < 2.5s | Hero photo is critical path |
| CLS | < 0.1 | Reserve space for images |
| FID/INP | < 100ms | Interactive elements |
| Lighthouse Perf | ≥ 95 | Mobile + Desktop |

## Known heavy components

| Component | Bundle strategy | Status |
|---|---|---|
| `HeroDust.tsx` | Client, canvas — lazy load? | Ships immediately |
| `HeroCard.tsx` | Client, counters — small | Ships immediately |
| `Hero3D.tsx` | Three.js island — `next/dynamic ssr:false` | Lazy loaded |
| `QuoteForm.tsx` | Client form — below fold | Ships with page |
| `SavingsCalculator.tsx` | Client, math — below fold | Ships with page |

## Optimization checklist

### Hero image (LCP critical)
```tsx
// In layout.tsx <head>:
<link rel="preload" as="image" href="/hero.jpg" fetchPriority="high" />
```
Or use `next/image` with `priority` prop:
```tsx
<Image src="/hero.jpg" alt="..." fill priority sizes="100vw" />
```

### Lazy load below-fold client islands
```tsx
// Replace direct import:
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
// With:
const SavingsCalculator = dynamic(() => import("@/components/sections/SavingsCalculator"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
```

Apply to: `SavingsCalculator`, `QuoteForm`, `Financing` (if it has client logic).

### Font optimization
- Already using `next/font` with `display: swap` — no action needed
- Fonts: Inter (variable), Sora (subsetted weights), Montserrat (subsetted weights)

### Image optimization
- `public/hero.jpg` is 294 kB JPEG — convert to WebP/AVIF for ~50% savings
- Use `next/image` everywhere (auto AVIF/WebP via `next.config.ts`)
- Add `sizes` prop for responsive images

### CSS optimization
- Tailwind v4 purges at build time
- Verify `@source` directive is scanning all component files
- Target: < 20 kB CSS (gzipped)

### Bundle analysis
```bash
cd "D:/solar business site"
ANALYZE=true npm run build
# Or: npx @next/bundle-analyzer
```

## Core Web Vitals debugging

### LCP (Largest Contentful Paint)
1. Open Chrome DevTools → Performance tab
2. Record page load
3. Find LCP element — should be hero photo
4. If > 2.5s: add preload link, check image size

### CLS (Cumulative Layout Shift)
1. Chrome DevTools → Rendering → Layout Shift Regions
2. Common causes: images without dimensions, late-loading fonts
3. Fix: `width`/`height` on all images, `font-display: swap`

### INP (Interaction to Next Paint)
1. Click "Get Free Quote" button — should respond < 200ms
2. Throttle CPU to 4x slowdown
3. If slow: debounce heavy handlers, defer non-critical work

## Performance budget

| Resource | Budget |
|---|---|
| Hero JS (First Load) | < 130 kB |
| CSS (compressed) | < 20 kB |
| Hero image | < 200 kB (WebP) |
| Total page weight | < 1 MB |
| TTI | < 3.5s (mobile 4G) |

## After optimization
1. Run Lighthouse (npx or Chrome DevTools)
2. Update `benchmarks/lighthouse.md`
3. Run `/commit` with type `perf`
