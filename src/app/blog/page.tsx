import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { getAllCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Case Studies",
  description:
    "Case studies, teardowns and playbooks on conversion-focused web development with Next.js, React and WordPress.",
  path: "/blog",
  keywords: ["web development blog", "Next.js case studies", "conversion playbook"],
});

export default function BlogPage() {
  const posts = getAllCaseStudies();
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Blog"
        title="Case studies & playbooks"
        description="How I turn traffic into revenue — with the receipts."
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-shadow hover:shadow-glow"
            >
              <article className="flex h-full flex-col">
                <div className="flex items-center gap-2">
                  <Badge>{post.category}</Badge>
                  <span className="text-xs text-ink-muted">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-ink group-hover:text-brand-600">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{post.description}</p>
                <span className="mt-4 text-sm font-medium text-brand-600">
                  {post.readingMinutes} min read →
                </span>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
