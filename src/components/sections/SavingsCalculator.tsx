"use client";

import { useMemo, useState } from "react";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

type Sun = "low" | "medium" | "high";

const SUN_OPTIONS: { value: Sun; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Average" },
  { value: "high", label: "Lots of sun" },
];

/**
 * Lead-magnet calculator. Numbers are transparent estimates (assumptions noted)
 * — the goal is to create momentum toward a real quote, then hand the bill value
 * to the form so the visitor never re-enters it.
 */
export function SavingsCalculator() {
  const [bill, setBill] = useState(180);
  const [sun, setSun] = useState<Sun>("medium");

  const result = useMemo(() => {
    const annualBill = bill * 12;
    const sunFactor = sun === "high" ? 1.15 : sun === "low" ? 0.85 : 1;
    const annualSavings = Math.round(annualBill * 0.92 * sunFactor);
    const systemKw =
      Math.round(Math.min(20, Math.max(3, annualBill / 1100)) * 10) / 10;
    const netCost = Math.round(systemKw * 2800 * 0.7); // after 30% federal credit
    const payback = Math.max(3, Math.round((netCost / annualSavings) * 10) / 10);

    let gross = 0;
    let yearly = annualSavings;
    for (let y = 0; y < 25; y++) {
      gross += yearly;
      yearly *= 1.035; // utility-rate inflation
    }
    return {
      annualSavings,
      systemKw,
      payback,
      lifetime: Math.max(0, Math.round(gross - netCost)),
    };
  }, [bill, sun]);

  function toQuote() {
    track("calculator_cta", { monthlyBill: bill });
    try {
      sessionStorage.setItem("helios_bill", String(bill));
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("helios:prefill-bill", { detail: bill }));
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Section id="savings" className="bg-surface/20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionLabel>Savings calculator</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            See what solar could{" "}
            <span className="text-gradient-brand">save you.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Drag your average monthly electric bill — we&apos;ll estimate your
            savings in seconds.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface/60 lg:grid-cols-2">
          {/* Controls */}
          <div className="border-b border-border p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <label
              htmlFor="bill"
              className="flex items-baseline justify-between"
            >
              <span className="text-sm font-medium text-muted">
                Average monthly electric bill
              </span>
              <span className="text-2xl font-bold text-foreground">
                ${bill}
              </span>
            </label>
            <input
              id="bill"
              type="range"
              min={50}
              max={600}
              step={5}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="mt-4 w-full cursor-pointer"
              style={{ accentColor: "var(--color-accent)" }}
              aria-valuetext={`$${bill} per month`}
            />
            <div className="mt-1 flex justify-between text-xs text-faint">
              <span>$50</span>
              <span>$600+</span>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm font-medium text-muted">
                Sunlight in your area
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {SUN_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setSun(o.value)}
                    aria-pressed={sun === o.value}
                    className={
                      "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors " +
                      (sun === o.value
                        ? "border-accent/60 bg-accent/10 text-foreground"
                        : "border-border-strong text-muted hover:text-foreground")
                    }
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Results */}
          <div className="bg-base/40 p-8 sm:p-10">
            <p className="text-sm font-medium text-muted">
              Estimated 25-year savings
            </p>
            <AnimatedNumber
              value={result.lifetime}
              prefix="$"
              className="mt-1 block text-5xl font-extrabold tracking-tight text-gold sm:text-6xl"
            />

            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs text-muted">Annual savings</dt>
                <AnimatedNumber
                  value={result.annualSavings}
                  prefix="$"
                  className="text-2xl font-bold text-success"
                />
              </div>
              <div>
                <dt className="text-xs text-muted">Payback period</dt>
                <dd className="text-2xl font-bold text-foreground">
                  {result.payback} yrs
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Recommended system</dt>
                <dd className="text-2xl font-bold text-foreground">
                  {result.systemKw} kW
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Upfront cost</dt>
                <dd className="text-2xl font-bold text-foreground">$0 down</dd>
              </div>
            </dl>

            <Button onClick={toQuote} size="lg" className="mt-8 w-full">
              Get my exact quote →
            </Button>
            <p className="mt-3 text-center text-xs text-faint">
              Estimate only, based on typical local production and a 30% federal
              tax credit. Your custom quote will be exact.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
