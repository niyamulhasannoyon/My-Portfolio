import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BentoCard } from "@/components/ui/bento-card";

const highlights = [
  "Next.js, React, Node.js, and MongoDB",
  "Conversion-focused UX and clean front-end architecture",
  "Performance tuning, SEO, and reliable launches",
];

const featureCards = [
  {
    icon: Code2,
    title: "Developer-first approach",
    desc: "I care about clean architecture, maintainable code, and a strong foundation for growth.",
  },
  {
    icon: Zap,
    title: "Fast by default",
    desc: "Lighthouse-ready builds, lighter pages, and better conversion paths from the start.",
  },
  {
    icon: Sparkles,
    title: "Built for founders, startups, and modern brands",
    desc: "Whether it\u2019s a premium marketing site, a product dashboard, or an e-commerce storefront, I help turn your ideas into trustworthy digital experiences.",
    wide: true,
  },
];

export function AboutPreview() {
  return (
    <section className="bg-brand-bg py-20">
      <Container>
        <div className="grid gap-8 rounded-2xl border border-white/[0.06] bg-zinc-900/60 p-6 text-white shadow-2xl shadow-black/40 backdrop-blur-sm sm:rounded-3xl sm:p-8 md:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <SectionHeading
              eyebrow="About"
              title="I build polished products that feel personal and perform like a business tool."
              description="I\u2019m Niyamul Dev \u2014 a full-stack developer focused on building fast, conversion-ready websites and web apps for founders, startups, and growing brands."
              align="left"
            />

            <ul className="mt-6 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <li key={item} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition-[transform,colors] duration-300 hover:bg-emerald-400 hover:-translate-y-0.5 active:translate-y-0"
              >
                Let\u2019s talk <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-200 transition-[transform,colors] duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] hover:text-white hover:-translate-y-0.5 active:translate-y-0"
              >
                See my work
              </Link>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {featureCards.map((card) => (
              <li key={card.title} className={card.wide ? "sm:col-span-2" : ""}>
                <BentoCard className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">{card.desc}</p>
                </BentoCard>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
