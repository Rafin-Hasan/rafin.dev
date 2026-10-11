"use client";

import type { MouseEvent, ReactNode } from "react";

/** A section whose mint glow follows the cursor. */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const move = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  return (
    <section onMouseMove={move} className={`relative overflow-hidden ${className ?? ""}`}>
      <div aria-hidden="true" className="spotlight pointer-events-none absolute inset-0" />
      {children}
    </section>
  );
}
