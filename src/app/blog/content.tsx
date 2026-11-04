"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { partLanguage } from "../language";
import { recordBlogWhileShown } from "../section-memory";
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

  // Viewing the list, including a Back or Forward that the browser restores
  // from its cache, records Blog as the last section viewed, so the next visit
  // to `/` reopens it (root-page.tsx).
  useEffect(recordBlogWhileShown, []);

  return (
    <main className="blog-main">
      {/* The content, not the page background, plays the section entrance
          on each arrival (globals.css). */}
      <div className="blog-enter">
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
      </div>
    </main>
  );
}
