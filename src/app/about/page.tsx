import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/sections/cta-section";
import { SocialLinks } from "@/components/layout/social-links";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { FadeInUp } from "@/components/ui/fade-in-up";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Full-stack developer helping US, UK & European businesses ship fast, conversion-focused web products with Next.js and WordPress.",
  path: "/about",
  keywords: ["about full-stack developer", "freelance developer bio"],
});

const stack = ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "WordPress", "Vercel"];

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <FadeInUp>
            <SectionHeading
              eyebrow="About"
              title="I build web products that pay for themselves"
              description="I'm a full-stack developer partnering with founders and agencies across the US, UK & Europe to ship high-performance, conversion-focused web apps."
            />
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="mt-6 text-ink-muted">
              My focus is simple: turn your cold traffic from LinkedIn and email into qualified,
              high-ticket leads. That means fast sites, clean SEO foundations, and landing pages
              engineered around a single goal — the conversion.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="mt-8">
              <p className="text-sm font-semibold text-ink">Tech I work with</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span key={s} className="rounded-full border border-ink/10 bg-white px-3 py-1 text-sm text-ink-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <div className="mt-8 flex items-center gap-4">
              <SocialLinks className="flex items-center gap-4" />
            </div>
          </FadeInUp>
        </div>
        <FadeInUp delay={0.15} y={40}>
          <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-card">
            <p className="text-sm font-semibold text-brand-600">At a glance</p>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between border-b border-ink/5 pb-3">
                <dt className="text-ink-muted">Location</dt>
                <dd className="font-medium text-ink">{siteConfig.location}</dd>
              </div>
              <div className="flex justify-between border-b border-ink/5 pb-3">
                <dt className="text-ink-muted">Availability</dt>
                <dd className="font-medium text-ink">{siteConfig.availability}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Focus</dt>
                <dd className="font-medium text-ink">High-ticket lead gen</dd>
              </div>
            </dl>
          </div>
        </FadeInUp>
      </div>
      <CtaSection />
    </Container>
  );
}
