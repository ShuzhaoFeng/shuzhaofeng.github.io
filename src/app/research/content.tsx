"use client";
import { ResearchPaper } from "../components";
import { useTranslation, Trans } from "react-i18next";
import { researchPapers } from "../data/researchData";
import { Plus } from "lucide-react";

export default function ResearchPage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center site-page text-site-ink px-2 sm:px-4">
      {/* Small descriptive message */}
      <div className="w-full max-w-4xl mx-auto mt-4 mb-8">
        <p className="text-center text-lg text-site-soft">
          {t("research.intro")}
        </p>
      </div>

      {/* Research Papers */}
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {researchPapers.map((p) => (
          <ResearchPaper
            key={p.id}
            title={p.title}
            image={p.image}
            imageAlt={p.imageAlt}
            authors={p.authors}
            venue={p.venue}
            year={p.year}
            abstract={p.abstract}
            paperUrl={p.paperUrl}
            pdfFile={p.pdfFile}
            pdfUrl={p.pdfUrl}
            slidesFile={p.slidesFile}
            slidesUrl={p.slidesUrl}
            recordingUrl={p.recordingUrl}
          />
        ))}

        {/* Coming Soon Card */}
        <div className="bg-site-card rounded-lg p-6 border border-site-border-strong site-placeholder">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-site-placeholder-icon rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-site-muted" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-site-muted">
              {t("research.comingSoonTitle")}
            </h3>
          </div>
          <p className="text-site-muted mb-4">
            {t("research.comingSoonDescription")}
          </p>
        </div>
      </div>

      <div className="text-center mt-12 mb-8">
        <p className="text-site-muted italic">
          <Trans
            i18nKey="research.footnote"
            components={[
              <a
                key="scholar"
                href="https://scholar.google.com/citations?hl=en&authuser=3&user=shY8hM0AAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-site-link-contrast hover:text-site-link-contrast-hover transition-colors"
              />,
            ]}
          />
        </p>
      </div>
    </main>
  );
}
