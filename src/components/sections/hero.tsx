import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { Marquee } from "@/components/ui/marquee";

const stackItems = [
  { label: "Next.js" },
  { label: "React" },
  { label: "TypeScript" },
  { label: "Node.js" },
  { label: "MongoDB" },
  { label: "Tailwind CSS" },
  { label: "WordPress" },
  { label: "Vercel" },
  { label: "Figma" },
  { label: "Cloudflare" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-bg text-white">
      {/* Subtle background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary emerald glow */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
        {/* Secondary glow */}
        <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-emerald-400/3 blur-[100px]" />

        {/* Ultra-soft grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-8 pt-28 sm:px-8 lg:px-12">
        <div className="grid flex-1 items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column — Copy & CTAs */}
          <div className="flex flex-col space-y-6 lg:col-span-7">
            <FadeInUp delay={0.05} y={20}>
              <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] px-4 py-1.5 text-xs font-medium tracking-wider text-emerald-300/90 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.07]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {siteConfig.availability}
              </span>
            </FadeInUp>

            <FadeInUp delay={0.1} y={20}>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
                Engineering High-Performance <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 bg-clip-text text-transparent">
                  Web Apps That Drive Revenue.
                </span>
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.16} y={20}>
              <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
                Production-grade architectures optimized for speed, clarity, and
                exceptional UX. No templates. No clutter. Just pure performance.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.22} y={20}>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition-[transform,colors,box-shadow] duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Free Strategy Call
                    <ArrowRight className="h-4 w-4 transition-[transform] duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="absolute inset-0 -z-0 translate-y-full rounded-full bg-emerald-400 transition-transform duration-300 group-hover:translate-y-0" />
                </Link>
                <Link
                  href="/work"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/60 px-7 py-3.5 text-base font-semibold text-zinc-100 shadow-sm backdrop-blur-sm transition-[transform,colors] duration-300 hover:border-emerald-500/40 hover:bg-zinc-800/60 hover:text-white hover:-translate-y-0.5 active:translate-y-0"
                >
                  View Case Studies
                </Link>
              </div>
            </FadeInUp>
          </div>

          {/* Right Column — Premium Code Editor Visual */}
          <div className="relative lg:col-span-5 lg:col-start-8" aria-hidden="true">
            <FadeInUp delay={0.12} y={30}>
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 blur opacity-20 transition-opacity duration-1000 group-hover:opacity-30" />
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-6 font-mono text-sm shadow-2xl transition-all duration-500 group-hover:border-white/[0.18]">
                  {/* Window Controls */}
                  <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/70" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                      <div className="h-3 w-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="ml-2 text-xs text-zinc-600">
                      metrics_engine.ts
                    </span>
                  </div>

                  {/* Code Content */}
                  <div className="space-y-1.5">
                    <p className="text-zinc-600">
                      <span className="text-zinc-500">{`//`}</span>{" "}
                      <span className="text-zinc-500">Optimizing Core Web Vitals</span>
                    </p>
                    <p>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400">performance</span>
                      <span className="text-zinc-400"> = </span>
                      <span className="text-white">{'{'}</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-emerald-400">LCP</span>
                      <span className="text-zinc-400">: </span>
                      <span className="text-zinc-300">&quot;1.2s&quot;</span>
                      <span className="text-zinc-500">,</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-emerald-400">CLS</span>
                      <span className="text-zinc-400">: </span>
                      <span className="text-amber-300">0.01</span>
                      <span className="text-zinc-500">,</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-emerald-400">FID</span>
                      <span className="text-zinc-400">: </span>
                      <span className="text-zinc-300">&quot;24ms&quot;</span>
                      <span className="text-zinc-500">,</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-emerald-400">ConversionBoost</span>
                      <span className="text-zinc-400">: </span>
                      <span className="text-sky-300">&quot;+23%&quot;</span>
                    </p>
                    <p>
                      <span className="text-white">{'}'}</span>
                      <span className="text-zinc-500">;</span>
                    </p>
                  </div>

                  {/* Bottom status bar */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                    <span className="text-zinc-600">
                      <span className="text-emerald-400/70">✦</span> ESLint — no warnings
                    </span>
                    <span className="text-zinc-600">
                      Prettier — formatted
                    </span>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Marquee — Tech Stack Authority Strip */}
        <div className="mt-auto pt-12">
          <FadeInUp delay={0.3} y={10}>
            <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-600">
              Core Stack &amp; Tooling
            </p>
            <Marquee items={stackItems} />
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
