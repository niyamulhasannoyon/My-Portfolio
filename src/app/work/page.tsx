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
                title="Premium web work built for trust, speed, and conversion"
                description="A curated collection of modern sites, SaaS launches, and high-converting lead funnels created for growing businesses."
                align="center"
              />
            </div>
          </FadeInUp>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Conversion clarity",
                description:
                  "Messaging, structure, and design that keep visitor attention on the next action.",
              },
              {
                title: "Performance-ready",
                description:
                  "Fast-first builds that improve engagement, search signals, and launch confidence.",
              },
              {
                title: "Scale-friendly",
                description:
                  "Reusable systems and clean architecture for long-term growth and easy updates.",
              },
            ].map((stat) => (
              <FadeInUp key={stat.title}>
                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                    {stat.title}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">{stat.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </Container>
      </section>

      <CaseStudyGrid
        items={all}
        showViewAll={false}
        eyebrow="Selected Work"
        title="Case studies that drive measurable growth"
        description="Each engagement is built around clarity, credibility, and conversion-focused design."
        headerAlign="center"
        sectionClassName="bg-slate-950 py-24 text-slate-50"
      />
      <CtaSection
        title="Ready to launch your next high-performance website?"
        description="Book a free 10-minute strategy call and I’ll help you turn visiting traffic into qualified leads."
      />
    </>
  );
}
