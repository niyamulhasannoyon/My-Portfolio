import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyMeta } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { FadeInUp } from "@/components/ui/fade-in-up";
import { StaggerCard } from "@/components/ui/stagger-card";

interface ProjectItem {
  title: string;
  category: string;
  problem: string;
  solution: string;
  tech: string[];
  outcome: string;
  demo: string;
  github: string;
}

const projects: ProjectItem[] = [
  {
    title: "Full-Stack E-commerce Experience",
    category: "E-commerce",
    problem: "A modern brand needed a storefront that could scale with inventory, trust signals, and higher conversion rates.",
    solution: "Designed and built a fast Next.js storefront with a MongoDB-powered catalog, optimized checkout flow, and polished visual storytelling.",
    tech: ["Next.js", "MongoDB", "Cloudinary"],
    outcome: "Boosted sales by 40%",
    demo: "https://example.com",
    github: "https://github.com",
  },
  {
    title: "Inventory & POS Control Dashboard",
    category: "SaaS / Operations",
    problem: "A growing retail team needed a real-time system to manage inventory, sales, and product movement without chaos.",
    solution: "Delivered a React + Node.js dashboard with live analytics, role-based control, and Cloudflare-powered performance.",
    tech: ["React", "Node.js", "Cloudflare"],
    outcome: "100% Core Web Vitals score",
    demo: "https://example.com",
    github: "https://github.com",
  },
  {
    title: "Premium Corporate & Niche Business Site",
    category: "WordPress",
    problem: "A niche business needed a premium, trust-building website that felt high-end and converted visitors instantly.",
    solution: "Created a refined WordPress experience with Elementor and custom CSS for polished UX, SEO, and strong calls to action.",
    tech: ["WordPress", "Elementor", "Custom CSS"],
    outcome: "Reduced bounce rate by 35%",
    demo: "https://example.com",
    github: "https://github.com",
  },
];

/** Map CaseStudyMeta to the grid display shape (enables the /work route). */
function toGridItems(meta: CaseStudyMeta[]): ProjectItem[] {
  return meta.map((m) => ({
    title: m.title,
    category: m.category,
    problem: m.description,
    solution: m.description,
    tech: m.techStack ?? [],
    outcome: m.results?.map((r) => `${r.metric} ${r.value}`).join(" · ") || "Measurable results",
    demo: "",
    github: "",
  }));
}

export function CaseStudyGrid({ items }: { items: CaseStudyMeta[] }) {
  const displayItems: ProjectItem[] = items.length > 0 ? toGridItems(items) : projects;

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
          <FadeInUp delay={0.15}>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-300 transition hover:text-emerald-200"
            >
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </FadeInUp>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {displayItems.map((project, index) => (
            <StaggerCard
              key={project.title}
              index={index}
              hoverReveal
              className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 hover:border-emerald-400/40 hover:shadow-[0_20px_60px_-20px_rgba(16,185,129,0.35)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_32%)] opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <Badge className="border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                    {project.category}
                  </Badge>
                  <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{project.problem}</p>

                <div className="mt-6 space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Problem</p>
                    <p className="mt-1 text-sm text-slate-300">{project.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Solution</p>
                    <p className="mt-1 text-sm text-slate-300">{project.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Technologies</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <p className="text-sm font-semibold text-emerald-300">{project.outcome}</p>
                  <p className="mt-1 text-sm text-slate-300">A measurable lift in performance, trust, and conversion.</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                  >
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-200"
                  >
                    GitHub <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </StaggerCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
