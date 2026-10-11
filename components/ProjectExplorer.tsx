"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project, ProjectKind } from "@/content/projects";
import { ArrowUpRight, Grid, List, Search } from "./Icons";

const KINDS: ("All" | ProjectKind)[] = ["All", "Full-stack", "Interactive", "Frontend"];

export function ProjectExplorer({ projects, pageSize = 9 }: { projects: Project[]; pageSize?: number }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [pages, setPages] = useState(1);
  const [generation, setGeneration] = useState(0); // bumps to replay the cascade
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses search, like most dev tools.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const searched = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return projects;
    return projects.filter((p) => [p.name, p.summary, p.kind, ...p.tags].join(" ").toLowerCase().includes(needle));
  }, [projects, query]);

  const filtered = kind === "All" ? searched : searched.filter((p) => p.kind === kind);
  const visible = filtered.slice(0, pageSize * pages);
  const remaining = filtered.length - visible.length;

  const update = (fn: () => void) => {
    fn();
    setPages(1);
    setGeneration((g) => g + 1);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex gap-3">
        <label className="relative flex grow items-center">
          <Search className="pointer-events-none absolute left-4.5 z-10 text-subtle" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => update(() => setQuery(e.target.value))}
            placeholder={`Search ${projects.length} projects by name, tech or keyword…`}
            aria-label="Search projects"
            className="field glass h-13.5 rounded-[14px] pr-4 pl-12.5 sm:pr-16"
          />
          <kbd className="absolute right-3.5 hidden rounded-md border border-line-strong px-2 py-0.5 font-mono text-xs text-subtle sm:block">/</kbd>
        </label>
        <div role="group" aria-label="Layout" className="glass hidden gap-1 rounded-xl border border-line p-1 sm:flex">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => update(() => setView(v))}
              aria-label={`${v === "grid" ? "Grid" : "List"} view`}
              aria-pressed={view === v}
              className={`flex size-11 items-center justify-center rounded-[9px] transition-colors ${view === v ? "bg-line text-text" : "text-subtle hover:text-text"}`}
            >
              {v === "grid" ? <Grid /> : <List />}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => {
            const on = kind === k;
            const count = k === "All" ? searched.length : searched.filter((p) => p.kind === k).length;
            return (
              <button
                key={k}
                type="button"
                onClick={() => update(() => setKind(k))}
                aria-pressed={on}
                className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  on ? "border-text bg-text text-[#0a0a0b]" : "glass border-line text-muted hover:border-signal-line"
                }`}
              >
                {k}
                <span className={`font-mono text-xs ${on ? "text-zinc-600" : "text-zinc-500"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <span className="font-mono text-[13px] text-subtle">Showing {visible.length} of {filtered.length}</span>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3.5 rounded-[18px] border border-dashed border-line-strong p-16 text-center">
          <span className="font-mono text-sm text-subtle">0 results</span>
          <span className="text-xl font-semibold">No projects match “{query}”</span>
          <span className="text-muted">Try a technology like “Next.js”, or clear the filters.</span>
          <button type="button" onClick={() => update(() => { setQuery(""); setKind("All"); })} className="btn btn-secondary btn-sm mt-2">
            Clear search &amp; filters
          </button>
        </div>
      ) : view === "grid" ? (
        <div key={generation} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={(i % pageSize) * 0.06} />
          ))}
        </div>
      ) : (
        <div key={generation} className="glass overflow-hidden rounded-[18px] border border-line">
          <div className="hidden h-11 grid-cols-[88px_minmax(0,1fr)_130px_240px_64px_130px] items-center gap-5 border-b border-line px-5 font-mono text-[11.5px] tracking-[0.06em] text-subtle lg:grid">
            <span /><span>PROJECT</span><span>TYPE</span><span>STACK</span><span>YEAR</span><span className="text-right">LINKS</span>
          </div>
          {visible.map((p, i) => (
            <ProjectRow key={p.slug} project={p} delay={(i % pageSize) * 0.035} />
          ))}
        </div>
      )}

      {remaining > 0 && (
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="h-[3px] w-60 overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-signal shadow-[0_0_12px_var(--color-signal)] transition-[width] duration-800 ease-(--ease-out)"
              style={{ width: `${(visible.length / filtered.length) * 100}%` }}
            />
          </div>
          <button type="button" onClick={() => setPages((n) => n + 1)} className="btn btn-secondary h-12 text-[15px]">
            Show more · {remaining} remaining
          </button>
        </div>
      )}
    </div>
  );
}

