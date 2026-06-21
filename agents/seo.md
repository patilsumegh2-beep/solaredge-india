# SEO Agent — Helios Solar

> Role: metadata, structured data, OG images, sitemap, robots, local SEO.
> Invoke when: Phase 5 SEO work, adding new pages, checking search visibility.

## File map

| File | Purpose |
|---|---|
| `src/lib/seo.ts` | `baseMetadata` object — title template, description, OG |
| `src/app/sitemap.ts` | Dynamic sitemap generator |
| `src/app/robots.ts` | Robots policy |
| `src/app/opengraph-image.tsx` | Dynamic OG image (Phase 5) |
| `src/content/site.ts` | All brand data used in metadata |

## Metadata template (lib/seo.ts)

```ts
export const baseMetadata: Metadata = {
  title: { default: "Helios Solar — San Diego Solar Installation", template: "%s | Helios Solar" },
  description: site.description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
```

## Structured data patterns

### Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Helios Solar",
  "url": "https://helios-solar.example.com",
  "logo": "https://helios-solar.example.com/logo.png",
  "contactPoint": { "@type": "ContactPoint", "telephone": "+16195550142", "contactType": "customer service" }
}
```

### LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Helios Solar",
  "address": { "@type": "PostalAddress", "streetAddress": "1200 Harbor Drive, Suite 400", "addressLocality": "San Diego", "addressRegion": "CA", "postalCode": "92101" },
  "geo": { "@type": "GeoCoordinates", "latitude": 32.7157, "longitude": -117.1611 },
  "telephone": "+16195550142",
  "openingHours": "Mo-Sa 07:00-19:00",
  "areaServed": ["San Diego", "La Jolla", "Chula Vista"]
}
```

### FAQPage (template)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Q?", "acceptedAnswer": { "@type": "Answer", "text": "A." } }
  ]
}
```

## Rendering JSON-LD (with CSP nonce)

```tsx
// Server component — has access to headers()
import { headers } from "next/headers";

export async function StructuredData({ schema }: { schema: object }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## OG image (`src/app/opengraph-image.tsx`)

```tsx
import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div style={{ background: "#050816", color: "#fff", display: "flex", /* ... */ }}>
      <div style={{ color: "#00e5ff" }}>HELIOS SOLAR</div>
      <div>Own Your Energy Future.</div>
    </div>
  );
}
```

## Local SEO priorities
1. "solar installation San Diego" — primary keyword
2. "solar panels San Diego" — secondary
3. "residential solar San Diego" — tertiary
4. Include service areas in footer + LocalBusiness schema `areaServed`
5. Google Business Profile: NAP (name, address, phone) must match exactly

## Checklist before Phase 6
Run `/seo-check` and resolve all ❌ items.
