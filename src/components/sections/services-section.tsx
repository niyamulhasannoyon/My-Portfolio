import { Code2, ShoppingCart, Globe, Gauge, Database, Palette } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

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
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="What I do"
          title="Services built for conversion, not just code"
          description="Every engagement is scoped to move a metric that matters to your business."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-shadow hover:shadow-glow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
