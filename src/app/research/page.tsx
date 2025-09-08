"use client";
import { ResearchPaper } from "../components";
import { useTranslation, Trans } from "react-i18next";
import { researchPapers } from "../data/researchData";

export default function ResearchPage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      {/* Small descriptive message */}
      <div className="w-full max-w-4xl mx-auto mt-4 mb-8">
        <p className="text-center text-lg text-gray-300">
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
        <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600 opacity-60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-400">
              {t("research.comingSoonTitle")}
            </h3>
          </div>
          <p className="text-gray-400 mb-4">
            {t("research.comingSoonDescription")}
          </p>
        </div>
      </div>

      <div className="text-center mt-12 mb-8">
        <p className="text-gray-400 italic">
          <Trans
            i18nKey="research.footnote"
            components={[
              <a
                key="scholar"
                href="https://scholar.google.com/citations?hl=en&authuser=3&user=shY8hM0AAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              />,
            ]}
          />
        </p>
      </div>
    </main>
  );
}
