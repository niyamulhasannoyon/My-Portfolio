import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/ui/fade-in-up";

export function CtaSection({
  title = "Ready to turn traffic into revenue?",
  description = "Book a free 20-minute strategy call. I'll audit your site and show you exactly where the conversions are leaking.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20">
      <Container>
        <FadeInUp>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-8 py-16 text-center text-white sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Book a free call <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/work">See results</Link>
              </Button>
            </div>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
