import { siteConfig } from "@/lib/config";

/** Site-wide Person schema injected in root layout. */
export function personSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Full-Stack Developer",
    image: new URL("/og/default.png", siteConfig.url).toString(),
    sameAs: Object.values(siteConfig.social),
    address: { "@type": "PostalAddress", addressCountry: "Remote" },
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "WordPress",
      "TypeScript",
    ],
  };
}
