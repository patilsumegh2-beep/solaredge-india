import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * A page section with consistent vertical rhythm and an optional anchor id
 * (used by the in-page nav). Renders a semantic <section>.
 */
export function Section({
  id,
  className,
  containerClassName,
  children,
  as: Tag = "section",
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  as?: "section" | "div";
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "scroll-mt-24 py-[var(--spacing-section)]",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}

/** Small uppercase label that sits above a section heading. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
      <span aria-hidden className="h-px w-6 bg-accent/60" />
      {children}
    </span>
  );
}
