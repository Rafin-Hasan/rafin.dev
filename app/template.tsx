"use client";

import { motion } from "motion/react";

// Wraps every route: a short fade + rise on navigation.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex grow flex-col"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
