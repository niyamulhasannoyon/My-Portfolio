import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "./pricing-card";
import { pricingTiers, formatPrice } from "./pricing-data";
import type { PricingTier } from "@/types/portfolio";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { StaggerCard } from "@/components/ui/stagger-card";

function PricingToggleCard({ landing, business }: { landing: PricingTier; business: PricingTier }) {
  const [active, setActive] = useState<"landing" | "business">("landing");
  const tier = active === "business" ? business : landing;

  const priceLabel =
    tier.priceTo && tier.priceTo > tier.priceFrom
      ? `${formatPrice(tier.priceFrom)}–${formatPrice(tier.priceTo)}`
      : formatPrice(tier.priceFrom);

  return (
    <StaggerCard
      index={0}
      className="group relative flex flex-col rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.01] hover:border-emerald-500/50 hover:bg-white/[0.04]"
    >
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Website package</p>
          <p className="mt-2 text-sm text-zinc-400">Toggle between a Landing Page and a Business Website</p>
        </div>
        <div className="inline-flex overflow-hidden rounded-full border border-white/10 bg-zinc-950/70">
          {[
            { id: "landing", label: "Landing" },
            { id: "business", label: "Business" },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setActive(option.id as "landing" | "business")}
              className={`px-4 py-2 text-sm font-semibold transition ${
                active === option.id
                  ? "bg-emerald-500 text-zinc-950"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
      <p className="mt-2 text-sm text-zinc-400">{tier.tagline}</p>

      <div className="mt-5 flex items-end gap-1">
        {tier.priceNote && <span className="mb-1 text-xs text-zinc-500">{tier.priceNote}</span>}
        <span className="text-3xl font-bold tracking-tight text-white">{priceLabel}</span>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-zinc-400">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 h-3.5 w-3.5 rounded-full bg-emerald-400/80" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <a
          href={tier.cta.href}
          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          {tier.cta.label}
        </a>
      </div>
    </StaggerCard>
  );
}

export function PricingSection() {
  const landingTier = pricingTiers.find((tier) => tier.id === "landing")!;
  const businessTier = pricingTiers.find((tier) => tier.id === "business")!;
  const highlightedTiers = pricingTiers.filter((tier) => tier.id !== "landing" && tier.id !== "business");

  return (
    <section className="py-20 bg-brand-bg">
      <Container>
        <FadeInUp>
          <SectionHeading
            eyebrow="Pricing & Services"
            title="Packages built to fit your goals"
            description="Transparent fixed-scope pricing. Every plan ships fast, ranks well, and is built to convert."
            align="center"
          />
        </FadeInUp>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PricingToggleCard landing={landingTier} business={businessTier} />
          {highlightedTiers.map((tier, i) => (
            <PricingCard key={tier.id} tier={tier} index={i + 1} />
          ))}
        </div>

        <FadeInUp delay={0.2}>
          <p className="mt-10 text-center text-sm text-zinc-400">
            Custom or retained work?{" "}
            <a href="/contact" className="font-medium text-emerald-300 hover:text-emerald-200 hover:underline">
              Let&apos;s talk
            </a>{" "}
            about a tailored scope.
          </p>
        </FadeInUp>
      </Container>
    </section>
  );
}
