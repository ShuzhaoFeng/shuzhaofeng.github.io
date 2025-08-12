"use client";
import { useState } from "react";
import { Activity, currentActivity } from "../data/activityData";

export default function ActivityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleButtonClick = () => {
    setIsSpinning(true);
    setIsOpen(!isOpen);
    // Reset spin animation after it completes
    setTimeout(() => setIsSpinning(false), 600);
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "conference":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "travel":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Dialog */}
      {isOpen && (
        <div className="fixed bottom-16 left-2 right-2 sm:bottom-20 sm:left-auto sm:right-4 md:bottom-24 md:right-6 z-30 sm:w-80 sm:max-w-[calc(100vw-2rem)]">
          <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-xl p-3 sm:p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getActivityIcon(currentActivity.type)}
                <h3 className="text-sm font-semibold text-white">
                  My Upcoming Event
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium text-sm">
                {currentActivity.title}
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                {currentActivity.description}
              </p>

              <div className="flex items-center gap-4 pt-2 text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{currentActivity.date}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{currentActivity.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button with Label */}
      <div className="fixed bottom-4 right-2 sm:right-4 md:bottom-6 md:right-6 z-20 flex items-center gap-2 sm:gap-3">
        {/* Always visible label */}
        <div className="bg-gray-800 border border-gray-600 px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg max-w-[200px] sm:max-w-none">
          <div className="text-white text-xs font-medium truncate">
            My Upcoming Event
          </div>
          <div className="text-gray-300 text-xs truncate">
            {currentActivity.title}
          </div>
        </div>

        <button
          onClick={handleButtonClick}
          className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors flex-shrink-0"
          aria-label="View next activity"
        >
          <div className="relative">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              style={{
                transform: isSpinning ? "rotate(360deg)" : "rotate(0deg)",
                transition: isSpinning ? "transform 0.6s ease-in-out" : "none",
              }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>

            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>
    </>
  );
}
