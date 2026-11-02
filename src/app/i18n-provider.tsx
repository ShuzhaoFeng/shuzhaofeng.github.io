"use client";
import "../i18n";
import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
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
      const title = i18n.t("layout.title");
      const description = i18n.t("layout.description");
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
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800" />
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
