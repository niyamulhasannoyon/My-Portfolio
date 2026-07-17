"use client";

import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  accent?: "emerald" | "blue" | "amber" | "rose";
}

const accentMap = {
  emerald: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
  blue: "border-blue-500/30 bg-blue-500/5 text-blue-300",
  amber: "border-amber-500/30 bg-amber-500/5 text-amber-300",
  rose: "border-rose-500/30 bg-rose-500/5 text-rose-300",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  accent = "emerald",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 shadow-lg backdrop-blur-sm transition hover:border-white/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-zinc-500">{description}</p>
          )}
        </div>
        <div
          className={`rounded-xl border p-2.5 ${accentMap[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
