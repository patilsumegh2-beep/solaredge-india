import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, Sora, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ExitIntent } from "@/components/layout/ExitIntent";
import { baseMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// Tesla-style geometric sans (Tesla uses Gotham; Montserrat is the closest
// free match). Used for the hero headline, nav, and feature labels.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Touch headers() so every route renders dynamically — required for the
  // per-request CSP nonce (set in middleware) to be applied to <script> tags.
  await headers();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${montserrat.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyCTA />
        </MotionProvider>
        <Analytics />
        <CookieConsent />
        <ExitIntent />
      </body>
    </html>
  );
}
