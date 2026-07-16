import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/services-section";
import { CtaSection } from "@/components/sections/cta-section";
import { PricingSection } from "@/components/pricing/pricing-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Next.js, React, Node.js, MongoDB and WordPress development services engineered for performance and conversion.",
  path: "/services",
  keywords: ["Next.js developer", "React developer", "Node.js", "WordPress developer", "freelance full-stack"],
});

const process = [
  { step: "01", title: "Discovery call", desc: "We map your goals, traffic sources and conversion blockers." },
  { step: "02", title: "Strategy & scope", desc: "Fixed-scope plan with measurable outcomes and a timeline." },
  { step: "03", title: "Build & ship", desc: "Weekly demos, performance-checked, SEO-ready from day one." },
  { step: "04", title: "Optimize", desc: "Post-launch CRO and analytics to keep conversion climbing." },
];

export default function ServicesPage() {
  return (
    <>
      <Container className="py-16">
        <SectionHeading
          eyebrow="Services"
          title="How we'll work together"
          description="A focused, transparent process built for high-ticket outcomes."
        />
      </Container>
      <ServicesSection />
      <PricingSection />
      <Container className="py-16">
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
              <p className="text-sm font-bold text-brand-600">{p.step}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </Container>
      <CtaSection />
    </>
  );
}
