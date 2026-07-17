import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { personSchema } from "@/lib/person-schema";
import { professionalServiceSchema } from "@/lib/professional-service-schema";
import { buildMetadata } from "@/lib/seo";
import { Analytics } from "@/lib/analytics";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/ui/page-transition";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-brand-bg font-sans text-zinc-100 antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
        />
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
