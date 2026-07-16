"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerCardProps {
  children: React.ReactNode;
  className?: string;
  /** Zero-based index for stagger delay calculation (default 0) */
  index?: number;
  /** Scale factor on hover (default 1.02) */
  hoverScale?: number;
  /** Whether to apply the fade-in-up stagger on viewport entry (default true) */
  animateOnMount?: boolean;
  /**
   * When true, inner content shifts up subtly on hover for a polished reveal effect.
   * Works best on grids of project/case-study cards (default false).
   */
  hoverReveal?: boolean;
}

/**
 * StaggerCard — hover & staggered-reveal card wrapper.
 *
 * - Fades in and slides up on viewport entry with a stagger delay based on `index`.
 * - On hover: subtle scale up, lift, and enhanced shadow.
 * - With `hoverReveal`: inner content slides up slightly for a polished reveal effect.
 * - Respects `prefers-reduced-motion` via Framer Motion's useReducedMotion hook.
 *
 * @example
 * {items.map((item, i) => (
 *   <StaggerCard key={item.id} index={i} hoverReveal className="...">
 *     <h3>{item.title}</h3>
 *     <p>{item.desc}</p>
 *   </StaggerCard>
 * ))}
 */
export function StaggerCard({
  children,
  className,
  index = 0,
  hoverScale = 1.02,
  animateOnMount = true,
  hoverReveal = false,
}: StaggerCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const mountAnim = animateOnMount
    ? {
        initial: { opacity: 0, y: 24 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: "-40px" as const },
      }
    : { initial: "rest" as const };

  return (
    <motion.div
      whileHover="hover"
      {...mountAnim}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        delay: index * 0.08,
      }}
      variants={{
        rest: { y: 0, scale: 1 },
        hover: {
          y: -6,
          scale: hoverScale,
          transition: { type: "spring", stiffness: 300, damping: 15 },
        },
      }}
      className={cn(
        "transition-shadow duration-300 will-change-transform",
        className,
      )}
    >
      {hoverReveal ? (
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: {
              y: -3,
              transition: { type: "spring", stiffness: 250, damping: 18 },
            },
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
