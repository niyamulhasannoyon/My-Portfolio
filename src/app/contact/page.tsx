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
    <Container className="py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Book a free strategy call"
            description="Tell me about your project and I'll reply within 24 hours with next steps and a rough scope."
          />
          <div className="mt-8 space-y-3 text-sm text-ink-muted">
            <p>📍 {siteConfig.location}</p>
            <p>✉️ <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">{siteConfig.email}</a></p>
            <p>⚡ {siteConfig.availability}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-card">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
