"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Reveal — lightweight fade-up scroll animation.
 *
 * Upgraded to use Framer Motion spring physics for a premium feel.
 * Drop-in replacement for the previous CSS-based version.
 * Respects `prefers-reduced-motion` via Framer Motion's useReducedMotion hook.
 *
 * @example
 * <Reveal delay={150}>
 *   <p>Content fades in on scroll</p>
 * </Reveal>
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds (default 0) */
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 22,
        mass: 0.9,
        delay: delay / 1000,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
