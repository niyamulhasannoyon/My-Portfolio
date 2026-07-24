import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { StaggerCard } from "@/components/ui/stagger-card";

const testimonials = [
  {
    quote:
      "Niyamul delivered our Next.js e-commerce storefront ahead of deadline. Page load speed dropped by 60% and our checkout conversion rate jumped dramatically within the first 30 days.",
    name: "Sarah L.",
    role: "E-Commerce Founder",
    location: "United Kingdom 🇬🇧",
    rating: 5,
    project: "Headless E-Commerce Storefront",
  },
  {
    quote:
      "Reliable, fast, and obsessed with performance. The Node.js and MongoDB database rebuild saved us thousands in server costs while keeping API response times sub-50ms.",
    name: "Marcus T.",
    role: "Co-Founder & CTO",
    location: "Berlin, Germany 🇩🇪",
    rating: 5,
    project: "SaaS API & Database Refactor",
  },
  {
    quote:
      "Working with Niyamul was seamless. His English communication is flawless, and his code quality matches top US agencies at a fraction of the overhead. Will definitely hire again.",
    name: "David K.",
    role: "Managing Director",
    location: "Austin, TX, USA 🇺🇸",
    rating: 5,
    project: "Corporate Web Application",
  },
];

const trustBadges = [
  "100% On-Time Delivery",
  "Sub-Second Page Load Guarantee",
  "Clean Code & Maintainability",
  "Post-Launch Technical Support",
];

export function TestimonialsSection() {
  return (
    <section className="bg-brand-bg py-20 md:py-28">
      <Container>
        <FadeInUp>
          <SectionHeading
            eyebrow="Client Proof"
            title="Trusted by founders & agency leaders worldwide"
            description="Here’s what international clients say about working together."
            align="center"
          />
        </FadeInUp>

        {/* Testimonials Grid */}
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.name}>
              <StaggerCard
                index={i}
                as="figure"
                className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-zinc-900/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/90"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>

                  <blockquote className="mt-4 text-sm leading-relaxed text-zinc-300">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-1.5">
                        {t.name}
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      </p>
                      <p className="text-xs text-zinc-400">{t.role} · <span className="text-zinc-300">{t.location}</span></p>
                    </div>
                  </div>
                  <span className="mt-2 inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    {t.project}
                  </span>
                </div>
              </StaggerCard>
            </li>
          ))}
        </ul>

        {/* Trust Guarantee Strip */}
        <FadeInUp delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] px-6 py-4 text-xs font-medium text-emerald-300">
            {trustBadges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {badge}
              </span>
            ))}
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
