import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Trust indicators band directly under the hero — concrete proof (Enphase's
 * strength) in Tesla-restrained styling. Answers "can I trust these people?"
 * before the visitor has to scroll for it.
 */
export function TrustBar() {
  return (
    <section
      aria-label="Why homeowners trust us"
      className="border-y border-border bg-surface/30"
    >
      <Container className="grid gap-8 py-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            <Stat value={`${site.trust.installs.toLocaleString()}+`} label="Installs completed" />
            <Stat value={`${site.trust.yearsInBusiness} yrs`} label="Local experience" />
            <Stat value={`${site.trust.warrantyYears}-year`} label="Warranty" />
            <Stat
              value={
                <span className="inline-flex items-baseline gap-1">
                  {site.trust.rating}
                  <span className="text-gold" aria-hidden>
                    ★
                  </span>
                </span>
              }
              label={`${site.trust.reviews} reviews`}
            />
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {site.certifications.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border-strong bg-base/60 px-3.5 py-1.5 text-xs font-medium text-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <dt className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {value}
      </dt>
      <dd className="mt-1 text-xs text-muted sm:text-sm">{label}</dd>
    </div>
  );
}
