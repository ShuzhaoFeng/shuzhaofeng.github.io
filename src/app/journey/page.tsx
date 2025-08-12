"use client";
import { TimelineEntry } from "../components";
import { timelineEntries } from "../data/timelineData";

export default function JourneyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      {/* Timeline only, no main title */}
      <section className="w-full max-w-2xl mx-auto mt-4">
        <ol className="relative border-l border-cyan-500">
          {timelineEntries.map((entry, index) => (
            <TimelineEntry
              key={index}
              icon={entry.icon}
              description={entry.description}
            />
          ))}
          {/* "To be continued..." entry */}
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full -left-4 ring-4 ring-gray-900">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <circle cx="4" cy="10" r="2" />
                <circle cx="10" cy="10" r="2" />
                <circle cx="16" cy="10" r="2" />
              </svg>
            </span>
            <p className="mb-4 text-base font-normal text-gray-500 italic">
              To be continued...
            </p>
          </li>
        </ol>
      </section>
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
    </main>
  );
}
