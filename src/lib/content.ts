import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface CaseStudyFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: "Web App" | "E-commerce" | "WordPress" | "Performance" | "SaaS";
  client?: string;
  industry?: string;
  services: string[];
  coverImage?: string;
  techStack: string[];
  results: { metric: string; value: string }[];
  featured?: boolean;
  draft?: boolean;
}

export interface CaseStudy extends CaseStudyFrontmatter {
  slug: string;
  readingMinutes: number;
  content: string;
}

export interface CaseStudyMeta extends Omit<CaseStudy, "content"> {}

function parseFile(slug: string): CaseStudy {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as CaseStudyFrontmatter;

  return {
    ...fm,
    slug,
    content,
    readingMinutes: Math.ceil(readingTime(content).minutes),
  };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const slugs = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  return slugs
    .map((slug) => {
      const { content: _content, ...meta } = parseFile(slug);
      return meta as CaseStudyMeta;
    })
    .filter((post) => !post.draft)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  try {
    const post = parseFile(slug);
    if (post.draft) return null;
    return post;
  } catch {
    return null;
  }
}

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getFeaturedCaseStudies(limit = 3): CaseStudyMeta[] {
  const all = getAllCaseStudies();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
