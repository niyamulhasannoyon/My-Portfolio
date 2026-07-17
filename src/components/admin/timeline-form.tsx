"use client";

import { useState, FormEvent } from "react";

export interface TimelineFormData {
  role: string;
  company: string;
  duration: string;
  points: string[];
  category: "job" | "education";
  order: number;
}

interface Props {
  initial?: Partial<TimelineFormData>;
  onSave: (data: TimelineFormData) => Promise<void>;
  onCancel: () => void;
  busy?: boolean;
}

export function TimelineForm({ initial, onSave, onCancel, busy }: Props) {
  const [role, setRole] = useState(initial?.role ?? "");
  const [company, setCompany] = useState(initial?.company ?? "");
  const [duration, setDuration] = useState(initial?.duration ?? "");
  const [pointInput, setPointInput] = useState("");
  const [points, setPoints] = useState<string[]>(initial?.points ?? []);
  const [category, setCategory] = useState<"job" | "education">(
    initial?.category ?? "job",
  );
  const [order, setOrder] = useState(initial?.order ?? 0);

  function addPoint() {
    const p = pointInput.trim();
    if (p && !points.includes(p)) {
      setPoints([...points, p]);
      setPointInput("");
    }
  }

  function removePoint(p: string) {
    setPoints(points.filter((x) => x !== p));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSave({ role, company, duration, points, category, order });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>Role / Title</Label>
          <Input value={role} onChange={(e) => setRole(e.target.value)} required />
        </div>
        <div>
          <Label>Company / Institution</Label>
          <Input value={company} onChange={(e) => setCompany(e.target.value)} required />
        </div>
        <div>
          <Label>Duration</Label>
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. Jan 2024 — Present"
            required
          />
        </div>
        <div>
          <Label>Category</Label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as "job" | "education")}
            className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
          >
            <option value="job">Job</option>
            <option value="education">Education</option>
          </select>
        </div>
        <div>
          <Label>Order (lower = first)</Label>
          <Input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
        </div>

        <div className="sm:col-span-2">
          <Label>Bullet Points</Label>
          <div className="flex gap-2">
            <input
              value={pointInput}
              onChange={(e) => setPointInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addPoint())
              }
              placeholder="Type and press Enter"
              className="flex-1 rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
            />
            <button
              type="button"
              onClick={addPoint}
              className="rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700"
            >
              Add
            </button>
          </div>
          {points.length > 0 && (
            <ul className="mt-2 space-y-1">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm text-zinc-400"
                >
                  <span className="flex-1">{p}</span>
                  <button
                    type="button"
                    onClick={() => removePoint(p)}
                    className="text-zinc-500 hover:text-red-400"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
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
          {busy ? "Saving…" : initial ? "Update" : "Add Entry"}
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
