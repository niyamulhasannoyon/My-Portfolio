import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="bg-brand-surface text-white">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <FadeInUp>
              <SectionHeading
                eyebrow="About"
                title="I build web products that pay for themselves"
                description="I help founders and agencies ship high-performance, conversion-focused web apps that feel premium and drive measurable results."
              />
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <p className="mt-6 text-zinc-300">
                My focus is simple: turn cold traffic from LinkedIn, email and paid ads into qualified,
                high-ticket leads. That means fast, polished sites, strong SEO foundations, and
                landing pages engineered around a single goal — the conversion.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="mt-6 text-zinc-300">
                I partner with businesses that want a website that feels confident, reduces friction,
                and works like the best salesperson on the team.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.25}>
              <div className="mt-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Tech I work with</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4 text-zinc-400">
                <SocialLinks className="flex items-center gap-4 text-zinc-400 hover:text-emerald-300" />
              </div>
            </FadeInUp>
          </div>

          <FadeInUp delay={0.15} y={40}>
            <div className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm">
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-emerald-500/30 shadow-lg">
                  <Image
                    src="/profile.jpg"
                    alt="Niyamul Hasan"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Niyamul Hasan</h3>
                <p className="text-xs text-emerald-400 font-medium">Full-Stack Software Engineer</p>
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">At a glance</p>
              <dl className="mt-4 space-y-4 text-sm text-zinc-300">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Location</dt>
                  <dd className="mt-1 text-sm font-medium text-white">{siteConfig.location}</dd>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Availability</dt>
                  <dd className="mt-1 text-sm font-medium text-white">{siteConfig.availability}</dd>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Specialization</dt>
                  <dd className="mt-1 text-sm font-medium text-white">Next.js, Node.js &amp; E-Commerce Architecture</dd>
                </div>
              </dl>
            </div>
          </FadeInUp>
        </div>
      </Container>

      <CtaSection
        title="Want a site that earns trust and converts better?"
        description="Book a free 10-minute strategy call and I’ll help you launch a website that looks premium and performs better than before."
      />
    </div>
  );
}
