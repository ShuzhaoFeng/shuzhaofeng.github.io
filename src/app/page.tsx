"use client";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  memo,
  type ReactNode,
  type CSSProperties,
} from "react";
import { flushSync } from "react-dom";
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
  phase: "waiting" | "settled" | "exit" | "enter";
  exitOpacity?: string;
  exitTransform?: string;
};

type SectionFlight = {
  outgoing?: SectionView;
  incoming?: SectionView;
  exitNavHeight?: number;
};

export default function RootPage() {
  const [flight, setFlight] = useState<SectionFlight>({
    incoming: { id: 0, page: "home", phase: "settled" },
  });
  const currentFlight = useRef(flight);
  const [isLoaded, setIsLoaded] = useState(false);
  const destination = useRef<PageType>("home");
  const nextId = useRef(1);
  const stage = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const transferFocus = useRef(false);
  const outgoingId = flight.outgoing?.id;
  const enteringId = flight.incoming?.phase === "waiting" ? undefined : flight.incoming?.id;
  const replaceFlight = useCallback((next: SectionFlight) => {
    currentFlight.current = next;
    setFlight(next);
  }, []);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage") as PageType;
    const page = savedPage || "home";
    destination.current = page;
    replaceFlight({ incoming: { id: 0, page, phase: "enter" } });
    setIsLoaded(true);
  }, [replaceFlight]);

  const beginExit = useCallback((view: SectionView) => {
    const slot = stage.current?.querySelector<HTMLElement>(
      `[data-section-instance="${view.id}"]`,
    );
    const element = slot?.querySelector<HTMLElement>(".section-view");
    const pose = element ? getComputedStyle(element) : undefined;
    if (slot?.contains(document.activeElement)) {
      main.current?.focus({ preventScroll: true });
      transferFocus.current = true;
    }
    if (slot) stage.current?.style.setProperty("--section-reserve-height", `${slot.offsetHeight}px`);
    replaceFlight({
      outgoing: {
        ...view,
        phase: "exit",
        // Interrupted entrances depart from their currently painted pose.
        exitOpacity: pose?.opacity ?? "1",
        exitTransform: pose?.transform ?? "none",
      },
      incoming: { id: nextId.current++, page: destination.current, phase: "waiting" },
      exitNavHeight: main.current?.previousElementSibling?.getBoundingClientRect().height,
    });
  }, [replaceFlight]);

  const handlePageChange = useCallback((page: PageType) => {
    if (destination.current === page) return;
    destination.current = page;
    localStorage.setItem("currentPage", page);
    window.dispatchEvent(new CustomEvent("sectiondestinationchange", { detail: page }));
    const previous = currentFlight.current;
    if (previous.outgoing) {
      if (previous.incoming?.phase === "waiting") {
        replaceFlight({
          ...previous,
          incoming: { id: nextId.current++, page, phase: "waiting" },
        });
      }
      return;
    }
    if (previous.incoming) beginExit(previous.incoming);
  }, [beginExit, replaceFlight]);

  useLayoutEffect(() => {
    const element = stage.current;
    return () => { element?.style.removeProperty("--section-exit-offset"); };
  }, [outgoingId]);

  useLayoutEffect(() => {
    const element = stage.current;
    const nav = main.current?.previousElementSibling;
    const outgoing = flight.outgoing;
    const slot = element?.querySelector<HTMLElement>(
      `[data-section-instance="${outgoing?.id}"]`,
    );
    if (!outgoing || !element || !nav || !slot) {
      element?.style.removeProperty("--section-reserve-height");
      return;
    }
    const navHeight = flight.exitNavHeight ?? nav.getBoundingClientRect().height;
    if (enteringId !== undefined) {
      const restingTop = slot.getBoundingClientRect().top;
      const stageBounds = element.getBoundingClientRect();
      // Hand document height to the invisible incoming layer. The departing
      // layer stays painted at the same viewport position through native clamp.
      slot.style.position = "fixed";
      slot.style.top = `${restingTop}px`;
      slot.style.left = `${stageBounds.left}px`;
      slot.style.width = `${stageBounds.width}px`;
      element.style.removeProperty("--section-reserve-height");
      const scrollingElement = document.scrollingElement;
      const maximumScroll = Math.max(0,
        (scrollingElement?.scrollHeight ?? 0) - document.documentElement.clientHeight,
      );
      const scrollOrigin = Math.min(window.scrollY, maximumScroll);
      const followViewport = () => {
        const bounds = element.getBoundingClientRect();
        const currentMaximum = Math.max(0,
          (scrollingElement?.scrollHeight ?? 0) - document.documentElement.clientHeight,
        );
        const scrollPosition = Math.min(window.scrollY, currentMaximum);
        slot.style.top = `${restingTop - (scrollPosition - scrollOrigin)}px`;
        slot.style.left = `${bounds.left}px`;
        slot.style.width = `${bounds.width}px`;
      };
      const observer = new ResizeObserver(followViewport);
      observer.observe(element);
      window.addEventListener("scroll", followViewport, { passive: true });
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", followViewport);
        slot.style.removeProperty("position");
        slot.style.removeProperty("top");
        slot.style.removeProperty("left");
        slot.style.removeProperty("width");
        element.style.removeProperty("--section-exit-offset");
      };
    }
    const preserveGeometry = () => {
      // Only outgoing content compensates for the closing menu's lost height.
      const offset = navHeight - nav.getBoundingClientRect().height;
      element.style.setProperty("--section-exit-offset", `${offset}px`);
      element.style.setProperty("--section-reserve-height", `${slot.offsetHeight + Math.max(0, offset)}px`);
    };
    preserveGeometry();
    const observer = new ResizeObserver(preserveGeometry);
    observer.observe(nav);
    observer.observe(slot);
    return () => {
      observer.disconnect();
    };
  }, [flight.outgoing, flight.exitNavHeight, enteringId]);

  const onExitOverlap = useCallback((id: number) => {
    const previous = currentFlight.current;
    const incoming = previous.incoming;
    if (previous.outgoing?.id !== id || incoming?.phase !== "waiting") return;
    // Content is already laid out; commit only its entrance at the playback
    // boundary rather than letting concurrent rendering defer that boundary.
    flushSync(() => {
      replaceFlight({
        ...previous,
        incoming: { ...incoming, phase: "enter" },
      });
    });
  }, [replaceFlight]);

  const onPhaseEnd = useCallback((id: number, phase: SectionView["phase"]) => {
    const previous = currentFlight.current;
    if (phase === "exit" && previous.outgoing?.id === id) {
      const incoming = previous.incoming ? {
        ...previous.incoming,
        phase: previous.incoming.phase === "waiting" ? "enter" as const : previous.incoming.phase,
      } : {
        id: nextId.current++, page: destination.current, phase: "enter" as const,
      };
      if (incoming.page !== destination.current) {
        beginExit(incoming);
      } else {
        replaceFlight({ incoming });
      }
    } else if (phase === "enter" && previous.incoming?.id === id && previous.incoming.phase === phase) {
      const incoming = { ...previous.incoming, phase: "settled" as const };
      if (!previous.outgoing && incoming.page !== destination.current) {
        beginExit(incoming);
      } else {
        replaceFlight({ ...previous, incoming });
      }
    }
  }, [replaceFlight, beginExit]);

  const onVisible = useCallback((element: HTMLDivElement) => {
    if (transferFocus.current && document.activeElement === main.current) {
      element.focus({ preventScroll: true });
    }
    transferFocus.current = false;
  }, []);

  useEffect(() => {
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
    <main ref={main} tabIndex={-1} className="section-main bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      <div ref={stage} className="section-stage">
        {[flight.outgoing, flight.incoming].map((view) => view && (
          <SectionLayer key={view.id} view={view} onPhaseEnd={onPhaseEnd} onExitOverlap={onExitOverlap} onVisible={onVisible}>
            <SectionContent currentPage={view.page} handlePageChange={handlePageChange} />
          </SectionLayer>
        ))}
      </div>
    </main>
  );
}

