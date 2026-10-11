import type { Block } from "@/content/posts";
import { CopyButton } from "./CopyButton";
import { Info } from "./Icons";

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <article className="prose-post">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                {b.lead && <span className="text-text">{b.lead} </span>}
                {b.text}
              </p>
            );
          case "h2":
            return <h2 key={i} id={b.id}>{b.text}</h2>;
          case "code":
            return (
              <figure key={i} className="glass m-0 overflow-hidden rounded-2xl border border-line">
                <figcaption className="flex h-11 items-center justify-between border-b border-line px-4 font-mono text-xs text-subtle">
                  {b.file}
                  <CopyButton
                    value={b.code}
                    label="Copy code"
                    className="flex h-7 items-center rounded-lg border border-line-strong bg-raised px-2.5 text-muted transition-colors hover:text-text"
                  />
                </figcaption>
                <pre className="m-0 overflow-x-auto px-6 py-5 font-mono text-sm leading-[1.8] text-text">
                  <code className="!border-0 !bg-transparent !p-0">{b.code}</code>
                </pre>
              </figure>
            );
          case "note":
            return (
              <div key={i} className="flex gap-3.5 rounded-[14px] border border-signal-line bg-signal/6 px-5.5 py-5 text-base leading-relaxed text-code">
                <Info size={20} className="mt-0.5 shrink-0 text-signal" />
                <span><strong className="font-semibold text-text">Note.</strong> {b.text}</span>
              </div>
            );
          case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
          case "list":
            return <ul key={i}>{b.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        }
      })}
    </article>
  );
}
