# /review — Code Review for Helios Solar

Review staged or recent changes for correctness, security, and pattern compliance.

## Review checklist

### Security (fail-fast — block merge if any fail)
- [ ] No secrets in code (API keys, tokens, passwords)
- [ ] No `unsafe-inline` added to CSP (`src/middleware.ts`)
- [ ] Honeypot field stays `z.string().max(200).optional()` in schemas.ts
- [ ] Rate limit not removed from `api/lead/route.ts`
- [ ] No user input passed to shell commands or SQL

### Architecture compliance
- [ ] `middleware.ts` stays in `src/` (not project root)
- [ ] `await headers()` preserved in `layout.tsx`
- [ ] `@source "../**/*.{ts,tsx}";` preserved at top of `globals.css`
- [ ] New client components have `"use client"` directive
- [ ] No new `tailwind.config.js` or `@apply` in components

### Content / brand
- [ ] New copy references `site.ts` constants, not hardcoded strings
- [ ] No hardcoded phone/email/address (use `site.phone`, `site.email`, etc.)
- [ ] Color references use CSS vars (`var(--color-accent)`) not raw hex

### Performance
- [ ] New images use `next/image` or have explicit dimensions
- [ ] No synchronous imports of heavy libraries at module level
- [ ] New client islands are lazy-loaded via `next/dynamic` if below fold

### Accessibility
- [ ] Interactive elements have accessible labels (aria-label or visible text)
- [ ] Color contrast meets AA (4.5:1 text, 3:1 UI)
- [ ] Focus styles not removed (`outline: none` without replacement)
- [ ] Images have meaningful alt text (not empty unless decorative)

## Output format
For each issue found:
```
[SEVERITY] file:line — description. Suggested fix.
```

Severity: 🔴 BLOCK | 🟡 WARN | 🟢 SUGGEST

If no issues: `✅ Looks good. No blockers found.`
