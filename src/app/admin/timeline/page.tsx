"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { getFirestoreInstance } from "@/config/firebase";
import {
  TimelineForm,
  type TimelineFormData,
} from "@/components/admin/timeline-form";
import { Pencil, Trash2, Plus, X, Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  points: string[];
  category: "job" | "education";
  order: number;
}

export default function AdminTimeline() {
  const db = getFirestoreInstance()!;
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TimelineItem | null>(null);
  const [busy, setBusy] = useState(false);
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

  const fetchItems = useCallback(async () => {
    try {
      const db = getFirestoreInstance();
      if (!db) return;
      const snap = await getDocs(
        query(collection(db, "timeline"), orderBy("order", "asc")),
      );
      setItems(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as TimelineItem)),
      );
    } catch {
      // Firestore not set up yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function handleSave(data: TimelineFormData) {
    setBusy(true);
    try {
      const db = getFirestoreInstance();
      if (!db) return;
      if (editing) {
        await updateDoc(doc(db, "timeline", editing.id), { ...data });
        showToast("success", "Timeline entry updated");
      } else {
        await addDoc(collection(db, "timeline"), data);
        showToast("success", "Timeline entry added");
      }
      setShowForm(false);
      setEditing(null);
      fetchItems();
    } catch {
      showToast("error", "Failed to save timeline entry");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item: TimelineItem) {
    if (!confirm(`Delete "${item.role}" at ${item.company}?`)) return;
    try {
      const db = getFirestoreInstance();
      if (!db) return;
      await deleteDoc(doc(db, "timeline", item.id));
      showToast("success", "Timeline entry deleted");
      fetchItems();
    } catch {
      showToast("error", "Failed to delete timeline entry");
    }
  }

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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Timeline
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your experience & education
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" /> Add Entry
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-12">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editing ? "Edit Timeline Entry" : "Add Timeline Entry"}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <TimelineForm
              initial={editing ?? undefined}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null); }}
              busy={busy}
            />
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          No timeline entries yet. Click &ldquo;Add Entry&rdquo; to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 transition hover:border-white/20"
            >
              <div
                className={`rounded-xl border p-2.5 ${
                  item.category === "job"
                    ? "border-blue-500/30 bg-blue-500/5 text-blue-300"
                    : "border-amber-500/30 bg-amber-500/5 text-amber-300"
                }`}
              >
                {item.category === "job" ? (
                  <Briefcase className="h-5 w-5" />
                ) : (
                  <GraduationCap className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-white">{item.role}</h3>
                    <p className="text-sm text-zinc-400">{item.company}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditing(item);
                        setShowForm(true);
                      }}
                      className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-emerald-500/10 hover:text-emerald-400"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{item.duration}</p>
                {item.points.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {item.points.map((p, i) => (
                      <li
                        key={i}
                        className="text-sm text-zinc-400 before:mr-2 before:text-zinc-600 before:content-['•']"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
