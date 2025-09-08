"use client";
import { ProjectCard } from "../components";
import { useTranslation, Trans } from "react-i18next";
import { projects } from "../data/projectData";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      {/* Small descriptive message */}
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

          {/* Placeholder for future projects */}
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600 opacity-60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="4" cy="10" r="2" />
                  <circle cx="10" cy="10" r="2" />
                  <circle cx="16" cy="10" r="2" />
                </svg>
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
    </main>
  );
}
