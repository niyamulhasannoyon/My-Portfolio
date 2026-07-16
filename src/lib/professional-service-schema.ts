import type { ProfessionalService, WithContext } from "schema-dts";
import { siteConfig } from "@/lib/config";

/**
 * JSON-LD for a Professional Service / freelance developer. Helps Google rank
 * the site for both local (US/UK) and international high-ticket queries.
 * Inject via a <script type="application/ld+json"> in the root layout.
 */
export function professionalServiceSchema(): WithContext<ProfessionalService> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone || undefined,
    image: new URL("/og/default.png", siteConfig.url).toString(),
    logo: new URL("/logo.png", siteConfig.url).toString(),
    priceRange: "$$$",
    slogan: "High-performance web apps that convert cold traffic into high-ticket clients.",
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Europe" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: siteConfig.author,
      jobTitle: "Full-Stack Developer",
      knowsAbout: [
        "Next.js",
        "React",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
        "WordPress",
        "TypeScript",
      ],
      sameAs: Object.values(siteConfig.social),
    },
    sameAs: Object.values(siteConfig.social),
    makesOffer: [
      {
        "@type": "Offer",
        name: "Landing Page",
        description: "High-converting, lightning-fast single page.",
        priceCurrency: "USD",
        price: "200",
        url: new URL("/services", siteConfig.url).toString(),
      },
      {
        "@type": "Offer",
        name: "Business Website",
        description: "For local businesses: Dentists, Lawyers, Real Estate.",
        priceCurrency: "USD",
        price: "500",
        url: new URL("/services", siteConfig.url).toString(),
      },
      {
        "@type": "Offer",
        name: "E-commerce Store",
        description: "Full-stack or high-end custom storefronts.",
        priceCurrency: "USD",
        price: "1000",
        url: new URL("/services", siteConfig.url).toString(),
      },
      {
        "@type": "Offer",
        name: "Custom Dashboard / SaaS",
        description: "Scalable Node.js & MongoDB architectures.",
        priceCurrency: "USD",
        price: "2000",
        url: new URL("/services", siteConfig.url).toString(),
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
    },
  };
}
