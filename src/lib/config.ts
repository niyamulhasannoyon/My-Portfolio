export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Niyamul Hasan — Full-Stack Developer",
  shortName: "Niyamul Hasan",
  description:
    "Full-stack developer building high-performance web apps with Next.js, React, Node.js, MongoDB and WordPress. Trusted by US, UK & EU businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com",
  locale: "en_US",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "@yourhandle",
  author: "Niyamul Hasan",
  email: "you@yourdomain.com",
  phone: "",
  location: "Remote — serving US, UK & Europe",
  availability: "Available for select high-ticket projects",
  // Geo + international targeting for US/UK/EU high-ticket clients
  geo: {
    region: ["US", "GB", "EU"],
    countryName: "United States, United Kingdom, Europe",
  },
  languages: {
    en: "/",
    "en-US": "/",
    "en-GB": "/",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/yourhandle",
    github: "https://github.com/yourhandle",
    twitter: "https://twitter.com/yourhandle",
    upwork: "https://www.upwork.com/freelancers/~yourid",
  },
} as const;

export type SiteConfig = typeof siteConfig;
