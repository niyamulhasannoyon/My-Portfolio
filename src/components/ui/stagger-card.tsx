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
}

/**
 * StaggerCard — hover & staggered-reveal card wrapper.
 *
 * - Fades in and slides up on viewport entry with a stagger delay based on `index`.
 * - On hover: subtle scale up, lift, and enhanced shadow.
 * - Children receive shared stagger animation context — ideal for project/case-study grids.
 *
 * @example
 * {items.map((item, i) => (
 *   <StaggerCard key={item.id} index={i} className="...">
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
}: StaggerCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      {...(animateOnMount
        ? {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-40px" },
          }
        : {})}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        scale: hoverScale,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className={cn(
        // Base hover shadow transition via CSS for smooth perf
        "transition-shadow duration-300 will-change-transform",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
