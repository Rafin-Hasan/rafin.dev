import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PostList } from "@/components/PostList";
import { formatDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Write-ups on what I'm building, what broke, and what I learned fixing it.",
};

export default function WritingPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const items = sorted.map(({ body: _, ...p }) => ({ ...p, date: formatDate(p.date) }));

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes from the"
        accent="build."
        intro="Write-ups on what I'm building, what broke, and what I learned fixing it."
      />
      <PostList posts={items} />
    </>
  );
}
