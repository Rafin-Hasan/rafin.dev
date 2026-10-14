import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ContactConsole } from "@/components/ContactConsole";
import { ContactForm } from "@/components/ContactForm";
import { ArrowRight, Download, GitHub } from "@/components/Icons";
import { HeroReel } from "@/components/HeroReel";
import { ProjectBento } from "@/components/ProjectBento";
import { Reveal } from "@/components/Reveal";
import { RoleRotator } from "@/components/RoleRotator";
import { SectionHeader } from "@/components/SectionHeader";
import { Spotlight } from "@/components/Spotlight";
import { TechArsenal } from "@/components/TechArsenal";
import { projects } from "@/content/projects";
import { metrics, now, site, story, tools } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <Marquee />
      <Projects />
      <Arsenal />
      <About />
      <Contact />
    </>
  );
}

const HEADLINE = ["Building", "high-throughput,", "tactile", "web", "interfaces", "with", "sub-millisecond", "precision."];
const ACCENT = "tactile";

function Hero() {
  return (
    <Spotlight className="container-page grid grid-cols-[minmax(0,1fr)] items-center gap-12 pt-14 pb-16 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:pt-20 lg:pb-20">
      <div className="relative flex flex-col gap-6">
        {site.available && (
          <div className="animate-rise inline-flex min-h-8 items-center gap-2.5 self-start rounded-full border border-signal-line bg-signal-soft px-3.5 py-1.5 text-[13px] [animation-delay:.1s]">
            <span className="ping-dot size-2 shrink-0" /> {site.availability}
          </div>
        )}
        <div className="animate-rise flex flex-wrap items-center gap-3 font-mono text-sm tracking-[0.02em] text-subtle [animation-delay:.2s]">
          <span>// {site.name}</span>
          <RoleRotator roles={site.roles} />
        </div>

        <h1 className="m-0 text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.04] font-semibold tracking-[-0.045em]">
          {HEADLINE.map((word, i) => (
            <Fragment key={word}>
              <span className="mask-line">
                <span
                  className={`mask-word ${word === ACCENT ? "shine-text accent-serif pr-[.06em]" : ""}`}
                  style={{
                    animationDelay: `${0.3 + i * 0.06}s`,
                    ...(word === ACCENT && { animation: "word-up 1.1s var(--ease-out) .42s both, shimmer 5s linear 1.8s infinite" }),
                  }}
                >
                  {word}
                </span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <p className="animate-rise m-0 max-w-[600px] text-lg leading-relaxed text-muted [animation-delay:.9s]">
          I&apos;m a frontend and full-stack developer and Computer Science undergraduate at the University of
          Roehampton, London. I build with React, Next.js and TypeScript, and care about interfaces that respond the
          instant you touch them.
        </p>

        <div className="animate-rise flex flex-wrap gap-3 [animation-delay:1.05s]">
          <Link href="#projects" className="btn btn-primary">
            View projects <ArrowRight className="arrow" />
          </Link>
          <a href={site.resumeUrl} className="btn btn-secondary">
            <Download /> Download résumé
          </a>
          <a href={site.socials.github.url} target="_blank" rel="noreferrer" className="btn btn-secondary">
            <GitHub /> GitHub
          </a>
          <a href={`mailto:${site.email}`} className="btn btn-secondary">Email</a>
        </div>
      </div>

      <div className="animate-slide-in relative">
        <div className="animate-float hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          <div className="glow-border">
            <HeroReel />
          </div>
        </div>
      </div>
    </Spotlight>
  );
}

function Metrics() {
  return (
    <section aria-label="At a glance" className="container-page pb-14">
      <Reveal from="zoom">
        <dl className="glass grid overflow-hidden rounded-[20px] border border-line sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1.5 border-line p-6 max-lg:border-b max-lg:last:border-b-0 sm:max-lg:odd:border-r lg:border-r lg:last:border-r-0">
              <dd className="m-0 text-[32px] leading-none font-semibold tracking-[-0.03em] text-signal">{m.value}</dd>
              <dt className="font-semibold">{m.label}</dt>
              <dd className="m-0 text-sm leading-normal text-subtle">{m.detail}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee flex h-16 items-center overflow-hidden border-y border-line bg-ink/55 font-mono text-[15px] whitespace-nowrap text-subtle backdrop-blur-md">
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

function Projects() {
  return (
    <section id="projects" className="container-page flex flex-col gap-9 py-20">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-4">
          <SectionHeader eyebrow="01 — Projects" title="Live builds you can" accent="open." />
          <p className="max-w-[620px] text-lg leading-relaxed text-muted">
            Shipped products, each with a live link and a case study, plus smaller experiments.
          </p>
        </div>
        <Link href="/projects" className="btn btn-secondary h-12 text-[15px]">
          All work <ArrowRight size={16} className="arrow" />
        </Link>
      </Reveal>
      <ProjectBento projects={projects} />
    </section>
  );
}

function Arsenal() {
  return (
    <section id="stack" className="border-y border-white/6 py-20">
      <div className="container-page flex flex-col gap-9">
        <Reveal>
          <SectionHeader eyebrow="02 — Tech arsenal" title="Architectural" accent="tooling." />
        </Reveal>
        <TechArsenal />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="container-page flex flex-col gap-9 py-20">
      <Reveal>
        <SectionHeader eyebrow="03 — About" title="Theory from the degree," accent="feel from the craft." />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal from="left" className="flex flex-col gap-6 sm:flex-row lg:gap-7">
          <div className="tilt relative aspect-[4/5] w-40 shrink-0 self-start overflow-hidden rounded-[18px] border border-line bg-raised sm:w-48">
            <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill sizes="192px" className="object-cover object-top" />
          </div>
          <div className="flex flex-col gap-4 text-[17px] leading-[1.7] text-muted">
            {story.map((p, i) => (
              <p key={i} className={i === 0 ? "text-text" : ""}>{p}</p>
            ))}
            <Link href="/about" className="inline-flex items-center gap-2 self-start text-[15px] font-medium text-signal transition-[gap] hover:gap-3">
              Full story <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {now.map((n, i) => (
            <Reveal key={n.label} from={i === 0 ? "right" : "up"} delay={i * 0.08} className={i === 0 ? "sm:col-span-2" : ""}>
            <div className="card card-hover flex h-full flex-col gap-2 rounded-2xl p-6">
              <span className="font-mono text-xs tracking-[0.06em] text-signal uppercase">{n.label}</span>
              <span className="text-lg font-semibold">{n.title}</span>
              <span className="text-[15px] leading-relaxed text-muted">{n.detail}</span>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-white/6 py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
        <Reveal from="left" className="flex flex-col gap-6">
          <SectionHeader eyebrow="04 — Contact" title="Let's build" accent="together." />
          <p className="text-lg leading-relaxed text-muted">
            Open to internships, placements and full-time roles. Copy my email, pick a link, or send a message.
          </p>
          <ContactConsole />
        </Reveal>
        <Reveal from="right">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
