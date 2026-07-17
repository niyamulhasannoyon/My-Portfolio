import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How this site collects and handles your data.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-24 bg-brand-bg">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" />
      <div className="prose-ink mt-8 max-w-2xl">
        <p>
          This website collects minimal analytics and contact-form data to respond to inquiries.
          We do not sell your data. Contact information submitted via the form is used solely to
          reply to your message.
        </p>
        <p>
          For questions, email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-emerald-300 hover:text-emerald-200 hover:underline">{siteConfig.email}</a>.
        </p>
      </div>
    </Container>
  );
}
