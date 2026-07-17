"use client";

import { useEffect, useState, useCallback } from "react";
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
  X,
} from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Timestamp;
  unread: boolean;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
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
      const snap = await getDocs(
        query(collection(db, "messages"), orderBy("timestamp", "desc")),
      );
      setMessages(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message)),
      );
    } catch {
      // Firestore not set up yet
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
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Messages
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Contact form submissions from your portfolio
        </p>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          Loading…
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          No messages yet
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border transition ${
                msg.unread
                  ? "border-emerald-500/20 bg-emerald-500/[0.02]"
                  : "border-white/10 bg-zinc-900/70"
              }`}
            >
              {/* Header row */}
              <button
                onClick={() =>
                  setExpanded(expanded === msg.id ? null : msg.id)
                }
                className="flex w-full items-start gap-3 px-5 py-4 text-left"
              >
                <div
                  className={`mt-0.5 rounded-lg border p-1.5 ${
                    msg.unread
                      ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
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
                  <div className="flex items-center gap-2">
                    {msg.unread && (
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    )}
                    <span
                      className={`truncate text-sm font-medium ${
                        msg.unread ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {msg.name}
                    </span>
                    <span className="shrink-0 text-xs text-zinc-500">
                      {msg.email}
                    </span>
                  </div>
                  <p
                    className={`mt-0.5 truncate text-sm ${
                      msg.unread ? "text-zinc-300" : "text-zinc-500"
                    }`}
                  >
                    {msg.subject || "(no subject)"}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden text-xs text-zinc-500 sm:block">
                    {formatDate(msg.timestamp)}
                  </span>
                  {expanded === msg.id ? (
                    <ChevronUp className="h-4 w-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                  )}
                </div>
              </button>

              {/* Expanded body */}
              {expanded === msg.id && (
                <div className="border-t border-white/10 px-5 pb-4 pt-4">
                  <div className="space-y-3">
                    <div className="text-sm text-zinc-400">
                      <span className="font-medium text-zinc-300">From:</span>{" "}
                      {msg.name} &lt;{msg.email}&gt;
                    </div>
                    {msg.subject && (
                      <div className="text-sm text-zinc-400">
                        <span className="font-medium text-zinc-300">
                          Subject:
                        </span>{" "}
                        {msg.subject}
                      </div>
                    )}
                    <div className="rounded-xl border border-white/5 bg-zinc-950/50 p-4 text-sm leading-relaxed text-zinc-300">
                      {msg.message}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => toggleRead(msg)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                      >
                        {msg.unread ? (
                          <>
                            <MailOpen className="h-3.5 w-3.5" /> Mark read
                          </>
                        ) : (
                          <>
                            <Mail className="h-3.5 w-3.5" /> Mark unread
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(msg)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
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
