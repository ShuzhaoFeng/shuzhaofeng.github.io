import React from "react";

export interface Activity {
  id: string;
  title: string;
  // description is a render function so the Trans node is created during render (inside providers)
  description: () => React.ReactNode;
  startDate: Date;
  endDate: Date;
  location: string;
}

export const activities: Activity[] = [
  // Example activity — copy this shape to add a new one:
  //
  // Note on i18n Trans interpolation & angle brackets:
  // When formatting translated descriptions with links or styled elements, use numbered angle brackets
  // (e.g., <0>link text</0>, <1>another link</1>) in the translation JSON files (src/locales/*/translation.json).
  // Each numbered tag <n>...</n> corresponds to the n-th element (0-indexed) in the `components` array passed to <Trans />.
  //
  // Example JSON entry:
  //   "activity.semla-2026.description": "I will be attending <0>SEMLA 2026</0> as a volunteer."
  //
  // {
  //   id: "semla-2026",
  //   title: "activity.semla-2026.title",
  //   description: () => (
  //     <Trans
  //       i18nKey="activity.semla-2026.description"
  //       components={[
  //         <a
  //           key="semla-2026-link"
  //           href="https://semla.polymtl.ca/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           className="text-cyan-300 underline hover:text-cyan-200"
  //         />,
  //       ]}
  //     />
  //   ),
  //   startDate: new Date("2026-06-01"),
  //   endDate: new Date("2026-06-03"),
  //   location: "activity.semla-2026.location",
  // },
];

// Picks the next still-upcoming-or-ongoing activity (smallest startDate among
// those whose endDate has not yet passed). Returns null if none remain.
export function getCurrentActivity(now: Date = new Date()): Activity | null {
  const upcoming = activities
    .filter((a) => a.endDate.getTime() >= now.getTime())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  return upcoming[0] ?? null;
}

// Locale-aware pretty formatting for an activity's date range.
// Uses Intl.DateTimeFormat#formatRange so single-day events collapse naturally.
export function formatActivityDateRange(
  activity: Activity,
  language: string,
): string {
  const localeMap: Record<string, string> = {
    en: "en-US",
    fr: "fr-FR",
    zh: "zh-CN",
  };
  const locale = localeMap[language] ?? language;
  // Format in UTC so calendar dates render the same regardless of viewer timezone.
  // Activity dates are intentionally constructed as UTC ISO strings ("YYYY-MM-DD").
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return formatter.formatRange(activity.startDate, activity.endDate);
}
