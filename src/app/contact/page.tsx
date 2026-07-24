import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Mail, MessageSquare, MapPin, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Project Inquiries",
  description:
    "Start a project or book a free strategy call with Niyamul Hasan — Full-Stack Developer specializing in Next.js, React, Node.js & E-Commerce.",
  path: "/contact",
  keywords: ["hire full-stack developer", "nextjs developer contact", "freelance web developer"],
});

export default function ContactPage() {
  return (
    <div className="bg-brand-bg text-white">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column — Bio & Quick Contact */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Get In Touch"
              title="Let’s build something great together"
              description="Have a new project idea or need to upgrade your existing web app? Send your inquiry below or reach out directly."
            />

            {/* Profile & Status Card */}
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-5 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-emerald-500/30">
                  <Image
                    src="/profile.jpg"
                    alt="Niyamul Hasan"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-zinc-900 bg-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Niyamul Hasan</h3>
                  <p className="text-xs text-zinc-400">Full-Stack Software Engineer</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for new projects
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Email Me</p>
                  <p className="text-sm font-medium text-white">{siteConfig.email}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">WhatsApp / Direct</p>
                  <p className="text-sm font-medium text-white">{siteConfig.phone}</p>
                </div>
              </a>
            </div>

            {/* Working Expectations */}
            <div className="mt-8 rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-5 text-xs text-zinc-400 space-y-3">
              <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Client Expectations &amp; Guarantees</span>
              </div>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Response Time: <strong className="text-white">Within 24 hours</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Locations Served: <strong className="text-white">US, UK &amp; Europe</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Transparent fixed-scope pricing &amp; milestone delivery</span>
              </p>
            </div>
          </div>

          {/* Right Column — Qualified Contact Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
