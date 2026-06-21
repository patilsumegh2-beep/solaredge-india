# Accessibility Eval Checklist — Helios Solar

> WCAG 2.1 AA gate for Phase 6. Use axe-core or Lighthouse a11y audit.
> Target: Lighthouse Accessibility ≥ 95.

## Keyboard navigation
- [ ] Tab order is logical (top → bottom, left → right)
- [ ] Skip link visible on first Tab keypress (`Skip to content` → `#main`)
- [ ] All interactive elements reachable by keyboard
- [ ] Modal (ExitIntent) traps focus and returns on close
- [ ] No keyboard traps (can always Tab out of any component)
- [ ] Escape key closes modals/dropdowns

## Focus indicators
- [ ] All focusable elements have visible `:focus-visible` ring
- [ ] Focus ring uses brand cyan (`var(--color-accent)`) per `:focus-visible` in `globals.css`
- [ ] No `outline: none` without an alternative indicator

## Screen reader compatibility
- [ ] `<main id="main">` wraps page content ✅
- [ ] `<header>` / `<nav>` / `<footer>` landmarks present ✅
- [ ] `<h1>` — exactly one per page
- [ ] Heading hierarchy: H1 → H2 → H3 (no skips)
- [ ] All `aria-hidden` elements are truly decorative
- [ ] Dynamic content (form errors, toast) uses `aria-live="polite"`
- [ ] Icons without text have `aria-hidden` + parent has accessible label

## Color & contrast (WCAG AA)
- [ ] Body text on background: ≥ 4.5:1 (`--color-foreground` on `--color-base`)
- [ ] Muted text: ≥ 4.5:1 (`--color-muted` on `--color-base`) — verify in DevTools
- [ ] Accent/cyan on dark: ≥ 3:1 (large text) or 4.5:1 (small text)
- [ ] Buttons: text has ≥ 4.5:1 on button background
- [ ] Error states: red text has ≥ 4.5:1 on white/dark
- [ ] Not relying on color alone to convey information

## Images
- [ ] Hero photo: `alt="Luxury modern home with solar panel system at golden hour"`
- [ ] All `<img>` and `<Image>` have non-empty alt (unless `aria-hidden`)
- [ ] SVG icons: decorative ones have `aria-hidden="true"` ✅

## Forms (QuoteForm)
- [ ] All inputs have associated `<label>` or `aria-label`
- [ ] Required fields marked with `aria-required="true"` or `required`
- [ ] Error messages linked with `aria-describedby`
- [ ] Success/error states announced to screen readers (`aria-live`)
- [ ] Honeypot field is visually hidden and `tabIndex={-1}` ✅

## Motion
- [ ] All animations respect `prefers-reduced-motion` ✅
- [ ] `@media (prefers-reduced-motion: reduce)` in `globals.css` kills animations ✅
- [ ] `MotionConfig reducedMotion="user"` on Framer Motion provider ✅

## Interactive components
- [ ] FAQ accordion: `aria-expanded` + `aria-controls` on trigger button
- [ ] Cookie consent: has role, labeled buttons, keyboard operable
- [ ] Mobile nav menu: `aria-expanded`, `aria-label="Menu"`, closes with Escape

## Status: ⏳ Not yet run
Last run: N/A
Passed: 0/38
