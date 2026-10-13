"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ArrowUpRight, Check, Copy, FileText, GitHub, LinkedIn } from "./Icons";

const LINKS = [
  { icon: GitHub, label: "GitHub", meta: site.socials.github.handle, href: site.socials.github.url },
  { icon: LinkedIn, label: "LinkedIn", meta: site.socials.linkedin.handle, href: site.socials.linkedin.url },
  { icon: FileText, label: "Résumé", meta: "PDF", href: site.resumeUrl },
];

const londonTime = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" }).format(new Date());

/** Copy-email button with a toast, quick links and a live London clock. */
export function ContactConsole() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string | null>(null); // null until mounted, so server and client HTML match

  useEffect(() => {
    setTime(londonTime());
    const id = setInterval(() => setTime(londonTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (permissions, insecure context): open a draft instead.
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={copy}
        className="card card-hover group flex items-center justify-between gap-3 rounded-[14px] py-4 pr-4 pl-5 text-left"
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="font-mono text-[11px] tracking-[0.06em] text-subtle uppercase">Click to copy</span>
          <span className="truncate font-mono text-[15px] text-text sm:text-base">{site.email}</span>
        </span>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-line-strong bg-raised transition-colors group-hover:border-signal-line">
          {copied ? <Check className="text-signal" /> : <Copy />}
        </span>
      </button>

      <ul className="flex flex-col border-t border-line">
        {LINKS.map(({ icon: Icon, label, meta, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex h-14 items-center gap-3.5 border-b border-line text-text transition-all duration-300 hover:pl-2.5 hover:text-signal"
            >
              <Icon size={20} />
              <span className="grow">{label}</span>
              <span className="font-mono text-[13px] text-subtle">{meta}</span>
              <ArrowUpRight size={16} className="text-subtle transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-signal" />
            </a>
          </li>
        ))}
      </ul>

      <div className="card flex items-center justify-between gap-4 rounded-[14px] px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[11px] tracking-[0.06em] text-subtle uppercase">Local time · London</span>
          <span className="font-mono text-lg text-text tabular-nums">{time ?? "--:--:--"}</span>
        </div>
        {site.available && (
          <span className="inline-flex items-center gap-2 rounded-full border border-signal-line bg-signal-soft px-3 py-1.5 text-[13px]">
            <span className="ping-dot size-2" /> Available
          </span>
        )}
      </div>

      <div
        role="status"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full border border-signal-line bg-surface px-4 py-2.5 text-sm shadow-2xl transition-all duration-300 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {copied && <><Check size={16} className="text-signal" /> Email copied to clipboard</>}
      </div>
    </div>
  );
}
