import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { Download } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { education, experience, now, principles, site, skills } from "@/content/site";

export const metadata: Metadata = { title: "About", description: `The full story behind ${site.name}.` };

function Section({ eyebrow, title, children, split = true }: { eyebrow: string; title?: string; children: React.ReactNode; split?: boolean }) {
  return (
    <Reveal className={`container-page pt-28 ${split ? "grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-20" : "flex flex-col gap-10"}`}>
      <div className="flex flex-col gap-3.5">
        <span className="eyebrow text-subtle">{eyebrow}</span>
        {title && <h2 className="m-0 text-[clamp(2rem,4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.04em]">{title}</h2>}
      </div>
      <div>{children}</div>
    </Reveal>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="container-page grid items-end gap-14 pt-20 lg:grid-cols-[7fr_5fr] lg:gap-20 lg:pt-24">
        <div className="flex flex-col gap-7">
          <span className="eyebrow animate-rise text-signal">About</span>
          <h1 className="animate-rise m-0 text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.05em] [animation-delay:.08s]">
            I&apos;m {site.shortName} — I turn ideas into <span className="accent-serif text-signal">working</span> software.
          </h1>
          <div className="animate-rise flex flex-col gap-4.5 text-lg leading-[1.75] text-muted [animation-delay:.16s]">
            <p>
              <span className="text-text">I&apos;m a Computer Science undergraduate at the University of Roehampton, based in London.</span>{" "}
              [How you started — the first thing you built, or the moment web development clicked.]
            </p>
            <p>
              Today I work as a full-stack developer building fast, thoughtful web apps with Next.js, TypeScript and
              Tailwind, taking features from the database through to the final interaction.
            </p>
            <p>[What you&apos;re after next — the team, problems or role you&apos;re looking for.]</p>
          </div>
          <div className="animate-rise flex flex-wrap gap-3 [animation-delay:.24s]">
            <a href={site.resumeUrl} className="btn btn-primary"><Download /> Download CV</a>
            <Link href="/#contact" className="btn btn-secondary">Get in touch</Link>
          </div>
        </div>
        <div className="card relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover object-top" />
        </div>
      </section>

      <Reveal className="container-page grid gap-5 pt-24 md:grid-cols-3">
        {now.map((n) => (
          <div key={n.label} className="card card-hover flex flex-col gap-2.5 p-7">
            <span className="font-mono text-xs tracking-[0.06em] text-signal uppercase">{n.label}</span>
            <span className="text-lg font-semibold">{n.title}</span>
            <span className="text-[15px] leading-relaxed text-muted">{n.detail}</span>
          </div>
        ))}
      </Reveal>

      <Section eyebrow="01 — Education" title="Where I learned the fundamentals.">
        <div className="flex flex-col gap-4">
          {education.map((e) => (
            <div key={e.title} className={`card flex flex-col gap-3.5 px-8 py-7 ${e.current ? "border-signal-line" : ""}`}>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-6">
                <div>
                  <div className="text-[22px] font-semibold tracking-[-0.015em]">{e.title}</div>
                  <div className="mt-1 text-muted">{e.place}</div>
                </div>
                <span className="font-mono text-[13px] whitespace-nowrap text-muted">{e.years}</span>
              </div>
              <p className="text-[15px] leading-relaxed text-muted">{e.detail}</p>
              <div className="flex flex-wrap gap-1.5">
                {e.tags.map((t, i) => <span key={i} className="chip">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="02 — Experience" title="Where I've put it to work.">
        <ol className="flex flex-col border-t border-line">
          {experience.map((x, i) => (
            <li key={i} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
              <span className="pt-1 font-mono text-[13px] text-muted">{x.years}</span>
              <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold">
                  {x.role} <span className="font-normal text-subtle">· {x.org}</span>
                </div>
                <p className="text-[15px] leading-relaxed text-muted">{x.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="03 — Skills" title="What I reach for." split={false}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <div key={s.group} className="card card-hover flex flex-col gap-4 p-7">
              <span className="text-lg font-semibold">{s.group}</span>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((item) => <span key={item} className="chip chip-hover">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="04 — How I work" split={false}>
        <div className="grid gap-12 md:grid-cols-3">
          {principles.map((p, i) => (
            <div key={p.title} className={`flex flex-col gap-3 border-t pt-5 ${i === 0 ? "border-signal" : "border-line-strong"}`}>
              <span className="text-[22px] font-semibold tracking-[-0.02em]">{p.title}</span>
              <span className="leading-relaxed text-muted">{p.detail}</span>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner title="Want to work together, or just say hi?" />
    </>
  );
}
