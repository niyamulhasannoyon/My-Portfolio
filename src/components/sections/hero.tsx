import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config";
import { FadeInUp } from "@/components/ui/fade-in-up";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.2),_transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <FadeInUp delay={0.05}>
              <Badge className="w-fit border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                {siteConfig.availability}
              </Badge>
            </FadeInUp>

            <FadeInUp delay={0.12}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                I help businesses increase sales and build trust with fast, modern
                websites that convert visitors into customers.
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Built with <span className="font-semibold text-emerald-300">Next.js, React, Node.js, MongoDB</span>{" "}
                to create sleek, scalable experiences that feel premium and perform beautifully.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.28}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-emerald-500 px-7 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
                >
                  <Link href="/contact">
                    Book a Free 10-Min Strategy Call <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-slate-700 bg-slate-900/70 px-7 py-3 text-base font-semibold text-slate-100 hover:border-emerald-400/50 hover:bg-slate-800"
                >
                  <Link href="/work">View Case Studies</Link>
                </Button>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.36}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  <span>4.9/5 average client rating</span>
                </div>
                <span className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
                  Fast launch timelines
                </span>
                <span className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
                  SEO + CRO baked in
                </span>
              </div>
            </FadeInUp>
          </div>

          <FadeInUp delay={0.15} y={40}>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">Growth-first web design</p>
                    <p className="mt-1 text-sm text-slate-400">Modern messaging, higher trust, better conversion.</p>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
                    Premium
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                    <p className="text-sm font-medium text-white">Faster site speed</p>
                    <p className="mt-1 text-sm text-slate-400">Reduce friction and keep visitors engaged.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                    <p className="text-sm font-medium text-white">Clear conversion paths</p>
                    <p className="mt-1 text-sm text-slate-400">Guide each visitor toward the next best action.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                    <p className="text-sm font-medium text-white">Built to scale</p>
                    <p className="mt-1 text-sm text-slate-400">A strong foundation for landing pages, blogs, and product growth.</p>
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
