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
import { db } from "@/config/firebase";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Code2,
  Palette,
  Server,
  Wrench,
  Video,
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
}

const CATEGORIES = [
  { value: "Frontend", label: "Frontend", icon: Code2, color: "text-sky-300" },
  { value: "Backend", label: "Backend", icon: Server, color: "text-emerald-300" },
  { value: "Tools", label: "Tools", icon: Wrench, color: "text-amber-300" },
  { value: "Design", label: "Design", icon: Palette, color: "text-rose-300" },
  { value: "Video Editing", label: "Video Editing", icon: Video, color: "text-purple-300" },
];

const CategoryIcon = ({ category, className = "h-5 w-5" }: { category: string; className?: string }) => {
  const cat = CATEGORIES.find((c) => c.value === category);
  if (!cat) return <Code2 className={`${className} text-zinc-400`} />;
  const Icon = cat.icon;
  return <Icon className={`${className} ${cat.color}`} />;
};

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchSkills = useCallback(async () => {
    try {
      const snap = await getDocs(
        query(collection(db, "skills"), orderBy("order", "asc")),
      );
      setSkills(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Skill)),
      );
    } catch {
      // Firestore not set up yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Group skills by category
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: skills.filter((s) => s.category === cat.value).sort((a, b) => a.order - b.order),
  })).filter((g) => g.items.length > 0);

  const uncategorized = skills.filter(
    (s) => !CATEGORIES.some((c) => c.value === s.category),
  );

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [order, setOrder] = useState(0);

  function openNew() {
    setEditing(null);
    setName("");
    setCategory("Frontend");
    setOrder(skills.length);
    setShowForm(true);
  }

  function openEdit(skill: Skill) {
    setEditing(skill);
    setName(skill.name);
    setCategory(skill.category);
    setOrder(skill.order);
    setShowForm(true);
  }

  async function handleSave() {
    if (!name.trim()) return;
    setBusy(true);
    try {
      const data = { name: name.trim(), category, order };
      if (editing) {
        await updateDoc(doc(db, "skills", editing.id), data);
        showToast("success", "Skill updated");
      } else {
        await addDoc(collection(db, "skills"), data);
        showToast("success", "Skill added");
      }
      setShowForm(false);
      fetchSkills();
    } catch {
      showToast("error", "Failed to save skill");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(skill: Skill) {
    if (!confirm(`Delete skill "${skill.name}"?`)) return;
    try {
      await deleteDoc(doc(db, "skills", skill.id));
      showToast("success", "Skill deleted");
      fetchSkills();
    } catch {
      showToast("error", "Failed to delete skill");
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
            Skills & Services
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your skills grouped by category
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" /> Add Skill
        </button>
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-12">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editing ? "Edit Skill" : "Add Skill"}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); handleSave(); }}
              className="space-y-5"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Skill Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. React, Node.js, Premiere Pro"
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Order (lower = first)
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null); }}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy || !name.trim()}
                  className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:opacity-50"
                >
                  {busy ? "Saving…" : editing ? "Update" : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills by Category */}
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          Loading…
        </div>
      ) : skills.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          No skills yet. Click &ldquo;Add Skill&rdquo; to get started.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Grouped categories */}
          {grouped.map((group) => (
            <div
              key={group.value}
              className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 transition hover:border-white/20"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <group.icon className={`h-5 w-5 ${group.color}`} />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                  {group.label}
                </h2>
                <span className="ml-auto text-xs text-zinc-500">
                  {group.items.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <div
                    key={skill.id}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300 transition hover:border-emerald-500/30 hover:bg-emerald-500/5"
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => openEdit(skill)}
                      className="ml-0.5 rounded p-0.5 text-zinc-600 opacity-0 transition hover:text-emerald-400 group-hover:opacity-100"
                      title="Edit"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill)}
                      className="rounded p-0.5 text-zinc-600 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Uncategorized */}
          {uncategorized.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 transition hover:border-white/20">
              <div className="mb-4 flex items-center gap-2.5">
                <Code2 className="h-5 w-5 text-zinc-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                  Other
                </h2>
                <span className="ml-auto text-xs text-zinc-500">
                  {uncategorized.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {uncategorized.map((skill) => (
                  <div
                    key={skill.id}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300 transition hover:border-emerald-500/30 hover:bg-emerald-500/5"
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => openEdit(skill)}
                      className="ml-0.5 rounded p-0.5 text-zinc-600 opacity-0 transition hover:text-emerald-400 group-hover:opacity-100"
                      title="Edit"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill)}
                      className="rounded p-0.5 text-zinc-600 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
