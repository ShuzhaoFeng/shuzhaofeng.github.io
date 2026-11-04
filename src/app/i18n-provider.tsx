"use client";
import "../i18n";
import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

type MetadataKeys = { title: string; description: string };

const siteKeys: MetadataKeys = { title: "layout.title", description: "layout.description" };
const blogKeys: MetadataKeys = { title: "blog.metaTitle", description: "blog.metaDescription" };

/**
 * The translation keys of the shown page's own title and description, or
 * `null` on a blog post: posts are English only, so a post keeps the English
 * title and summary its exported head holds. Matching the published post
 * names, not just the `/blog/` prefix, keeps the site's translated metadata
 * on 404 pages under `/blog/`, including `/blog/` itself when there is no post.
 */
function metadataKeys(pathname: string, postNames: readonly string[]): MetadataKeys | null {
  // Under `trailingSlash: true` the pathname may or may not end in a slash.
  const path = pathname.replace(/\/+$/, "");
  if (path === "/blog") return postNames.length > 0 ? blogKeys : siteKeys;
  if (postNames.some((name) => path === `/blog/${name}`)) return null;
  return siteKeys;
}

export default function I18nProvider({
  children,
  postNames,
}: {
  children: ReactNode;
  /** The published posts' names, read from `content/blog/` at build time. */
  postNames: readonly string[];
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage before rendering
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage).then(() => {
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const synchronizeMetadata = () => {
      // The sync is set up once per load, so each run reads the page shown
      // now: in-page navigation changes the page without setting it up again.
      const keys = metadataKeys(window.location.pathname, postNames);
      if (!keys) return;
      const title = i18n.t(keys.title);
      const description = i18n.t(keys.description);
      if (document.title !== title) document.title = title;

      // Reuse the exported tags so route and image identity remain server-owned.
      const fields = [
        ['meta[name="description"]', description],
        ['meta[property="og:title"]', title],
        ['meta[property="og:description"]', description],
        ['meta[name="twitter:title"]', title],
        ['meta[name="twitter:description"]', description],
      ];
      for (const [selector, content] of fields) {
        const tags = document.head.querySelectorAll(selector);
        const tag = tags.item(tags.length - 1);
        // Hydration may insert its own tag after the server tag was translated.
        for (const previous of Array.from(tags).slice(0, -1)) previous.remove();
        if (tag && tag.getAttribute("content") !== content) {
          tag.setAttribute("content", content);
        }
      }
    };

    synchronizeMetadata();
    i18n.on("languageChanged", synchronizeMetadata);

    // React can finish hydrating server metadata after saved-language restoration.
    const observer = new MutationObserver(synchronizeMetadata);
    observer.observe(document.head, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["content"],
    });
    return () => {
      i18n.off("languageChanged", synchronizeMetadata);
      observer.disconnect();
    };
  }, [isLoaded, postNames]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800" />
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
