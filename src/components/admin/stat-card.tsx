"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  accent?: "emerald" | "blue" | "amber" | "rose";
  href?: string;
  preview?: React.ReactNode;
  callout?: string;
}

const accentMap = {
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-300",
    iconBg: "bg-emerald-500/10",
    glow: "shadow-[0_0_24px_rgba(16,185,129,0.08)]",
  },
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    text: "text-blue-300",
    iconBg: "bg-blue-500/10",
    glow: "shadow-[0_0_24px_rgba(59,130,246,0.08)]",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-300",
    iconBg: "bg-amber-500/10",
    glow: "shadow-[0_0_24px_rgba(245,158,11,0.08)]",
  },
  rose: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/5",
    text: "text-rose-300",
    iconBg: "bg-rose-500/10",
    glow: "shadow-[0_0_24px_rgba(244,63,94,0.08)]",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  accent = "emerald",
  href,
  preview,
  callout,
}: StatCardProps) {
  const colors = accentMap[accent];
  const CardContent = (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 ${colors.glow} ${
        href ? "cursor-pointer hover:-translate-y-0.5" : ""
      }`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            {title}
          </p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-zinc-500">{description}</p>
          )}
          {callout && (
            <p className="mt-2 text-xs text-zinc-300">{callout}</p>
          )}
          {preview && (
            <div className="mt-3">{preview}</div>
          )}
        </div>
        <div className={`rounded-xl border ${colors.border} ${colors.iconBg} p-2.5 transition-transform duration-300 group-hover:scale-105`}>
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}