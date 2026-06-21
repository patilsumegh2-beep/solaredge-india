import { site } from "@/content/site";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function Financing() {
  return (
    <Section id="financing">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionLabel>Financing</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            A plan that fits{" "}
            <span className="text-gradient-brand">your budget.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Most homeowners start with $0 down. Choose the path to ownership that
            makes the most sense for you.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {site.financing.map((plan, i) => {
          const featured = i === 0;
          return (
            <Reveal key={plan.name} delay={i * 0.06}>
              <article
                className={
                  "relative flex h-full flex-col rounded-2xl border p-7 transition-colors " +
                  (featured
                    ? "border-accent/50 bg-accent/[0.06]"
                    : "border-border bg-surface/60 hover:border-border-strong")
                }
              >
                {plan.tag && (
                  <span
                    className={
                      "absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-semibold " +
                      (featured
                        ? "bg-accent text-accent-foreground"
                        : "border border-border-strong text-muted")
                    }
                  >
                    {plan.tag}
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {plan.blurb}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M5 12.5l4.5 4.5L19 7" />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 text-center">
          <Button href={site.cta.primary.href} size="lg" data-track="cta-financing">
            See your options — get a free quote
          </Button>
          <p className="mt-3 text-xs text-faint">
            Financing terms shown are illustrative. Your specialist will present
            exact, lender-approved figures.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
