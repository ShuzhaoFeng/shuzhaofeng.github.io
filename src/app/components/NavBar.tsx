"use client";
import { useState, useRef, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, Globe, Mail, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../theme-provider";
import {
  isSectionId,
  readSectionMemory,
  writeSectionMemory,
  type RememberedPlace,
  type SectionId as PageType,
} from "../section-memory";

let currentLangFade: ViewTransition | null = null;

// Runs a language switch as a view transition of the whole document, so every
// translated string (navigation, page and activity widget) cross-fades at once
// while unchanged pixels hold still. `flushSync` commits the new text inside
// the callback, so the new language is in the first frame of the fade; nothing
// remounts, so what the visitor opened or chose stays as it is. The
// `data-lang-fade` attribute scopes the timing in globals.css to this
// transition. Browsers without view transitions switch at once.
function switchLanguageWithFade(apply: () => void) {
  if (typeof document.startViewTransition !== "function") {
    apply();
    return;
  }
  const root = document.documentElement;
  root.setAttribute("data-lang-fade", "");
  const transition = document.startViewTransition(() => flushSync(apply));
  currentLangFade = transition;
  transition.finished.finally(() => {
    // A newer switch may have taken over; leave its attribute in place.
    if (currentLangFade === transition) {
      currentLangFade = null;
      root.removeAttribute("data-lang-fade");
    }
  });
}

// Reserve the bold label's width with an invisible measuring copy. Only one
// label is painted; selection changes its weight and color while independent
// hover color feedback keeps easing. The item that holds it carries `group
// grid`.
function NavLabel({
  label,
  isCurrent,
  easeHover,
}: {
  label: string;
  isCurrent: boolean;
  easeHover: boolean;
}) {
  return (
    <>
      <span className={`[grid-area:1/1] ${isCurrent ? "font-bold text-site-accent" : "text-site-ink"}`}>
        <span className={`group-hover:text-site-accent ${easeHover ? "transition-colors! duration-200 ease-out" : "transition-none! duration-0"}`}>
          {label}
        </span>
      </span>
      <span aria-hidden="true" className="[grid-area:1/1] invisible font-bold">
        {label}
      </span>
    </>
  );
}

function NavItem({
  label,
  isCurrent,
  easeHover,
  onSelect,
  className,
}: {
  label: string;
  isCurrent: boolean;
  easeHover: boolean;
  onSelect: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={isCurrent ? undefined : onSelect}
      aria-current={isCurrent ? "page" : undefined}
      tabIndex={isCurrent ? -1 : undefined}
      className={`group grid bg-transparent border-none ${
        isCurrent ? "cursor-default!" : "cursor-pointer"
      } ${className}`}
    >
      <NavLabel label={label} isCurrent={isCurrent} easeHover={easeHover} />
    </button>
  );
}

// The blog is its own route, not a root section, so its item is a link rather
// than a section switch. On the list it is current like a section item: out of
// the tab order and inert. On a post it keeps the current style but stays a
// working link back to the list, so `aria-current="true"` marks the place
// without claiming the post is the list page. `onChoose` sees the click after
// the list's own `preventDefault`, and may prevent the link's navigation too.
function BlogNavItem({
  label,
  blogPage,
  easeHover,
  onChoose,
  className,
}: {
  label: string;
  blogPage: "list" | "post" | null;
  easeHover: boolean;
  onChoose: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
  className: string;
}) {
  const isList = blogPage === "list";
  return (
    <Link
      href="/blog/"
      onClick={(event) => {
        // Already on the list: nothing to open, as a current section item
        // does nothing.
        if (isList) event.preventDefault();
        onChoose(event);
      }}
      aria-current={isList ? "page" : blogPage === "post" ? "true" : undefined}
      tabIndex={isList ? -1 : undefined}
      className={`group grid ${isList ? "cursor-default!" : "cursor-pointer"} ${className}`}
    >
      <NavLabel label={label} isCurrent={blogPage !== null} easeHover={easeHover} />
    </Link>
  );
}

// Under `trailingSlash: true` the pathname may or may not end in a slash, so
// compare it without one.
function blogPageOf(pathname: string): "list" | "post" | null {
  const path = pathname.replace(/\/+$/, "");
  if (path === "/blog") return "list";
  if (path.startsWith("/blog/")) return "post";
  return null;
}

export default function NavBar({ hasPosts }: { hasPosts: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  // Blog chosen on `/`: the item is current at once, as a chosen section's
  // is, while the visible section leaves. A section choice cancels it, and any
  // change of route ends it, since the pathname then says where the visitor is.
  const [blogChosen, setBlogChosen] = useState(false);
  const [blogChosenPathname, setBlogChosenPathname] = useState(pathname);
  if (blogChosenPathname !== pathname) {
    setBlogChosenPathname(pathname);
    setBlogChosen(false);
  }
  const blogPage = blogChosen ? "list" : blogPageOf(pathname);
  // A remembered Blog marks no section: on `/` the root page either reopens
  // the blog list or announces the section it shows instead
  // (`sectiondestinationchange`), and elsewhere sections are not current anyway.
  const [currentPage, setCurrentPage] = useState<RememberedPlace>("home");
  const chosenSection = useRef<PageType | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [easeLabels, setEaseLabels] = useState(false);

  const { t, i18n } = useTranslation();
  const themeActionLabel = t(theme === "dark" ? "nav.switchToLight" : "nav.switchToDark");
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  const locales = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "zh", label: "简体中文" },
  ];

  const currentLocaleLabel =
    locales.find((l) => l.code === i18n.language)?.label ?? locales[0].label;

  useEffect(() => {
    // The layout also renews visits to separate routes that have no root page.
    // The blog pages' own effects run after this one and record Blog.
    const remembered = chosenSection.current ?? readSectionMemory();
    // With no post the blog is hidden, so a remembered Blog opens Home, as on
    // the root page.
    const page = remembered === "blog" && !hasPosts ? "home" : remembered;
    setCurrentPage(page);
    writeSectionMemory(page);
    // Paint the restored selection with zero duration before enabling hover
    // feedback. Inherited text colors otherwise transition from Home on load.
    let enableFrame = 0;
    const restoredFrame = requestAnimationFrame(() => {
      enableFrame = requestAnimationFrame(() => setEaseLabels(true));
    });
    return () => {
      cancelAnimationFrame(restoredFrame);
      cancelAnimationFrame(enableFrame);
    };
  }, [hasPosts]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        isLangOpen &&
        langRef.current &&
        !langRef.current.contains(e.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isLangOpen]);

  useEffect(() => {
    const onDestinationChange = (event: Event) => {
      const page: unknown = (event as CustomEvent).detail;
      if (!isSectionId(page)) return;
      chosenSection.current = page;
      setCurrentPage(page);
      setBlogChosen(false);
    };
    window.addEventListener("sectiondestinationchange", onDestinationChange);
    return () => window.removeEventListener("sectiondestinationchange", onDestinationChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    chosenSection.current = page;
    setCurrentPage(page);
    setBlogChosen(false);
    setIsMobileMenuOpen(false);
    if (window.navigateToPage) {
      window.navigateToPage(page);
    } else {
      writeSectionMemory(page);
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- Reload the root so it restores the requested section.
      window.location.assign("/");
    }
  };

  // On `/` a plain click on Blog plays the visible section's exit before the
  // blog opens. Modified clicks (new tab or window) keep the link's default,
  // and elsewhere the link navigates as usual.
  const handleBlogChoice = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !window.navigateToBlog
    ) {
      return;
    }
    event.preventDefault();
    setBlogChosen(true);
    window.navigateToBlog();
  };

  const navLinks = [
    { page: "home" as PageType, label: t("nav.home") },
    { page: "journey" as PageType, label: t("nav.journey") },
    { page: "research" as PageType, label: t("nav.research") },
    { page: "projects" as PageType, label: t("nav.projects") },
  ];

  return (
    <nav className="site-nav w-full sticky top-0 z-50 shadow-md">
      <div className="site-nav-background w-full">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 flex items-center justify-between">
          <div className="site-nav-row flex items-center gap-2 sm:gap-4 md:gap-8 w-full">
            <div className="site-nav-name text-base sm:text-xl font-bold tracking-tight text-site-ink site-nav-name-shadow mr-2 sm:mr-6 min-w-max">
              {t("nav.name")}
            </div>

            {/* Compact desktop spacing in globals.css leaves room for Blog
                and the theme control at the 768px breakpoint. */}
            <ul className="hidden md:flex gap-3.5 lg:gap-8 text-base font-medium flex-1">
              {navLinks.map(({ page, label }) => (
                <li key={page} className="min-w-max">
                  <NavItem
                    label={label}
                    isCurrent={isMainPage && !blogChosen && currentPage === page}
                    easeHover={easeLabels}
                    onSelect={() => handleNavigate(page)}
                    className="whitespace-nowrap"
                  />
                </li>
              ))}
              {hasPosts && (
                <li className="min-w-max">
                  <BlogNavItem
                    label={t("nav.blog")}
                    blogPage={blogPage}
                    easeHover={easeLabels}
                    onChoose={handleBlogChoice}
                    className="whitespace-nowrap"
                  />
                </li>
              )}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex-1 flex justify-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-site-ink hover:bg-site-hover transition-colors"
                aria-label="Toggle mobile menu"
              >
                {/* Both icons stay mounted and cross-fade with a quarter turn,
                    so the swap eases instead of jumping in one frame. With
                    reduced motion they stay upright and only cross-fade. */}
                <span className="relative block w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 transition-[opacity,rotate] duration-200 ease-out motion-reduce:rotate-0 ${
                      isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                    aria-hidden="true"
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 transition-[opacity,rotate] duration-200 ease-out motion-reduce:rotate-0 ${
                      isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              disabled={theme === null}
              aria-label={themeActionLabel}
              title={themeActionLabel}
              className="site-theme-toggle hidden md:inline-flex"
            >
              <ThemeIcon aria-hidden="true" />
            </button>

            {/* Social Icons */}
            <div className="site-nav-social flex items-center justify-end min-w-max gap-1">
              <a
                href="mailto:shuzhao.feng@mail.mcgill.ca"
                className="p-1 rounded-full hover:bg-site-hover transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-site-ink" />
              </a>
              <a
                href="https://www.linkedin.com/in/shuzhao-feng/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-site-hover transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-site-ink"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/ShuzhaoFeng"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-site-hover transition-colors"
                aria-label="GitHub Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-site-ink"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
              </a>
            </div>

            {/* Language dropdown - far right with spacing */}
            <div ref={langRef} className="site-nav-language ml-2 sm:ml-4 relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-haspopup="true"
                aria-expanded={isLangOpen}
                className="md:w-32 px-2 md:px-3 py-1 rounded-full bg-site-surface hover:bg-site-hover text-site-ink text-sm font-medium transition-colors flex items-center justify-between gap-2 border border-site-border shadow-sm"
                aria-label={t("nav.languageAria", "Change language")}
              >
                {/* Mobile: Globe Icon */}
                <Globe className="w-5 h-5 md:hidden text-site-ink" />
                {/* Desktop: Text Label */}
                <span className="hidden md:flex md:flex-1 text-left truncate">
                  {currentLocaleLabel}
                </span>
                {/* Its inline rotation turns at once under reduced motion
                    (globals.css). */}
                <ChevronDown
                  className="lang-chevron w-3 h-3 text-site-ink ml-1 md:ml-2 hidden md:block"
                  style={{
                    transform: isLangOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.15s ease-in-out",
                  }}
                />
              </button>

              {/* Keep the rows mounted while their wrapper clips from the
                  top. Visibility hides them after the collapse; inert and
                  aria-hidden remove interaction and accessibility at once.
                  Reduced motion changes the grid height instantly. */}
              <div
                className={`lang-menu absolute right-0 mt-2 w-44 grid z-50 transition-[grid-template-rows,visibility] duration-200 ease-in-out ${
                  isLangOpen
                    ? "grid-rows-[1fr] visible"
                    : "grid-rows-[0fr] invisible pointer-events-none"
                }`}
                inert={!isLangOpen}
                aria-hidden={!isLangOpen}
              >
                <div className="min-h-0 overflow-hidden rounded-md shadow-lg">
                  <div className="flex flex-col rounded-md bg-site-surface border border-site-border">
                    {locales.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => {
                          if (loc.code === i18n.language) {
                            setIsLangOpen(false);
                            return;
                          }
                          switchLanguageWithFade(() => {
                            i18n.changeLanguage(loc.code);
                            setIsLangOpen(false);
                          });
                        }}
                        className="flex items-center justify-between w-full text-left px-3 py-2 hover:bg-site-hover text-site-ink text-sm transition-colors"
                      >
                        <span>{loc.label}</span>
                        {/* Every row reserves the same icon space so changing
                            selection can fade while the menu starts closing. */}
                        <Check
                          aria-hidden="true"
                          className={`w-4 h-4 shrink-0 text-site-accent transition-opacity duration-150 ease-out ${
                            i18n.language === loc.code ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {/* Stays mounted so it can animate; the 0fr/1fr grid row eases the
            height. While closed, `inert` drops the items from the tab order
            and accessibility tree at once, and `invisible` hides them when the
            collapse ends (a visibility transition shows at its start and hides
            at its end). */}
        <div
          className={`md:hidden grid transition-[grid-template-rows,opacity,visibility] duration-200 ease-out ${
            isMobileMenuOpen
              ? "grid-rows-[1fr] opacity-100 visible"
              : "grid-rows-[0fr] opacity-0 invisible"
          }`}
          inert={!isMobileMenuOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-site-border-strong px-4 py-3 space-y-3">
              {navLinks.map(({ page, label }) => (
                <div key={page}>
                  <NavItem
                    label={label}
                    isCurrent={isMainPage && !blogChosen && currentPage === page}
                    easeHover={easeLabels}
                    onSelect={() => handleNavigate(page)}
                    className="w-full py-2 text-base text-left"
                  />
                </div>
              ))}
              {hasPosts && (
                <div>
                  <BlogNavItem
                    label={t("nav.blog")}
                    blogPage={blogPage}
                    easeHover={easeLabels}
                    onChoose={handleBlogChoice}
                    className="w-full py-2 text-base text-left"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={toggleTheme}
                disabled={theme === null}
                className="site-theme-toggle site-theme-mobile"
              >
                <ThemeIcon aria-hidden="true" />
                <span>{themeActionLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
