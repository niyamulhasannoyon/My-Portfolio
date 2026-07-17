import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { StaggerCard } from "@/components/ui/stagger-card";
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
    outcome: m.results?.map((r) => `${r.metric} ${r.value}`).join(" · ") || "Measurable results",
    outcomeDescription: "Proven performance gains across key business metrics.",
    demo: m.demoUrl ?? "",
    github: m.githubUrl ?? null,
  }));
}

export function CaseStudyGrid({ items, showViewAll = true }: { items: CaseStudyMeta[]; showViewAll?: boolean; }) {
  const displayItems: readonly ProjectItem[] = items.length > 0 ? toGridItems(items) : projects;

  return (
    <section className="bg-slate-950 py-24 text-slate-50">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <FadeInUp>
            <SectionHeading
              eyebrow="Selected Work"
              title="Case studies that drive measurable growth"
              description="Each engagement is built around clarity, credibility, and conversion-focused design."
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

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((project, index) => (
            <li key={project.title}>
              <StaggerCard
                index={index}
                hoverReveal
                as="article"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_32%)] before:opacity-0 before:transition before:duration-500 before:content-[''] group-hover:border-emerald-400/40 group-hover:shadow-[0_20px_60px_-20px_rgba(16,185,129,0.35)] group-hover:before:opacity-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge className="border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                    {project.category}
                  </Badge>
                  <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-xs font-medium uppercase tracking-brand-wide text-slate-400" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{project.problem}</p>

                <dl className="mt-6 space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-brand-wide text-slate-500">Problem</dt>
                    <dd className="mt-1 text-sm text-slate-300">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-brand-wide text-slate-500">Solution</dt>
                    <dd className="mt-1 text-sm text-slate-300">{project.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-brand-wide text-slate-500">Technologies</dt>
                    <dd>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <li key={tech} className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <p className="text-sm font-semibold text-emerald-300">{project.outcome}</p>
                  <p className="mt-1 text-sm text-slate-300">{project.outcomeDescription}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title} (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-[transform,colors] duration-300 hover:bg-slate-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Live Demo <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition-[transform,colors] duration-300 hover:border-emerald-400/40 hover:text-emerald-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      GitHub <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : null}
                </div>
              </StaggerCard>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
