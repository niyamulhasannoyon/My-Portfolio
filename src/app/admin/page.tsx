"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { getFirestoreInstance } from "@/config/firebase";
import { useAuth } from "@/contexts/auth-context";
import { StatCard } from "@/components/admin/stat-card";
import {
  FolderKanban,
  History,
  MessageSquare,
  Code2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalProjects: number;
  totalTimeline: number;
  unreadMessages: number;
  totalSkills: number;
}

interface RecentMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  timestamp: { seconds: number };
  unread: boolean;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalTimeline: 0,
    unreadMessages: 0,
    totalSkills: 0,
  });
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const db = getFirestoreInstance();
        if (!db) return;
        const [projSnap, tlSnap, msgSnap, skillsSnap] = await Promise.all([
          getDocs(collection(db, "projects")),
          getDocs(collection(db, "timeline")),
          getDocs(query(collection(db, "messages"), where("unread", "==", true))),
          getDocs(collection(db, "skills")),
        ]);

        setStats({
          totalProjects: projSnap.size,
          totalTimeline: tlSnap.size,
          unreadMessages: msgSnap.size,
          totalSkills: skillsSnap.size,
        });

        const recentSnap = await getDocs(
          query(collection(db, "messages"), orderBy("timestamp", "desc"), limit(5)),
        );
        setRecentMessages(
          recentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as RecentMessage)),
        );
      } catch {
        // Firestore might not be set up yet — show zeros
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Welcome back, {user?.email?.split("@")[0] ?? "admin"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Projects"
          value={loading ? "…" : stats.totalProjects}
          icon={FolderKanban}
          accent="emerald"
        />
        <StatCard
          title="Timeline Items"
          value={loading ? "…" : stats.totalTimeline}
          icon={History}
          accent="blue"
        />
        <StatCard
          title="Unread Messages"
          value={loading ? "…" : stats.unreadMessages}
          icon={MessageSquare}
          accent="amber"
          description={
            stats.unreadMessages > 0
              ? "Requires attention"
              : "All caught up"
          }
        />
        <StatCard
          title="Skills"
          value={loading ? "…" : stats.totalSkills}
          icon={Code2}
          accent="rose"
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction
          href="/admin/projects"
          label="Add Project"
          icon={FolderKanban}
        />
        <QuickAction
          href="/admin/timeline"
          label="Add Timeline Entry"
          icon={History}
        />
        <QuickAction
          href="/admin/skills"
          label="Add Skill"
          icon={Code2}
        />
        <QuickAction
          href="/admin/messages"
          label="View Messages"
          icon={MessageSquare}
        />
      </div>

      {/* Recent Messages */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Messages</h2>
          <Link
            href="/admin/messages"
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-8 text-center text-sm text-zinc-500">
            Loading…
          </div>
        ) : recentMessages.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-8 text-center text-sm text-zinc-500">
            No messages yet
          </div>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start justify-between rounded-2xl border border-white/10 bg-zinc-900/70 p-4 transition hover:border-white/20"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {msg.unread && (
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    )}
                    <p className="truncate text-sm font-medium text-white">
                      {msg.name}
                    </p>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-zinc-400">
                    {msg.subject || "(no subject)"}
                  </p>
                </div>
                <span className="ml-4 shrink-0 text-xs text-zinc-500">
                  {msg.timestamp?.seconds
                    ? new Date(msg.timestamp.seconds * 1000).toLocaleDateString()
                    : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAction({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/70 p-5 shadow-lg backdrop-blur-sm transition hover:border-emerald-500/30 hover:bg-emerald-500/5"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-emerald-400" />
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
      <ArrowUpRight className="h-4 w-4 text-zinc-500 transition group-hover:text-emerald-400" />
    </Link>
  );
}
