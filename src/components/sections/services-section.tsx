import Link from "next/link";
import { Layout, ShoppingCart, Cpu, CheckCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { BentoCard } from "@/components/ui/bento-card";

const servicePackages = [
  {
    icon: Layout,
    badge: "For Startups & Brands",
    title: "🚀 Business Websites & Landing Pages",
    description: "High-converting, sub-second marketing websites engineered to turn visitors into booked calls and paying customers.",
    deliverables: [
      "Custom responsive Next.js / React build",
      "Pixel-perfect Figma-to-code implementation",
      "Sub-second load speed & 95+ Lighthouse",
      "Technical SEO & OpenGraph optimization",
      "Integrated contact forms & booking triggers",
    ],
    cta: "Build a Marketing Site",
  },
  {
    icon: ShoppingCart,
    badge: "For E-Commerce Brands",
    title: "🛒 Custom E-Commerce & Storefronts",
    description: "Scalable online storefronts designed for smooth product discovery, fast variant selection, and high checkout completion rates.",
    deliverables: [
      "Custom Next.js or Headless WordPress storefront",
      "Dynamic product search, swatches & filters",
      "Optimized multi-step cart & checkout flows",
      "Stripe / PayPal / custom payment integration",
      "Back-office inventory management dashboard",
    ],
    cta: "Launch E-Commerce Store",
  },
  {
    icon: Cpu,
    badge: "For SaaS & Growing Tech",
    title: "⚙️ Custom Web Applications & SaaS",
    description: "Production-ready web applications, interactive admin dashboards, and robust API backends built for scale.",
    deliverables: [
      "Full-stack Next.js, Node.js & MongoDB architecture",
      "Secure user authentication (JWT/OAuth)",
      "Real-time analytics & data visualizations",
      "Scalable RESTful / GraphQL API development",
      "Cloud deployment on Vercel, AWS or Cloudflare",
    ],
    cta: "Develop Web App",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-brand-surface py-20 md:py-28">
      <Container>
        <FadeInUp>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-brand-wider text-emerald-400">Services &amp; Solutions</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Solutions built to move metrics that matter
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Clear, fixed-scope engineering packages tailored for founders, startups, and modern digital businesses.
            </p>
          </div>
        </FadeInUp>

        <ul className="mt-12 grid gap-8 lg:grid-cols-3">
          {servicePackages.map((s, i) => (
            <li key={s.title}>
              <FadeInUp delay={0.08 * i}>
                <BentoCard className="flex h-full flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                        <s.icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                        {s.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.description}</p>

                    <div className="mt-6 border-t border-white/5 pt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">What’s included:</p>
                      <ul className="mt-3 space-y-2.5">
                        {s.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5">
                    <Link
                      href="/contact"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3 text-xs font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-500 hover:text-zinc-950"
                    >
                      {s.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </BentoCard>
              </FadeInUp>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
