import Link from "next/link";
import { ArrowRight } from "./Icons";

export function CtaBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="container-page my-28">
      <div className="card flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-14">
        <div className="flex flex-col gap-2">
          <h2 className="m-0 max-w-xl text-3xl leading-tight font-semibold tracking-[-0.035em] md:text-4xl">{title}</h2>
          {subtitle && <p className="text-muted">{subtitle}</p>}
        </div>
        <Link href="/#contact" className="btn btn-primary">
          Get in touch <ArrowRight className="arrow" />
        </Link>
      </div>
    </section>
  );
}
