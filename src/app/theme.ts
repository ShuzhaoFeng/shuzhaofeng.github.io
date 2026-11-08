export type Theme = "light" | "dark";

type ThemeStore = {
  getSnapshot: () => Theme;
  subscribe: (listener: () => void) => () => void;
  toggle: () => void;
};

declare global {
  interface Window {
    siteTheme: ThemeStore;
  }
}

// This function is serialized into the document head. Keep it self-contained:
// the same store owns the pre-paint choice and every subsequent change.
function initializeTheme() {
  if (window.siteTheme) return;

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  let preference: Theme | null = null;
  try {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") preference = saved;
  } catch {
    // Storage can be unavailable even when JavaScript is enabled.
  }

  let effective: Theme = preference ?? (media.matches ? "dark" : "light");
  const listeners = new Set<() => void>();
  const publish = () => {
    document.documentElement.dataset.theme = effective;
    document.documentElement.style.colorScheme = effective;
    listeners.forEach((listener) => listener());
  };

  window.siteTheme = {
    getSnapshot: () => effective,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    toggle: () => {
      preference = effective === "dark" ? "light" : "dark";
      effective = preference;
      publish();
      try {
        window.localStorage.setItem("theme", preference);
      } catch {
        // The explicit choice still takes priority for this open page.
      }
    },
  };

  media.addEventListener("change", () => {
    if (preference !== null) return;
    effective = media.matches ? "dark" : "light";
    publish();
  });
  publish();
}

export const themeInitializationScript = `(${initializeTheme.toString()})();`;
