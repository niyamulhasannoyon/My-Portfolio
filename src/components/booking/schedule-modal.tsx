"use client";

import { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";

export function ScheduleModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setIsLoading(false), 600);
    const showTimer = window.setTimeout(() => setIsVisible(true), 10);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(showTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-xl transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40 transition-all duration-300 ${isVisible ? "translate-y-0 scale-100" : "translate-y-3 scale-98"}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Book a strategy call"
      >
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-300">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Book a Free 10-Min Strategy Call</p>
              <p className="text-xs text-slate-400">A quick conversation to explore your growth goals.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-700 bg-slate-950/80 p-2 text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
            aria-label="Close booking modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden bg-slate-950">
          {isLoading ? (
            <div className="flex h-full items-center justify-center bg-slate-950 p-6">
              <div className="w-full max-w-xl space-y-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="h-4 w-32 animate-pulse rounded-full bg-slate-800" />
                <div className="space-y-3">
                  <div className="h-3 w-full animate-pulse rounded-full bg-slate-800" />
                  <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-800" />
                  <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-800" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-24 animate-pulse rounded-2xl bg-slate-800" />
                  <div className="h-24 animate-pulse rounded-2xl bg-slate-800" />
                </div>
              </div>
            </div>
          ) : null}

          <div className={isLoading ? "hidden" : "h-full w-full"}>
            <iframe
              src="https://cal.com/niyamulhasan/10min-strategy-call?overlayCalendar=true"
              loading="lazy"
              title="Book a strategy call"
              className="h-full w-full min-h-[640px] border-0"
              allow="clipboard-write; microphone; camera"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
