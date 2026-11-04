"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { partLanguage } from "../language";
import { formatPostDate } from "./post-date";
// Type-only, so it is erased from the client bundle: `posts.ts` reads the file
// system and must not run here.
import type { Post } from "./posts";

export type PostEntry = Pick<Post, "name" | "title" | "date" | "summary">;

/**
 * The blog list: the posts, newest first, on a cyan timeline like Journey's.
 * Titles and summaries are English only; the intro and dates follow the
 * visitor's language and mark it in `lang`.
 */
export default function BlogListPage({ posts }: { posts: PostEntry[] }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? "en";
  const lang = partLanguage(language);

  return (
    <main className="blog-main">
      {/* The navigation already names the page, so the heading is for
          assistive technology only. */}
      <h1 className="blog-sr-only" lang={lang}>
        {t("nav.blog")}
      </h1>
      <p className="blog-intro" lang={lang}>
        {t("blog.intro")}
      </p>
      <ol className="blog-timeline">
        {posts.map((post) => (
          <li key={post.name} className="blog-entry">
            <h2 className="blog-entry-title">
              <Link href={`/blog/${post.name}/`}>{post.title}</Link>
            </h2>
            <time className="blog-entry-date" dateTime={post.date} lang={lang}>
              {formatPostDate(post.date, language)}
            </time>
            <span className="blog-entry-dot" aria-hidden="true" />
            <p className="blog-entry-summary">{post.summary}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
