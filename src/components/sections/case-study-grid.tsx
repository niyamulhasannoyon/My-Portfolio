"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
    outcome:
      m.results?.map((r) => `${r.value} ${r.metric}`).join(" · ") || "Measurable results",
    outcomeDescription: "Proven performance gains across key business metrics.",
    demo: m.demoUrl ?? "",
    github: m.githubUrl ?? null,
  }));
}

export function CaseStudyGrid({
  items,
  showViewAll = true,
  useStaticProjects = false,
  eyebrow = "Selected Work",
  title = "Case studies that drive measurable growth",
  description = "Each engagement is built around clarity, credibility, and conversion-focused design.",
  headerAlign = "left",
  sectionClassName = "bg-slate-950 py-24 text-slate-50",
}: {
  items: CaseStudyMeta[];
  showViewAll?: boolean;
  useStaticProjects?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  headerAlign?: "left" | "center";
  sectionClassName?: string;
}) {
  const displayItems: readonly ProjectItem[] = useStaticProjects ? projects : items.length > 0 ? toGridItems(items) : projects;

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
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-800/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/50 hover:bg-slate-800 hover:shadow-xl hover:shadow-indigo-500/5">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-100">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {project.problem}
                    </p>
                  </div>

                  <div className="mt-6">
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

                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300 group/link"
                      >
                        View Live Project
                        <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </a>
                    ) : null}
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
