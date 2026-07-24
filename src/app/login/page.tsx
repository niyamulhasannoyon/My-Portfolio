"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, ALLOWED_ADMIN_EMAIL } from "@/contexts/auth-context";
import { Container } from "@/components/ui/container";
import { ShieldCheck, AlertCircle, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [googleBusy, setGoogleBusy] = useState(false);
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.email === ALLOWED_ADMIN_EMAIL) {
      router.replace("/admin");
    }
  }, [user, loading, router]);

  async function handleGoogleSignIn() {
    setError("");
    setGoogleBusy(true);
    try {
      await signInWithGoogle();
      router.push("/admin");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Google sign-in failed";
      setError(message);
    } finally {
      setGoogleBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-bg px-4 py-12">
      <Container className="w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/90 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
          
          {/* Badge */}
          <div className="mb-6 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Super Admin Control Center
            </span>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Admin Authentication
            </h1>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Restricted portal. Only authorized account <strong className="text-emerald-300 font-mono font-normal">niyamulhasanbd@gmail.com</strong> can log in.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
              <p className="leading-relaxed font-medium">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleBusy}
              className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-6 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 disabled:opacity-50"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>{googleBusy ? "Authenticating Google Account…" : "Sign in with Google"}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-8 border-t border-white/5 pt-6 text-center text-[11px] leading-relaxed text-zinc-500">
            🔒 Public registration disabled · Authorized Google OAuth Security Policy Enabled
          </div>
        </div>
      </Container>
    </div>
  );
}