"use client";
import "../i18n";
import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage before rendering
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage).then(() => {
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800" />
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
