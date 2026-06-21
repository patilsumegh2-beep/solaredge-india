"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border/60 py-24">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-4xl font-bold lg:text-5xl">
            Common questions, straight answers.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-border/60">
          {site.faq.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <FAQItem q={item.q} a={item.a} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-sm text-muted">
            More questions?{" "}
            <a href={`tel:${site.phone.tel}`} className="text-accent underline-offset-2 hover:underline">
              Call {site.phone.display}
            </a>{" "}
            — we answer in minutes.
          </p>
        </Reveal>
      </Container>

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: site.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${q.slice(0, 20).replace(/\W/g, "-")}`;

  return (
    <div className="py-5">
      <button
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left font-semibold text-foreground transition-colors hover:text-accent"
      >
        <span>{q}</span>
        <span
          aria-hidden
          className="flex-shrink-0 text-xl text-accent transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-btn`}
          className="mt-3 text-muted leading-relaxed"
        >
          {a}
        </div>
      )}
    </div>
  );
}
