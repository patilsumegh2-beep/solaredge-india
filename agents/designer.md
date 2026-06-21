# Designer Agent — Helios Solar

> Role: UI/UX changes, component work, Tailwind, motion, responsive design.
> Invoke when: building new sections, fixing layout issues, visual regressions.

## Constraints (read before every change)

- Design tokens: ONLY use CSS vars from `globals.css @theme`. No raw hex in components.
- Color palette: `--color-accent` (cyan) for CTAs and highlights. `--color-gold` ONLY for savings numbers. `--color-success` ONLY for success states. No decoration.
- Typography: `font-tesla` (Montserrat) for headlines. `--font-display` (Sora) for section headings. `--font-sans` (Inter) for body.
- Motion: use `Reveal` for scroll reveals. Always pass `immediate` for above-fold. Respect `prefers-reduced-motion`.
- Client components: add `"use client"` only when using hooks or browser events. Everything else is server.
- Spacing: use `--spacing-section` (7rem) for section padding via `py-[var(--spacing-section)]`.

## Component patterns

### Section structure
```tsx
<section id="section-id" className="scroll-mt-24 border-t border-border/60 py-[var(--spacing-section)]">
  <Container>
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Eyebrow</p>
      <h2 className="mt-3 text-balance text-4xl font-bold lg:text-5xl">Heading</h2>
    </Reveal>
    {/* content */}
  </Container>
</section>
```

### Card pattern (glass variant)
```tsx
<div className="glass rounded-2xl p-6">
  {/* content */}
</div>
```

### CTA button
```tsx
<Button href="#quote" data-track="cta-[section]">Get Free Quote</Button>
```

## Motion rules
- Above fold: `<Reveal immediate>` — animates on mount
- Below fold: `<Reveal>` — animates on scroll enter
- Stagger siblings: add `delay={index * 0.1}` to each `Reveal`
- Reduced motion: Reveal returns plain `<div>` when `useReducedMotion()` is true

## Responsive breakpoints
- Mobile first. sm: 640px, md: 768px, lg: 1024px, xl: 1280px
- Content max-width: `max-w-5xl` for narrow content, `max-w-7xl` for grids
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` pattern

## After changes
1. Start preview (`solar` launch config)
2. Check at mobile (375px) and desktop (1280px)
3. Check with `prefers-reduced-motion` emulation in DevTools
4. Zero console errors required
5. Run `/commit` to write conventional commit
