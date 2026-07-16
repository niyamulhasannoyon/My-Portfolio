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
    <footer className="border-t border-ink/5 bg-ink text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="text-lg font-bold">
            {siteConfig.shortName}
            <span className="text-brand-400">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/60">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-white/40">{siteConfig.location}</p>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white/90">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {year} {siteConfig.shortName}. All rights reserved.</p>
          <p>Built with Next.js, TypeScript & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
