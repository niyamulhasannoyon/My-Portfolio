import { Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function SocialLinks({ className }: { className?: string }) {
  const links = [
    { href: `mailto:${siteConfig.email}`, label: "Email", icon: Mail },
    { href: siteConfig.social.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: siteConfig.social.github, label: "GitHub", icon: Github },
  ];
  return (
    <div className={className}>
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.href}
          aria-label={l.label}
          className="text-ink-muted transition-colors hover:text-brand-600"
        >
          <l.icon className="h-5 w-5" />
        </Link>
      ))}
    </div>
  );
}
