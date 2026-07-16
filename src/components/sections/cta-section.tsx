import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeInUp } from "@/components/ui/fade-in-up";

export function CtaSection({
  title = "Ready to turn traffic into revenue?",
  description = "Book a free 10-minute strategy call. I'll audit your site and show you exactly where the conversions are leaking.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-brand-bg py-20">
      <Container>
        <FadeInUp>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 px-8 py-16 text-center text-white shadow-2xl shadow-black/40 backdrop-blur-sm before:pointer-events-none before:absolute before:-top-40 before:left-1/2 before:h-80 before:w-80 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500/5 before:blur-[100px] before:content-[''] sm:px-16">
            <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">{description}</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a free call{" "}
                <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-zinc-200 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] hover:text-white hover:-translate-y-0.5 active:translate-y-0"
              >
                See results
              </Link>
            </div>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
