export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Niyamul Dev — Full-Stack Developer",
  shortName: "Niyamul Dev",
  description:
    "Full-stack developer building high-performance web apps with Next.js, React, Node.js, MongoDB and WordPress. Trusted by US, UK & EU businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://niyamul-dev.vercel.app",
  locale: "en_US",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "@niyamuldev",
  author: "Niyamul Dev",
  email: "hello@niyamuldev.com",
  phone: "",
  location: "Remote — serving US, UK & Europe",
  availability: "Available for select high-ticket projects",
  // Geo + international targeting for US/UK/EU high-ticket clients
  geo: {
    region: ["US", "GB", "EU"],
    countryName: "United States, United Kingdom, Europe",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/niyamulhasan",
    github: "https://github.com/niyamulhasannoyon",
    twitter: "https://twitter.com/niyamuldev",
    upwork: "https://www.upwork.com/freelancers/~yourid",
  },
} as const;

export type SiteConfig = typeof siteConfig;
