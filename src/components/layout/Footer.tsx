import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-xl font-bold tracking-tight">
              {site.name}
              <span className="text-accent">.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <p className="mt-4 text-xs text-faint">{site.trust.licenseNo}</p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-foreground">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-foreground">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href={`tel:${site.phone.tel}`}
                  data-track="call-click"
                  className="transition-colors hover:text-accent"
                >
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-1 not-italic">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region}{" "}
                {site.address.postalCode}
              </li>
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Service areas
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {site.areasServed.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href={site.legal.privacyHref} className="hover:text-foreground">
              Privacy
            </Link>
            <Link href={site.legal.termsHref} className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
