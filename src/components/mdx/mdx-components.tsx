import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Shared MDX component overrides for case-study rendering.
 * Keeps typography consistent and links internal by default.
 */
export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2 className={cn("mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-white", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("mt-8 text-xl font-semibold tracking-tight text-white", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("mt-4 leading-7 text-zinc-400", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("mt-4 list-disc space-y-2 pl-6 text-zinc-400", className)} {...props} />
  ),
  a: ({ className, href = "#", ...props }) => (
    <Link href={href} className={cn("font-medium text-emerald-400 underline-offset-4 hover:text-emerald-300 hover:underline", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn("mt-6 border-l-2 border-emerald-500/50 pl-4 italic text-zinc-300", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code className={cn("rounded bg-white/5 px-1.5 py-0.5 font-mono text-sm text-zinc-200", className)} {...props} />
  ),
};
