import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center bg-brand-bg">
      <p className="text-sm font-semibold text-emerald-300">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">Page not found</h1>
      <p className="mt-3 text-zinc-400">The page you&apos;re looking for doesn&apos;t exist or moved.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-emerald-500 px-5 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400"
      >
        Back home
      </Link>
    </Container>
  );
}
