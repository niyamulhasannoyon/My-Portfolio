"use client";

import { useState, FormEvent } from "react";

export interface ProjectFormData {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  imageUrl: string;
  featured: boolean;
}

interface Props {
  initial?: Partial<ProjectFormData>;
  onSave: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  busy?: boolean;
}

export function ProjectForm({ initial, onSave, onCancel, busy }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>(initial?.techStack ?? []);
  const [githubLink, setGithubLink] = useState(initial?.githubLink ?? "");
  const [liveLink, setLiveLink] = useState(initial?.liveLink ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);

  function addTech() {
    const t = techInput.trim();
    if (t && !techStack.includes(t)) {
      setTechStack([...techStack, t]);
      setTechInput("");
    }
  }

  function removeTech(t: string) {
    setTechStack(techStack.filter((x) => x !== t));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSave({ title, description, techStack, githubLink, liveLink, imageUrl, featured });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="sm:col-span-2">
          <Label>Description</Label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
          />
        </div>

        <div className="sm:col-span-2">
          <Label>Tech Stack</Label>
          <div className="flex gap-2">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
              placeholder="Type and press Enter"
              className="flex-1 rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
            />
            <button
              type="button"
              onClick={addTech}
              className="rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700"
            >
              Add
            </button>
          </div>
          {techStack.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTech(t)}
                    className="text-zinc-500 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label>GitHub Link</Label>
          <Input value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
        </div>
        <div>
          <Label>Live Demo Link</Label>
          <Input value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
        </div>

        <div>
          <Label>Image URL</Label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-white/10 bg-zinc-800 text-emerald-500 focus:ring-emerald-500/20"
            />
            Featured project
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {busy ? "Saving…" : initial ? "Update Project" : "Add Project"}
        </button>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-zinc-300">
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
    />
  );
}
