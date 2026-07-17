import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { getAllCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeInUp } from "@/components/ui/fade-in-up";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Results-driven web development case studies for SaaS, WordPress and conversion-focused digital products.",
  path: "/work",
  keywords: ["web development case studies", "Next.js portfolio", "freelance developer results"],
});

export default function WorkPage() {
  const all = getAllCaseStudies();
  return (
    <>
      <section className="bg-brand-surface text-white">
        <Container className="py-20 md:py-24">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                eyebrow="Case Studies"
                title="Work designed to capture more leads, conversions and revenue"
                description="A showcase of modern product builds, high-converting landing pages, and performance-first sites for founders, agencies, and growth teams."
                align="center"
              />
            </div>
          </FadeInUp>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                label: "Conversion-focused",
                description:
                  "Clear messaging, better trust signals, and focused user journeys for high-value bookings.",
              },
              {
                label: "Performance-led",
                description:
                  "Fast, accessible builds that improve Core Web Vitals and keep visitors engaged.",
              },
              {
                label: "Built to scale",
                description:
                  "Reusable systems, clean code, and tight launch support for growing digital businesses.",
              },
            ].map((stat) => (
              <FadeInUp key={stat.label}>
                <div className="rounded-3xl border border-white/10 bg-black/50 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                    {stat.label}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">{stat.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </Container>
      </section>

      <CaseStudyGrid items={all} showViewAll={false} />
      <CtaSection
        title="Ready to launch your next high-performance website?"
        description="Book a free 10-minute strategy call and I’ll help you turn visiting traffic into qualified leads."
      />
    </>
  );
}
