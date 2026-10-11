import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  accent?: string;
  muted?: boolean;
};

/** Mono eyebrow + large heading, with an optional italic serif accent word. */
export function SectionHeader({ eyebrow, title, accent, muted }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <span className={`eyebrow ${muted ? "text-subtle" : "text-signal"}`}>{eyebrow}</span>
      <h2 className="section-title max-w-3xl">
        {title}
        {accent && <> <span className="shine-text accent-serif">{accent}</span></>}
      </h2>
    </div>
  );
}
