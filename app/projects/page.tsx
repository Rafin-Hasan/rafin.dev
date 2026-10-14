import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { ArrowUpRight } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { Reveal } from "@/components/Reveal";
import { labs, projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work", description: "Every live site and app I've built." };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Work / ${projects.length} projects`}
        title="Everything I've"
        accent="built."
        intro="Every live site and app I've built. Search by name or technology, filter by type, and open any project for its case study."
      />

      <section className="container-page pt-4">
        <ProjectExplorer projects={projects} />
      </section>

      <Reveal id="lab" className="container-page flex scroll-mt-12 flex-col gap-6 pt-28">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-subtle">Lab</span>
            <h2 className="m-0 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">Smaller builds &amp; experiments</h2>
          </div>
          <span className="text-sm text-subtle">Side projects and experiments.</span>
        </div>

        <ul className="flex flex-col border-t border-line">
          {labs.map((lab) => (
            <li key={lab.name} className="flex flex-col justify-between gap-1 border-b border-line py-5 sm:flex-row sm:items-center sm:gap-6">
              <span className="font-medium">{lab.name}</span>
              <span className="text-sm text-muted">{lab.detail}</span>
              {lab.url && (
                <a href={lab.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-signal">
                  Open <ArrowUpRight size={14} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      <CtaBanner title="Have something in mind?" subtitle="I'm open to freelance, internships and full-time roles." />
    </>
  );
}
