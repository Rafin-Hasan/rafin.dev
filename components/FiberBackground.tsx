"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { createFiberWaves } from "@/lib/fiber-waves";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

/** Site-wide backdrop: fibre-optic ribbons with travelling light, over a faint grid. */
export function FiberBackground() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const glow = useRef<HTMLCanvasElement>(null);
  const waves = useRef<ReturnType<typeof createFiberWaves> | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    waves.current = createFiberWaves(canvas.current, glow.current);
    return () => waves.current?.destroy();
  }, []);

  // Motion batches scroll reads; the ribbons turn and speed up with it, in both directions.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => waves.current?.onScroll());

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 [background-image:linear-gradient(rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.03)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_30%,transparent_100%)]" />
      <canvas ref={glow} className="absolute inset-0 size-full opacity-90" />
      <canvas ref={canvas} className="absolute inset-0 size-full" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_35%,var(--color-ink)_100%)]" />
    </div>
  );
}
