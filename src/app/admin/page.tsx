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
  projectType?: string;
  budget?: string;
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

function QuickAction({
  href,
  label,
  icon: Icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
}) {
  const content = (
    <div className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-zinc-900/70 p-4 shadow-lg backdrop-blur-sm transition hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:-translate-y-0.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-semibold text-zinc-300">{label}</span>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
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
              Client &amp; Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Project &amp; Budget
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
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs font-bold text-emerald-300">
                    {msg.name?.[0]?.toUpperCase() ?? "C"}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {msg.name}
                    </p>
                    <p className="truncate text-xs text-zinc-400">{msg.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <p className="truncate text-xs text-zinc-200 font-medium">{msg.subject || msg.projectType || "Project Inquiry"}</p>
                  {msg.budget && (
                    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      {msg.budget}
                    </span>
                  )}
                </div>
              </td>
              <td className="hidden px-4 py-3 md:table-cell">
                <span className="text-xs text-zinc-400">{formatDate(msg.timestamp)}</span>
              </td>
              <td className="px-4 py-3 text-center">
                {msg.unread ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    New Inquiry
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
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Control Center Overview
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              Live
            </span>
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Welcome back, <strong className="text-white">{user?.email?.split("@")[0] ?? "Niyamul"}</strong>. Manage projects, leads, and content.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500 hover:text-zinc-950"
        >
          Open Live Portfolio <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Inquiries &amp; Leads"
          value={loading ? "…" : stats.unreadMessages}
          icon={MessageSquare}
          accent="emerald"
          href="/admin/messages"
          description={stats.unreadMessages > 0 ? `${stats.unreadMessages} unread project inquiry` : "All caught up"}
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
          title="Portfolio Projects"
          value={loading ? "…" : stats.totalProjects}
          icon={FolderKanban}
          accent="blue"
          href="/admin/projects"
          preview={<MiniCodePreview />}
        />
        <StatCard
          title="Timeline Milestones"
          value={loading ? "…" : stats.totalTimeline}
          icon={History}
          accent="amber"
          href="/admin/timeline"
          preview={<MiniTimeline />}
        />
        <StatCard
          title="Tracked Skills"
          value={loading ? "…" : stats.totalSkills}
          icon={Code2}
          accent="rose"
          href="/admin/skills"
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">Quick Actions</h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
          <QuickAction
            href="/admin/messages"
            label="Inquiries & Leads"
            icon={MessageSquare}
          />
          <QuickAction
            href="/admin/projects"
            label="Manage Projects"
            icon={FolderKanban}
          />
          <QuickAction
            href="/admin/timeline"
            label="Add Experience"
            icon={History}
          />
          <QuickAction
            href="/admin/skills"
            label="Manage Skills"
            icon={Code2}
          />
          <QuickAction
            href="/"
            label="Live Portfolio"
            icon={ArrowUpRight}
            external
          />
        </div>
      </div>

      {/* Recent Messages */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Project Inquiries</h2>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300"
          >
            View all leads <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-8 text-center text-sm text-zinc-500">
            Loading inquiries…
          </div>
        ) : recentMessages.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-8 text-center text-sm text-zinc-500">
            No inquiries recorded yet.
          </div>
        ) : (
          <DataTable messages={recentMessages} />
        )}
      </div>
    </div>
  );
}