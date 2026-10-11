"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/** Cycles through roles every 2.8s with progress dots. */
export function RoleRotator({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <>
      <span className="relative inline-flex h-[26px] w-[224px] items-center overflow-hidden rounded-md border border-signal-line bg-signal-soft px-2.5 text-signal">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={roles[i]}
            initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-nowrap"
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="inline-flex gap-1" aria-hidden="true">
        {roles.map((r, k) => (
          <span
            key={r}
            className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-4 bg-signal" : "w-1 bg-line-strong"}`}
          />
        ))}
      </span>
    </>
  );
}
