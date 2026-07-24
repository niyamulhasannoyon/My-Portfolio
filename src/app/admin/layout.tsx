"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Sidebar } from "@/components/admin/sidebar";
import { ShieldCheck, Clock } from "lucide-react";

function AdminHeader({ user }: { user: { email?: string | null } | null }) {
  const displayName = user?.email?.split("@")[0] ?? "admin";
  const lastLogin = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-3 lg:pl-72">
        <div>
          <h1 className="text-lg font-semibold text-white">Admin</h1>
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              Verified Account: {displayName}
            </span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              <Clock className="h-3 w-3 text-zinc-500" />
              Last login: {lastLogin}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-brand-bg">
      <Sidebar />
      <AdminHeader user={user} />
      <main className={`transition-all duration-300 lg:pl-60`}>
        <div className="p-6 pt-16 lg:pt-6">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
