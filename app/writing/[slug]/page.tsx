import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "@/components/Icons";
import { PostBody } from "@/components/PostBody";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { formatDate, getPost, posts } from "@/content/posts";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const index = posts.indexOf(post);
  const prev = posts[index + 1];
  const next = posts[index - 1];
  const toc = [
    { id: "introduction", label: "Introduction" },
    ...post.body.flatMap((b) => (b.type === "h2" ? [{ id: b.id, label: b.text }] : [])),
  ];

  return (
    <>
      <ReadingProgress />

      <header id="introduction" className="container-page flex max-w-[848px] flex-col gap-6 pt-18">
        <Link href="/writing" className="inline-flex items-center gap-1.5 self-start text-sm text-muted hover:text-text">
          <ChevronLeft size={14} /> All writing
        </Link>
        <div className="flex gap-2">
          {post.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        <h1 className="m-0 text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.045em]">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3.5 text-[15px] text-subtle">
          <Image src={site.portrait} alt="" width={40} height={40} className="size-10 rounded-full border border-line-strong object-cover object-top" />
          <span className="text-text">{site.name}</span>·<time dateTime={post.date}>{formatDate(post.date)}</time>·<span>{post.readTime}</span>
        </div>
      </header>

      <div className="container-page mt-14">
        <div className="card placeholder-img flex aspect-[21/9] items-center justify-center rounded-3xl font-mono text-[13px] text-subtle">
          [Cover image · 21:9]
        </div>
      </div>

      <section className="container-page grid gap-20 pt-20 lg:grid-cols-[200px_minmax(0,720px)]">
        <TableOfContents title="Contents" items={toc} />
        <div className="flex flex-col gap-18">
          <PostBody blocks={post.body} />

          <div className="flex flex-col gap-6">
            <div className="card flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center">
              <Image src={site.portrait} alt="" width={64} height={64} className="size-16 shrink-0 rounded-full border border-line-strong object-cover object-top" />
              <div className="flex grow flex-col gap-1">
                <span className="text-[17px] font-semibold">Written by {site.name}</span>
                <span className="text-sm text-muted">Full-stack developer. I write about what I build.</span>
              </div>
              <Link href="/about" className="btn btn-secondary h-11 px-4.5 text-sm">About me</Link>
            </div>

            <nav aria-label="More posts" className="grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link href={`/writing/${prev.slug}`} className="card card-hover flex flex-col gap-1.5 rounded-2xl p-6">
                  <span className="font-mono text-xs text-subtle">← PREVIOUS</span>
                  <span className="text-[17px] font-semibold">{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link href={`/writing/${next.slug}`} className="card card-hover flex flex-col items-end gap-1.5 rounded-2xl p-6 text-right">
                  <span className="font-mono text-xs text-subtle">NEXT →</span>
                  <span className="text-[17px] font-semibold">{next.title}</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </section>
      <div className="pb-28" />
    </>
  );
}
