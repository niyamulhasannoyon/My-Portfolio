import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Sparkles, Zap, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BentoCard } from "@/components/ui/bento-card";

const highlights = [
  "Next.js, React, Node.js & MongoDB",
  "Conversion-focused UX & architecture",
  "Sub-second load times & technical SEO",
];

const stats = [
  { label: "Projects Shipped", value: "10+" },
  { label: "Client Satisfaction", value: "100%" },
  { label: "Target Markets", value: "US / UK / EU" },
];

const featureCards = [
  {
    icon: Code2,
    title: "Developer-First & Scalable Architecture",
    desc: "Clean, maintainable codebases built on Next.js and Node.js that scale seamlessly as your user base grows.",
  },
  {
    icon: Zap,
    title: "Sub-Second Performance & CRO",
    desc: "Lighthouse 95+ builds, lighter bundle sizes, and friction-free user paths designed to turn traffic into revenue.",
  },
  {
    icon: Sparkles,
    title: "Tailored for Founders, Startups & Brands",
    desc: "Whether you need an e-commerce platform, SaaS dashboard, or landing page, I deliver software engineered for trust and growth.",
    wide: true,
  },
];

export function AboutPreview() {
  return (
    <section className="bg-brand-bg py-20">
      <Container>
        <div className="grid gap-8 rounded-2xl border border-white/[0.06] bg-zinc-900/60 p-6 text-white shadow-2xl shadow-black/40 backdrop-blur-sm sm:rounded-3xl sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <SectionHeading
              eyebrow="About Me"
              title="I build web applications that earn trust and drive business revenue."
              description="I’m Niyamul Hasan — a full-stack software engineer specializing in Next.js, React, Node.js, and modern web architectures for international clients."
              align="left"
            />

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] px-3.5 py-1.5 text-xs font-medium text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-[transform,colors] duration-300 hover:bg-emerald-400 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start a Project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-200 transition-[transform,colors] duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] hover:text-white hover:-translate-y-0.5 active:translate-y-0"
              >
                More About Me
              </Link>
            </div>
          </div>

          {/* Profile Card & Proof Visual */}
          <div className="flex flex-col justify-between gap-6">
            <div className="group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 p-5 shadow-xl transition-all duration-300 hover:border-emerald-500/30">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {/* Profile Image with Glow & Status Indicator */}
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-500/30 shadow-lg sm:h-32 sm:w-32">
                  <Image
                    src="/profile.jpg"
                    alt="Niyamul Hasan - Full-Stack Developer"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    <ShieldCheck className="h-4 w-4" /> Verified Full-Stack Engineer
                  </div>
                  <h3 className="text-xl font-bold text-white">Niyamul Hasan</h3>
                  <p className="text-xs text-zinc-400">Specializing in Next.js, Node.js &amp; E-Commerce Architecture</p>
                  
                  <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Remote — US, UK &amp; European Clients</span>
                  </div>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/[0.03] p-2">
                    <p className="text-base font-extrabold text-emerald-400 sm:text-lg">{s.value}</p>
                    <p className="text-[10px] font-medium text-zinc-400 sm:text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Value Feature Grid */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => (
            <li key={card.title} className={card.wide ? "sm:col-span-2 lg:col-span-1" : ""}>
              <BentoCard className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{card.desc}</p>
              </BentoCard>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
