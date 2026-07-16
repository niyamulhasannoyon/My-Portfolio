import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ServicesSection } from "@/components/sections/services-section";
import { CtaSection } from "@/components/sections/cta-section";
import { PricingSection } from "@/components/pricing/pricing-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { StaggerCard } from "@/components/ui/stagger-card";

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
    <div className="bg-[#030712] text-white">
      <Container className="relative py-16 md:py-24 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
        <FadeInUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">Services</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              How we’ll work together
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400 sm:text-xl">
              A focused, transparent process built for high-ticket outcomes — from discovery to launch and continued optimization.
            </p>
          </div>
        </FadeInUp>
      </Container>

      <hr className="mx-auto h-px w-full max-w-6xl border-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <ServicesSection />

      <Container className="py-16 md:py-20">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">What I do</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              A premium delivery experience from day one
            </h2>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-emerald-300"
          >
            Start your project <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.step}>
              <StaggerCard
                index={i}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-xl"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">{p.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
              </StaggerCard>
            </li>
          ))}
        </ul>
      </Container>

      <PricingSection />
      <CtaSection />
    </div>
  );
}
