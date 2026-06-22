"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import {
  leadSchema,
  PROPERTY_TYPES,
  PROPERTY_LABELS,
  TIMEFRAMES,
  TIMEFRAME_LABELS,
} from "@/lib/schemas";
import { track } from "@/lib/analytics";

const TOTAL_STEPS = 3;

const stepSchemas = {
  1: leadSchema.pick({ propertyType: true, monthlyBill: true, zip: true }),
  2: leadSchema.pick({ timeframe: true, message: true }),
  3: leadSchema.pick({ name: true, email: true, phone: true }),
} as const;

type FormData = {
  propertyType: (typeof PROPERTY_TYPES)[number];
  monthlyBill: string;
  zip: string;
  timeframe: (typeof TIMEFRAMES)[number];
  message: string;
  name: string;
  email: string;
  phone: string;
};

const initial: FormData = {
  propertyType: "single-family",
  monthlyBill: "",
  zip: "",
  timeframe: "asap",
  message: "",
  name: "",
  email: "",
  phone: "",
};

const inputCls =
  "w-full rounded-xl border border-border-strong bg-base/60 px-4 h-12 text-foreground placeholder:text-faint focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 transition-colors";

export function QuoteForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");
  const mountedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);

  // Pre-fill the bill from the savings calculator (event + sessionStorage).
  useEffect(() => {
    const apply = (v: number) =>
      setData((d) => ({ ...d, monthlyBill: String(v) }));
    try {
      const stored = sessionStorage.getItem("helios_bill");
      if (stored) apply(Number(stored));
    } catch {
      /* ignore */
    }
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === "number") apply(detail);
    };
    window.addEventListener("helios:prefill-bill", handler);
    return () => window.removeEventListener("helios:prefill-bill", handler);
  }, []);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validateStep(s: 1 | 2 | 3) {
    const res = stepSchemas[s].safeParse(data);
    if (res.success) {
      setErrors({});
      return true;
    }
    const next: Record<string, string> = {};
    for (const issue of res.error.issues) {
      const key = String(issue.path[0]);
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    return false;
  }

  function onContinue() {
    if (!validateStep(step)) return;
    track("quote_step", { step });
    setStep((s) => (s < TOTAL_STEPS ? ((s + 1) as 1 | 2 | 3) : s));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < TOTAL_STEPS) return onContinue();
    if (!validateStep(3)) return;

    const payload = {
      ...data,
      monthlyBill: Number(data.monthlyBill),
      company: honeypot.current?.value ?? "",
      elapsedMs: Date.now() - mountedAt.current,
    };
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      validateStep(3);
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && json.ok) {
        setStatus("success");
        track("lead_submit");
      } else {
        setStatus("error");
        setServerError(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again or call us.");
    }
  }

  return (
    <Section id="quote">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Pitch */}
        <div>
          <SectionLabel>Free quote</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to own your{" "}
            <span className="text-gradient-brand">power?</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Get a free, no-pressure assessment and a custom savings report.
            It takes about two minutes.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Free, no-pressure home assessment",
              "Custom system design & savings report",
              "Response within 1 business day",
              `Licensed & insured · ${site.trust.licenseNo}`,
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <Check />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Prefer to talk?{" "}
            <a
              href={`tel:${site.phone.tel}`}
              data-track="call-click"
              className="font-semibold text-accent hover:underline"
            >
              {site.phone.display}
            </a>
          </p>
        </div>

        {/* Form card */}
        <Reveal y={24}>
          <div className="rounded-3xl border border-border bg-surface/60 p-6 shadow-2xl shadow-black/30 sm:p-8">
            {status === "success" ? (
              <SuccessPanel name={data.name} />
            ) : (
              <form noValidate onSubmit={onSubmit}>
                {/* Progress */}
                <div className="mb-7">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>
                      Step {step} of {TOTAL_STEPS}
                    </span>
                    <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-500 ease-[var(--ease-out-expo)]"
                      style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Honeypot — hidden from humans */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company
                    <input
                      ref={honeypot}
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                {step === 1 && (
                  <div className="space-y-5">
                    <Field label="Property type" htmlFor="propertyType">
                      <select
                        id="propertyType"
                        className={inputCls}
                        value={data.propertyType}
                        onChange={(e) =>
                          set("propertyType", e.target.value as FormData["propertyType"])
                        }
                      >
                        {PROPERTY_TYPES.map((p) => (
                          <option key={p} value={p}>
                            {PROPERTY_LABELS[p]}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="Average monthly electric bill"
                      htmlFor="monthlyBill"
                      error={errors.monthlyBill}
                    >
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                          ₹
                        </span>
                        <input
                          id="monthlyBill"
                          type="number"
                          inputMode="numeric"
                          className={inputCls + " pl-7"}
                          placeholder="1500"
                          value={data.monthlyBill}
                          onChange={(e) => set("monthlyBill", e.target.value)}
                          aria-invalid={Boolean(errors.monthlyBill)}
                        />
                      </div>
                    </Field>
                    <Field label="PIN code" htmlFor="zip" error={errors.zip}>
                      <input
                        id="zip"
                        className={inputCls}
                        placeholder="110001"
                        value={data.zip}
                        onChange={(e) => set("zip", e.target.value)}
                        aria-invalid={Boolean(errors.zip)}
                      />
                    </Field>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <Field label="When are you looking to go solar?" htmlFor="timeframe">
                      <select
                        id="timeframe"
                        className={inputCls}
                        value={data.timeframe}
                        onChange={(e) =>
                          set("timeframe", e.target.value as FormData["timeframe"])
                        }
                      >
                        {TIMEFRAMES.map((t) => (
                          <option key={t} value={t}>
                            {TIMEFRAME_LABELS[t]}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="Anything we should know? (optional)"
                      htmlFor="message"
                      error={errors.message}
                    >
                      <textarea
                        id="message"
                        rows={4}
                        className={inputCls.replace("h-12", "min-h-28 py-3")}
                        placeholder="Roof type, battery interest, questions…"
                        value={data.message}
                        onChange={(e) => set("message", e.target.value)}
                      />
                    </Field>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <Field label="Full name" htmlFor="name" error={errors.name}>
                      <input
                        id="name"
                        className={inputCls}
                        autoComplete="name"
                        placeholder="Rahul Sharma"
                        value={data.name}
                        onChange={(e) => set("name", e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                      />
                    </Field>
                    <Field label="Email" htmlFor="email" error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        className={inputCls}
                        autoComplete="email"
                        placeholder="you@email.com"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                      />
                    </Field>
                    <Field label="Phone" htmlFor="phone" error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        className={inputCls}
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                      />
                    </Field>
                  </div>
                )}

                {status === "error" && (
                  <p role="alert" className="mt-5 text-sm text-danger">
                    {serverError}
                  </p>
                )}

                {/* Controls */}
                <div className="mt-7 flex items-center gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                      className="h-12 rounded-full px-5 text-sm font-semibold text-muted transition-colors hover:text-foreground"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="ml-auto inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-[0.95rem] font-semibold text-accent-foreground shadow-[0_8px_30px_-8px_var(--color-accent)] transition-all hover:bg-accent-hover hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {status === "submitting"
                      ? "Sending…"
                      : step < TOTAL_STEPS
                        ? "Continue"
                        : "Get my free quote"}
                  </button>
                </div>
                <p className="mt-4 text-center text-xs text-faint">
                  By submitting you agree to be contacted about your quote. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({ name }: { name: string }) {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success ring-1 ring-success/30">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7" />
        </svg>
      </div>
      <h3 className="mt-5 text-2xl font-bold">
        Thanks{name ? `, ${name.split(" ")[0]}` : ""}!
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-muted">
        Your request is in. A solar specialist will reach out within{" "}
        <span className="font-medium text-foreground">1 business day</span> with
        your custom savings plan.
      </p>
    </div>
  );
}

function Check() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12.5l4.5 4.5L19 7" />
      </svg>
    </span>
  );
}
