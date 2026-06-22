import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";


export function Testimonials() {
  return (
    <section id="case-studies" className="scroll-mt-24 border-t border-border/60 py-24">
      <Container>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Real results
          </p>
          <h2 className="mt-3 text-balance text-4xl font-bold lg:text-5xl">
            Delhi NCR homeowners, in their own words.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <article className="glass flex h-full flex-col rounded-2xl p-6">
                <Stars n={t.rating} />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <footer className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted">{t.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gold">{t.saved}</p>
                    <p className="text-xs text-muted">{t.system}</p>
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-8 text-center text-sm text-muted">
            ★ {site.trust.rating} average from {site.trust.reviews}+ verified reviews
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div aria-label={`${n} out of 5 stars`} className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} aria-hidden className="text-gold text-lg">★</span>
      ))}
    </div>
  );
}
