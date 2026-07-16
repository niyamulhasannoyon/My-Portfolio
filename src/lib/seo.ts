import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  keywords?: string[];
  category?: string;
}

/**
 * Central SEO helper. Builds absolute URLs, Open Graph, Twitter, canonical,
 * robots and metadata. Always call from page-level `generateMetadata`.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = "/og/default.png",
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
  keywords,
  category,
}: SeoProps = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = new URL(image, siteConfig.url).toString();
  const fullTitle = title ? `${title} | ${siteConfig.shortName}` : siteConfig.name;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    keywords,
    category,
    applicationName: siteConfig.shortName,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: siteConfig.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: "image/png",
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      images: [ogImage],
    },
    other: {
      "geo.region": siteConfig.geo.region.join(","),
      "geo.placename": siteConfig.geo.countryName,
    },
  };
}
