import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListPage from "./content";
import { getAllPosts } from "./posts";
import { ownPageMetadata } from "../site-metadata";
import english from "@/locales/en/translation.json";

// The exported head is English, as the site's shared metadata is; the browser
// writes the visitor's language over it (`i18n-provider.tsx`).
export function generateMetadata(): Metadata {
  // With no post `Page` makes `/blog/` the 404, which keeps the shared
  // metadata rather than claiming a canonical blog page.
  if (getAllPosts().length === 0) return {};
  return ownPageMetadata({
    path: "/blog/",
    title: english["blog.metaTitle"],
    description: english["blog.metaDescription"],
  });
}

export default function Page() {
  const posts = getAllPosts();
  // With no post the blog stays hidden, as empty sections do: `/blog/` is
  // exported as the site's 404 page.
  if (posts.length === 0) notFound();

  // Only what the list shows crosses to the client; each post's HTML stays
  // on its own page.
  return (
    <BlogListPage
      posts={posts.map(({ name, title, date, summary }) => ({ name, title, date, summary }))}
    />
  );
}
