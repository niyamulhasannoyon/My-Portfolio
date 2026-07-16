import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getCaseStudySlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/blog", "/about", "/contact"].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = getCaseStudySlugs().map((slug) => ({
    url: new URL(`/blog/${slug}`, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
