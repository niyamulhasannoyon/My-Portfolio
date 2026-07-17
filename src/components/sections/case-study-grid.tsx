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

        <ul className="mt-12 grid gap-8">
          {displayItems.map((project, index) => (
            <li key={project.title}>
              <FadeInUp delay={0.05 * index}>
                <article className="group relative w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-2xl shadow-black/20 transition-all duration-500 hover:border-white/10 hover:shadow-[0_20px_60px_-20px_rgba(16,185,129,0.15)] md:p-10">
                  <div className="grid gap-8 md:grid-cols-12">
                    {/* Left 5 Columns: Big Metric Callouts & Meta */}
                    <div className="flex flex-col justify-between space-y-6 md:col-span-5">
                      <div>
                        <Badge className="border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                          {project.category}
                        </Badge>
                        <h3 className="mt-4 text-2xl font-bold text-white">{project.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-zinc-400">{project.problem}</p>
                      </div>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-neutral-700 bg-neutral-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Metric callouts */}
                      <div className="grid grid-cols-2 gap-4 border-t border-neutral-800 pt-6">
                        {parseMetrics(project.outcome).map((m) => (
                          <div key={m.label}>
                            <div className="text-3xl font-black text-emerald-400">{m.value}</div>
                            <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Action links */}
                      <div className="flex flex-wrap gap-3">
                        {project.demo ? (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View live demo of ${project.title} (opens in a new tab)`}
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition-[transform,colors] duration-300 hover:bg-emerald-400 hover:-translate-y-0.5 active:translate-y-0"
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
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/60 px-4 py-2 text-sm font-semibold text-zinc-200 transition-[transform,colors] duration-300 hover:border-emerald-400/40 hover:text-emerald-200 hover:-translate-y-0.5 active:translate-y-0"
                          >
                            GitHub <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {/* Right 7 Columns: App Mockup Placeholder */}
                    <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 transition-colors duration-500 group-hover:border-neutral-700 md:col-span-7 md:min-h-[260px]">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent" />

                      {/* Decorative dashboard preview */}
                      <div className="w-full max-w-sm space-y-3 p-6">
                        {/* Mockup header */}
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-emerald-500/40" />
                          <div className="h-2 w-24 rounded-full bg-neutral-800" />
                          <div className="ml-auto h-2 w-16 rounded-full bg-neutral-800" />
                        </div>
                        {/* Mockup bars */}
                        <div className="space-y-2 pt-2">
                          <div className="h-3 w-full rounded-full bg-neutral-800/80" />
                          <div className="h-3 w-3/4 rounded-full bg-neutral-800/60" />
                          <div className="h-3 w-5/6 rounded-full bg-neutral-800/70" />
                          <div className="h-3 w-2/3 rounded-full bg-neutral-800/50" />
                        </div>
                        {/* Mockup chart area */}
                        <div className="flex items-end gap-1 pt-4">
                          {[35, 60, 45, 80, 55, 90, 70].map((h, i) => (
                            <div
                              key={i}
                              className="h-12 w-full rounded-sm bg-gradient-to-t from-emerald-500/20 to-emerald-500/5"
                              style={{ height: `${h * 0.6 + 8}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeInUp>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
