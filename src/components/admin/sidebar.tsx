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
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/timeline", label: "Timeline", icon: History },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
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
        } lg:translate-x-0 ${collapsed ? "w-16" : "w-60"}`}
      >
        {/* Logo / collapse */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          {!collapsed && (
            <Link href="/admin" className="text-sm font-bold tracking-tight text-white">
              Admin
            </Link>
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

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="border-t border-white/10 p-3">
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
