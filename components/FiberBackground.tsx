"use client";

import { useEffect, useRef } from "react";
import { createFiberWaves } from "@/lib/fiber-waves";

export function FiberBackground() {
  const fx = useRef<HTMLCanvasElement>(null);
  const glow = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!fx.current) return;
    return createFiberWaves(fx.current, glow.current);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <canvas ref={glow} className="absolute inset-0 size-full opacity-90" />
      <canvas ref={fx} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_35%,var(--color-ink)_100%)]" />
    </div>
  );
}
