"use client";

import { useEffect, useState } from "react";

/** Sticky "on this page" list that highlights the section currently in view. */
export function TableOfContents({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="sticky top-28 hidden flex-col gap-1 self-start lg:flex">
      <span className="mb-2.5 font-mono text-xs tracking-[0.06em] text-subtle uppercase">{title}</span>
      {items.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`border-l-2 px-3 py-2 text-sm transition-colors ${
            active === id ? "border-signal text-text" : "border-line text-muted hover:text-text"
          }`}
        >
          {label}
        </a>
      ))}
    </aside>
  );
}
