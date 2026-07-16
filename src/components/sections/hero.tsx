import Link from "next/link";
import {
  ArrowRight,
  Star,
  Zap,
  Target,
  BarChart3,
  Gauge,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { FadeInUp } from "@/components/ui/fade-in-up";

const metrics = [
  {
    icon: Gauge,
    title: "Faster site speed",
    desc: "Reduce friction and keep visitors engaged.",
  },
  {
    icon: Target,
    title: "Clear conversion paths",
    desc: "Guide each visitor toward the next best action.",
  },
  {
    icon: BarChart3,
    title: "Built to scale",
    desc: "A strong foundation for landing pages, blogs, and product growth.",
  },
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

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column — Content */}
          <div className="max-w-3xl">
            {/* Availability badge */}
            <FadeInUp delay={0.05} y={20}>
              <div className="group relative inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] px-4 py-1.5 text-xs font-medium text-emerald-300/90 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.07]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {siteConfig.availability}
              </div>
            </FadeInUp>

            {/* Headline */}
            <FadeInUp delay={0.1} y={20}>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                I help businesses increase sales and{" "}
                <span className="bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                  build trust
                </span>{" "}
                with fast, modern websites that convert visitors into customers.
              </h1>
            </FadeInUp>

            {/* Sub-headline with tech stack badges */}
            <FadeInUp delay={0.16} y={20}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg sm:leading-8">
                Built with{" "}
                <span className="mt-1.5 inline-flex flex-wrap gap-x-1.5 gap-y-1.5 sm:mt-0 sm:inline">
                  {["Next.js", "React", "Node.js", "MongoDB"].map((tech, i) => (
                    <span key={tech} className="inline-flex">
                      <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-2.5 py-0.5 text-xs font-medium text-zinc-200 transition-colors duration-200 hover:border-emerald-500/30 hover:text-emerald-300 sm:text-sm">
                        {tech}
                      </span>
                      {i < 3 ? <span className="hidden sm:inline">, </span> : ""}
                    </span>
                  ))}
                </span>{" "}
                to create sleek, scalable experiences that feel premium and
                perform beautifully.
              </p>
            </FadeInUp>

            {/* CTA Buttons */}
            <FadeInUp delay={0.22} y={20}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition-[transform,colors,box-shadow] duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Free 10-Minute Strategy Call
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

            {/* Trust badges */}
            <FadeInUp delay={0.28} y={20}>
              <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-zinc-800/60 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-sm sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-emerald-400 text-emerald-400 sm:h-3.5 sm:w-3.5"
                      />
                    ))}
                  </div>
                  <span>4.9/5 client rating</span>
                </div>
                <span className="rounded-full border border-zinc-800/60 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-sm sm:px-3.5 sm:py-2 sm:text-sm">
                  Fast launch<span className="hidden sm:inline"> timelines</span>
                </span>
                <span className="rounded-full border border-zinc-800/60 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-sm sm:px-3.5 sm:py-2 sm:text-sm">
                  SEO + CRO baked in
                </span>
              </div>
            </FadeInUp>
          </div>

          {/* Right Column — Bento Grid Card */}
          <FadeInUp delay={0.12} y={30}>
            <div className="group relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-3xl bg-emerald-500/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.10] hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.3)]">
                {/* Card header */}
                <div className="border-b border-white/[0.06] px-6 py-5 sm:px-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10">
                          <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                        </span>
                        <p className="text-sm font-semibold text-white">
                          Growth-first web design
                        </p>
                      </div>
                      <p className="mt-1.5 text-sm text-zinc-500">
                        Modern messaging, higher trust, better conversion.
                      </p>
                    </div>
                    <span className="hidden shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-300/80 sm:inline-flex">
                      Premium
                    </span>
                  </div>
                </div>

                {/* Metric cards */}
                <ul className="space-y-0.5 p-4 sm:p-6">
                  {metrics.map((item) => (
                    <li
                      key={item.title}
                      className="group/card rounded-xl border border-white/[0.04] bg-gradient-to-r from-white/[0.02] to-transparent p-4 transition-all duration-300 hover:border-white/[0.08] hover:from-emerald-500/[0.03] hover:to-transparent sm:p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800/60 transition-colors duration-300 group-hover/card:bg-emerald-500/10">
                          <item.icon className="h-4 w-4 text-zinc-400 transition-colors duration-300 group-hover/card:text-emerald-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white transition-colors duration-300 group-hover/card:text-emerald-100">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-sm text-zinc-500">
                            {item.desc}
                          </p>
                        </div>
                        <Zap className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-700 transition-all duration-300 group-hover/card:text-emerald-500/50 group-hover/card:translate-x-0.5" />
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Card footer */}
                <div className="border-t border-white/[0.06] px-6 py-4 sm:px-8">
                  <div className="flex items-center justify-between text-xs text-zinc-600">
                    <span>Optimized for conversion rate</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
