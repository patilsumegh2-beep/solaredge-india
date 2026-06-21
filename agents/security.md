# Security Agent — Helios Solar

> Role: CSP, security headers, form hardening, dependency audits.
> Invoke when: adding new scripts/styles, changing middleware, before deployment.

## Security architecture overview

### Layer 1 — Per-request CSP (middleware.ts in src/)
```
script-src 'self' 'nonce-{per-request}' 'strict-dynamic' [unsafe-eval in dev only]
style-src  'self' 'unsafe-inline'  (Framer Motion requires this)
img-src    'self' data: blob:
font-src   'self'
connect-src 'self' https://challenges.cloudflare.com [Turnstile]
```

**NEVER add** `'unsafe-inline'` to `script-src`. If a new script needs it, it must carry the nonce.

### Layer 2 — Static headers (next.config.ts)
- HSTS: `max-age=63072000; includeSubDomains; preload`
- X-Frame-Options: DENY (clickjacking protection)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: no camera/mic/geolocation/topics
- COOP: same-origin

### Layer 3 — Form hardening (api/lead/route.ts)
- Rate limit: 5 req / 10 min per IP (sliding window, in-memory Map — reset on restart; use Redis for prod)
- CSRF: origin check against NEXT_PUBLIC_SITE_URL (prod only)
- Honeypot: `company` field — silently drops if filled
- Time-trap: `elapsedMs < 2500` — silently drops (bots submit instantly)
- Zod: server-side validation of all fields
- Turnstile: env-toggled CAPTCHA (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`)
- Email: CR/LF stripped from all fields before sending via Resend

## Security review checklist

### Before every PR merge
- [ ] No new `unsafe-inline` in CSP
- [ ] No secrets in source (check with `grep -r "sk_" src/` etc.)
- [ ] `.env.local` is in `.gitignore`
- [ ] No `dangerouslySetInnerHTML` without sanitization (JSON-LD is the only allowed exception)
- [ ] New API routes have rate limiting
- [ ] New form fields have Zod validation + honeypot awareness

### Before deployment
- [ ] `RESEND_API_KEY` set in Vercel env (not in code)
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] `TURNSTILE_SECRET_KEY` set if Turnstile is enabled
- [ ] HSTS preload submitted to https://hstspreload.org
- [ ] Security headers verified with https://securityheaders.com
- [ ] No `console.log` with sensitive data in production routes

## Common vulnerabilities to check

| Vulnerability | Where to check | Status |
|---|---|---|
| XSS via dangerouslySetInnerHTML | StructuredData component | ✅ JSON.stringify only |
| CSRF | api/lead/route.ts origin check | ✅ prod-only check |
| SQL injection | N/A — no database | N/A |
| Command injection | N/A — no shell exec | N/A |
| Open redirect | N/A — no redirects | N/A |
| Clickjacking | X-Frame-Options: DENY | ✅ |
| Content sniffing | nosniff header | ✅ |
| Information disclosure | poweredByHeader: false | ✅ |

## Adding a new external script (e.g. analytics)

1. Get the script `src` URL
2. In `middleware.ts`, add to `script-src`: `'nonce-${nonce}'` covers inline; for external scripts add the domain
3. Load the script with the nonce prop: `<script src="..." nonce={nonce} />`
4. Test CSP with browser DevTools → Console (no CSP violation errors)
5. Verify with https://csp-evaluator.withgoogle.com

## Production rate limit upgrade

Current: in-memory Map (resets on restart, no multi-instance support).
For production with multiple Vercel serverless instances:
```ts
// Replace rate-limit.ts with Redis-based implementation
// Options: Vercel KV, Upstash Redis
// Pattern: sliding window counter with TTL
```
