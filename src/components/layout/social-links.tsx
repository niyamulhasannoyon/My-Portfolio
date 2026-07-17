import { Mail, Linkedin, Github, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function SocialLinks({ className }: { className?: string }) {
  const links = [
    { href: `mailto:${siteConfig.email}`, label: "Email", icon: Mail, external: false },
    { href: siteConfig.social.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
    { href: siteConfig.social.github, label: "GitHub", icon: Github, external: true },
    { href: siteConfig.social.facebook, label: "Facebook", icon: Facebook, external: true },
    { href: siteConfig.social.instagram, label: "Instagram", icon: Instagram, external: true },
    { href: siteConfig.social.twitter, label: "X", icon: Twitter, external: true },
  ];
  return (
    <nav className={className} aria-label="Social media links">
      {links.map((l) => {
        const isMail = l.label === "Email";
        const Comp = isMail ? "a" : Link;
        const linkProps = isMail ? {} : l.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
        const ariaLabel = l.external ? `${l.label} (opens in a new tab)` : l.label;
        return (
          <Comp
            key={l.label}
            href={l.href}
            aria-label={ariaLabel}
            {...linkProps}
            className="text-ink-muted transition-[transform,colors] duration-200 hover:-translate-y-0.5 hover:text-brand-600"
          >
            <l.icon className="h-5 w-5" />
          </Comp>
        );
      })}
    </nav>
  );
}
