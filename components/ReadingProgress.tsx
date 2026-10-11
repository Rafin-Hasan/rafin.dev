"use client";

import { motion, useScroll } from "motion/react";

/** Mint bar under the nav that fills as you read. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="sticky top-16 z-40 h-0.5 bg-[#1c1d21] lg:top-18">
      <motion.div className="h-full origin-left bg-signal" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
