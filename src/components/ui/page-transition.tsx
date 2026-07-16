"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * PageTransition — wraps page content with a subtle fade + slide-up animation
 * on route changes. Respects reduced-motion preferences via CSS.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
