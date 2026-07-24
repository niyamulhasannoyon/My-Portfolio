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
        <Container className="py-20 md:py-28">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                eyebrow="Portfolio &amp; Case Studies"
                title="Software &amp; Web Applications Engineered for Business Results"
                description="Explore real-world client projects, e-commerce storefronts, SaaS applications, and high-converting landing experiences built with modern technology stacks."
                align="center"
              />
            </div>
          </FadeInUp>

          {/* Proof Metric Cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                metric: "100%",
                title: "Custom Engineering",
                description:
                  "Zero boilerplate or rigid templates. Pure Next.js, React, Node.js & Tailwind architecture.",
              },
              {
                metric: "95+",
                title: "Lighthouse Standard",
                description:
                  "Optimized images, sub-second Core Web Vitals, and SEO structures for top search indexing.",
              },
              {
                metric: "10+",
                title: "Production Launches",
                description:
                  "Delivered for founders, startups, and e-commerce brands across the US, UK, and Europe.",
              },
            ].map((stat) => (
              <FadeInUp key={stat.title}>
                <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 text-center shadow-xl backdrop-blur-md">
                  <p className="text-3xl font-extrabold text-emerald-400 sm:text-4xl">{stat.metric}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {stat.title}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-400">{stat.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </Container>
      </section>

      <CaseStudyGrid
        items={all}
        useStaticProjects
        showViewAll={false}
        eyebrow="Selected Projects"
        title="Explore Featured Work"
        description="Filter by project category below to inspect problem statements, solution architectures, and live project demos."
        headerAlign="center"
        sectionClassName="bg-brand-bg py-20 md:py-28 text-white border-t border-white/5"
      />
      
      <CtaSection
        title="Ready to launch your high-performance project?"
        description="Book a free 15-minute discovery call or send a project inquiry. I’ll provide a clear scope and roadmap within 24 hours."
      />
    </>
  );
}
