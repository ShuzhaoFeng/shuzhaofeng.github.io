"use client";
import React, { useState, useRef, useEffect } from "react";
import { currentActivity } from "../data/activityData";
import { useTranslation } from "react-i18next";
import { CalendarDays, MapPin, X } from "lucide-react";

export default function ActivityWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false); // Controls width
  const [showContent, setShowContent] = useState(false); // Controls content visibility
  const [isSpinning, setIsSpinning] = useState(false);
  const mainButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelId = "activity-panel";

  const handleButtonClick = () => {
    setIsSpinning(true);
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowContent(true), 200); // Content expands after width
    } else {
      setShowContent(false); // Collapse content and width at the same time
      setIsOpen(false);
    }
    setTimeout(() => setIsSpinning(false), 600);
  };

  // Close on Escape and return focus to main button
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setShowContent(false);
        setIsOpen(false);
        // return focus to main button after next tick
        setTimeout(() => mainButtonRef.current?.focus(), 0);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // If there's no current activity, hide the widget entirely
  if (!currentActivity) return null;

  return (
    <>
      {/* Single expandable widget container */}
      <div className="fixed bottom-4 right-2 sm:right-4 md:bottom-6 md:right-6 z-20 flex items-end gap-2 sm:gap-3">
        {/* Expandable activity panel */}
        <div
          id={panelId}
          className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            width: isOpen ? "min(calc(100vw - 6rem), 320px)" : "200px",
            minWidth: isOpen ? "280px" : "200px",
            transitionDelay: !isOpen && !showContent ? "500ms" : "0ms",
          }}
        >
          <div className="px-2 sm:px-3 py-1 sm:py-2 transition-all duration-500 ease-in-out">
            {/* Header section - always visible */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="min-w-0 flex-1">
                  <div className="text-white text-sm font-semibold truncate">
                    {t("activity.headerTitle")}
                  </div>
                  {currentActivity ? (
                    <div className="text-gray-300 text-sm font-medium truncate">
                      {t(currentActivity.title)}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Close button - only visible when expanded */}
              <div
                className={`transition-all duration-500 ease-in-out ml-2 ${
                  isOpen ? "opacity-100 w-4" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                <button
                  onClick={() => {
                    // Collapse content first, then close the panel to keep animations consistent
                    setShowContent(false);
                    setIsOpen(false);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Expanded content - only visible when open */}
            <div
              className="transition-all duration-500 ease-in-out overflow-hidden"
              style={{
                maxHeight: showContent ? "400px" : "0px",
                opacity: showContent ? 1 : 0,
                marginTop: showContent ? "12px" : "0px",
                transitionDelay: isOpen && showContent ? "200ms" : "0ms",
              }}
            >
              <div className="space-y-2">
                {currentActivity ? (
                  <>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {typeof currentActivity.description === "function"
                        ? currentActivity.description()
                        : currentActivity.description}
                    </p>

                    <div className="flex items-center gap-4 pt-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-400">
                        <CalendarDays className="w-3 h-3" aria-hidden="true" />
                        <span>{t(currentActivity.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        <span>{t(currentActivity.location)}</span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar button */}
        <button
          ref={mainButtonRef}
          onClick={handleButtonClick}
          className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors flex-shrink-0"
          aria-label={t("activity.buttonAriaLabel")}
          aria-controls={panelId}
          aria-expanded={isOpen}
        >
          <div className="relative">
            <CalendarDays
              className="w-4 h-4 sm:w-5 sm:h-5"
              style={{
                transform: isSpinning ? "rotate(360deg)" : "rotate(0deg)",
                transition: isSpinning ? "transform 0.6s ease-in-out" : "none",
              }}
              aria-hidden="true"
            />

            {/* Notification dot - only show when there's an active activity */}
            {currentActivity ? (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            ) : null}
          </div>
        </button>
      </div>
    </>
  );
}
