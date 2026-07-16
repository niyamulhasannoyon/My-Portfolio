"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const params = useSearchParams();
  const plan = params.get("plan");
  const defaultMessage = plan
    ? `Hi! I'm interested in the ${plan} plan. Here are my goals: `
    : "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(data)),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-emerald-300">
        <Sparkles className="h-4 w-4" />
        <span>Free 5-Minute Website &amp; SEO Audit</span>
      </div>
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
        <p className="text-sm leading-7 text-slate-300">
          Valued at <span className="font-semibold text-white">$150</span>. I’ll review your site for clarity, speed, SEO, and conversion opportunities.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" name="name" placeholder="Jane Doe" required />
          <Field label="Business Email" name="email" type="email" placeholder="jane@company.com" required />
        </div>
        <Field label="Current Website URL" name="website" type="url" placeholder="https://yourcompany.com" required />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-200">
            What’s your biggest business challenge?
          </label>
          <textarea
            name="message"
            required
            rows={5}
            defaultValue={defaultMessage}
            placeholder="Tell me about your goals, friction points, and growth priorities…"
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          {status === "loading" ? "Sending…" : "Get My Free Audit"}
        </Button>

        {status === "success" && (
          <p className="text-sm text-emerald-300">Thanks! I’ll reply within 24 hours with your personalized audit.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-rose-300">Something went wrong. Please email me directly instead.</p>
        )}
      </form>

      <div className="mt-6 border-t border-slate-800 pt-5 text-sm text-slate-400">
        <p className="font-medium text-slate-300">“I don’t just design websites — I help businesses turn attention into revenue.”</p>
        <p className="mt-2">No spam. No fluff. Just actionable insight tailored to your business.</p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-200">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
      />
    </div>
  );
}