function Thumb({ project, sizes }: { project: Project; sizes: string }) {
  return project.image ? (
    <Image src={project.image} alt="" fill sizes={sizes} className="thumb-inner object-cover" />
  ) : (
    <div className="thumb-inner placeholder-img absolute inset-0 flex items-center justify-center font-mono text-xs text-subtle">
      [Screenshot · 16:10]
    </div>
  );
}

function ProjectCard({ project: p, delay }: { project: Project; delay: number }) {
  const href = `/projects/${p.slug}`;
  return (
    <article
      style={{ animationDelay: `${delay}s` }}
      className={`project-card card animate-card-in relative flex flex-col overflow-hidden rounded-[18px] ${p.featured ? "border-signal-line" : ""}`}
    >
      <div className="relative h-49 overflow-hidden border-b border-line">
        <Thumb project={p} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
        <Link href={href} aria-label={`Open ${p.name} case study`} className="open-btn absolute top-3.5 right-3.5 z-10 flex size-9 items-center justify-center rounded-full bg-signal text-[#0a0a0b]">
          <ArrowUpRight size={16} strokeWidth={2.25} />
        </Link>
      </div>
      <div className="flex grow flex-col gap-2.5 px-5.5 pt-5 pb-5.5">
        <div className="flex justify-between font-mono text-[11.5px] tracking-[0.06em] text-subtle">
          <span className={p.featured ? "text-signal" : ""}>{p.kind}{p.featured && " · Featured"}</span>
          <span>{p.year}</span>
        </div>
        <Link href={href} className="text-xl font-semibold tracking-[-0.02em] text-text after:absolute after:inset-0 after:content-['']">
          {p.name}
        </Link>
        <p className="text-[14.5px] leading-normal text-muted">{p.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => <span key={t} className="chip text-[11.5px]">{t}</span>)}
        </div>
        <ProjectLinks project={p} className="relative z-10 mt-auto border-t border-[#1f2024] pt-2.5" />
      </div>
    </article>
  );
}

function ProjectRow({ project: p, delay }: { project: Project; delay: number }) {
  return (
    <div
      style={{ animationDelay: `${delay}s` }}
      className="animate-card-in grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 border-b border-[#1f2024] px-5 py-4 transition-colors last:border-0 hover:bg-raised lg:grid-cols-[88px_minmax(0,1fr)_130px_240px_64px_130px]"
    >
      <div className="relative hidden h-[55px] w-[88px] overflow-hidden rounded-lg border border-line lg:block">
        <Thumb project={p} sizes="88px" />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <Link href={`/projects/${p.slug}`} className="font-semibold text-text hover:text-signal">{p.name}</Link>
        <span className="truncate text-[13.5px] text-subtle">{p.summary}</span>
      </div>
      <span className="hidden font-mono text-xs text-muted lg:block">{p.kind}</span>
      <span className="hidden font-mono text-xs text-muted lg:block">{p.tags.join(" · ")}</span>
      <span className="hidden font-mono text-xs text-subtle lg:block">{p.year}</span>
      <ProjectLinks project={p} compact className="justify-end" />
    </div>
  );
}

function ProjectLinks({ project: p, compact, className = "" }: { project: Project; compact?: boolean; className?: string }) {
  return (
    <div className={`flex gap-4.5 text-sm font-medium ${className}`}>
      {p.liveUrl && (
        <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-signal transition-[gap] hover:gap-2.5">
          {compact ? "Live" : "Live site"} <ArrowUpRight size={14} />
        </a>
      )}
      {p.sourceUrl && (
        <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-code transition-[gap] hover:gap-2.5">
          GitHub <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}
