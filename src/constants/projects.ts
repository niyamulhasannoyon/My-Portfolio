import type { ProjectItem, ProjectList } from "@/types/portfolio";

export const projects: ProjectList = [
  {
    title: "Deluxy Paint — High-Converting E-Commerce Infrastructure",
    category: "E-commerce",
    problem:
      "A custom-built digital storefront optimized for rapid color browsing and seamless purchasing, with automated checkout flows and strict technical SEO indexing.",
    solution:
      "Built a full-stack WordPress storefront with enhanced product filtering, fast asset delivery, and conversion-optimized purchase flows.",
    tech: ["WordPress", "Elementor", "Rank Math SEO"],
    outcome: "Premium shopping experience",
    outcomeDescription: "A fast, polished storefront that improves purchase confidence and search visibility.",
    demo: "https://deluxypaint.com",
    github: null,
  },
  {
    title: "Sirah Fashion — Visual-First Apparel Digital Storefront",
    category: "E-commerce",
    problem:
      "A fashion brand needed a modern storefront that displayed large media beautifully while keeping image load times fast and browsing effortless.",
    solution:
      "Delivered a blazing-fast Next.js storefront with optimized media pipelines, seamless product discovery, and premium brand styling.",
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    outcome: "Faster product browsing",
    outcomeDescription: "Instant visual shopping that keeps fashion customers engaged on every device.",
    demo: "https://sirah-fashion.vercel.app/",
    github: null,
  },
  {
    title: "Akhi POS — Custom Inventory & Point of Sale System",
    category: "Enterprise",
    problem:
      "The operations team needed a reliable cloud dashboard for real-time sales entry and stock tracking, without the friction of legacy tools.",
    solution:
      "Built a secure React dashboard with Node.js, MongoDB, and cloud routing for fast sales updates and inventory accuracy.",
    tech: ["React", "Node.js", "MongoDB", "Cloudflare"],
    outcome: "Reliable retail operations",
    outcomeDescription: "A robust platform for sales tracking and inventory that supports rapid retail workflows.",
    demo: "https://akhi-pos.vercel.app",
    github: null,
  },
  {
    title: "Dev Community BD — Collaborative Network Platform",
    category: "Community",
    problem:
      "Local developers needed a community hub where they could connect, share resources, and collaborate in real time.",
    solution:
      "Created a full-stack community platform with modern information architecture and high-engagement interaction flows.",
    tech: ["Next.js", "React", "Real-time DB", "Tailwind CSS"],
    outcome: "Higher member engagement",
    outcomeDescription: "A scalable community experience designed for consistent interaction and growth.",
    demo: "https://dev-community-bd.vercel.app/",
    github: null,
  },
  {
    title: "Gorix Coral — Modern SaaS & Corporate Interface",
    category: "SaaS",
    problem:
      "A SaaS brand wanted a conversion-focused landing experience with premium interactions and polished typographic hierarchy.",
    solution:
      "Built a premium React landing experience with micro-interactions, fast performance scores, and clear sign-up pathways.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    outcome: "Sharper sign-up conversion",
    outcomeDescription: "A polished product experience designed to generate trust and capture leads efficiently.",
    demo: "https://gorix-coral.vercel.app/",
    github: null,
  },
  {
    title: "Pet Shop BD — Niche E-Commerce & Service Portal",
    category: "E-commerce",
    problem:
      "A niche marketplace needed a scalable portal with advanced filtering, checkout flows, and admin inventory controls.",
    solution:
      "Developed a service-focused storefront with multi-step checkout, robust product search, and back-office inventory controls.",
    tech: ["Express", "MongoDB", "React", "Node.js"],
    outcome: "Streamlined product management",
    outcomeDescription: "A reliable portal for both customers and admins that supports growth and complex product inventory.",
    demo: "https://pet-shop-bd.vercel.app/",
    github: null,
  },
  {
    title: "Meal Management — Automated Operational Ledger",
    category: "Utility",
    problem:
      "The team needed a lightweight operational app for tracking shared expenses, daily costs, and automated billing metrics.",
    solution:
      "Built a clean utility interface for expense tracking, cost calculations, and billing automation.",
    tech: ["React", "Context API", "Tailwind CSS"],
    outcome: "Efficient expense tracking",
    outcomeDescription: "A simple, data-driven app that removes spreadsheet overhead and improves cost transparency.",
    demo: "https://meal-management-nu.vercel.app/",
    github: null,
  },
];
