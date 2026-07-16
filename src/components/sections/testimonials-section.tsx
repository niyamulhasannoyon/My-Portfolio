import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { StaggerCard } from "@/components/ui/stagger-card";

const testimonials = [
  {
    quote:
      "Our cold LinkedIn traffic finally converts. The new site loads instantly and the booking rate doubled.",
    name: "Sarah L.",
    role: "Founder, UK SaaS",
  },
  {
    quote:
      "Reliable, fast, and obsessed with performance. The MongoDB rebuild saved us a fortune in infra.",
    name: "Marcus T.",
    role: "CTO, Berlin Fintech",
  },
  {
    quote:
      "Agency-quality work at freelance flexibility. The case-study content now ranks on page one.",
    name: "Emily R.",
    role: "Marketing Lead, US E-com",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#09090b] py-20">
      <Container>
        <FadeInUp>
          <SectionHeading
            eyebrow="Client love"
            title="What founders & agencies say"
            align="center"
          />
        </FadeInUp>
        <div className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <StaggerCard
              key={t.name}
              index={i}
              className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/[0.04]"
            >
              <blockquote className="text-sm leading-7 text-zinc-300">&#x201C;{t.quote}&#x201D;</blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </figcaption>
            </StaggerCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
