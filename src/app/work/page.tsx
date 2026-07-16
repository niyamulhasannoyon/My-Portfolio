import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { getAllCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Results-driven web development case studies: performance rebuilds, SaaS platforms and conversion-focused builds.",
  path: "/work",
  keywords: ["web development case studies", "Next.js portfolio", "freelance developer results"],
});

export default function WorkPage() {
  const all = getAllCaseStudies();
  return (
    <>
      <CaseStudyGrid items={all} />
      <CtaSection title="Want results like these?" description="Let's scope your project." />
    </>
  );
}
