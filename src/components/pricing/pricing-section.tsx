import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "./pricing-card";
import { pricingTiers } from "./pricing-data";

export function PricingSection() {
  return (
    <section className="py-20 bg-ink/[0.02]">
      <Container>
        <SectionHeading
          eyebrow="Pricing & Services"
          title="Packages built to fit your goals"
          description="Transparent fixed-scope pricing. Every plan ships fast, ranks well, and is built to convert."
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-muted">
          Custom or retained work?{" "}
          <a href="/contact" className="font-medium text-brand-600 hover:underline">
            Let&apos;s talk
          </a>{" "}
          about a tailored scope.
        </p>
      </Container>
    </section>
  );
}
