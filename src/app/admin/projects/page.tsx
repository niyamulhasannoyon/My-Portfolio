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
  Timestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { ProjectForm, type ProjectFormData } from "@/components/admin/project-form";
import { Pencil, Trash2, Plus, X, Star } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  imageUrl: string;
  featured: boolean;
  createdAt?: Timestamp;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const snap = await getDocs(
        query(collection(db, "projects"), orderBy("createdAt", "desc")),
      );
      setProjects(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)),
      );
    } catch {
      // Firestore may not be set up yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function handleSave(data: ProjectFormData) {
    setBusy(true);
    try {
      if (editing) {
        await updateDoc(doc(db, "projects", editing.id), { ...data });
        showToast("success", "Project updated");
      } else {
        await addDoc(collection(db, "projects"), {
          ...data,
          createdAt: Timestamp.now(),
        });
        showToast("success", "Project added");
      }
      setShowForm(false);
      setEditing(null);
      fetchProjects();
    } catch {
      showToast("error", "Failed to save project");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(project: Project) {
    if (!confirm(`Delete "${project.title}"?`)) return;
    try {
      await deleteDoc(doc(db, "projects", project.id));
      showToast("success", "Project deleted");
      fetchProjects();
    } catch {
      showToast("error", "Failed to delete project");
    }
  }

  function openEdit(project: Project) {
    setEditing(project);
    setShowForm(true);
  }

  function openNew() {
    setEditing(null);
    setShowForm(true);
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
          <h1 className="text-2xl font-bold tracking-tight text-white">Projects</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-12">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editing ? "Edit Project" : "Add Project"}
              </h2>
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProjectForm
              initial={editing ?? undefined}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null); }}
              busy={busy}
            />
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          Loading…
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-12 text-center text-sm text-zinc-500">
          No projects yet. Click &ldquo;Add Project&rdquo; to get started.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-zinc-900/70">
                <th className="px-4 py-3 text-left font-medium text-zinc-400">Title</th>
                <th className="hidden px-4 py-3 text-left font-medium text-zinc-400 md:table-cell">
                  Tech Stack
                </th>
                <th className="hidden px-4 py-3 text-center font-medium text-zinc-400 sm:table-cell">
                  Featured
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{project.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">
                      {project.description}
                    </p>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs text-zinc-500">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-center sm:table-cell">
                    {project.featured ? (
                      <Star className="inline-block h-4 w-4 text-amber-400" />
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(project)}
                        className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-emerald-500/10 hover:text-emerald-400"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        className="rounded-lg p-1.5 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
