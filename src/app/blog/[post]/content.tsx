"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { partLanguage } from "../../language";
import { formatPostDate } from "../post-date";
// Type-only, so it is erased from the client bundle: `posts.ts` reads the file
// system and must not run here.
import type { Post } from "../posts";

/**
 * One post in a centred reading column. The title and body are English only;
 * "All posts" and the date follow the visitor's language and mark it in
 * `lang`.
 */
export default function PostPage({ post }: { post: Post }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? "en";
  const lang = partLanguage(language);

  const backLink = (
    <Link className="post-back" href="/blog/" lang={lang}>
      <ArrowLeft aria-hidden="true" />
      {t("blog.allPosts")}
    </Link>
  );

  return (
    <main className="blog-main">
      <article className="post">
        {backLink}
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <time className="post-date" dateTime={post.date} lang={lang}>
            {formatPostDate(post.date, language)}
          </time>
        </header>
        {/* Converted at build time from the owner's own Markdown file in the
            repository, so it is trusted HTML. */}
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer className="post-footer">{backLink}</footer>
      </article>
    </main>
  );
}
