"use client";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, Globe, Mail, Menu, X } from "lucide-react";

type PageType = "home" | "journey" | "research" | "projects";

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

// One navigation item. The current item is the same <button> as the others,
// so moving the marker is a class change the browser can ease, not a swap of
// elements. Two stacked copies of the label share one grid cell: the regular
// one shows when the item is not current, the bold cyan one when it is, and
// the marker cross-fades between them. The cell takes the bold label's width,
// so the neighbouring items do not shift when the weight changes.
function NavItem({
  label,
  isCurrent,
  animate,
  onSelect,
  className,
}: {
  label: string;
  isCurrent: boolean;
  // False until the visitor switches sections, so the switch to the saved
  // section on mount shows the marker in place with no easing from Home.
  animate: boolean;
  onSelect: () => void;
  className: string;
}) {
  const ease = "duration-200 ease-out";
  return (
    <button
      type="button"
      onClick={isCurrent ? undefined : onSelect}
      aria-current={isCurrent ? "page" : undefined}
      // The current item stays out of the tab order and keeps the default
      // cursor, as when it was a plain span. The `!` outranks the global
      // pointer-cursor rule for buttons in globals.css.
      tabIndex={isCurrent ? -1 : undefined}
      className={`group grid bg-transparent border-none ${
        isCurrent ? "cursor-default!" : "cursor-pointer"
      } ${className}`}
    >
      <span
        className={`[grid-area:1/1] text-white group-hover:text-cyan-400 ${
          animate ? "transition-[color,opacity]" : "transition-colors"
        } ${ease} ${isCurrent ? "opacity-0" : "opacity-100"}`}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`[grid-area:1/1] font-bold text-cyan-400 ${
          animate ? `transition-opacity ${ease}` : ""
        } ${isCurrent ? "opacity-100" : "opacity-0"}`}
      >
        {label}
      </span>
    </button>
  );
}

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  const locales = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "zh", label: "简体中文" },
  ];

  const currentLocaleLabel =
    locales.find((l) => l.code === i18n.language)?.label ?? locales[0].label;

  // Load current page from localStorage on mount
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage") as PageType;
    if (savedPage) {
      setCurrentPage(savedPage);
    }
  }, []);

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

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setHasNavigated(true);
    setIsMobileMenuOpen(false);
    if (window.navigateToPage) {
      window.navigateToPage(page);
    }
  };

  const navLinks = [
    { page: "home" as PageType, label: t("nav.home") },
    { page: "journey" as PageType, label: t("nav.journey") },
    { page: "research" as PageType, label: t("nav.research") },
    { page: "projects" as PageType, label: t("nav.projects") },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 shadow-md">
      <div className="bg-gradient-to-t from-[#1e293b]/80 via-[#111827] to-black w-full">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8 w-full">
            <div className="text-base sm:text-xl font-bold tracking-tight text-white drop-shadow-lg mr-2 sm:mr-6 min-w-max">
              {t("nav.name")}
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-4 md:gap-8 text-base font-medium flex-1">
              {navLinks.map(({ page, label }) => (
                <li key={page} className="min-w-max">
                  <NavItem
                    label={label}
                    isCurrent={currentPage === page}
                    animate={hasNavigated}
                    onSelect={() => handleNavigate(page)}
                    className="whitespace-nowrap"
                  />
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex-1 flex justify-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {/* Both icons stay mounted and cross-fade with a quarter turn,
                    so the swap eases instead of jumping in one frame. */}
                <span className="relative block w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 transition-[opacity,rotate] duration-200 ease-out ${
                      isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                    aria-hidden="true"
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 transition-[opacity,rotate] duration-200 ease-out ${
                      isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-end min-w-max gap-1">
              <a
                href="mailto:shuzhao.feng@mail.mcgill.ca"
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/shuzhao-feng/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/ShuzhaoFeng"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
              </a>
            </div>

            {/* Language dropdown - far right with spacing */}
            <div ref={langRef} className="ml-2 sm:ml-4 relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-haspopup="true"
                aria-expanded={isLangOpen}
                className="md:w-32 px-2 md:px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-colors flex items-center justify-between gap-2 border border-gray-700 shadow-sm"
                aria-label={t("nav.languageAria", "Change language")}
              >
                {/* Mobile: Globe Icon */}
                <Globe className="w-5 h-5 md:hidden text-white" />
                {/* Desktop: Text Label */}
                <span className="hidden md:flex md:flex-1 text-left truncate">
                  {currentLocaleLabel}
                </span>
                <ChevronDown
                  className="lang-chevron w-3 h-3 text-white ml-1 md:ml-2 hidden md:block"
                  style={{
                    transform: isLangOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.15s ease-in-out",
                  }}
                />
              </button>

              <div
                className={`lang-menu absolute right-0 mt-2 w-44 rounded-md shadow-lg overflow-hidden z-50 transform transition-all duration-200 ease-in-out ${
                  isLangOpen
                    ? "opacity-100 scale-100 max-h-40 bg-gray-800 border border-gray-700"
                    : "opacity-0 scale-95 max-h-0 bg-gray-800 border border-gray-700 pointer-events-none"
                }`}
                aria-hidden={!isLangOpen}
              >
                <div className="flex flex-col">
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
                      className="flex items-center justify-between w-full text-left px-3 py-2 hover:bg-gray-700 text-white text-sm transition-colors"
                    >
                      <span>{loc.label}</span>
                      {i18n.language === loc.code && (
                        <Check className="w-4 h-4 text-cyan-400" />
                      )}
                    </button>
                  ))}
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
            <div className="border-t border-gray-600 px-4 py-3 space-y-3">
              {navLinks.map(({ page, label }) => (
                <div key={page}>
                  <NavItem
                    label={label}
                    isCurrent={currentPage === page}
                    animate={hasNavigated}
                    onSelect={() => handleNavigate(page)}
                    className="w-full py-2 text-base text-left"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
