import { site } from "@/content/site";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function Process() {
  return (
    <Section id="process">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionLabel>The process</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Solar made <span className="text-gradient-brand">simple.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            From first call to powered-on, we handle the heavy lifting. You stay
            informed at every step.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        {site.process.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="relative flex gap-5 pb-10 last:pb-0">
              {i < site.process.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-6 top-14 h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-border"
                />
              )}
              <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent/40 bg-surface text-base font-bold text-accent">
                {i + 1}
              </div>
              <div className="pt-2">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
