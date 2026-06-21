import { Fragment } from "react";
import { site } from "@/content/site";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

/**
 * "How solar works" — a scroll-revealed energy-flow diagram (sun → panels →
 * inverter → battery → home). Pure SVG/CSS (animated dashes), zero WebGL: the
 * deliberate perf call so we keep ONE real 3D context (the hero) site-wide.
 */
export function EnergyFlow() {
  const nodes = site.energyFlow;
  return (
    <Section id="how-it-works">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionLabel>How it works</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            From sunlight to{" "}
            <span className="text-gradient-brand">real savings.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Your roof becomes a power plant. Here&apos;s the journey every ray of
            sunlight takes before it lowers your bill.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col items-center justify-center md:flex-row">
        {nodes.map((n, i) => (
          <Fragment key={n.label}>
            <Reveal delay={i * 0.08} y={12}>
              <FlowNode icon={n.icon} label={n.label} sub={n.sub} />
            </Reveal>
            {i < nodes.length - 1 && <Connector />}
          </Fragment>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted">
          Excess energy flows back to the grid — often earning{" "}
          <span className="font-medium text-success">credits</span> on your next
          bill.
        </p>
      </Reveal>
    </Section>
  );
}

function FlowNode({
  icon,
  label,
  sub,
}: {
  icon: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-border-strong bg-surface text-accent shadow-lg shadow-black/30">
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-accent/5"
        />
        <Icon name={icon} className="relative h-7 w-7" />
      </div>
      <div className="mt-3 text-sm font-semibold">{label}</div>
      <div className="text-xs text-muted">{sub}</div>
    </div>
  );
}

/** Animated connector — flowing dashes signal energy moving between stages. */
function Connector() {
  return (
    <>
      {/* horizontal (md and up) */}
      <div className="hidden flex-1 items-center px-1 md:flex">
        <svg
          viewBox="0 0 120 4"
          preserveAspectRatio="none"
          className="h-1 w-full"
          aria-hidden
        >
          <line x1="2" y1="2" x2="118" y2="2" stroke="var(--color-border-strong)" strokeWidth="2" />
          <line
            x1="2"
            y1="2"
            x2="118"
            y2="2"
            stroke="var(--color-accent)"
            strokeWidth="2"
            className="animate-energy"
          />
        </svg>
      </div>
      {/* vertical (mobile) */}
      <div className="flex h-7 items-center justify-center py-1 md:hidden">
        <svg viewBox="0 0 4 40" preserveAspectRatio="none" className="h-full w-1" aria-hidden>
          <line x1="2" y1="2" x2="2" y2="38" stroke="var(--color-border-strong)" strokeWidth="2" />
          <line
            x1="2"
            y1="2"
            x2="2"
            y2="38"
            stroke="var(--color-accent)"
            strokeWidth="2"
            className="animate-energy"
          />
        </svg>
      </div>
    </>
  );
}
