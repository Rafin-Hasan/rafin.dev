import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex grow flex-col items-center justify-center gap-7 py-28 text-center">
      <div className="font-mono text-[clamp(6rem,18vw,10rem)] leading-none font-medium tracking-[-0.06em]">
        4<span className="text-signal">0</span>4
      </div>
      <h1 className="m-0 text-[clamp(2rem,5vw,2.75rem)] font-semibold tracking-[-0.04em]">
        This page <span className="accent-serif">wandered off.</span>
      </h1>
      <div className="card rounded-xl px-5 py-3.5 font-mono text-sm text-muted">
        $ cd /this-page <span className="text-error">→ no such file or directory</span>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Back to home</Link>
        <Link href="/projects" className="btn btn-secondary">See my work</Link>
      </div>
    </section>
  );
}
