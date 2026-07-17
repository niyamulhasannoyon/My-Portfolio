import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Book a free strategy call with a full-stack developer. Available for Next.js, React, Node.js and WordPress projects.",
  path: "/contact",
  keywords: ["hire freelance developer", "book a developer call"],
});

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24 bg-brand-bg">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Book a free strategy call"
            description="Tell me about your project and I'll reply within 24 hours with next steps and a rough scope."
          />
          <div className="mt-8 space-y-3 text-sm text-zinc-400">
            <p>📍 {siteConfig.location}</p>
            <p>✉️ <a href={`mailto:${siteConfig.email}`} className="text-emerald-300 transition hover:text-emerald-200 hover:underline">{siteConfig.email}</a></p>
            <p>📱 <a href={`https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`} className="text-emerald-300 transition hover:text-emerald-200 hover:underline">{siteConfig.phone}</a></p>
            <p>⚡ {siteConfig.availability}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
