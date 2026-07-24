"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  Mail,
  MailOpen,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  Send,
  Sparkles,
  Filter,
} from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
  projectType?: string;
  budget?: string;
  timestamp: Timestamp;
  unread: boolean;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "unread" | "highticket">("all");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const fetchMessages = useCallback(async () => {
    try {
      let snap;
      try {
        snap = await getDocs(
          query(collection(db, "messages"), orderBy("timestamp", "desc")),
        );
      } catch {
        // Fallback: If orderBy index query fails, fetch all documents directly
        snap = await getDocs(collection(db, "messages"));
      }

      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message));

      // Sort manually by timestamp (newest first)
      list.sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });

      setMessages(list);
    } catch (err) {
      console.warn("[AdminMessages] Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function toggleRead(msg: Message) {
    try {
      await updateDoc(doc(db, "messages", msg.id), {
        unread: !msg.unread,
      });
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, unread: !m.unread } : m,
        ),
      );
      showToast("success", msg.unread ? "Marked as unread" : "Marked as read");
    } catch {
      showToast("error", "Failed to update message");
    }
  }

  async function handleDelete(msg: Message) {
    if (!confirm(`Delete message from ${msg.name}?`)) return;
    try {
      await deleteDoc(doc(db, "messages", msg.id));
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      showToast("success", "Message deleted");
    } catch {
      showToast("error", "Failed to delete message");
    }
  }

  const exportCSV = () => {
    if (messages.length === 0) return;
    const headers = ["Name", "Email", "Subject", "Project Type", "Budget", "Website", "Date", "Status"];
    const rows = messages.map((m) => [
      `"${m.name || ""}"`,
      `"${m.email || ""}"`,
      `"${m.subject || ""}"`,
      `"${m.projectType || ""}"`,
      `"${m.budget || ""}"`,
      `"${m.website || ""}"`,
      `"${formatDate(m.timestamp)}"`,
      `"${m.unread ? "Unread" : "Read"}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inquiries_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("success", "Exported CSV lead file");
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchSearch =
        searchQuery === "" ||
        m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (filterTab === "unread") return m.unread;
      if (filterTab === "highticket") return m.budget?.includes("3,000") || m.budget?.includes("5,000");

      return true;
    });
  }, [messages, searchQuery, filterTab]);

  const formatDate = (ts: Timestamp) => {
    if (!ts?.seconds) return "";
    const d = new Date(ts.seconds * 1000);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success"
              ? "bg-emerald-500 text-zinc-950"
              : "bg-rose-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Inquiries &amp; Project Leads
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              {messages.length} Total
            </span>
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Real-time project inquiries and lead pipeline submissions
          </p>
        </div>

        <button
          onClick={exportCSV}
          disabled={messages.length === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 disabled:opacity-50"
        >
          <Download className="h-4 w-4" /> Export CSV Leads
        </button>
      </div>

      {/* Control Bar: Search & Filter Tabs */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by name, email, or keyword…"
            className="w-full rounded-xl border border-white/10 bg-zinc-900/80 pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilterTab("all")}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              filterTab === "all"
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilterTab("unread")}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              filterTab === "unread"
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Unread ({messages.filter((m) => m.unread).length})
          </button>
          <button
            onClick={() => setFilterTab("highticket")}
            className={`rounded-lg px-3 py-1.5 font-medium transition ${
              filterTab === "highticket"
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            High-Ticket ($3k+)
          </button>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          Loading messages…
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          No inquiries found matching criteria.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border transition ${
                msg.unread
                  ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                  : "border-white/10 bg-zinc-900/70"
              }`}
            >
              {/* Header row */}
              <button
                onClick={() =>
                  setExpanded(expanded === msg.id ? null : msg.id)
                }
                className="flex w-full items-start gap-3.5 px-5 py-4 text-left"
              >
                <div
                  className={`mt-0.5 rounded-xl border p-2 ${
                    msg.unread
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/5 text-zinc-500"
                  }`}
                >
                  {msg.unread ? (
                    <Mail className="h-4 w-4" />
                  ) : (
                    <MailOpen className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {msg.unread && (
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    )}
                    <span
                      className={`truncate text-sm font-bold ${
                        msg.unread ? "text-white" : "text-zinc-200"
                      }`}
                    >
                      {msg.name}
                    </span>
                    <span className="shrink-0 text-xs text-zinc-400">
                      &lt;{msg.email}&gt;
                    </span>

                    {msg.budget && (
                      <span className="ml-auto inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                        {msg.budget}
                      </span>
                    )}
                  </div>
                  
                  <p
                    className={`mt-1 truncate text-xs ${
                      msg.unread ? "text-zinc-200 font-medium" : "text-zinc-400"
                    }`}
                  >
                    {msg.subject || "(No subject provided)"}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-zinc-500 sm:block">
                    {formatDate(msg.timestamp)}
                  </span>
                  {expanded === msg.id ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  )}
                </div>
              </button>

              {/* Expanded body */}
              {expanded === msg.id && (
                <div className="border-t border-white/10 px-5 pb-5 pt-4">
                  <div className="space-y-3">
                    <div className="grid gap-2 sm:grid-cols-2 text-xs text-zinc-300 border-b border-white/5 pb-3">
                      <div>
                        <span className="font-semibold text-zinc-400">From:</span> {msg.name} ({msg.email})
                      </div>
                      {msg.projectType && (
                        <div>
                          <span className="font-semibold text-emerald-400">Project Package:</span> {msg.projectType}
                        </div>
                      )}
                      {msg.budget && (
                        <div>
                          <span className="font-semibold text-emerald-400">Est. Budget:</span> {msg.budget}
                        </div>
                      )}
                      {msg.website && (
                        <div>
                          <span className="font-semibold text-zinc-400">Website:</span>{" "}
                          <a href={msg.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                            {msg.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-zinc-950/70 p-4 text-xs leading-relaxed text-zinc-200">
                      <p className="font-semibold text-zinc-400 mb-1 uppercase tracking-wider text-[10px]">Client Message:</p>
                      {msg.message}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject || "Project Inquiry"}`)}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-400"
                      >
                        <Send className="h-3.5 w-3.5" /> Reply to Client
                      </a>
                      <button
                        onClick={() => toggleRead(msg)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/5"
                      >
                        {msg.unread ? (
                          <>
                            <MailOpen className="h-3.5 w-3.5" /> Mark as Read
                          </>
                        ) : (
                          <>
                            <Mail className="h-3.5 w-3.5" /> Mark as Unread
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(msg)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/20 px-3.5 py-2 text-xs font-medium text-rose-400 transition hover:bg-rose-500/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
