// Blog posts. Each post body is a list of blocks, rendered by components/PostBody.tsx.

export type Block =
  | { type: "p"; text: string; lead?: string }
  | { type: "h2"; id: string; text: string }
  | { type: "code"; file: string; code: string }
  | { type: "note"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO, e.g. "2026-09-01"
  readTime: string;
  tags: string[];
  body: Block[];
};

const placeholderBody: Block[] = [
  { type: "p", lead: "[Opening paragraph that sets up the problem and why it was interesting.]", text: "[Continue with context the reader needs before the technical part.]" },
  { type: "h2", id: "approach", text: "The approach" },
  { type: "p", text: "[Explain the solution in plain language before showing code.]" },
  {
    type: "code",
    file: "app/actions.ts",
    code: `"use server";

export async function updateTask(id: string, data: TaskInput) {
  const task = await db.task.update({ where: { id }, data });
  revalidateTag("tasks");
  return task;
}`,
  },
  { type: "note", text: "[Callout for a tip, gotcha or aside.]" },
  { type: "h2", id: "what-went-wrong", text: "What went wrong" },
  { type: "p", text: "[The honest part — the bug, the wrong assumption, the rewrite.]" },
  { type: "quote", text: "[A pull quote — the one line you want people to remember.]" },
  { type: "h2", id: "takeaways", text: "Takeaways" },
  { type: "list", items: ["[Takeaway one]", "[Takeaway two]", "[Takeaway three]"] },
];

export const posts: Post[] = [
  { slug: "real-time-sync", title: "[Post title — e.g. How I built real-time sync with Next.js and Postgres]", excerpt: "[Two-line excerpt that makes someone want to keep reading.]", date: "2026-09-01", readTime: "[N] min read", tags: ["Next.js", "Build log"], body: placeholderBody },
  { slug: "post-two", title: "[Post title]", excerpt: "[One-line excerpt.]", date: "2026-08-12", readTime: "[N] min read", tags: ["TypeScript"], body: placeholderBody },
  { slug: "post-three", title: "[Post title]", excerpt: "[One-line excerpt.]", date: "2026-07-20", readTime: "[N] min read", tags: ["Career"], body: placeholderBody },
  { slug: "post-four", title: "[Post title]", excerpt: "[One-line excerpt.]", date: "2026-06-30", readTime: "[N] min read", tags: ["Build log"], body: placeholderBody },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
