import type { Article, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";

/** JSON-LD for an individual blog/case-study article (rich results eligible). */
export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime: string;
  image?: string;
}): WithContext<Article> {
  const url = new URL(`/blog/${input.slug}`, siteConfig.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? new URL(input.image, siteConfig.url).toString() : undefined,
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime,
    author: { "@type": "Person", name: siteConfig.author, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      logo: { "@type": "ImageObject", url: new URL("/logo.png", siteConfig.url).toString() },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
