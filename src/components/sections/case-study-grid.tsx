import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { projects } from "@/constants/projects";
import type { ProjectItem } from "@/types/portfolio";

/** Map CaseStudyMeta to the grid display shape (enables the /work route). */
function toGridItems(meta: CaseStudyMeta[]): ProjectItem[] {
  return meta.map((m) => ({
    title: m.title,
    category: m.category,
    problem: m.problem ?? m.description,
    solution: (m.solution ?? m.problem) ?? m.description,
    tech: m.techStack ?? [],
    outcome: m.results?.map((r) => `${r.value} ${r.metric}`).join(" · ") || "Measurable results",
    outcomeDescription: "Proven performance gains across key business metrics.",
    demo: m.demoUrl ?? "",
    github: m.githubUrl ?? null,
  }));
}

/** Parse an outcome string like "-68% Load Time · +23% Trial Conversion" into metric pairs. */
function parseMetrics(outcome: string): { value: string; label: string }[] {
  const parts = outcome.split(" · ");
  if (parts.length > 1) {
    return parts.slice(0, 2).map((part) => {
      const match = part.match(/^([+\-]?\d+%|[+\-]?\d+\.?\d*)/);
      return {
        value: match ? match[1] : part,
        label: match ? part.slice(match[1].length).trim() : "Outcome",
      };
    });
  }
  return [{ value: outcome, label: "Result" }];
}

export function CaseStudyGrid({
  items,
  showViewAll = true,
  eyebrow = "Selected Work",
  title = "Case studies that drive measurable growth",
  description = "Each engagement is built around clarity, credibility, and conversion-focused design.",
  headerAlign = "left",
  sectionClassName = "bg-slate-950 py-24 text-slate-50",
}: {
  items: CaseStudyMeta[];
  showViewAll?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  headerAlign?: "left" | "center";
  sectionClassName?: string;
}) {
  const displayItems: readonly ProjectItem[] = items.length > 0 ? toGridItems(items) : projects;

  return (
    <section className={sectionClassName}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <FadeInUp>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
              align={headerAlign}
            />
          </FadeInUp>
          {showViewAll ? (
            <FadeInUp delay={0.15}>
              <Link
                href="/work"
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-300 transition hover:text-emerald-200"
              >
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </FadeInUp>
          ) : null}
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((project, index) => (
            <li key={project.title}>
              <FadeInUp delay={0.05 * index}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] transition duration-300 hover:-translate-y-2 hover:border-indigo-500/50 hover:bg-slate-800/90 hover:shadow-[0_20px_60px_-20px_rgba(99,102,241,0.35)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-300" />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                        {project.category}
                      </div>
                      <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-100">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-400">
                        {project.problem}
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-700/60 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-indigo-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                          {project.outcome}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {project.outcomeDescription}
                        </p>
                      </div>

                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-6 inline-flex items-center text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
                        >
                          View Live Project
                          <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
