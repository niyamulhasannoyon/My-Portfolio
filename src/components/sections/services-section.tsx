import { Code2, ShoppingCart, Globe, Gauge, Database, Palette } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { StaggerCard } from "@/components/ui/stagger-card";

const services = [
  {
    icon: Code2,
    title: "Next.js & React Apps",
    desc: "Production-grade web apps and dashboards with the App Router, server components and edge rendering.",
  },
  {
    icon: Database,
    title: "Node.js & MongoDB",
    desc: "Scalable APIs, auth, and data layers engineered for performance and maintainability.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce & WordPress",
    desc: "Headless WordPress, WooCommerce and custom storefronts that convert browsers to buyers.",
  },
  {
    icon: Gauge,
    title: "Performance & CRO",
    desc: "Core Web Vitals tuning, A/B testing and landing pages built to convert cold traffic.",
  },
  {
    icon: Globe,
    title: "SEO-First Builds",
    desc: "Technical SEO, structured data and content systems that rank and attract inbound leads.",
  },
  {
    icon: Palette,
    title: "Design-to-Code",
    desc: "Pixel-perfect Tailwind CSS implementations from Figma with a polished design system.",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-[#030712] py-16 sm:py-20">
      <Container>
        <FadeInUp>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">What I do</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Services built for conversion, not just code
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Every engagement is scoped to move a metric that matters to your business — speed, clarity, trust, or revenue.
            </p>
          </div>
        </FadeInUp>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <StaggerCard
              key={s.title}
              index={i}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-black/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.02]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-900/20 text-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.12)] transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-400/40 group-hover:bg-emerald-500/15">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
            </StaggerCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
