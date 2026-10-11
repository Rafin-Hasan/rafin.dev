import type { ReactNode } from "react";

type Props = { eyebrow: string; title: string; accent: string; intro: string; children?: ReactNode };

/** Large page intro used by /projects and /writing. */
export function PageHeader({ eyebrow, title, accent, intro, children }: Props) {
  return (
    <section className="container-page flex flex-col gap-7 pt-20 pb-10 lg:pt-24">
      <span className="eyebrow animate-rise text-signal">{eyebrow}</span>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-16">
        <h1 className="page-title animate-rise [animation-delay:.08s]">
          {title} <span className="accent-serif">{accent}</span>
        </h1>
        <p className="animate-rise max-w-[440px] text-lg leading-relaxed text-muted [animation-delay:.16s]">{intro}</p>
      </div>
      {children}
    </section>
  );
}
