"use client";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";
import { useTranslation, Trans } from "react-i18next";
import { TimelineEntry, ResearchPaper, ProjectCard } from "./components";
import { timelineEntries } from "./data/timelineData";
import { researchPapers } from "./data/researchData";
import { projects } from "./data/projectData";
import { MoreHorizontal, Plus } from "lucide-react";

type PageType = "home" | "journey" | "research" | "projects";

// Extend Window interface to include navigateToPage
declare global {
  interface Window {
    navigateToPage?: (page: PageType) => void;
  }
}

export default function RootPage() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load saved page from localStorage before rendering
    const savedPage = localStorage.getItem("currentPage") as PageType;
    if (savedPage) {
      setCurrentPage(savedPage);
    }
    setIsLoaded(true);
  }, []);

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
  };

  // Make handlePageChange available globally for NavBar
  useEffect(() => {
    window.navigateToPage = handlePageChange;
  }, [handlePageChange]);

  if (!isLoaded) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800" />
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      {currentPage === "home" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl gap-8 py-8">
            <div className="flex items-center justify-center order-1 lg:order-1">
              <Profile />
            </div>
            <div className="flex flex-col justify-center gap-6 order-2 lg:order-2 px-2 sm:px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 shiny-text text-center lg:text-left whitespace-nowrap">
                {t("main.hello")}
              </h1>
              <div className="space-y-4 text-base sm:text-lg">
                <p>{t("main.intro")}</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-3xl mt-8 space-y-4 px-2 sm:px-4">
            <p className="text-center text-lg sm:text-xl">
              <Trans
                i18nKey="main.visitJourney"
                components={[
                  <button
                    key="journey"
                    onClick={() => handlePageChange("journey")}
                    className="text-cyan-400 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-transparent border-none cursor-pointer"
                  />,
                ]}
              />
            </p>
            <p className="text-center text-lg sm:text-xl">
              <Trans
                i18nKey="main.visitResearch"
                components={[
                  <button
                    key="research"
                    onClick={() => handlePageChange("research")}
                    className="text-cyan-400 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-transparent border-none cursor-pointer"
                  />,
                ]}
              />
            </p>
            <p className="text-center text-lg sm:text-xl">
              <Trans
                i18nKey="main.visitProjects"
                components={[
                  <button
                    key="projects"
                    onClick={() => handlePageChange("projects")}
                    className="text-cyan-400 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-transparent border-none cursor-pointer"
                  />,
                ]}
              />
            </p>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-400 italic">{t("main.footnote")}</p>
          </div>
        </>
      )}

      {currentPage === "journey" && (
        <section className="w-full max-w-2xl mx-auto mt-4">
          <ol className="relative border-l border-cyan-500">
            {timelineEntries.map((entry, index) => (
              <TimelineEntry
                key={index}
                icon={entry.icon}
                description={entry.description}
              />
            ))}
            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full -left-4 ring-4 ring-gray-900">
                <MoreHorizontal
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="mb-4 text-base font-normal text-gray-500 italic">
                {t("journey.toBeContinued")}
              </p>
            </li>
          </ol>
        </section>
      )}

      {currentPage === "research" && (
        <>
          <div className="w-full max-w-4xl mx-auto mt-4 mb-8">
            <p className="text-center text-lg text-gray-300">
              {t("research.intro")}
            </p>
          </div>
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
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600 opacity-60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-400" aria-hidden="true" />
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
        </>
      )}

      {currentPage === "projects" && (
        <>
          <div className="w-full max-w-4xl mx-auto mt-4 mb-8">
            <p className="text-center text-lg text-gray-300">
              {t("projects.intro")}
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  title={p.title}
                  description={p.description}
                  features={p.features}
                  githubUrl={p.githubUrl}
                  icon={p.icon}
                  iconColor={p.iconColor}
                  techStack={p.techStack}
                />
              ))}
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600 opacity-60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                    <MoreHorizontal
                      className="w-6 h-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400">
                    {t("projects.comingSoonTitle")}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4">
                  {t("projects.comingSoonDescription")}
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-400 italic">
                <Trans
                  i18nKey="projects.footnote"
                  components={[
                    <a
                      key="github"
                      href="https://github.com/ShuzhaoFeng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    />,
                  ]}
                />
              </p>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .shiny-text {
          background: linear-gradient(90deg, #fff 0%, #b3b3b3 50%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          filter: drop-shadow(0 2px 8px #000a);
        }
      `}</style>
    </main>
  );
}
