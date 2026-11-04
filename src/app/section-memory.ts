export const sectionIds = ["home", "journey", "research", "projects"] as const;
export type SectionId = (typeof sectionIds)[number];

// The places the memory can hold: the four root sections, and the blog, which
// is its own route rather than a root section. Viewing the blog list or a post
// records it, so the next visit to `/` reopens the list (root-page.tsx).
export type RememberedPlace = SectionId | "blog";

export const sectionMemoryKey = "currentPage";
export const sectionMemoryDuration = 259_200_000;

export function isSectionId(value: unknown): value is SectionId {
  return sectionIds.some((section) => section === value);
}

function isRememberedPlace(value: unknown): value is RememberedPlace {
  return value === "blog" || isSectionId(value);
}

export function readSectionMemory(now = Date.now()): RememberedPlace {
  try {
    const raw = localStorage.getItem(sectionMemoryKey);
    if (!raw) return "home";
    const record: unknown = JSON.parse(raw);
    if (!record || typeof record !== "object") return "home";
    const { section, savedAt } = record as Record<string, unknown>;
    if (!isRememberedPlace(section) || typeof savedAt !== "number" ||
        !Number.isSafeInteger(savedAt) || savedAt < 0) return "home";
    const age = now - savedAt;
    return age >= 0 && age < sectionMemoryDuration ? section : "home";
  } catch {
    return "home";
  }
}

export function writeSectionMemory(section: RememberedPlace, now = Date.now()): void {
  try {
    localStorage.setItem(sectionMemoryKey, JSON.stringify({ section, savedAt: now }));
  } catch {
    // Navigation still works when browser storage is unavailable.
  }
}

// Records Blog while a blog page (the list or a post) shows: on mount, and
// again when the browser restores the page from its back/forward cache, which
// runs no effect. Leaving the blog for a main section is a full load of `/`, so
// Back can bring the cached blog page back while memory still holds the section
// that was left; without this the next visit would open that section, not the
// blog. The pages still enter the cache: an `unload` listener would keep them
// out and slow every Back and Forward on the site. Returns the cleanup, so a
// page's effect can be `useEffect(recordBlogWhileShown, [])`.
export function recordBlogWhileShown(): () => void {
  writeSectionMemory("blog");
  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) writeSectionMemory("blog");
  };
  window.addEventListener("pageshow", onPageShow);
  return () => window.removeEventListener("pageshow", onPageShow);
}
