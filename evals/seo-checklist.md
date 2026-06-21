# SEO Eval Checklist — Helios Solar

> Gate for Phase 6. All items must pass before deployment.
> Run with `/seo-check` slash command.

## Meta & discovery
- [ ] `<title>` — "Helios Solar — Solar Installation in San Diego, CA" (≤60 chars)
- [ ] `<meta name="description">` — 120-160 chars, includes "solar installation", "San Diego"
- [ ] `<link rel="canonical" href="https://helios-solar.example.com">` in `<head>`
- [ ] `<html lang="en">` set
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">` set
- [ ] Favicon present at `/icon.svg` ✅ (already done)
- [ ] `robots.txt` at `/robots.txt` — allows Googlebot ✅
- [ ] `sitemap.xml` at `/sitemap.xml` — includes homepage ✅

## Open Graph
- [ ] `og:title` set
- [ ] `og:description` set
- [ ] `og:image` — 1200×630, set in `opengraph-image.tsx`
- [ ] `og:url` set to canonical
- [ ] `og:type` = "website"
- [ ] `og:site_name` = "Helios Solar"
- [ ] `twitter:card` = "summary_large_image"

## Structured data (JSON-LD)
- [ ] `Organization` schema — name, url, logo, contactPoint
- [ ] `LocalBusiness` schema — address, phone, hours, geo, areaServed
- [ ] `Service` schema — serviceType "Solar Panel Installation", provider
- [ ] `FAQPage` schema — all FAQ items
- [ ] `BreadcrumbList` schema — homepage breadcrumb
- [ ] All JSON-LD validates at https://validator.schema.org

## On-page content
- [ ] H1 present — "Own Your Energy Future." (matches tagline)
- [ ] H2s for each section — Benefits, Process, Savings, Financing, FAQ
- [ ] All images have descriptive alt text
- [ ] Hero photo alt: "Luxury home with solar panels at sunset, San Diego"
- [ ] "San Diego solar installation" in above-fold copy
- [ ] Service areas mentioned in footer or copy
- [ ] NAP (Name/Address/Phone) consistent across page and schema

## Core Web Vitals (mobile)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms

## Links
- [ ] No broken internal links
- [ ] Phone number is a `tel:` link
- [ ] Email is a `mailto:` link
- [ ] All CTA buttons link to `#quote`
- [ ] Footer has links to /privacy and /terms

## Status: ⏳ Not yet run
Last run: N/A
Passed: 0/35
