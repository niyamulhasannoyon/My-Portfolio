# Niyamul Hasan — High-Converting Freelance Portfolio

A production-ready **Next.js (App Router) + TypeScript + Tailwind CSS** portfolio engineered to
convert cold traffic (cold email / LinkedIn) into high-ticket leads. Built with SEO best practices,
a dynamic MDX blog/case-study system, and a modular, performance-optimized component architecture.

## Stack
- **Next.js 15** (App Router, RSC, `generateStaticParams` for SSG)
- **TypeScript** strict mode
- **Tailwind CSS** with a custom brand design system
- **MDX** case studies (`next-mdx-remote` + `gray-matter`)
- **SEO**: metadata API, JSON-LD (`Person` + `Article`), `sitemap.ts`, `robots.ts`, Open Graph/Twitter

## Getting started
```bash
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL etc.
npm install
npm run dev                  # http://localhost:3000
```

## Scripts
```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve production
npm run lint       # eslint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
```

## Folder structure
```
src/
├─ app/                      # App Router routes (each route owns its metadata)
│  ├─ layout.tsx             # Root layout: fonts, JSON-LD, Header/Footer, Analytics
│  ├─ page.tsx               # Home (Hero + Services + Featured cases + CTA)
│  ├─ services/page.tsx
│  ├─ work/page.tsx          # All case studies
│  ├─ about/page.tsx
│  ├─ contact/page.tsx       # Lead-gen contact form
│  ├─ blog/
│  │  ├─ page.tsx            # Blog index
│  │  └─ [slug]/page.tsx     # Dynamic SSG case study (MDX + Article JSON-LD)
│  ├─ api/contact/route.ts   # Lead capture endpoint (wire to Resend/CRM)
│  ├─ sitemap.ts             # Auto sitemap incl. all case studies
│  ├─ robots.ts
│  ├─ manifest.ts
│  └─ not-found.tsx
├─ components/
│  ├─ ui/                    # Button, Badge, Container, SectionHeading, Reveal
│  ├─ layout/                # Header, Footer, SocialLinks
│  ├─ sections/              # Hero, ServicesSection, CaseStudyGrid, Testimonials, CTA
│  ├─ forms/                 # ContactForm (client)
│  └─ mdx/                   # Shared MDX component overrides
├─ content/blog/             # MDX case studies (frontmatter-driven)
├─ lib/
│  ├─ config.ts              # siteConfig (central source of truth)
│  ├─ seo.ts                 # buildMetadata() helper
│  ├─ content.ts             # MDX read/parse/sort utilities
│  ├─ schema.ts              # Article JSON-LD
│  ├─ person-schema.ts       # Person JSON-LD
│  ├─ analytics.tsx          # GA / PostHog loader
│  └─ utils.ts               # cn() class merge
└─ types/mdx.d.ts
```

## Adding a case study
Create `src/content/blog/your-slug.mdx` with frontmatter:
```mdx
---
title: "..."
description: "..."
publishedAt: "2026-06-12"
category: "SaaS"            # Web App | E-commerce | WordPress | Performance | SaaS
client: "..."
industry: "..."
services: ["Next.js migration"]
techStack: ["Next.js", "MongoDB"]
results: [{ metric: "Load time", value: "-68%" }]
coverImage: "/case-studies/cover.png"
featured: true
draft: false
---
## The challenge
...
```
It appears automatically on `/work`, `/blog`, the home grid, and the sitemap.

## SEO checklist (done)
- [x] Per-route `generateMetadata` with canonical + OG + Twitter
- [x] `Person` + `Article` JSON-LD structured data
- [x] Auto `sitemap.xml` (incl. posts) and `robots.txt`
- [x] Semantic HTML, `next/font`, image optimization (avif/webp)
- [x] Performance: RSC by default, `optimizePackageImports`, no layout shift

## Conversion features
- Hero with clear CTA + social proof
- Case-study grid with quantified results
- Persistent "Book a call" CTA in header + section-level CTAs
- Contact form posting to `/api/contact` (integrate Resend/HubSpot)

## Notes
- Set real values in `.env.local` (`NEXT_PUBLIC_SITE_URL`, social links, analytics IDs).
- Add public assets: `public/og/default.png`, `public/logo.png`, `public/icon-192.png`, `public/icon-512.png`.
- `next-mdx-remote` is already included as a dependency for MDX rendering.
