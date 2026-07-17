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
    <Container className="py-16 md:py-24 bg-brand-bg">
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
            <p className="mt-6 text-zinc-400">
              My focus is simple: turn your cold traffic from LinkedIn and email into qualified,
              high-ticket leads. That means fast sites, clean SEO foundations, and landing pages
              engineered around a single goal — the conversion.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="mt-8">
              <p className="text-sm font-semibold text-white">Tech I work with</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-zinc-300">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <div className="mt-8 flex items-center gap-4">
              <SocialLinks className="flex items-center gap-4 text-zinc-400 hover:text-emerald-300" />
            </div>
          </FadeInUp>
        </div>
        <FadeInUp delay={0.15} y={40}>
          <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
            <p className="text-sm font-semibold text-emerald-300">At a glance</p>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/[0.06] pb-3">
                <dt className="text-zinc-400">Location</dt>
                <dd className="font-medium text-white">{siteConfig.location}</dd>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-3">
                <dt className="text-zinc-400">Availability</dt>
                <dd className="font-medium text-white">{siteConfig.availability}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-400">Focus</dt>
                <dd className="font-medium text-white">High-ticket lead gen</dd>
              </div>
            </dl>
          </div>
        </FadeInUp>
      </div>
      <CtaSection />
    </Container>
  );
}
