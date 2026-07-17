import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  /** Whether to apply the hover glow/lift effect (default true) */
  interactive?: boolean;
}

/**
 * BentoCard — unified gradient/glo w card shell.
 *
 * Applies the consistent bento aesthetic: dark gradient fill, thin vector
 * border, and a subtle emerald glow on hover.
 *
 * @example
 * <BentoCard>
 *   <h3>Feature title</h3>
 *   <p>Feature description</p>
 * </BentoCard>
 */
export function BentoCard({
  children,
  className,
  interactive = true,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "border border-white/[0.06]",
        "bg-gradient-to-b from-neutral-900/80 via-neutral-900/40 to-black",
        "p-6 transition-all duration-300 ease-out",
        interactive &&
          "hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.03)] hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
