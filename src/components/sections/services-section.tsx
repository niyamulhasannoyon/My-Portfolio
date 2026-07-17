import { ShoppingCart, Globe, Gauge, Palette } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { StaggerCard } from "@/components/ui/stagger-card";

const NextJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" fill="none" {...props}>
    <path d="M128 24L24 128L128 232L232 128L128 24Z" fill="currentColor" />
    <path d="M128 56L56 128L128 200L200 128L128 56Z" fill="#000" />
  </svg>
);

const NodeJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" fill="none" {...props}>
    <path d="M128 20.6L38.4 73.2V182.8L128 235.4L217.6 182.8V73.2L128 20.6Z" fill="currentColor" />
    <path d="M88 176.7L128 197.6L168 176.7V127.5L128 148.5L88 127.5V176.7Z" fill="#fff" />
  </svg>
);

const WordPressIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" fill="none" {...props}>
    <circle cx="128" cy="128" r="104" fill="currentColor" />
    <path d="M80 72L116 192" stroke="#fff" strokeWidth="18" strokeLinecap="round" />
    <path d="M176 72L140 192" stroke="#fff" strokeWidth="18" strokeLinecap="round" />
    <path d="M82 76H174" stroke="#fff" strokeWidth="18" strokeLinecap="round" />
  </svg>
);

const services = [
  {
    icon: NextJsIcon,
    title: "Next.js & React Apps",
    desc: "Production-grade web apps and dashboards with the App Router, server components and edge rendering.",
  },
  {
    icon: NodeJsIcon,
    title: "Node.js & MongoDB",
    desc: "Scalable APIs, auth, and data layers engineered for performance and maintainability.",
  },
  {
    icon: WordPressIcon,
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
    <section className="bg-brand-surface py-16 md:py-24">
      <Container>
        <FadeInUp>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-brand-wider text-emerald-400">What I do</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Services built for conversion, not just code
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Every engagement is scoped to move a metric that matters to your business — speed, clarity, trust, or revenue.
            </p>
          </div>
        </FadeInUp>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.title}>
              <StaggerCard
                index={i}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-black/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.01] hover:border-emerald-500/50 hover:bg-white/[0.04] hover:shadow-[0_25px_80px_-35px_rgba(16,185,129,0.4)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-zinc-950 text-white shadow-[0_0_24px_rgba(0,0,0,0.12)] transition duration-300 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 group-hover:text-emerald-200">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              </StaggerCard>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
