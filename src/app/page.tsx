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

type SectionView = {
  id: number;
  page: PageType;
  phase: "settled" | "exit" | "enter";
  exitOpacity?: string;
  exitNavHeight?: number;
};

export default function RootPage() {
  const [view, setView] = useState<SectionView>({
    id: 0, page: "home", phase: "settled",
  });
  const currentView = useRef(view);
  const [isLoaded, setIsLoaded] = useState(false);
  const destination = useRef<PageType>("home");
  const nextId = useRef(1);
  const stage = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const transferFocus = useRef(false);
  const replaceView = useCallback((next: SectionView) => {
    currentView.current = next;
    setView(next);
  }, []);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage") as PageType;
    if (savedPage) {
      destination.current = savedPage;
      replaceView({ id: 0, page: savedPage, phase: "settled" });
    }
    setIsLoaded(true);
  }, [replaceView]);

  const handlePageChange = useCallback((page: PageType) => {
    if (destination.current === page) return;
    destination.current = page;
    localStorage.setItem("currentPage", page);
    const previous = currentView.current;
    // During exit only the destination changes. No intermediate page mounts,
    // even when the visitor returns to the outgoing page before it disappears.
    if (previous.phase === "exit") return;
    if (stage.current?.contains(document.activeElement)) {
      main.current?.focus({ preventScroll: true });
      transferFocus.current = true;
    }
    const element = stage.current?.querySelector(".section-view");
    replaceView({
      ...previous,
      phase: "exit",
      // An interrupted entrance leaves from its actual opacity without a flash.
      exitOpacity: element ? getComputedStyle(element).opacity : "1",
      exitNavHeight: main.current?.previousElementSibling?.getBoundingClientRect().height,
    });
  }, [replaceView]);

  useLayoutEffect(() => {
    const element = main.current;
    const nav = element?.previousElementSibling;
    if (view.phase !== "exit" || view.exitNavHeight === undefined || !element || !nav) return;
    const navHeight = view.exitNavHeight;
    // Closing the mobile menu removes flow height above main. Keep that space
    // below the navbar until the outgoing section is empty, without delaying
    // the menu's own collapse or changing the centered content area's height.
    const preserveSpace = () => {
      const space = Math.max(0, navHeight - nav.getBoundingClientRect().height);
      element.style.setProperty("--section-nav-space", `${space}px`);
    };
    preserveSpace();
    const observer = new ResizeObserver(preserveSpace);
    observer.observe(nav);
    return () => {
      observer.disconnect();
      element.style.removeProperty("--section-nav-space");
    };
  }, [view.id, view.phase, view.exitNavHeight]);

  const onPhaseEnd = useCallback((id: number, phase: SectionView["phase"]) => {
    const previous = currentView.current;
    if (previous.id !== id || previous.phase !== phase) return;
    if (phase === "exit") {
      // The outgoing instance is empty now. The new instance's natural height
      // establishes its centered position before its first visible frame.
      replaceView({ id: nextId.current++, page: destination.current, phase: "enter" });
    } else if (phase === "enter") {
      replaceView({ ...previous, phase: "settled" });
    }
  }, [replaceView]);

  const onVisible = useCallback((element: HTMLDivElement) => {
    if (transferFocus.current && document.activeElement === main.current) {
      element.focus({ preventScroll: true });
    }
    transferFocus.current = false;
  }, []);

  useEffect(() => {
    // A later visitor action cancels the focus handoff, including a click on
    // something that does not itself receive focus. Navigation keeps its focus.
    const cancelTransfer = () => { transferFocus.current = false; };
    document.addEventListener("pointerdown", cancelTransfer, true);
    document.addEventListener("keydown", cancelTransfer, true);
    window.navigateToPage = handlePageChange;
    return () => {
      document.removeEventListener("pointerdown", cancelTransfer, true);
      document.removeEventListener("keydown", cancelTransfer, true);
      if (window.navigateToPage === handlePageChange) delete window.navigateToPage;
    };
  }, [handlePageChange]);

  if (!isLoaded) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800" />
    );
  }

  return (
    <main ref={main} tabIndex={-1} className="section-main flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      <div ref={stage} className="section-stage">
        <SectionLayer key={view.id} view={view} onPhaseEnd={onPhaseEnd} onVisible={onVisible}>
          <SectionContent currentPage={view.page} handlePageChange={handlePageChange} />
        </SectionLayer>
      </div>
    </main>
  );
}

function SectionLayer({
  view,
  onPhaseEnd,
  onVisible,
  children,
}: {
  view: SectionView;
  onPhaseEnd: (id: number, phase: SectionView["phase"]) => void;
  onVisible: (element: HTMLDivElement) => void;
  children: ReactNode;
}) {
  const layer = useRef<HTMLDivElement>(null);
  const [entranceVisible, setEntranceVisible] = useState(false);
  const interactive = view.phase === "settled" || (view.phase === "enter" && entranceVisible);

  useLayoutEffect(() => {
    if (view.phase === "settled" || !layer.current) return;
    const element = layer.current;
    const name = `section-${view.phase}`;
    let disposed = false;
    let frame = 0;
    const reveal = () => {
      if (disposed) return;
      if (Number(getComputedStyle(element).opacity) > 0) {
        setEntranceVisible(true);
      } else {
        frame = requestAnimationFrame(reveal);
      }
    };
    if (view.phase === "enter") frame = requestAnimationFrame(reveal);
    const finish = () => {
      if (!disposed) onPhaseEnd(view.id, view.phase);
    };
    const onAnimationFinished = (event: AnimationEvent) => {
      if (event.target === element && event.animationName === name) finish();
    };
    element.addEventListener("animationend", onAnimationFinished);
    element.addEventListener("animationcancel", onAnimationFinished);
    const style = getComputedStyle(element);
    const animation = element.getAnimations().find(
      (candidate) => "animationName" in candidate && candidate.animationName === name,
    );
    if (animation) void animation.finished.then(finish, finish);
    const index = style.animationName.split(", ").indexOf(name);
    const durations = style.animationDuration.split(", ");
    const delays = style.animationDelay.split(", ");
    const milliseconds = (value: string) =>
      parseFloat(value) * (value.endsWith("ms") ? 1 : 1000);
    const duration = index < 0 ? 0 : Math.max(0,
      milliseconds(durations[index % durations.length]) +
      milliseconds(delays[index % delays.length]),
    );
    // An active animation owns its boundary: elapsed wall time can run ahead of
    // rendered playback and must never remove a visibly unfinished section.
    // Absent, disabled, and zero-duration animations still complete explicitly;
    // cancellation completes through the event or the rejected finished promise.
    const timeout = !animation || duration <= 0
      ? window.setTimeout(finish, 0)
      : undefined;
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      if (timeout !== undefined) window.clearTimeout(timeout);
      element.removeEventListener("animationend", onAnimationFinished);
      element.removeEventListener("animationcancel", onAnimationFinished);
    };
  }, [view.id, view.phase, onPhaseEnd]);

  useLayoutEffect(() => {
    // Run only after React has removed inert, so focus never targets a hidden
    // or still inert incoming layer. The root checks for intervening actions.
    if (interactive && layer.current) onVisible(layer.current);
  }, [interactive, onVisible]);

  return (
    <div
      ref={layer}
      data-section-instance={view.id}
      data-section={view.page}
      className={`section-view w-full flex flex-col items-center ${
        view.phase === "settled" ? "" : `section-${view.phase}`
      }`}
      style={view.phase === "exit" ? ({ "--section-exit-opacity": view.exitOpacity } as CSSProperties) : undefined}
      inert={!interactive}
      aria-hidden={!interactive || undefined}
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
