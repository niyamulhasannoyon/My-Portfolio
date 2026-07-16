import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

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
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Client love"
          title="What founders & agencies say"
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-card"
            >
              <blockquote className="text-sm leading-7 text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-ink-muted">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
