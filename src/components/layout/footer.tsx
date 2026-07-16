import Link from "next/link";
import { siteConfig } from "@/lib/config";

const footerNav = [
  {
    title: "Work",
    links: [
      { href: "/work", label: "Case Studies" },
      { href: "/services", label: "Services" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-[#09090b]">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white transition-opacity hover:opacity-80">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-lg bg-emerald-500/20 blur-sm" />
              <svg viewBox="0 0 64 64" className="relative h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="16" fill="#10B981" />
                <path d="M18 18H28L32 28L36 18H46L34 36L46 54H36L32 44L28 54H18L30 36L18 18Z" fill="#09090B" />
              </svg>
            </span>
            {siteConfig.shortName}
          </Link>
          <p className="mt-4 max-w-sm text-sm text-zinc-400">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-zinc-600">{siteConfig.location}</p>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-zinc-200">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-zinc-500 transition-all duration-200 hover:text-emerald-400 hover:translate-x-0.5 inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-zinc-600 sm:flex-row">
          <p>© {year} {siteConfig.shortName}. All rights reserved.</p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
