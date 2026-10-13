import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { TableOfContents } from "@/components/TableOfContents";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.summary } : {};
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "approach", label: "Approach" },
  { id: "features", label: "Key features" },
  { id: "challenges", label: "Challenges" },
  { id: "results", label: "Results" },
];

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  const cs = project.caseStudy;

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    ["Role", cs.role],
    ["Timeline", cs.timeline],
    ["Team", cs.team],
    ["Stack", project.tags.join(" · ")],
  ];

  return (
    <>
      <section className="container-page flex flex-col gap-7 pt-14">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-sm text-subtle">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-muted hover:text-text">
            <ChevronLeft size={14} /> All projects
          </Link>
          <span>/</span>
          <span className="text-text" aria-current="page">{project.name}</span>
        </nav>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-16">
          <div className="flex max-w-[820px] flex-col gap-5">
            <div className="flex gap-2 font-mono text-xs tracking-[0.06em] uppercase">
              <span className="rounded-full bg-signal-soft px-2.5 py-1 text-signal">Case study</span>
              <span className="rounded-full border border-line-strong px-2.5 py-1 text-muted">{project.kind}</span>
            </div>
            <h1 className="m-0 text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.05em]">{project.name}</h1>
            <p className="text-xl leading-normal text-muted md:text-[22px]">{cs.pitch}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                Live demo <ArrowUpRight size={16} />
              </a>
            )}
            {project.sourceUrl && (
              <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">Source code</a>
            )}
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 border-y border-line lg:grid-cols-4 lg:gap-x-0">
          {meta.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1.5 py-5 lg:border-line lg:px-6 lg:first:pl-0 lg:[&:not(:first-child)]:border-l">
              <dt className="font-mono text-xs tracking-[0.06em] text-subtle uppercase">{k}</dt>
              <dd className="m-0">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="container-page mt-12">
        <div className="card relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl">
          {project.image ? (
            <Image src={project.image} alt={`${project.name} screenshot`} fill priority sizes="(min-width: 1248px) 1200px, 100vw" className="object-cover" />
          ) : (
            <span className="placeholder-img absolute inset-0 flex items-center justify-center font-mono text-[13px] text-subtle">
              [Hero screenshot or product video · 16:9]
            </span>
          )}
        </div>
      </div>

      <section className="container-page grid gap-24 pt-24 lg:grid-cols-[240px_minmax(0,1fr)]">
        <TableOfContents title="On this page" items={SECTIONS} />

        <div className="flex max-w-[800px] flex-col gap-18">
          <Block id="overview" title="Overview"><p className="body-lg">{cs.overview}</p></Block>
          <Block id="problem" title="The problem"><p className="body-lg">{cs.problem}</p></Block>

          <Block id="approach" title="Approach">
            <p className="body-lg">{cs.approach}</p>
            <div className="card flex flex-col gap-5 p-6 md:p-8">
              <span className="font-mono text-xs tracking-[0.06em] text-subtle">ARCHITECTURE</span>
              <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
                {cs.architecture.map((node, i) => (
                  <Fragment key={node.name}>
                    {i > 0 && <ArrowRight size={20} className="self-center text-signal max-md:rotate-90" />}
                    <div className={`grow rounded-xl border p-4 text-center ${i === 1 ? "border-signal-line bg-signal/6" : "border-line-strong bg-raised"}`}>
                      <div className="text-[15px] font-semibold">{node.name}</div>
                      <div className="mt-1 font-mono text-xs text-subtle">{node.detail}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </Block>

          <Block id="features" title="Key features">
            <div className="grid gap-4 sm:grid-cols-2">
              {cs.features.map((f, i) => (
                <div key={i} className="card flex flex-col gap-2.5 rounded-2xl p-6">
                  <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-semibold">{f.title}</span>
                  <span className="text-[15px] leading-relaxed text-muted">{f.detail}</span>
                </div>
              ))}
            </div>
          </Block>

          <Block id="challenges" title="Challenges & what I learned">
            <div className="flex flex-col border-t border-line">
              {cs.challenges.map((c, i) => (
                <div key={i} className="grid gap-4 border-b border-line py-5 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <div className="mb-1.5 font-mono text-xs tracking-[0.06em] text-subtle">CHALLENGE</div>
                    <div className="leading-relaxed">{c.challenge}</div>
                  </div>
                  <div>
                    <div className="mb-1.5 font-mono text-xs tracking-[0.06em] text-signal">SOLUTION</div>
                    <div className="leading-relaxed text-muted">{c.solution}</div>
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <Block id="results" title="Results">
            <div className="grid gap-4 sm:grid-cols-3">
              {cs.results.map((r, i) => (
                <div key={i} className="card rounded-2xl p-6">
                  <div className="text-[40px] font-semibold tracking-[-0.04em] text-signal">{r.value}</div>
                  <div className="mt-1 text-sm text-muted">{r.label}</div>
                </div>
              ))}
            </div>
          </Block>
        </div>
      </section>

      <section className="container-page grid gap-6 pt-24 md:grid-cols-2">
        {project.gallery
          ? project.gallery.map((src) => (
              <div key={src} className="card relative aspect-[16/10] overflow-hidden">
                <Image src={src} alt={`${project.name} screenshot`} fill sizes="(min-width: 768px) 588px, 100vw" className="object-cover object-top" />
              </div>
            ))
          : ["[Detail screenshot]", "[Mobile screenshot]"].map((label) => (
              <div key={label} className="card placeholder-img flex h-[420px] items-center justify-center font-mono text-xs text-subtle">{label}</div>
            ))}
      </section>

      <nav aria-label="More projects" className="container-page my-24 grid gap-6 md:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} className="card card-hover flex flex-col gap-2 p-8">
          <span className="font-mono text-xs tracking-[0.06em] text-subtle">← PREVIOUS</span>
          <span className="text-2xl font-semibold tracking-[-0.02em]">{prev.name}</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="card card-hover flex flex-col items-end gap-2 border-signal-line p-8 text-right">
          <span className="font-mono text-xs tracking-[0.06em] text-signal">NEXT PROJECT →</span>
          <span className="text-2xl font-semibold tracking-[-0.02em]">{next.name}</span>
        </Link>
      </nav>
    </>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div id={id} className="flex flex-col gap-5">
        <h2 className="m-0 text-[32px] font-semibold tracking-[-0.03em]">{title}</h2>
        {children}
      </div>
    </Reveal>
  );
}
