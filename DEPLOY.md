# Helios Solar — Vercel Deployment Guide

## Prerequisites

- Vercel account (free tier works)
- GitHub repo with this project pushed
- DNS access for your domain

---

## 1. Environment variables

Set these in Vercel → Project → Settings → Environment Variables:

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://yourdomain.com` — no trailing slash |
| `RESEND_API_KEY` | Yes | From resend.com dashboard |
| `RESEND_TO_EMAIL` | Yes | Email that receives leads |
| `TURNSTILE_SECRET_KEY` | Yes | From Cloudflare dashboard |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes | From Cloudflare dashboard |

> **Rebrand note**: If deploying under a different brand, update `src/content/site.ts` first — all names, phone, email, and address live there.

---

## 2. Deploy steps

### Option A — Vercel dashboard (recommended for first deploy)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Output directory: `.next` (default)
6. Add all env vars from the table above
7. Click **Deploy**

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
cd "D:/solar business site"
vercel --prod
```

---

## 3. Custom domain

1. Vercel → Project → Settings → Domains
2. Add your domain (e.g. `heliossolar.com`)
3. Copy the Vercel DNS records (A + CNAME) to your registrar
4. SSL is automatic (Let's Encrypt, auto-renewed)

---

## 4. Post-deploy checklist

- [ ] Visit `/sitemap.xml` — should list homepage, /privacy, /terms
- [ ] Visit `/robots.txt` — should allow `/`, disallow `/api/`
- [ ] Visit `/opengraph-image` — should render the 1200×630 OG card
- [ ] Submit a test lead via the quote form — check inbox for Resend email
- [ ] Verify Turnstile widget appears on the quote form
- [ ] Run Lighthouse on the production URL (target: 95+ all four categories)
- [ ] Submit sitemap to Google Search Console

---

## 5. Rebrand deploy (for client white-labels)

1. Edit `src/content/site.ts` — update all values (name, phone, email, address, tagline, etc.)
2. Swap `public/hero.jpg` with the client's photo
3. Update env vars: `NEXT_PUBLIC_SITE_URL`, `RESEND_TO_EMAIL`, Turnstile keys
4. Run `npm run typecheck` locally
5. Push to GitHub → Vercel auto-deploys

---

## 6. Performance notes

- `next/image` auto-serves AVIF/WebP — no manual conversion needed
- Below-fold client islands (SavingsCalculator, FAQ, QuoteForm) are code-split via `next/dynamic`
- CSP nonce is injected per-request by `src/middleware.ts` — this forces dynamic rendering (intentional)
- Edge runtime on `/opengraph-image` — no cold-start delay for OG crawlers

---

## 7. Monitoring

- **Vercel Analytics**: enable in Project → Analytics (free tier: 2,500 events/mo)
- **Plausible** (optional): add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var, already wired in `src/lib/analytics.ts`
- **Resend logs**: resend.com → Logs — shows every lead email delivery status
