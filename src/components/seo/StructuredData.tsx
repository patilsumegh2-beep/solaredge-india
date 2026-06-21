import { site, SITE_URL } from "@/content/site";

function LD({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <LD
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.name,
        legalName: site.legalName,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone.tel,
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: "English",
        },
        sameAs: [site.social.instagram, site.social.linkedin, site.social.youtube],
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return (
    <LD
      schema={{
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "Electrician"],
        name: site.name,
        image: `${SITE_URL}/hero.jpg`,
        url: SITE_URL,
        telephone: site.phone.tel,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        openingHours: site.hours,
        priceRange: "$$",
        areaServed: site.areasServed.map((a) => ({
          "@type": "City",
          name: a,
        })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.trust.rating,
          reviewCount: site.trust.reviews,
          bestRating: 5,
        },
      }}
    />
  );
}

export function ServiceSchema() {
  return (
    <LD
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Solar Panel Installation",
        serviceType: "Residential Solar Installation",
        provider: { "@type": "LocalBusiness", name: site.name, url: SITE_URL },
        areaServed: site.areasServed,
        description: site.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "$0-down financing available",
        },
      }}
    />
  );
}

export function BreadcrumbSchema() {
  return (
    <LD
      schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.name,
            item: SITE_URL,
          },
        ],
      }}
    />
  );
}
