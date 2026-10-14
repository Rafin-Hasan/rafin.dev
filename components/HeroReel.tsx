"use client";

import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import { CodeTyper } from "./CodeTyper";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, GitHub, Pause, Play } from "./Icons";

const SCENES = [
  { id: "about", label: "about.ts", caption: "Who I am, typed live", duration: 7500 },
  { id: "stack", label: "stack.tsx", caption: "What I build with. Click a tool to see more", duration: 6500 },
  { id: "tournament", label: "tournament.tsx", caption: "eFootball Tournament Platform", duration: 7500 },
  { id: "contact", label: "contact.tsx", caption: "Open to roles and internships", duration: 6500 },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The hero's interactive showreel: scenes auto-advance like a video, but every element is live.
 * It pauses while hovered or focused, when scrolled off screen, and under reduced motion.
 */
export function HeroReel() {
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const tablist = useRef<HTMLDivElement>(null);

  const scene = SCENES[index];
  const paused = engaged || userPaused || !inView || !!reduce;

  const go = (next: number) => {
    elapsed.current = 0;
    progress.set(0);
    setIndex((next + SCENES.length) % SCENES.length);
  };

  useAnimationFrame((_, delta) => {
    if (paused) return;
    elapsed.current += delta;
    progress.set(Math.min(1, elapsed.current / scene.duration));
    if (elapsed.current >= scene.duration) go(index + 1);
  });

  // On narrow screens the tab strip scrolls sideways; keep the active tab in view.
  // (Set scrollLeft directly so the page itself never scrolls.)
  useEffect(() => {
    const list = tablist.current;
    const tab = list?.children[index] as HTMLElement | undefined;
    if (!list || !tab) return;
    const target = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  const onTabKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      // Keyboard focus pauses the reel; a mouse click shouldn't leave it stuck paused after you move away.
      onFocus={(e) => e.target.matches(":focus-visible") && setEngaged(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setEngaged(false)}
      className="glass overflow-hidden rounded-[20px]"
    >
      <div className="flex h-11 items-center gap-2 border-b border-line bg-raised px-4">
        {[0, 1, 2].map((i) => <span key={i} className="size-[11px] shrink-0 rounded-full bg-line-strong" />)}
        <div ref={tablist} role="tablist" aria-label="Showreel scenes" onKeyDown={onTabKey} className="relative ml-2 flex h-full min-w-0 overflow-x-auto [scrollbar-width:none]">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              tabIndex={i === index ? 0 : -1}
              onClick={() => go(i)}
              className={`relative h-full px-3 font-mono text-xs whitespace-nowrap transition-colors ${
                i === index ? "text-text" : "text-subtle hover:text-text"
              }`}
            >
              {s.label}
              {i === index && (
                <motion.span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-signal" style={{ scaleX: progress }} />
              )}
            </button>
          ))}
        </div>
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] sm:inline-flex">
          {paused && !reduce ? (
            <span className="text-subtle">paused</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-signal">
              <span className="ping-dot size-1.5" /> live
            </span>
          )}
        </span>
      </div>

      <div role="tabpanel" aria-label={scene.caption} className="relative h-[320px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scene.id}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {scene.id === "about" && <CodeTyper />}
            {scene.id === "stack" && <StackScene />}
            {scene.id === "tournament" && <TournamentScene />}
            {scene.id === "contact" && <ContactScene />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={scene.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.25 }}
            className="truncate font-mono text-xs text-subtle"
          >
            {scene.caption}
          </motion.span>
        </AnimatePresence>
        <div className="flex shrink-0 items-center gap-1">
          <ReelButton label="Previous scene" onClick={() => go(index - 1)}><ChevronLeft size={14} /></ReelButton>
          <ReelButton label={userPaused ? "Play showreel" : "Pause showreel"} onClick={() => setUserPaused((p) => !p)}>
            {userPaused ? <Play size={14} /> : <Pause size={14} />}
          </ReelButton>
          <ReelButton label="Next scene" onClick={() => go(index + 1)}><ChevronRight size={14} /></ReelButton>
        </div>
      </div>
    </div>
  );
}

function ReelButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-lg text-subtle transition-colors hover:bg-raised hover:text-signal active:scale-95"
    >
      {children}
    </button>
  );
}

/* ---------------- Scenes ---------------- */

const STACK = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"];

