import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationZH from "./locales/zh/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  zh: {
    translation: translationZH,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Save language changes to localStorage
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", lng);
  }
});

export default i18n;
