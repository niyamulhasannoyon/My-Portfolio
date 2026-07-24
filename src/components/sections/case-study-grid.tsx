"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Zap, CheckCircle2, Layers } from "lucide-react";
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
      m.results?.map((r) => `${r.value} ${r.metric}`).join(" · ") || "High Performance Build",
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
  sectionClassName = "bg-brand-bg py-20 md:py-28 text-white",
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
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(displayItems.map((p) => p.category)))];

  const filteredItems =
    activeCategory === "All"
      ? displayItems
      : displayItems.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className={sectionClassName}>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <FadeInUp>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
              align={headerAlign}
            />
          </FadeInUp>

          {showViewAll && (
            <FadeInUp delay={0.15}>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                View all projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </FadeInUp>
          )}
        </div>

        {/* Category Filters */}
        <FadeInUp delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-white/5 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20"
                    : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Project Cards Grid */}
        <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((project, index) => (
            <li key={project.title}>
              <FadeInUp delay={0.06 * index}>
                <div className="group flex h-full flex-col justify-between rounded-3xl border border-white/[0.08] bg-zinc-900/60 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:bg-zinc-900/90 hover:shadow-2xl hover:shadow-emerald-500/5">
                  <div>
                    {/* Header: Category Badge & Outcome Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                        {project.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300">
                        <Zap className="h-3 w-3 text-emerald-400" />
                        {project.outcome}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Problem / Challenge */}
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                      {project.problem}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-5">
                    {/* Tech Badges */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300 group/link"
                      >
                        <span>View Live Project</span>
                        <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
