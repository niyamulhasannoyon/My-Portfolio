"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before animation starts (default 0) */
  delay?: number;
  /** Distance in px to travel upward (default 30) */
  y?: number;
  /** Animate only once (default true) */
  once?: boolean;
}

/**
 * FadeInUp — spring-powered scroll reveal.
 *
 * Wraps any element and animates it into view with a smooth fade + translateY.
 * Uses spring physics (stiffness: 100, damping: 20, mass: 0.8) for a premium feel.
 * Respects `prefers-reduced-motion` via Framer Motion's useReducedMotion hook.
 *
 * @example
 * <FadeInUp delay={0.15}>
 *   <h2>Content that fades in on scroll</h2>
 * </FadeInUp>
 */
export function FadeInUp({
  children,
  className,
  delay = 0,
  y = 30,
  once = true,
}: FadeInUpProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
