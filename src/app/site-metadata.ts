import type { Metadata } from "next";
import english from "@/locales/en/translation.json";

const siteName = "Shuzhao Feng";
const title = english["layout.title"];
const description = english["layout.description"];
const image = {
  url: "/profile_picture.jpg",
  width: 1400,
  height: 1000,
  type: "image/jpeg",
  alt: "Portrait of Shuzhao Feng",
};

export const sharedMetadata: Metadata = {
  metadataBase: new URL("https://shuzhaofeng.github.io"),
  title,
  description,
  openGraph: {
    type: "website",
    siteName,
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [image],
  },
};

export function contentRouteMetadata(path: string): Metadata {
  return {
    alternates: { canonical: path },
    // Route metadata replaces this object, so carry forward every shared field.
    openGraph: { ...sharedMetadata.openGraph, url: path },
  };
}

type PageIdentity = {
  /** The page's own path, such as `/blog/`; it becomes the canonical URL and `og:url`. */
  path: string;
  title: string;
  description: string;
};

// Route metadata replaces the shared `openGraph` and `twitter` objects rather
// than merging them, so a page with its own title rebuilds both with its own
// title and description and the shared local portrait (ADR 0001); otherwise
// its link preview would keep the site's title.
function pageMetadata(
  { path, title, description }: PageIdentity,
  openGraphType: { type: "website" } | { type: "article"; publishedTime: string },
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphType,
      siteName,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}

/** Metadata for a page with its own title and description, such as `/blog/`. */
export function ownPageMetadata(page: PageIdentity): Metadata {
  return pageMetadata(page, { type: "website" });
}

/**
 * Metadata for an article, such as a blog post: `og:type` `article` with its
 * publication date. A `YYYY-MM-DD` date is valid ISO 8601, as
 * `article:published_time` asks.
 */
export function articleMetadata({ publishedTime, ...page }: PageIdentity & { publishedTime: string }): Metadata {
  return pageMetadata(page, { type: "article", publishedTime });
}
