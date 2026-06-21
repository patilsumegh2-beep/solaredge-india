import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
};

const UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <main id="main" className="py-24">
      <Container className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Legal</p>
        <h1 className="mt-3 text-4xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted">Last updated: {UPDATED}</p>

        <div className="mt-10 max-w-none text-muted leading-relaxed space-y-8">
          <Section title="Acceptance">
            <p>By using this website you agree to these terms. If you don't agree, please don't use the site.</p>
          </Section>

          <Section title="Services described">
            <p>This website is a marketing and lead-generation tool for {site.legalName}. Information about solar systems, savings estimates, and financing options is provided for general reference only. Actual system performance, savings, and pricing depend on individual site assessments and are subject to change.</p>
          </Section>

          <Section title="Savings estimates">
            <p>The savings calculator and any figures on this site are illustrative estimates based on average consumption and utility rates. They are <strong className="text-foreground">not guarantees</strong>. Your actual savings will depend on your system size, usage patterns, utility rates, and local incentives. Always review the written proposal before signing a contract.</p>
          </Section>

          <Section title="Licensing">
            <p>{site.legalName} holds {site.trust.licenseNo} (California). We are licensed and insured for residential and commercial solar installation in the state of California. Always verify contractor licensing at cslb.ca.gov before engaging any contractor.</p>
          </Section>

          <Section title="Intellectual property">
            <p>All content on this site — text, images, graphics, and code — is owned by {site.legalName} or its licensors. You may not reproduce or redistribute it without written permission.</p>
          </Section>

          <Section title="Limitation of liability">
            <p>To the maximum extent permitted by law, {site.legalName} is not liable for any indirect, incidental, or consequential damages arising from use of this website or reliance on information it contains.</p>
          </Section>

          <Section title="Governing law">
            <p>These terms are governed by the laws of the State of California. Disputes shall be resolved in the courts of San Diego County, California.</p>
          </Section>

          <Section title="Contact">
            <p>
              {site.legalName} · {site.address.street} · {site.address.city}, {site.address.region} ·{" "}
              <a href={`mailto:${site.email}`} className="text-accent">{site.email}</a>
            </p>
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
