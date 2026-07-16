import Link from "next/link";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/types/portfolio";
import { formatPrice } from "./pricing-data";
import { StaggerCard } from "@/components/ui/stagger-card";

export function PricingCard({ tier, index = 0 }: { tier: PricingTier; index?: number }) {
  const priceLabel =
    tier.priceTo && tier.priceTo > tier.priceFrom
      ? `${formatPrice(tier.priceFrom)}–${formatPrice(tier.priceTo)}`
      : formatPrice(tier.priceFrom);

  return (
    <StaggerCard
      index={index}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-6 shadow-card transition-[transform,colors,box-shadow] duration-300 ease-in-out",
        tier.popular
          ? "border-brand-500 shadow-glow hover:-translate-y-1 lg:-translate-y-4"
          : "border-ink/10 hover:-translate-y-1 hover:shadow-glow",
      )}
    >
      {tier.popular && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <Star className="h-3.5 w-3.5 fill-white" /> Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-ink">{tier.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">{tier.tagline}</p>

      <div className="mt-5 flex items-end gap-1">
        {tier.priceNote && (
          <span className="mb-1 text-xs text-ink-muted">{tier.priceNote}</span>
        )}
        <span className="text-3xl font-bold tracking-tight text-ink">{priceLabel}</span>
      </div>

      <ul className="mt-6 space-y-3 text-sm">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-ink-muted">
            <Check className="mt-0.5 h-4 w-4 flex-none text-brand-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <Button
          asChild
          size="lg"
          variant={tier.popular ? "primary" : "outline"}
          className="w-full"
        >
          <Link href={tier.cta.href}>{tier.cta.label}</Link>
        </Button>
      </div>
    </StaggerCard>
  );
}
