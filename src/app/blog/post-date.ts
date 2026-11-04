// Formats a post's date in the visitor's language. Kept apart from `posts.ts`,
// which reads the file system, so client components can import it.
import { intlLocale } from "../language";

/**
 * A post's `YYYY-MM-DD` date as a long, language-appropriate date, such as
 * "November 3, 2026", "3 novembre 2026" or "2026年11月3日".
 */
export function formatPostDate(date: string, language: string): string {
  const [year, month, day] = date.split("-").map(Number);
  // The date is a calendar day, not an instant: build it at UTC midnight and
  // format it in UTC, as the activity widget does, so every viewer time zone
  // shows the same day.
  return new Intl.DateTimeFormat(intlLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
