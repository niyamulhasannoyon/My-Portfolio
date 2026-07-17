"use client";

import { useEffect, useState, useMemo } from "react";
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
  Plus,
  ChevronRight,
  ArrowUpRight,
  CalendarDays,
  User,
  Mail,
  Inbox,
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
  message: string;
  timestamp: { seconds: number };
  unread: boolean;
}

function MiniCodePreview() {
  return (
    <div className="mt-3 rounded-lg border border-white/10 bg-zinc-950/80 p-2">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
      </div>
      <div className="mt-2 space-y-1">
        <div className="h-1.5 w-3/4 rounded bg-emerald-500/20" />
        <div className="h-1.5 w-1/2 rounded bg-blue-500/20" />
        <div className="h-1.5 w-2/3 rounded bg-purple-500/20" />
      </div>
    </div>
  );
}

function MiniTimeline() {
  return (
    <div className="mt-3 flex items-center gap-2">
      <div className="relative">
        <div className="h-6 w-px bg-gradient-to-b from-emerald-500/40 to-transparent" />
        <span className="absolute -top-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      </div>
      <div className="space-y-1">
        <div className="h-1.5 w-16 rounded bg-white/10" />
        <div className="h-1.5 w-12 rounded bg-emerald-500/20" />
      </div>
    </div>
  );
}

function MessagePreview({ subject, date }: { subject: string; date: string }) {
  return (
    <div className="mt-3 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2">
      <Mail className="mt-0.5 h-3 w-3 shrink-0 text-zinc-500" />
      <div className="min-w-0">
        <p className="truncate text-xs text-zinc-300">{subject}</p>
        <p className="text-[10px] text-zinc-500">{date}</p>
      </div>
    </div>
  );
}

function SkillsCallout() {
  return (
    <Link
      href="/admin/skills"
      className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1.5 text-xs text-emerald-300 transition hover:bg-emerald-500/10"
    >
      <Plus className="h-3 w-3" />
      No skills tracked. Tap to add your first!
    </Link>
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
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 shadow-lg backdrop-blur-sm transition hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:-translate-y-0.5"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium text-zinc-300">{label}</span>
    </Link>
  );
}

function DataTable({ messages }: { messages: RecentMessage[] }) {
  const formatDate = (ts: { seconds: number }) => {
    if (!ts?.seconds) return "";
    return new Date(ts.seconds * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/20 backdrop-blur-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-zinc-950/50">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
              From
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Subject
            </th>
            <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400 md:table-cell">
              Date
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {messages.map((msg) => (
            <tr
              key={msg.id}
              className="group transition hover:bg-white/[0.02]"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-800 text-xs font-semibold text-zinc-300">
                    {msg.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {msg.name}
                    </p>
                    <p className="truncate text-xs text-zinc-500">{msg.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <p className="truncate text-sm text-zinc-300">{msg.subject || "(no subject)"}</p>
                <p className="truncate text-xs text-zinc-500 md:hidden">
                  {formatDate(msg.timestamp)}
                </p>
              </td>
              <td className="hidden px-4 py-3 md:table-cell">
                <span className="text-xs text-zinc-400">{formatDate(msg.timestamp)}</span>
              </td>
              <td className="px-4 py-3 text-center">
                {msg.unread ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Unread
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                    Read
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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

  const latestMessage = useMemo(() => recentMessages[0], [recentMessages]);
  const latestMessageDate = latestMessage?.timestamp?.seconds
    ? new Date(latestMessage.timestamp.seconds * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div>
      {/* Dashboard Header */}
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
          href="/admin/projects"
          preview={<MiniCodePreview />}
        />
        <StatCard
          title="Timeline Items"
          value={loading ? "…" : stats.totalTimeline}
          icon={History}
          accent="blue"
          href="/admin/timeline"
          preview={<MiniTimeline />}
        />
        <StatCard
          title="Unread Messages"
          value={loading ? "…" : stats.unreadMessages}
          icon={MessageSquare}
          accent="amber"
          href="/admin/messages"
          description={stats.unreadMessages > 0 ? "Requires attention" : "All caught up"}
          preview={
            latestMessage ? (
              <MessagePreview
                subject={latestMessage.subject || "(no subject)"}
                date={latestMessageDate}
              />
            ) : null
          }
        />
        <StatCard
          title="Skills"
          value={loading ? "…" : stats.totalSkills}
          icon={Code2}
          accent="rose"
          href="/admin/skills"
          callout={
            stats.totalSkills === 0
              ? "No skills tracked. Tap to add your first!"
              : undefined
          }
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
            className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            View all <ArrowUpRight className="h-3.5 w-3.5" />
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
          <DataTable messages={recentMessages} />
        )}
      </div>
    </div>
  );
}