import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Benefits } from "@/components/sections/Benefits";
import { EnergyFlow } from "@/components/sections/EnergyFlow";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Financing } from "@/components/sections/Financing";
import {
  OrganizationSchema,
  LocalBusinessSchema,
  ServiceSchema,
  BreadcrumbSchema,
} from "@/components/seo/StructuredData";

const SavingsCalculator = dynamic(
  () => import("@/components/sections/SavingsCalculator").then((m) => ({ default: m.SavingsCalculator })),
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => ({ default: m.FAQ })),
);
const QuoteForm = dynamic(
  () => import("@/components/sections/QuoteForm").then((m) => ({ default: m.QuoteForm })),
);

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <ServiceSchema />
      <BreadcrumbSchema />

      <Hero />
      <TrustBar />
      <Benefits />
      <EnergyFlow />
      <Process />
      <SavingsCalculator />
      <Testimonials />
      <Financing />
      <FAQ />
      <QuoteForm />
    </>
  );
}
