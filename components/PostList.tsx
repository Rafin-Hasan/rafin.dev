"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/content/posts";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Summary = Omit<Post, "body">;

/** Tag filter, a featured "latest" card and the full list. */
export function PostList({ posts }: { posts: Summary[] }) {
  const tags = ["All", ...new Set(posts.flatMap((p) => p.tags))];
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? posts : posts.filter((p) => p.tags.includes(tag));
  const [latest, ...rest] = shown;

  return (
    <>
      <div className="container-page -mt-3 flex flex-wrap gap-2 pb-6">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={`h-9 rounded-full border px-4 text-sm font-medium transition-colors ${
              tag === t ? "border-text bg-text text-[#0a0a0b]" : "glass border-line text-muted hover:border-signal-line"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {latest && (
        <div className="container-page">
          <Link href={`/writing/${latest.slug}`} className="card card-hover grid overflow-hidden rounded-3xl border-signal-line text-text md:grid-cols-[7fr_5fr]">
            <div className="placeholder-img flex h-56 items-center justify-center border-line font-mono text-[13px] text-subtle md:h-100 md:border-r">
              [Cover image]
            </div>
            <div className="flex flex-col gap-4 p-8 md:p-10">
              <div className="flex flex-wrap gap-2 font-mono text-xs tracking-[0.06em] uppercase">
                <span className="rounded-full bg-signal-soft px-2.5 py-1 text-signal">Latest</span>
                <span className="py-1 text-subtle">{latest.date} · {latest.readTime}</span>
              </div>
              <span className="text-2xl leading-tight font-semibold tracking-[-0.03em] md:text-[34px]">{latest.title}</span>
              <span className="leading-relaxed text-muted">{latest.excerpt}</span>
              <span className="mt-auto inline-flex items-center gap-2 text-[15px] font-medium text-signal">
                Read article <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>
      )}

      {rest.length > 0 && (
        <section className="container-page flex flex-col pt-18 pb-28">
          <h2 className="eyebrow border-b border-line pb-4 text-xs text-subtle">All posts</h2>
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/writing/${p.slug}`}
              className="group grid items-center gap-3 border-b border-line py-7 text-text md:grid-cols-[160px_minmax(0,1fr)_220px_32px] md:gap-8"
            >
              <span className="font-mono text-[13px] text-subtle">{p.date}</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[22px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-signal">{p.title}</span>
                <span className="text-[15px] text-muted">{p.excerpt}</span>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                {p.tags.slice(0, 1).map((t) => <span key={t} className="chip">{t}</span>)}
                <span className="text-[13px] whitespace-nowrap text-subtle">{p.readTime}</span>
              </div>
              <ArrowUpRight size={20} className="hidden text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal md:block" />
            </Link>
          ))}
        </section>
      )}
      {rest.length === 0 && <div className="pb-28" />}
    </>
  );
}
