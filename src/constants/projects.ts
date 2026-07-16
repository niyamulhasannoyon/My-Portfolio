export interface ProjectItem {
  title: string;
  category: string;
  problem: string;
  solution: string;
  tech: string[];
  outcome: string;
  outcomeDescription: string;
  demo: string;
  github: string | null;
}

export const projects: ProjectItem[] = [
  {
    title: "Modern Commerce Storefront",
    category: "E-commerce",
    problem:
      "A growing retail brand needed a storefront that felt premium, loaded fast, and made product discovery effortless.",
    solution:
      "Rebuilt the experience around a faster Next.js frontend with App Router, rich product storytelling pages, and a MongoDB-backed catalog powered by Cloudinary media delivery for instant image optimization.",
    tech: ["Next.js", "MongoDB", "Cloudinary"],
    outcome: "40% sales uplift",
    outcomeDescription: "Measurable lift in conversion rate within the first quarter post-launch.",
    demo: "https://niyamul-dev.vercel.app/work",
    github: "https://github.com/niyamulhasannoyon/ecommerce-storefront",
  },
  {
    title: "Operations Dashboard for a Growing Team",
    category: "SaaS / Operations",
    problem:
      "The team needed a real-time view of inventory, sales, and stock movement without relying on scattered spreadsheets and separate tools.",
    solution:
      "Shipped a React + Node.js dashboard with role-based access, real-time reporting via WebSockets, and a Cloudflare-optimized delivery layer that cut page load times by over 60%.",
    tech: ["React", "Node.js", "Cloudflare"],
    outcome: "100% Core Web Vitals",
    outcomeDescription: "Perfect Lighthouse scores across all dimensions on desktop and mobile.",
    demo: "https://niyamul-dev.vercel.app/work",
    github: "https://github.com/niyamulhasannoyon/ops-dashboard",
  },
  {
    title: "Premium Niche Business Website",
    category: "WordPress",
    problem:
      "A niche service business wanted a more trustworthy, high-end online presence that converted visitors into qualified leads rather than bouncing them.",
    solution:
      "Delivered a polished WordPress experience with Elementor and custom CSS — improving content hierarchy, credibility signals, and inquiry flow through strategic form placement and testimonial blocks.",
    tech: ["WordPress", "Elementor", "Custom CSS"],
    outcome: "35% lower bounce rate",
    outcomeDescription: "Visitors stayed longer and engaged deeper with the new content structure.",
    demo: "https://niyamul-dev.vercel.app/work",
    github: null,
  },
];
