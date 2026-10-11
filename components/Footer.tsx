import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUp } from "./Icons";

const columns = [
  {
    title: "Site",
    links: [
      { label: "Work", href: "/projects" },
      { label: "About", href: "/about" },
      { label: "Writing", href: "/writing" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: site.socials.github.url },
      { label: "LinkedIn", href: site.socials.linkedin.url },
      { label: "Email", href: `mailto:${site.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/8 bg-ink/55 backdrop-blur-md">
      <div className="container-page flex flex-col gap-10 pt-12 pb-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-2">
            <Link href="/" className="font-mono text-[17px] text-text">
              rafin<span className="text-signal">.</span>dev
            </Link>
            <p className="text-sm text-subtle">Full-stack developer building fast, thoughtful web apps.</p>
          </div>
          <div className="flex gap-18 text-sm">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-[0.06em] text-subtle uppercase">{col.title}</span>
                {col.links.map((l) =>
                  l.href.startsWith("/") ? (
                    <Link key={l.label} href={l.href} className="text-muted transition-colors hover:text-text">{l.label}</Link>
                  ) : (
                    <a key={l.label} href={l.href} className="text-muted transition-colors hover:text-text">{l.label}</a>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 text-[13px] text-subtle sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name} · Built with Next.js, TypeScript &amp; Motion</span>
          <a href="#top" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
