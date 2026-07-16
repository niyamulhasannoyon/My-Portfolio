import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutPreview } from "@/components/sections/about-preview";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { getFeaturedCaseStudies } from "@/lib/content";

export default function HomePage() {
  const featured = getFeaturedCaseStudies(3);
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutPreview />
      <CaseStudyGrid items={featured} />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
