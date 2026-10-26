"use client";

import { useTranslation } from "react-i18next";
import { writeSectionMemory } from "./section-memory";

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === "zh" ? "zh-Hans" : i18n.resolvedLanguage;

  return (
    <main className="not-found">
      <section className="not-found-message" lang={language} aria-labelledby="not-found-title">
        <p className="not-found-code">404</p>
        <h1 id="not-found-title">{t("notFound.title")}</h1>
        <p className="not-found-description">{t("notFound.description")}</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Reload the root so it restores the selected Home section. */}
        <a
          className="not-found-home"
          href="/"
          onClick={() => writeSectionMemory("home")}
        >
          {t("notFound.home")}
        </a>
      </section>
    </main>
  );
}
