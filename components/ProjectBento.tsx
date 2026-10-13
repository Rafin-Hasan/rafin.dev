import Image from "next/image";
import Link from "next/link";
import { labs, type Project } from "@/content/projects";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

/** Asymmetric home-page grid: the featured project spans two columns, labs fill the last slot. */
export function ProjectBento({ projects }: { projects: Project[] }) {
  const [featured, ...rest] = projects;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Reveal from="zoom" className="md:col-span-2">
        <BentoCard project={featured} wide />
      </Reveal>
      {rest.map((p, i) => (
        <Reveal key={p.slug} delay={0.08 * ((i + 1) % 3)}>
          <BentoCard project={p} />
        </Reveal>
      ))}

      <Reveal delay={0.16}>
      <div className="card flex h-full flex-col gap-5 rounded-[18px] p-6 lg:p-7">
        <div className="flex items-center justify-between font-mono text-[11.5px] tracking-[0.06em] text-subtle uppercase">
          <span className="text-signal">Experimental lab &amp; tools</span>
          <span>{labs.length} builds</span>
        </div>
        <h3 className="m-0 text-xl font-semibold tracking-[-0.02em]">Exploration &amp; micro-labs</h3>
        <ul className="flex grow flex-col gap-3">
          {labs.map((lab) => {
            const body = (
              <>
                <span className="font-semibold text-text">{lab.name}</span>
                <span className="text-sm leading-normal text-muted">{lab.detail}</span>
              </>
            );
            const cls = "flex flex-col gap-1.5 rounded-xl border border-line bg-raised/60 p-4 transition-colors";
            return (
              <li key={lab.name}>
                {lab.url ? (
                  <a href={lab.url} target="_blank" rel="noreferrer" className={`${cls} hover:border-signal-line`}>{body}</a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
        <Link href="/projects" className="inline-flex items-center gap-2 self-start text-sm font-medium text-signal transition-[gap] hover:gap-3">
          Browse all work <ArrowRight size={16} />
        </Link>
      </div>
      </Reveal>
    </div>
  );
}

function BentoCard({ project: p, wide }: { project: Project; wide?: boolean }) {
  const href = `/projects/${p.slug}`;
  return (
    <article className={`project-card card relative flex h-full flex-col overflow-hidden rounded-[18px] ${wide ? "border-signal-line" : ""}`}>
      <div className={`relative overflow-hidden border-b border-line ${wide ? "aspect-[2/1]" : "aspect-[16/10]"}`}>
        {p.image && (
          <Image
            src={p.image}
            alt=""
            fill
            sizes={wide ? "(min-width: 1024px) 860px, 100vw" : "(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"}
            className="thumb-inner object-cover object-top"
          />
        )}
        <span className="open-btn absolute top-3.5 right-3.5 z-10 flex size-9 items-center justify-center rounded-full bg-signal text-[#0a0a0b]">
          <ArrowUpRight size={16} strokeWidth={2.25} />
        </span>
      </div>

      <div className="flex grow flex-col gap-3 p-6 lg:p-7">
        <div className="flex justify-between font-mono text-[11.5px] tracking-[0.06em] text-subtle uppercase">
          <span className={wide ? "text-signal" : ""}>{p.kind}{wide && " · Featured"}</span>
          <span>{p.tags.join(" · ")}</span>
        </div>
        <Link href={href} className={`font-semibold tracking-[-0.02em] text-text after:absolute after:inset-0 after:content-[''] ${wide ? "text-2xl" : "text-xl"}`}>
          {p.name}
        </Link>
        <p className="text-[14.5px] leading-normal text-muted">{p.summary}</p>
        <ul className="flex flex-wrap gap-1.5">
          {p.highlights?.map((h) => <li key={h} className="chip text-[11.5px]">{h}</li>)}
        </ul>
        <div className="relative z-10 mt-auto flex gap-4.5 border-t border-[#1f2024] pt-3 text-sm font-medium">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-signal transition-[gap] hover:gap-2.5">
              Live site <ArrowUpRight size={14} />
            </a>
          )}
          {p.sourceUrl && (
            <a href={p.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-code transition-[gap] hover:gap-2.5">
              GitHub <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
