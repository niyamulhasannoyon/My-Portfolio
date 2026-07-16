import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const highlights = [
  "Next.js, React, Node.js, and MongoDB",
  "Conversion-focused UX and clean front-end architecture",
  "Performance tuning, SEO, and reliable launches",
];

export function AboutPreview() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-200/70 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <SectionHeading
              eyebrow="About"
              title="I build polished products that feel personal and perform like a business tool."
              description="I’m Niyamul Dev — a full-stack developer focused on building fast, conversion-ready websites and web apps for founders, startups, and growing brands."
              align="left"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Let’s talk <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                See my work
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Developer-first approach</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                I care about clean architecture, maintainable code, and a strong foundation for growth.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Fast by default</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Lighthouse-ready builds, lighter pages, and better conversion paths from the start.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 sm:col-span-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Built for founders, startups, and modern brands</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Whether it’s a premium marketing site, a product dashboard, or an e-commerce storefront, I help turn your ideas into trustworthy digital experiences.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
