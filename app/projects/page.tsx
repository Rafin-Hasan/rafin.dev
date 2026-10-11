import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { ArrowUpRight } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { Reveal } from "@/components/Reveal";
import { archive, projects } from "@/content/projects";

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

      <Reveal className="container-page flex flex-col gap-6 pt-28">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-subtle">Archive</span>
            <h2 className="m-0 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">Smaller builds &amp; experiments</h2>
          </div>
          <span className="text-sm text-subtle">Class projects, hackathons, weekend tinkering.</span>
        </div>

        <table className="w-full border-collapse text-left">
          <thead className="font-mono text-xs tracking-[0.06em] text-subtle">
            <tr className="h-11 border-y border-line">
              <th className="w-24 font-normal">YEAR</th>
              <th className="font-normal">PROJECT</th>
              <th className="hidden font-normal sm:table-cell">BUILT WITH</th>
              <th className="text-right font-normal">LINK</th>
            </tr>
          </thead>
          <tbody>
            {archive.map((a) => (
              <tr key={a.name} className="h-16 border-b border-line">
                <td className="font-mono text-sm text-subtle">{a.year}</td>
                <td className="font-medium">{a.name}</td>
                <td className="hidden text-sm text-muted sm:table-cell">{a.stack}</td>
                <td className="text-right">
                  <a href={a.url} className="inline-flex items-center gap-1.5 text-sm text-signal">
                    GitHub <ArrowUpRight size={14} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <CtaBanner title="Have something in mind?" subtitle="I'm open to freelance, internships and full-time roles." />
    </>
  );
}
