# /lighthouse — Lighthouse Audit + Remediation

Run a Lighthouse audit and fix issues systematically.

## How to run (since Lighthouse CLI isn't installed)

**Option A — Chrome DevTools** (fastest):
1. Open http://localhost:3000 in Chrome
2. DevTools → Lighthouse tab → Analyze page load
3. Run for both Mobile and Desktop

**Option B — npx** (no install needed):
```bash
cd "D:/solar business site"
npx lighthouse http://localhost:3000 --output=json --output-path=./benchmarks/lighthouse-$(date +%Y%m%d).json --chrome-flags="--headless"
```

## Target scores (Phase 6 gate)
| Category | Target | Current |
|---|---|---|
| Performance | ≥ 95 | TBD |
| Accessibility | ≥ 95 | TBD |
| Best Practices | ≥ 95 | TBD |
| SEO | 100 | TBD |

Record results in `benchmarks/lighthouse.md`.

## Common remediations for this stack

### Performance
| Issue | Fix |
|---|---|
| LCP > 2.5s | Preload hero photo: `<link rel="preload" as="image" href="/hero.jpg">` in layout |
| Large JS bundle | `next/dynamic` + `ssr: false` for HeroDust, HeroCard, 3D island |
| Render-blocking resources | Fonts already optimized via `next/font` |
| Image without dimensions | Add `width`/`height` or use `fill` + `sizes` on `next/image` |
| Unused CSS | Tailwind v4 purges automatically — check `@source` directive |

### Accessibility
| Issue | Fix |
|---|---|
| Missing alt text | Add to all `<img>` and `<Image>` |
| Low color contrast | Check `--color-muted` on `--color-base` — must be ≥ 4.5:1 |
| Missing focus indicator | `.hero-btn-primary:focus-visible` — ensure `:focus-visible` rule exists |
| Form labels missing | Each input in `QuoteForm.tsx` needs a `<label>` or `aria-label` |
| Skip link not visible | `.skip-link` in globals.css — test with Tab key |

### SEO
| Issue | Fix |
|---|---|
| Missing meta description | `baseMetadata` in `src/lib/seo.ts` |
| No structured data | Add Organization/LocalBusiness JSON-LD (Phase 5) |
| Missing OG image | `src/app/opengraph-image.tsx` (Phase 5) |
| Canonical missing | Add `alternates: { canonical: SITE_URL }` to metadata |

### Best Practices
| Issue | Fix |
|---|---|
| Mixed content | All assets served from same origin |
| Deprecated APIs | Check Next.js upgrade notes |
| Console errors | Zero tolerance in production |

## After fixing
1. Re-run Lighthouse
2. Update `benchmarks/lighthouse.md` with new scores
3. Commit: `perf(lighthouse): improve [category] score from X to Y`