function StackScene() {
  return (
    <div className="flex h-full flex-col justify-center gap-7 px-7">
      <h3 className="m-0 flex gap-3 text-4xl font-semibold tracking-[-0.04em]">
        {["Built", "with"].map((word, i) => (
          <span key={word} className="inline-block overflow-hidden pb-1">
            <motion.span
              className={`inline-block ${i === 1 ? "text-signal" : ""}`}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.05 + i * 0.1, duration: 0.6, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h3>
      <ul className="flex flex-wrap gap-2.5">
        {STACK.map((tool, i) => (
          <motion.li
            key={tool}
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.25 + i * 0.07 }}
          >
            <motion.a
              href="#stack"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl border border-line bg-raised/80 px-3.5 py-2.5 font-mono text-[13px] text-text transition-colors hover:border-signal-line hover:text-signal"
            >
              <span className="size-1.5 rounded-full bg-signal shadow-[0_0_10px_var(--color-signal)]" />
              {tool}
            </motion.a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// Illustrative demo data for the tournament scene.
const TEAMS = [
  { name: "Northbridge FC", pts: 19 },
  { name: "Lagos Lions", pts: 16 },
  { name: "Red Harbour", pts: 15 },
  { name: "Kingsway Utd", pts: 12 },
];

const SPARK = Array.from({ length: 33 }, (_, i) => 54 - 0.9 * (14 * Math.sin(i / 2.6) + 8 * Math.sin(i / 1.3 + 1) + i * 0.6));
const SPARK_PATH = SPARK.map((y, i) => `${i ? "L" : "M"}${i * 12.5} ${y.toFixed(1)}`).join(" ");

/** Live standings: points count up, then Red Harbour wins and climbs a place. */
function TournamentScene() {
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setSwapped(true), 2400);
    return () => clearTimeout(id);
  }, []);

  const teams = swapped ? [TEAMS[0], { ...TEAMS[2], pts: 18 }, TEAMS[1], TEAMS[3]] : TEAMS;

  return (
    <div className="flex h-full flex-col gap-3 px-6 pt-5 pb-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">Live standings</span>
        <Link href="/projects#lab" className="inline-flex items-center gap-1 font-mono text-[11px] text-signal transition-[gap] hover:gap-2">
          View in lab <ArrowUpRight size={12} />
        </Link>
      </div>
      <ol className="flex flex-col gap-1.5">
        {teams.map((team, i) => {
          const hot = swapped && team.name === "Red Harbour";
          return (
            <motion.li
              key={team.name}
              layout
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, layout: { type: "spring", stiffness: 300, damping: 30 } }}
              style={{ zIndex: hot ? 1 : 0 }}
              className={`relative flex h-10 cursor-default items-center gap-3 rounded-lg border px-3 text-sm transition-colors hover:border-signal-line hover:bg-signal-soft ${
                hot ? "border-signal-line bg-signal-soft" : "border-line bg-raised"
              }`}
            >
              <span className="w-4 font-mono text-xs text-subtle">{i + 1}</span>
              <span className="grow font-medium">{team.name}</span>
              <CountUp value={team.pts} className={`font-mono font-semibold ${hot ? "text-signal" : ""}`} />
            </motion.li>
          );
        })}
      </ol>
      <div className="mt-auto flex items-end gap-4">
        <svg viewBox="0 0 400 80" className="h-14 grow" aria-hidden="true">
          <motion.path
            d={SPARK_PATH}
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
          />
        </svg>
        <span className="pb-1 font-mono text-[10px] tracking-[0.12em] text-subtle uppercase">Telemetry</span>
      </div>
    </div>
  );
}

function CountUp({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1, ease: EASE });
    return () => controls.stop();
  }, [mv, value]);
  return <motion.span className={className}>{rounded}</motion.span>;
}

function ContactScene() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute size-72 rounded-full border border-signal"
        initial={{ scale: 0.4, opacity: 0.6 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <h3 className="m-0 flex gap-3 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
        {["Let's", "build"].map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: i * 0.12 }}
          >
            <span className={i === 1 ? "shine-text" : ""}>{word}</span>
          </motion.span>
        ))}
      </h3>
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
      >
        <Link href="#contact" className="btn btn-primary btn-sm">
          Contact me <ArrowRight size={16} className="arrow" />
        </Link>
        <a href={site.socials.github.url} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
          <GitHub size={16} /> {site.socials.github.handle}
        </a>
      </motion.div>
    </div>
  );
}
