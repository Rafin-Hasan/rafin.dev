"use client";

import { useEffect, useState } from "react";

type Kind = "k" | "s" | "b" | "p"; // keyword, string, boolean, plain
type Line = [string, Kind][];

const CODE: Line[] = [
  [["export const", "k"], [" rafin = {", "p"]],
  [["  role: ", "p"], ['"Full-stack developer"', "s"], [",", "p"]],
  [["  stack: [", "p"], ['"Next.js"', "s"], [", ", "p"], ['"TypeScript"', "s"], [",", "p"]],
  [["          ", "p"], ['"Node.js"', "s"], [", ", "p"], ['"PostgreSQL"', "s"], ["],", "p"]],
  [["  focus: ", "p"], ['"fast, accessible web apps"', "s"], [",", "p"]],
  [["  studying: ", "p"], ['"BSc CS @ Roehampton"', "s"], [",", "p"]],
  [["  location: ", "p"], ['"London, UK"', "s"], [",", "p"]],
  [["  openToWork: ", "p"], ["true", "b"], [",", "p"]],
  [["};", "p"]],
];

const COLORS: Record<Kind, string> = { k: "#8a8a93", s: "#6ee7b7", b: "#fcd34d", p: "#ededef" };
const TEXT = CODE.map((line) => line.map(([t]) => t).join("")).join("\n");
const HOLD_MS = 3500;

/** Types about.ts character by character, holds, erases, and loops. */
export function CodeTyper() {
  const [n, setN] = useState(0);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(TEXT.length);
      setIdle(true);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let count = 0;
    let phase: "typing" | "erasing" = "typing";

    const tick = () => {
      let delay: number;
      if (phase === "typing") {
        if (count >= TEXT.length) {
          phase = "erasing";
          setIdle(true);
          delay = HOLD_MS;
        } else {
          const ch = TEXT[count++];
          // Human-ish rhythm: jitter, a beat after punctuation, a longer beat at line ends.
          delay = 28 + Math.random() * 45;
          if (",{[".includes(ch)) delay += 90;
          if (ch === "\n") delay += 160;
          if (ch === " " && TEXT[count - 2] === " ") delay = 6;
          setIdle(false);
        }
      } else if (count <= 0) {
        phase = "typing";
        delay = 600;
      } else {
        count = Math.max(0, count - 6);
        delay = 14;
        setIdle(false);
      }
      setN(count);
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, []);

  // Walk the tokens, revealing only the first n characters (newlines count as one each).
  let left = n;
  const caretLine = TEXT.slice(0, n).split("\n").length - 1;

  return (
    <pre className="m-0 h-[292px] overflow-hidden px-6 pt-6 pb-7 font-mono text-[13px] leading-[1.9] text-text sm:text-sm" aria-label={TEXT}>
      {CODE.map((line, i) => {
        const segs = line.map(([text, kind], j) => {
          const shown = text.slice(0, Math.max(0, left));
          left -= text.length;
          return shown ? <span key={j} style={{ color: COLORS[kind] }}>{shown}</span> : null;
        });
        left -= 1; // newline
        return (
          <div key={i} className="h-[1.9em]" aria-hidden="true">
            {segs}
            {i === caretLine && (
              <span className={`ml-px inline-block h-[18px] w-[9px] bg-signal align-[-3px] ${idle ? "caret" : ""}`} />
            )}
          </div>
        );
      })}
    </pre>
  );
}
