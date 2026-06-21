# /rebrand — Full Site Rebrand Workflow

Rebrand Helios Solar to a new client in under 10 minutes.

## The contract
Everything brand-specific lives in exactly two files:
1. `src/content/site.ts` — all text, data, contact info
2. `src/app/globals.css` `@theme {}` block — color tokens

## Steps

### 1. Gather client info (ask if not provided)
- Company name + short name
- Phone (display format + tel: format)
- Email
- Address (street, city, state, zip)
- License number (CSLB or equivalent)
- Service areas (list of city names)
- Brand colors (primary accent hex, optional secondary)

### 2. Update `src/content/site.ts`
Replace every value in the `site` object:
- `name`, `shortName`, `legalName`
- `description` (1-2 sentences, include city + key offering)
- `tagline.lead` + `tagline.accent` (hero headline split point)
- `tagline.sub`
- `phone.display` + `phone.tel`
- `email`
- `address.*`
- `areasServed[]`
- `trust.licenseNo`
- Keep numeric trust values unless client provides real ones

### 3. Update `src/app/globals.css` @theme
- `--color-accent` → new primary brand color
- `--color-accent-hover` → lighter tint (+20% lightness)
- `--color-accent-deep` → darker shade (-20% lightness)
- `--color-accent-foreground` → readable text on accent (usually dark)
- Keep `--color-base`, `--color-surface` unless client wants light theme

### 4. Swap hero photo
- Ask client for a photo: JPEG or WebP, ≥1920×1080, dark/dramatic exterior
- Drop it at `public/hero.jpg`
- `HERO_PHOTO` in `HeroBackdrop.tsx` is already set to `"/hero.jpg"`

### 5. Verify
- Start preview (`solar` launch config)
- Check hero headline, phone, address, nav links
- Confirm accent color applied across buttons, eyebrow, stat cards
- No hardcoded "Helios" or "San Diego" remaining

### 6. Commit
```
git commit -m "rebrand(content): [ClientName] — update all brand content and palette"
```

## What you do NOT need to change
- Component files (they read from `site.ts`)
- API route (email template reads `site.name`)
- SEO metadata (reads `site.name`, `site.description`)
- Security headers
- Font choices (unless client has brand font)
