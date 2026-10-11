"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { nav, site } from "@/content/site";
import { Close, Menu } from "./Icons";

const isActive = (href: string, path: string) =>
  href === "/" ? path === "/" : !href.includes("#") && path.startsWith(href);

function Logo() {
  return (
    <Link href="/" className="font-mono text-[17px] font-medium text-text">
      rafin<span className="text-signal">.</span>dev
    </Link>
  );
}

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="animate-drop sticky top-0 z-50 border-b border-line bg-surface/70 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between lg:h-18">
        <Logo />

        <nav aria-label="Main" className="hidden gap-1 rounded-full border border-line bg-surface/60 p-1 md:flex">
          {nav.map((item) => {
            const active = isActive(item.href, path);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active ? "text-text" : "text-muted hover:text-text"}`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[#1f2024]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={site.resumeUrl} className="btn btn-secondary btn-sm">Résumé</a>
          <Link href="/#contact" className="btn btn-primary btn-sm">Let&apos;s talk</Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="glass flex size-11 items-center justify-center rounded-xl border border-line-strong md:hidden"
        >
          {open ? <Close size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-page flex h-[calc(100dvh-4rem)] flex-col gap-1 border-t border-line bg-ink/95 pt-6 pb-8 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`border-b border-line py-4 text-2xl font-semibold tracking-tight ${isActive(item.href, path) ? "text-signal" : "text-text"}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-auto flex gap-3">
            <a href={site.resumeUrl} className="btn btn-secondary flex-1">Résumé</a>
            <Link href="/#contact" onClick={() => setOpen(false)} className="btn btn-primary flex-1">Let&apos;s talk</Link>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
