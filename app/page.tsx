import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { CodeTyper } from "@/components/CodeTyper";
import { ContactForm } from "@/components/ContactForm";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, ArrowUpRight, Download, FileText, GitHub, LinkedIn } from "@/components/Icons";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { Reveal } from "@/components/Reveal";
import { RoleRotator } from "@/components/RoleRotator";
import { SectionHeader } from "@/components/SectionHeader";
import { Spotlight } from "@/components/Spotlight";
import { projects } from "@/content/projects";
import { education, site, skills, tools } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

const HEADLINE = ["Hi,", "I'm", "Rafin.", "I", "build", "fast,", "thoughtful", "web", "apps."];

function Hero() {
  return (
    <Spotlight className="container-page grid items-center gap-16 pt-16 pb-20 lg:grid-cols-[7fr_5fr] lg:gap-18 lg:pt-28 lg:pb-26">
      <div className="relative flex flex-col gap-7">
        {site.available && (
          <div className="animate-rise inline-flex h-8 items-center gap-2.5 self-start rounded-full border border-signal-line bg-signal-soft px-3.5 text-[13px] [animation-delay:.1s]">
            <span className="ping-dot size-2" /> Available for new projects
          </div>
        )}
        <div className="animate-rise flex flex-wrap items-center gap-3 font-mono text-sm tracking-[0.02em] text-subtle [animation-delay:.2s]">
          <span>// currently</span>
          <RoleRotator roles={site.roles} />
          <span>· {site.location}</span>
        </div>

        <h1 className="m-0 text-[clamp(2.75rem,7vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
          {HEADLINE.map((word, i) => (
            <Fragment key={word}>
              <span className="mask-line">
                <span
                  className={`mask-word ${word === "thoughtful" ? "shine-text accent-serif pr-[.06em]" : ""}`}
                  style={{
                    animationDelay: `${0.3 + i * 0.06}s`,
                    ...(word === "thoughtful" && { animation: "word-up 1.1s var(--ease-out) .7s both, shimmer 5s linear 1.8s infinite" }),
                  }}
                >
                  {word}
                </span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <p className="animate-rise m-0 max-w-[580px] text-lg leading-relaxed text-muted [animation-delay:.9s] md:text-[19px]">
          Computer Science student at the University of Roehampton, building full-stack products with Next.js and
          TypeScript that feel as good as they perform.
        </p>

        <div className="animate-rise flex flex-wrap gap-3 [animation-delay:1.05s]">
          <Link href="#projects" className="btn btn-primary">
            View my work <ArrowRight className="arrow" />
          </Link>
          <a href={site.resumeUrl} className="btn btn-secondary">
            <Download /> Download CV
          </a>
        </div>

        <dl className="mt-5 grid max-w-[580px] grid-cols-3 gap-6 border-t border-line pt-7">
          {site.stats.map((s, i) => (
            <div key={s.label} className="animate-rise" style={{ animationDelay: `${1.2 + i * 0.15}s` }}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="m-0 text-2xl font-semibold tracking-[-0.03em] sm:text-[32px]">{s.value}</dd>
              <dd className="m-0 mt-1 text-sm text-subtle" aria-hidden="true">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="animate-slide-in relative">
        <div className="animate-float">
          <div className="glow-border tilt">
            <div className="glass overflow-hidden rounded-[20px]">
              <div className="flex h-11 items-center gap-2 border-b border-line bg-raised px-4">
                {[0, 1, 2].map((i) => <span key={i} className="size-[11px] rounded-full bg-line-strong" />)}
                <span className="ml-3 font-mono text-xs text-subtle">about.ts</span>
                <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-signal">
                  <span className="ping-dot size-1.5" /> live
                </span>
              </div>
              <CodeTyper />
            </div>
          </div>
        </div>
      </div>
    </Spotlight>
  );
}

function Marquee() {
  return (
    <div className="marquee flex h-18 items-center overflow-hidden border-y border-line bg-ink/55 font-mono text-[15px] whitespace-nowrap text-subtle backdrop-blur-md">
      <div className="marquee-track">
        {[...tools, ...tools].map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= tools.length}
            className="inline-flex items-center gap-12 transition-colors after:size-[5px] after:rounded-full after:bg-signal/60 after:content-[''] hover:text-text"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="container-page flex flex-col gap-14 pt-28 pb-24 lg:pt-34 lg:pb-30">
      <Reveal>
        <SectionHeader eyebrow="01 — About" title="A developer who sweats the details users" accent="feel." />
      </Reveal>

      <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-18">
        <Reveal from="left" className="flex flex-col gap-5">
          <div className="tilt relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line bg-raised">
            <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover object-top" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["Based in", site.location], ["Focus", "Full-stack"], ["Studying", "BSc CS"]].map(([k, v]) => (
              <div key={k} className="card card-hover rounded-xl px-4 py-3.5">
                <div className="text-xs text-subtle">{k}</div>
                <div className="mt-1 text-[15px]">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal from="right" className="flex flex-col gap-10">
          <div className="flex flex-col gap-4.5 text-lg leading-[1.7] text-muted">
            <p>
              <span className="text-text">I&apos;m {site.name}, a Computer Science undergraduate at the University of Roehampton in London.</span>{" "}
              I build full-stack web apps end to end, from the database schema to the last hover state.
            </p>
            <p>
              My focus is products that load fast, stay accessible and feel considered to use. [A sentence on what
              you&apos;re looking for next — e.g. internships, freelance work or graduate roles.]
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-5 text-subtle">Education &amp; milestones</h3>
            <ol className="flex flex-col">
              {education.map((e, i) => {
                const last = i === education.length - 1;
                return (
                  <li key={e.title} className="flex gap-6">
                    <div className="flex w-3.5 flex-col items-center">
                      <span className={`size-3.5 rounded-full ${e.current ? "animate-breathe bg-signal" : "border-2 border-[#52535b] bg-[#0a0a0b]"}`} />
                      {!last && <span className={`mt-1.5 w-px grow ${e.current ? "bg-gradient-to-b from-signal to-line-strong" : "bg-line-strong"}`} />}
                    </div>
                    <div className={`flex grow flex-col justify-between gap-2 sm:flex-row sm:gap-6 ${last ? "" : "pb-8"}`}>
                      <div>
                        <div className="text-xl font-semibold tracking-[-0.01em]">{e.title}</div>
                        <div className="mt-1 text-muted">{e.place}</div>
                      </div>
                      <div className="font-mono text-[13px] whitespace-nowrap text-muted sm:pt-1">{e.years}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>

      <Reveal className="flex flex-col gap-5 border-t border-line pt-12">
        <h3 className="eyebrow text-subtle">Core skills</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <div key={s.group} className="card card-hover flex flex-col gap-3.5 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-[17px] font-semibold">{s.group}</span>
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((item) => <span key={item} className="chip chip-hover">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="border-y border-white/6 py-24 lg:py-30">
      <div className="container-page flex flex-col gap-10">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <SectionHeader eyebrow="02 — Projects" title="Live sites, apps &" accent="experiments." />
            <p className="max-w-[620px] text-lg leading-relaxed text-muted">
              Every build has a live link and its source. Search by name or technology, or filter by type.
            </p>
          </div>
          <Link href="/projects" className="btn btn-secondary h-12 text-[15px]">
            Open full archive <ArrowRight size={16} className="arrow" />
          </Link>
        </Reveal>
        <Reveal>
          <ProjectExplorer projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { icon: GitHub, label: "GitHub", meta: site.socials.github.handle, href: site.socials.github.url },
    { icon: LinkedIn, label: "LinkedIn", meta: site.socials.linkedin.handle, href: site.socials.linkedin.url },
    { icon: FileText, label: "Résumé", meta: "PDF", href: site.resumeUrl },
  ];

  return (
    <section id="contact" className="container-page grid gap-14 py-28 lg:grid-cols-[5fr_7fr] lg:gap-18 lg:py-34">
      <Reveal from="left" className="flex flex-col gap-6">
        <SectionHeader eyebrow="03 — Contact" title="Let's build something" accent="together." />
        <p className="text-lg leading-relaxed text-muted">
          Open to internships, freelance work and full-time roles. I usually reply within {site.replyTime}.
        </p>

        <div className="card card-hover flex items-center justify-between gap-3 rounded-[14px] py-4 pr-4 pl-5">
          <a href={`mailto:${site.email}`} className="truncate font-mono text-[15px] text-text sm:text-base">{site.email}</a>
          <CopyButton value={site.email} label="Copy email address" />
        </div>

        <ul className="flex flex-col border-t border-line">
          {links.map(({ icon: Icon, label, meta, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex h-15 items-center gap-3.5 border-b border-line text-text transition-all duration-300 hover:pl-2.5 hover:text-signal"
              >
                <Icon size={20} />
                <span className="grow">{label}</span>
                <span className="font-mono text-[13px] text-subtle">{meta}</span>
                <ArrowUpRight size={16} className="text-subtle transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-signal" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal from="right">
        <ContactForm />
      </Reveal>
    </section>
  );
}
