"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Niyamul Dev — Home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-sm transition-[background-color,filter] duration-300 group-hover:bg-emerald-500/30 group-hover:blur-md" />
            <svg
              viewBox="0 0 64 64"
              className="relative h-7 w-7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="64" rx="16" fill="#10B981" />
              <path
                d="M18 18H28L32 28L36 18H46L34 36L46 54H36L32 44L28 54H18L30 36L18 18Z"
                fill="#09090B"
              />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="flex items-center gap-2 text-base font-semibold text-white">
              {siteConfig.shortName}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </span>
            <span className="text-[10px] uppercase tracking-brand-widest text-zinc-500">
              Full-Stack
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-[transform,colors] duration-200",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white",
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-white/5" />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-300 transition-[transform,colors] duration-300 hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:text-emerald-200"
          >
            <Calendar className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-6" />
            <span>Book a call</span>
            <span className="absolute inset-0 -z-10 translate-y-full rounded-full bg-emerald-500/10 transition-transform duration-300 group-hover:translate-y-0" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="relative z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-[transform,colors] duration-200 hover:border-white/20 hover:text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-4 top-4 z-50 rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl md:hidden">
            <nav
              className="flex flex-col p-4"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition-[transform,colors] duration-200",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 border-t border-white/5 pt-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition-[transform,colors] duration-200 hover:bg-emerald-400"
                >
                  <Calendar className="h-4 w-4" />
                  Book a call
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
