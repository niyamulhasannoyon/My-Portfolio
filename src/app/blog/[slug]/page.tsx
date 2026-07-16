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
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              description: post.description,
              slug: post.slug,
              publishedTime: post.publishedAt,
              modifiedTime: post.updatedAt ?? post.publishedAt,
              image: post.coverImage,
            }),
          ),
        }}
      />
      <Container className="py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" /> All case studies
        </Link>

        <header className="mx-auto mt-6 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <Badge>{post.category}</Badge>
            {post.client && <span className="text-xs text-ink-muted">{post.client}</span>}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{post.description}</p>
          <p className="mt-3 text-sm text-ink-muted">
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
            <div className="prose-ink">{content}</div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
              <p className="text-sm font-semibold text-ink">Results</p>
              <ul className="mt-3 space-y-3">
                {post.results.map((r) => (
                  <li key={r.metric} className="flex items-baseline justify-between">
                    <span className="text-sm text-ink-muted">{r.metric}</span>
                    <span className="text-lg font-bold text-brand-600">{r.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
              <p className="text-sm font-semibold text-ink">Tech stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.techStack.map((t) => (
                  <span key={t} className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink-muted">
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
