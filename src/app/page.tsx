"use client";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";
import Profile from "./components/Profile";
import { useTranslation, Trans } from "react-i18next";
import { TimelineEntry, ResearchPaper, ProjectCard } from "./components";
import { timelineEntries } from "./data/timelineData";
import { researchPapers } from "./data/researchData";
import { projects } from "./data/projectData";
import { MoreHorizontal, Plus } from "lucide-react";

type PageType = "home" | "journey" | "research" | "projects";

// The home page's inline section links. An underline's appearance and a ring's
// cannot ease as such, so both are always drawn and fade in by colour: the
// underline from transparent to the text colour on hover, the focus ring from
// transparent to cyan on focus.
const inlineLinkClass =
  "text-cyan-400 underline decoration-transparent hover:decoration-current ring-2 ring-transparent focus:outline-none focus:ring-cyan-400 transition-[text-decoration-color,box-shadow] bg-transparent border-none cursor-pointer";

// Extend Window interface to include navigateToPage
declare global {
  interface Window {
    navigateToPage?: (page: PageType) => void;
  }
}

export default function RootPage() {
  const [views, setViews] = useState<SectionView[]>([
    { id: 0, page: "home", entering: false, retiring: false },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const activePage = useRef<PageType>("home");
  const nextId = useRef(1);
  const stage = useRef<HTMLDivElement>(null);
  const transferFocus = useRef(false);
  const [stageHeight, setStageHeight] = useState<number>();
  const activeView = views.find((view) => !view.retiring)!;

  useEffect(() => {
    // Load saved page from localStorage before rendering
    const savedPage = localStorage.getItem("currentPage") as PageType;
    if (savedPage) {
      activePage.current = savedPage;
      setViews([{ id: 0, page: savedPage, entering: false, retiring: false }]);
    }
    setIsLoaded(true);
  }, []);

  const handlePageChange = useCallback((page: PageType) => {
    if (activePage.current === page) return;
    const departing = stage.current?.querySelector<HTMLElement>(
      ".section-view:not(.section-exit)",
    );
    const appearance = departing ? getComputedStyle(departing) : undefined;
    // Interrupt an entrance at its rendered appearance, rather than flashing
    // back to full opacity or dropping its unfinished translation.
    const exitAppearance = appearance && {
      opacity: appearance.opacity,
      transform: appearance.transform,
    };
    activePage.current = page;
    transferFocus.current = !!stage.current?.contains(document.activeElement);
    const id = nextId.current++;
    setViews((previous) => [
      ...previous.map((view) =>
        view.retiring ? view : { ...view, retiring: true, exitAppearance },
      ),
      { id, page, entering: true, retiring: false },
    ]);
    localStorage.setItem("currentPage", page);
  }, []);

  const removeView = useCallback((id: number) => {
    setViews((previous) =>
      previous.filter((view) => view.id !== id || !view.retiring),
    );
  }, []);

  useLayoutEffect(() => {
    if (!isLoaded) return;
    const element = stage.current?.querySelector<HTMLElement>(
      `[data-section-instance="${activeView.id}"]`,
    );
    if (!element) return;
    // Measure the live incoming view, including abstract and language changes.
    // Retiring views may overflow this smoothly resizing area without clipping.
    const measure = () => setStageHeight(element.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    if (transferFocus.current) {
      transferFocus.current = false;
      element.focus({ preventScroll: true });
    }
    return () => observer.disconnect();
  }, [activeView.id, isLoaded]);

  // Make handlePageChange available globally for NavBar
  useEffect(() => {
    window.navigateToPage = handlePageChange;
    return () => {
      if (window.navigateToPage === handlePageChange) delete window.navigateToPage;
    };
  }, [handlePageChange]);

  if (!isLoaded) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800" />
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      <div
        ref={stage}
        className={`section-stage ${views.some((view) => view.retiring) ? "section-stage-switching" : ""}`}
        style={{ height: stageHeight }}
      >
        {views.map((view) => (
          <SectionLayer key={view.id} view={view} onExit={removeView}>
            <SectionContent
              currentPage={view.page}
              handlePageChange={handlePageChange}
            />
          </SectionLayer>
        ))}
      </div>
    </main>
  );
}

type SectionView = {
  id: number;
  page: PageType;
  entering: boolean;
  retiring: boolean;
  exitAppearance?: { opacity: string; transform: string };
};

function SectionLayer({
  view,
  onExit,
  children,
}: {
  view: SectionView;
  onExit: (id: number) => void;
  children: ReactNode;
}) {
  const layer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!view.retiring || !layer.current) return;
    const element = layer.current;
    let disposed = false;
    const finish = () => {
      if (!disposed) onExit(view.id);
    };
    const onAnimationFinished = (event: AnimationEvent) => {
      // Child animations and a cancelled entrance do not finish this exit.
      if (event.target === element && event.animationName === "section-exit") {
        finish();
      }
    };
    element.addEventListener("animationend", onAnimationFinished);
    element.addEventListener("animationcancel", onAnimationFinished);
    const style = getComputedStyle(element);
    // Animation.finished also rejects on direct browser cancellation and when
    // CSS disables an exit; those cases need not emit a CSS animationcancel.
    // Observe only this layer's exit, never its interrupted entrance or children.
    const exit = element.getAnimations().find(
      (animation) =>
        "animationName" in animation &&
        animation.animationName === "section-exit",
    );
    if (exit) void exit.finished.then(finish, finish);
    const exitIndex = style.animationName.split(", ").indexOf("section-exit");
    const durations = style.animationDuration.split(", ");
    const delays = style.animationDelay.split(", ");
    const milliseconds = (value: string) =>
      parseFloat(value) * (value.endsWith("ms") ? 1 : 1000);
    // Also expire exits when animations are disabled or events never arrive
    // (for example in a background tab). Each instance owns its own deadline.
    const duration =
      exitIndex < 0
        ? 0
        : Math.max(
            0,
            milliseconds(durations[exitIndex % durations.length]) +
              milliseconds(delays[exitIndex % delays.length]),
          );
    const timeout = window.setTimeout(finish, duration);
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      element.removeEventListener("animationend", onAnimationFinished);
      element.removeEventListener("animationcancel", onAnimationFinished);
    };
  }, [view.id, view.retiring, onExit]);

  return (
    <div
      ref={layer}
      data-section-instance={view.id}
      data-section={view.page}
      className={`section-view w-full flex flex-col items-center ${
        view.retiring ? "section-exit" : view.entering ? "section-enter" : ""
      }`}
      style={
        view.exitAppearance
          ? ({
              "--section-exit-opacity": view.exitAppearance.opacity,
              "--section-exit-transform": view.exitAppearance.transform,
            } as CSSProperties)
          : undefined
      }
      inert={view.retiring}
      aria-hidden={view.retiring || undefined}
      tabIndex={-1}
    >
      {children}
    </div>
  );
}

function SectionContent({
  currentPage,
  handlePageChange,
}: {
  currentPage: PageType;
  handlePageChange: (page: PageType) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
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
                      className={inlineLinkClass}
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
                      className={inlineLinkClass}
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
                      className={inlineLinkClass}
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
    </>
  );
}
