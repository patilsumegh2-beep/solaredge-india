import { site } from "@/content/site";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Benefits() {
  return (
    <Section id="benefits">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionLabel>Why solar</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything to gain.{" "}
            <span className="text-gradient-brand">Nothing to lose.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            A solar system isn&apos;t a cost — it&apos;s an asset that pays you
            back every month, for decades.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.benefits.map((b, i) => (
          <Reveal key={b.title} delay={(i % 3) * 0.06}>
            <article className="group h-full rounded-2xl border border-border bg-surface/60 p-7 transition-colors duration-300 hover:border-accent/40 hover:bg-surface-2">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-105">
                <Icon name={b.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
