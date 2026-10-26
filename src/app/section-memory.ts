export const sectionIds = ["home", "journey", "research", "projects"] as const;
export type SectionId = (typeof sectionIds)[number];

export const sectionMemoryKey = "currentPage";
export const sectionMemoryDuration = 259_200_000;

export function isSectionId(value: unknown): value is SectionId {
  return sectionIds.some((section) => section === value);
}

export function readSectionMemory(now = Date.now()): SectionId {
  try {
    const raw = localStorage.getItem(sectionMemoryKey);
    if (!raw) return "home";
    const record: unknown = JSON.parse(raw);
    if (!record || typeof record !== "object") return "home";
    const { section, savedAt } = record as Record<string, unknown>;
    if (!isSectionId(section) || typeof savedAt !== "number" ||
        !Number.isSafeInteger(savedAt) || savedAt < 0) return "home";
    const age = now - savedAt;
    return age >= 0 && age < sectionMemoryDuration ? section : "home";
  } catch {
    return "home";
  }
}

export function writeSectionMemory(section: SectionId, now = Date.now()): void {
  try {
    localStorage.setItem(sectionMemoryKey, JSON.stringify({ section, savedAt: now }));
  } catch {
    // Navigation still works when browser storage is unavailable.
  }
}