function SectionLayer({
  view,
  onPhaseEnd,
  onExitOverlap,
  onVisible,
  children,
}: {
  view: SectionView;
  onPhaseEnd: (id: number, phase: SectionView["phase"]) => void;
  onExitOverlap: (id: number) => void;
  onVisible: (element: HTMLDivElement) => void;
  children: ReactNode;
}) {
  const layer = useRef<HTMLDivElement>(null);
  const [entranceVisible, setEntranceVisible] = useState(false);
  const interactive = view.phase === "settled" || (view.phase === "enter" && entranceVisible);

  useLayoutEffect(() => {
    if (view.phase === "settled" || view.phase === "waiting" || !layer.current) return;
    const element = layer.current;
    const name = `section-${view.phase}`;
    let disposed = false;
    let completed = false;
    let overlapped = false;
    let frame = 0;
    const finish = () => {
      if (disposed || completed) return;
      completed = true;
      onPhaseEnd(view.id, view.phase);
    };
    const onAnimationFinished = (event: AnimationEvent) => {
      if (event.target === element && event.animationName === name) finish();
    };
    element.addEventListener("animationend", onAnimationFinished);
    element.addEventListener("animationcancel", onAnimationFinished);
    const animation = element.getAnimations().find(
      (candidate) => "animationName" in candidate && candidate.animationName === name,
    );
    const observe = () => {
      if (disposed || completed) return;
      if (view.phase === "enter") {
        if (Number(getComputedStyle(element).opacity) > 0) {
          setEntranceVisible(true);
          return;
        }
      } else if (!overlapped && animation) {
        const timing = animation.effect?.getTiming();
        const duration = typeof timing?.duration === "number" ? timing.duration : 600;
        // Playback, including pauses/background throttling, owns the handoff.
        if (Number(animation.currentTime) >= (timing?.delay ?? 0) + duration * 2 / 3) {
          overlapped = true;
          onExitOverlap(view.id);
          return;
        }
      }
      frame = requestAnimationFrame(observe);
    };
    frame = requestAnimationFrame(observe);
    if (animation) void animation.finished.then(finish, finish);
    const duration = animation?.effect?.getComputedTiming().activeDuration;
    const timeout = !animation || duration === 0 ? window.setTimeout(finish, 0) : undefined;
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      if (timeout !== undefined) window.clearTimeout(timeout);
      element.removeEventListener("animationend", onAnimationFinished);
      element.removeEventListener("animationcancel", onAnimationFinished);
    };
  }, [view.id, view.phase, onPhaseEnd, onExitOverlap]);

  useLayoutEffect(() => {
    // React must remove inert before attempting the guarded focus handoff.
    if (interactive && layer.current) onVisible(layer.current);
  }, [interactive, onVisible]);

  return (
    <div
      data-section-instance={view.id}
      data-section={view.page}
      className={`section-slot ${view.phase === "exit" ? "section-outgoing" : view.phase === "waiting" ? "section-preparing" : ""}`}
      inert={!interactive}
      aria-hidden={!interactive || undefined}
    >
      <div
        ref={layer}
        className={`section-view w-full flex flex-col items-center ${view.phase === "settled" ? "" : `section-${view.phase}`}`}
        style={view.phase === "exit" ? ({
          "--section-exit-opacity": view.exitOpacity,
          "--section-exit-transform": view.exitTransform,
        } as CSSProperties) : undefined}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}

const SectionContent = memo(function SectionContent({
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
});
