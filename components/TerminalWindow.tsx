"use client";

import { useState } from "react";
import { CodeTyper } from "./CodeTyper";

type Token = [text: string, kind?: "k" | "s" | "f" | "c"]; // keyword, string, function, comment
const COLORS = { k: "#8a8a93", s: "#6ee7b7", f: "#7dd3fc", c: "#5f6068" } as const;

const SNIPPETS: Record<string, Token[][]> = {
  "useVault.ts": [
    [["// One hook owns the state; components stay dumb", "c"]],
    [["export function ", "k"], ["useVault", "f"], ["(code: "], ["string", "f"], [") {"]],
    [["  const ", "k"], ["[state, dispatch] = "], ["useReducer", "f"], ["(reduce, idle);"]],
    [],
    [["  useEffect", "f"], ["(() => {"]],
    [["    const ", "k"], ["stop = "], ["sync", "f"], ["(code, dispatch);"]],
    [["    return ", "k"], ["stop;"]],
    [["  }, [code]);"]],
    [],
    [["  return ", "k"], ["{ ...state, add, complete };"]],
    [["}"]],
  ],
  "api.ts": [
    [["// Typed at the boundary, trusted everywhere after", "c"]],
    [["export async function ", "k"], ["get", "f"], ["<T>(path: "], ["string", "f"], ["): "], ["Promise", "f"], ["<T> {"]],
    [["  const ", "k"], ["res = "], ["await ", "k"], ["fetch", "f"], ["("], ["`/api${path}`", "s"], [");"]],
    [["  if ", "k"], ["(!res.ok) "], ["throw new ", "k"], ["ApiError", "f"], ["(res.status);"]],
    [["  return ", "k"], ["res."], ["json", "f"], ["();"]],
    [["}"]],
    [],
    [["const ", "k"], ["tasks = "], ["await ", "k"], ["get", "f"], ["<Task[]>("], ['"/tasks"', "s"], [");"]],
  ],
};

const TABS = ["about.ts", ...Object.keys(SNIPPETS)];

const STATUS = [
  { name: "Next.js", value: "16 · App Router" },
  { name: "TypeScript", value: "strict" },
  { name: "Vite", value: "HMR" },
  { name: "Motion", value: "60 fps" },
];

/** Editor-style card: tabbed snippets on top, live stack status underneath. */
export function TerminalWindow() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <div className="glass overflow-hidden rounded-[20px]">
      <div className="flex h-11 items-center gap-2 border-b border-line bg-raised pr-4 pl-4">
        {[0, 1, 2].map((i) => <span key={i} className="size-[11px] shrink-0 rounded-full bg-line-strong" />)}
        <div role="tablist" aria-label="Code samples" className="ml-2 flex h-full min-w-0 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`h-full border-b-2 px-3 font-mono text-xs whitespace-nowrap transition-colors ${
                tab === t ? "border-signal text-text" : "border-transparent text-subtle hover:text-text"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] text-signal sm:inline-flex">
          <span className="ping-dot size-1.5" /> live
        </span>
      </div>

      <div role="tabpanel">
        {tab === "about.ts" ? (
          <CodeTyper />
        ) : (
          <pre className="m-0 h-[292px] overflow-hidden px-6 pt-6 pb-7 font-mono text-[13px] leading-[1.9] text-text sm:text-sm">
            {SNIPPETS[tab].map((line, i) => (
              <div key={i} className="h-[1.9em]">
                {line.map(([text, kind], j) => (
                  <span key={j} style={kind && { color: COLORS[kind] }}>{text}</span>
                ))}
              </div>
            ))}
          </pre>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-px border-t border-line bg-line font-mono text-xs">
        {STATUS.map((s) => (
          <li key={s.name} className="flex items-center gap-2 bg-surface px-4 py-2.5">
            <span className="size-1.5 shrink-0 rounded-full bg-signal" />
            <span className="text-code">{s.name}</span>
            <span className="ml-auto truncate text-subtle">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
