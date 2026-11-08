"use client";
import { TimelineEntry } from "../components";
import { timelineEntries } from "../data/timelineData";
import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "lucide-react";

export default function JourneyPage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center site-page text-site-ink px-2 sm:px-4">
      <section className="w-full max-w-2xl mx-auto mt-4">
        <ol className="relative border-l border-site-axis">
          {timelineEntries.map((entry, index) => (
            <TimelineEntry
              key={index}
              icon={entry.icon}
              description={entry.description}
            />
          ))}
          {/* "To be continued..." entry */}
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-site-hover rounded-full -left-4 ring-4 ring-site-timeline-ring">
              <MoreHorizontal
                className="w-5 h-5 text-site-ink"
                aria-hidden="true"
              />
            </span>
            <p className="mb-4 text-base font-normal text-site-ink italic">
              {t("journey.toBeContinued")}
            </p>
          </li>
        </ol>
      </section>
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
  );
}
