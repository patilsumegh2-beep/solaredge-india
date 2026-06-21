# /seo-check — SEO Audit

Run the SEO checklist against the current build.

## Steps
1. Read `src/lib/seo.ts` — check baseMetadata
2. Read `src/content/site.ts` — verify brand data
3. Check `src/app/page.tsx` — confirm structured data imports
4. Curl the rendered HTML: check title, meta description, OG tags, canonical
5. Report against each checklist item below

## Checklist

### Meta tags
- [ ] `<title>` — includes brand name + location keyword (≤60 chars)
- [ ] `<meta name="description">` — 120-160 chars, includes primary keyword
- [ ] `<link rel="canonical">` — points to `SITE_URL`
- [ ] `<html lang="en">` — set in layout.tsx

### Open Graph
- [ ] `og:title` — same as `<title>`
- [ ] `og:description` — same as meta description
- [ ] `og:image` — 1200×630px, set in `opengraph-image.tsx`
- [ ] `og:url` — canonical URL
- [ ] `og:type` — "website"
- [ ] `og:site_name` — "Helios Solar"

### Structured data (JSON-LD)
- [ ] `Organization` — name, url, logo, contactPoint
- [ ] `LocalBusiness` — address, telephone, openingHours, geo, areaServed
- [ ] `Service` — serviceType (solar installation), provider, areaServed
- [ ] `FAQPage` — all FAQ items from `site.faq[]`
- [ ] `BreadcrumbList` — homepage breadcrumb

### Technical SEO
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible at `/robots.txt` — allows Googlebot
- [ ] No `noindex` on homepage
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- [ ] Mobile-friendly (viewport meta tag set)
- [ ] HTTPS enforced (HSTS header set)
- [ ] Page loads in < 3s on 4G

### Content SEO
- [ ] H1 present on homepage — matches tagline
- [ ] H2s for each major section
- [ ] Alt text on all images
- [ ] Internal links: nav + footer link to all major sections
- [ ] Local keywords: "San Diego solar", "solar installation San Diego" in copy
- [ ] Phone number in `tel:` format is crawlable

## Output format
```
✅ PASS: [item]
❌ FAIL: [item] — [what's missing] — [how to fix]
⚠️  WARN: [item] — [note]
```
