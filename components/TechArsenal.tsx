"use client";

import { useState } from "react";
import { skills } from "@/content/site";
import { Reveal } from "./Reveal";

const FILTERS = ["All", "Production ready", "Currently exploring"] as const;
type Filter = (typeof FILTERS)[number];

/** Skills by category, filterable by how battle-tested each one is. */
export function TechArsenal() {
  const [filter, setFilter] = useState<Filter>("All");
  const dimmed = (exploring?: boolean) =>
    (filter === "Production ready" && exploring) || (filter === "Currently exploring" && !exploring);

  return (
    <div className="flex flex-col gap-5">
      <div role="group" aria-label="Filter skills" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
              filter === f ? "border-text bg-text text-[#0a0a0b]" : "glass border-line text-muted hover:border-signal-line"
            }`}
          >
            {f === "Currently exploring" && <span className="size-1.5 rounded-full bg-[#fcd34d]" />}
            {f === "Production ready" && <span className="size-1.5 rounded-full bg-signal" />}
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 0.07}>
          <div className="card card-hover flex h-full flex-col gap-3.5 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="m-0 text-[17px] font-semibold">{s.group}</h3>
              <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {s.items.map((item) => (
                <li
                  key={item.name}
                  className={`chip chip-hover inline-flex items-center gap-1.5 transition-opacity duration-300 ${dimmed(item.exploring) ? "opacity-25" : ""}`}
                >
                  <span className={`size-1.5 rounded-full ${item.exploring ? "bg-[#fcd34d]" : "bg-signal"}`} />
                  {item.name}
                  {item.exploring && <span className="sr-only"> (currently exploring)</span>}
                </li>
              ))}
            </ul>
          </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
