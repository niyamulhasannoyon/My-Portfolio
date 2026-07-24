import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeInUp } from "@/components/ui/fade-in-up";

export function CtaSection({
  title = "Have an Idea or Project? Let’s Turn It Into Reality.",
  description = "Book a free 15-minute discovery call or send a message. I’ll review your project goals and provide a transparent, fixed-scope proposal within 24 hours.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-brand-bg py-20 md:py-28">
      <Container>
        <FadeInUp>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-zinc-900/90 via-zinc-900/70 to-zinc-950/90 px-8 py-16 text-center text-white shadow-2xl shadow-black/40 backdrop-blur-sm before:pointer-events-none before:absolute before:-top-40 before:left-1/2 before:h-80 before:w-80 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500/10 before:blur-[100px] before:content-[''] sm:px-16">
            <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Ready to grow your business?
            </span>
            <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-300">{description}</p>
            
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-[transform,colors,box-shadow] duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-[transform] duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-8 py-4 text-base font-semibold text-zinc-200 transition-[transform,colors] duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] hover:text-white hover:-translate-y-0.5 active:translate-y-0"
              >
                View Selected Work
              </Link>
            </div>

            <p className="mt-6 text-xs text-zinc-500">
              ⚡ Fast 24-Hour Response · 🔒 Strict NDA &amp; IP Protection Available · 🌍 US / UK / EU Friendly Hours
            </p>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
