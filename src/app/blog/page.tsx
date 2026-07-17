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
    <Container className="py-16 md:py-24">
      <SectionHeading
        eyebrow="Blog & Case Studies"
        title="Case studies & playbooks"
        description="How I turn traffic into revenue — with the receipts."
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <li key={post.slug} className="flex">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-white/[0.06] bg-zinc-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.03]"
            >
              <article className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <Badge className="border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-zinc-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white transition-colors duration-200 group-hover:text-emerald-200">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-7 text-zinc-400">{post.description}</p>
                <div className="mt-auto pt-4">
                  <span className="text-sm font-medium text-emerald-300 transition-colors duration-200 group-hover:text-emerald-200">
                    {post.readingMinutes} min read →
                  </span>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
