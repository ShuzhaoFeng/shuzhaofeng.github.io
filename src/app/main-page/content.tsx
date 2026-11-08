"use client";
import Profile from "../components/Profile";
import { useTranslation, Trans } from "react-i18next";

export default function MainPage() {
  const { t } = useTranslation();
  return (
    <>
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center site-page text-site-ink px-2 sm:px-4">
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
                <a
                  key="journey"
                  href="/journey"
                  className="text-site-accent hover:underline focus:outline-none focus:ring-2 focus:ring-site-accent"
                />,
              ]}
            />
          </p>
          <p className="text-center text-lg sm:text-xl">
            <Trans
              i18nKey="main.visitResearch"
              components={[
                <a
                  key="research"
                  href="/research"
                  className="text-site-accent hover:underline focus:outline-none focus:ring-2 focus:ring-site-accent"
                />,
              ]}
            />
          </p>
          <p className="text-center text-lg sm:text-xl">
            <Trans
              i18nKey="main.visitProjects"
              components={[
                <a
                  key="projects"
                  href="/projects"
                  className="text-site-accent hover:underline focus:outline-none focus:ring-2 focus:ring-site-accent"
                />,
              ]}
            />
          </p>
        </div>
        <div className="text-center mt-12 pb-20">
          <p className="text-site-muted italic">{t("main.footnote")}</p>
        </div>
        <style jsx>{`
          .shiny-text {
            background: var(--site-heading-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            filter: var(--site-heading-shadow);
          }
        `}</style>
      </main>
    </>
  );
}
