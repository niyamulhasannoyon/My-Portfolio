"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  LayoutDashboard,
  FolderKanban,
  History,
  MessageSquare,
  Code2,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Inquiries & Leads", icon: MessageSquare, badge: "Leads" },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/timeline", label: "Timeline", icon: History },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-white/10 bg-zinc-900 p-2 text-zinc-400 hover:text-white lg:hidden"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-full flex-col border-r border-white/10 bg-zinc-950 transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${collapsed ? "w-16" : "w-64"}`}
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <Link href="/admin" className="text-sm font-bold tracking-tight text-white block leading-none">
                  Niyamul Dev
                </Link>
                <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Control Center</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-white lg:block"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* View Live Website Button */}
        {!collapsed && (
          <div className="p-3 pb-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] px-3.5 py-2.5 text-xs font-semibold text-emerald-300 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/[0.08]"
            >
              <span>View Live Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
            </a>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-300 font-semibold"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  )}
                  <item.icon className="h-4 w-4 shrink-0 transition group-hover:scale-110" />
                  {!collapsed && <span>{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Sign out */}
        <div className="border-t border-white/10 p-3">
          {!collapsed && user && (
            <div className="mb-3 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5">
              <div className="relative">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-white">
                  {user.email?.split("@")[0] ?? "Admin"}
                </p>
                <p className="truncate text-[10px] text-emerald-400">
                  Super Administrator
                </p>
              </div>
            </div>
          )}
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-rose-500/10 hover:text-rose-400"
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
