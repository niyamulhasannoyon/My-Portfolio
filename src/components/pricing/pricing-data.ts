export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  priceFrom: number;
  priceTo?: number;
  priceNote?: string;
  popular?: boolean;
  cta: {
    label: string;
    href: string;
  };
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: "landing",
    name: "Landing Page",
    tagline: "High-converting, lightning-fast single page.",
    priceFrom: 200,
    priceTo: 400,
    cta: { label: "Get Started", href: "/contact?plan=landing" },
    features: [
      "Next.js + Tailwind, Lighthouse 95+",
      "Conversion-focused copy & layout",
      "Lead capture form + analytics",
      "Mobile-first responsive design",
      "SEO base + Open Graph setup",
      "3-day delivery sprint",
    ],
  },
  {
    id: "business",
    name: "Business Website",
    tagline: "For local businesses ready to win clients.",
    priceFrom: 500,
    priceTo: 1000,
    cta: { label: "Get Started", href: "/contact?plan=business" },
    features: [
      "Up to 6 polished pages",
      "Dentists, Lawyers, Real Estate layouts",
      "CMS so you edit content yourself",
      "Local SEO + Google Business schema",
      "Contact, booking & map integration",
      "1–2 week delivery",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    tagline: "Sell online with a store built to convert.",
    priceFrom: 1000,
    priceTo: 3000,
    popular: true,
    cta: { label: "Let's Talk", href: "/contact?plan=ecommerce" },
    features: [
      "Headless or full-stack storefront",
      "Cart, checkout & payments (Stripe)",
      "Product, inventory & order mgmt",
      "Performance & conversion optimization",
      "High-end custom setups available",
      "2–4 week delivery",
    ],
  },
  {
    id: "saas",
    name: "Custom Dashboard / SaaS",
    tagline: "Scalable Node.js & MongoDB architectures.",
    priceFrom: 2000,
    priceTo: 5000,
    priceNote: "starting at",
    cta: { label: "Let's Talk", href: "/contact?plan=saas" },
    features: [
      "React/Next.js app + Node.js API",
      "MongoDB data layer & auth",
      "Role-based dashboards & analytics",
      "Scalable, secure architecture",
      "CI/CD, tests & docs",
      "Ongoing retainer options",
    ],
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
