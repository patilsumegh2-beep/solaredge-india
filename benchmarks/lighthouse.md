# Lighthouse Score History — Helios Solar

> Run after each phase. Use Chrome DevTools Lighthouse tab or:
> `npx lighthouse http://localhost:3000 --output=json --output-path=./benchmarks/YYYY-MM-DD.json`

## Target (Phase 6 gate)
| Category | Target |
|---|---|
| Performance | ≥ 95 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

---

## Score history

| Date | Phase | Perf | A11y | Best | SEO | Notes |
|---|---|---|---|---|---|---|
| TBD | Phase 4 complete | — | — | — | — | First run pending |
| TBD | Phase 6 complete | — | — | — | — | next/image + dynamic islands; run prod build to measure |

---

## How to add a score

1. Run Lighthouse on the production build (`npm run build && npm run start`)
2. Note all four scores
3. Add a row to the table above
4. Note any major findings in the Notes column
5. Open issues for anything below target

## Score interpretation

| Score | Grade |
|---|---|
| 90-100 | Green ✅ |
| 50-89 | Orange ⚠️ |
| 0-49 | Red ❌ |

## First run checklist (before adding to table)
- [ ] Test on **production build** (`npm run build && npm run start`) not dev server
- [ ] Use **Incognito mode** (no extensions)
- [ ] Run **3 times** and take the median
- [ ] Test **both Mobile and Desktop** presets
- [ ] Record the device throttling setting used
