// Shared rules for the site's three interface languages (en, fr, zh). Pure
// functions with no browser or Node APIs, so client and server code can both
// import them.

// The Intl locale that formats dates for each site language, so dates follow
// each language's conventions ("November 3, 2026", "3 novembre 2026",
// "2026年11月3日").
const intlLocales: Record<string, string> = {
  en: "en-US",
  fr: "fr-FR",
  zh: "zh-CN",
};

export function intlLocale(language: string): string {
  return intlLocales[language] ?? language;
}

/**
 * The `lang` value for a part of the page shown in the visitor's language.
 * The document stays `lang="en"` (post titles, summaries and bodies are
 * English only), so translated text marks its own language. `zh` is the
 * site's Simplified Chinese, so it is tagged `zh-Hans` for the right script.
 * Pass `i18n.resolvedLanguage`; `undefined` leaves `lang` unset.
 */
export function partLanguage(language: string | undefined): string | undefined {
  return language === "zh" ? "zh-Hans" : language;
}
