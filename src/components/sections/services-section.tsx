import { Code2, ShoppingCart, Globe, Gauge, Database, Palette } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <section className="py-20 bg-[#09090b]">
      <Container>
        <FadeInUp>
          <SectionHeading
            eyebrow="What I do"
            title="Services built for conversion, not just code"
            description="Every engagement is scoped to move a metric that matters to your business."
          />
        </FadeInUp>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerCard
              key={s.title}
              index={i}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.03] hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-200">
                <s.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-emerald-100">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
            </StaggerCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
