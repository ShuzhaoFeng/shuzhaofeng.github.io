"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  getCurrentActivity,
  formatActivityDateRange,
} from "../data/activityData";
import { useTranslation } from "react-i18next";
import { CalendarDays, MapPin, X } from "lucide-react";

// Every part of opening and closing runs together over this one span, set in
// CSS transitions (not JS timers), so the whole change ends within ~220 ms.
const EASE = "duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)]";

export default function ActivityWidget() {
  const { t, i18n } = useTranslation();
  const currentActivity = getCurrentActivity();
  const [isOpen, setIsOpen] = useState(false);
  // Counts calendar-button presses. Each press remounts the icon (keyed on
  // this), which restarts its one-turn spin (activity-spin in globals.css).
  const [spinCount, setSpinCount] = useState(0);
  const mainButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelId = "activity-panel";

  const handleButtonClick = () => {
    setSpinCount((count) => count + 1);
    setIsOpen((open) => !open);
  };

  // Close on Escape and return focus to main button
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
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
          className={`bg-gray-800 border border-gray-600 rounded-lg shadow-lg overflow-hidden transition-[width,min-width] ${EASE}`}
          style={{
            width: isOpen ? "min(calc(100vw - 6rem), 320px)" : "200px",
            minWidth: isOpen ? "280px" : "200px",
          }}
        >
          <div className="px-2 sm:px-3 py-1 sm:py-2">
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
                className={`transition-[opacity,width] ${EASE} ml-2 ${
                  isOpen ? "opacity-100 w-4" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Expanded content - only visible when open. It eases in with
                the width from the first frame, with no delay; the 0fr/1fr grid
                row eases to the content's own height. */}
            <div
              className={`grid transition-[grid-template-rows,opacity,margin-top] ${EASE} ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 mt-3"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden space-y-2">
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
                        <span>
                          {formatActivityDateRange(
                            currentActivity,
                            i18n.language,
                          )}
                        </span>
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
              key={spinCount}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                spinCount > 0 ? "activity-spin" : ""
              }`}
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
