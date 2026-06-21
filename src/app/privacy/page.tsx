import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}. We collect only what's needed to respond to your inquiry.`,
};

const UPDATED = "June 2026";

export default function PrivacyPage() {
  return (
    <main id="main" className="py-24">
      <Container className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Legal</p>
        <h1 className="mt-3 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {UPDATED}</p>

        <div className="prose prose-invert mt-10 max-w-none text-muted leading-relaxed space-y-8">
          <Section title="Who we are">
            <p>
              {site.legalName}, {site.address.street}, {site.address.city},{" "}
              {site.address.region} {site.address.postalCode}.
              Contact: <a href={`mailto:${site.email}`} className="text-accent">{site.email}</a> ·{" "}
              <a href={`tel:${site.phone.tel}`} className="text-accent">{site.phone.display}</a>
            </p>
          </Section>

          <Section title="What we collect">
            <p>When you submit the quote form we collect: name, email, phone number, zip code, property type, monthly electric bill, and project timeframe. We use this to contact you about your solar project — nothing else.</p>
            <p>We also collect standard server logs (IP address, browser type, pages visited) for security and performance monitoring. Logs are retained for 30 days.</p>
          </Section>

          <Section title="How we use it">
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to your quote request</li>
              <li>Schedule a free home assessment</li>
              <li>Follow up on your project (you can opt out at any time)</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do <strong className="text-foreground">not</strong> sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </Section>

          <Section title="Third-party services">
            <p>We use the following services that may process your data:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">Resend</strong> — transactional email delivery for quote confirmations</li>
              <li><strong className="text-foreground">Cloudflare Turnstile</strong> — bot protection on our contact form (privacy-friendly CAPTCHA, no tracking)</li>
              <li><strong className="text-foreground">Vercel</strong> — website hosting and edge functions</li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>We use one functional cookie (<code className="text-accent">helios-cookie-consent</code>) to remember your cookie preference. No advertising or tracking cookies are used.</p>
          </Section>

          <Section title="Your rights">
            <p>You have the right to access, correct, or delete your personal data at any time. Email us at{" "}
              <a href={`mailto:${site.email}`} className="text-accent">{site.email}</a>{" "}
              and we'll respond within 5 business days.
            </p>
          </Section>

          <Section title="Data retention">
            <p>Quote form submissions are retained for 2 years or until you request deletion. Server logs: 30 days.</p>
          </Section>

          <Section title="Changes">
            <p>We may update this policy. Material changes will be noted by updating the date above. Continued use of the site after changes constitutes acceptance.</p>
          </Section>
        </div>
      </Container>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
