import type { Metadata } from "next";
import { site, SITE_URL } from "@/content/site";

/**
 * Base metadata shared across all routes. Individual pages spread/override.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — Premium Residential & Commercial Solar`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  generator: "Next.js",
  keywords: [
    "solar panels",
    "solar installation",
    "residential solar",
    "commercial solar",
    "solar financing",
    "home battery",
    site.address.city + " solar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} — Premium Residential & Commercial Solar`,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — power your home with the sun`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Premium Residential & Commercial Solar`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "energy",
};
