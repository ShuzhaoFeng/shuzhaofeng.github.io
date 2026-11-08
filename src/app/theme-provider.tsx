"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { Theme } from "./theme";

type ThemeContextValue = {
  theme: Theme | null;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const subscribe = (listener: () => void) => window.siteTheme.subscribe(listener);
const getSnapshot = () => window.siteTheme.getSnapshot();
// The server and hydration render agree; React then reads the pre-paint store.
const getServerSnapshot = () => null;
const toggleTheme = () => window.siteTheme.toggle();

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
