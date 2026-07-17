import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/sections/cta-section";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getCaseStudyBySlug(slug);
  if (!post) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    keywords: [...post.services, ...post.techStack],
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getCaseStudyBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  return (
    <article className="bg-brand-bg">
      <Container className="py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" /> All case studies
        </Link>

        <header className="mx-auto mt-6 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <Badge className="border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
              {post.category}
            </Badge>
            {post.client && <span className="text-xs text-zinc-500">{post.client}</span>}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{post.description}</p>
          <p className="mt-3 text-sm text-zinc-500">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readingMinutes} min read
          </p>
        </header>

        <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[1fr_280px]">
          <div className="max-w-2xl">
            <div className="prose-ink rounded-2xl border border-white/[0.06] bg-zinc-900/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-10">
              {content}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm">
              <p className="text-sm font-semibold text-white">Results</p>
              <ul className="mt-3 space-y-3">
                {post.results.map((r) => (
                  <li key={r.metric} className="flex items-baseline justify-between">
                    <span className="text-sm text-zinc-400">{r.metric}</span>
                    <span className="text-lg font-bold text-emerald-300">{r.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm">
              <p className="text-sm font-semibold text-white">Tech stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.techStack.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
      <CtaSection title="Have a similar challenge?" description="Let's talk through your project." />
    </article>
  );
}
