import { Search, Compass, Terminal, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeInUp } from "@/components/ui/fade-in-up";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Strategy",
    description: "We define your core business goals, target client personas, and key conversion metrics before writing a line of code.",
  },
  {
    number: "02",
    icon: Compass,
    title: "UX & System Architecture",
    description: "We map out high-converting user flows, wireframes, and scalable database schemas optimized for performance.",
  },
  {
    number: "03",
    icon: Terminal,
    title: "Full-Stack Development",
    description: "Clean, maintainable Next.js / React & Node.js development built with zero code bloat and sub-second load times.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & CRO Growth",
    description: "Rigorous 95+ Lighthouse audits, technical SEO checks, and post-launch optimization to maximize conversion rates.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-brand-surface py-20 border-y border-white/5">
      <Container>
        <FadeInUp>
          <SectionHeading
            eyebrow="How I Work"
            title="A predictable 4-step process built for speed and results"
            description="No guesswork. No communication black holes. Just clear milestones and high-performance delivery."
            align="center"
          />
        </FadeInUp>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <FadeInUp key={step.number} delay={0.08 * idx}>
              <div className="relative flex h-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-zinc-900/60 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/90">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-extrabold text-emerald-400">
                      STEP {step.number}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <step.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">{step.description}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
