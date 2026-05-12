"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_META, STRINGS, type Locale, type StringKey } from "./i18n";

interface LanguageContextValue {
  lang: Locale;
  setLang: (l: Locale) => void;
  t: (key: StringKey) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "cca-tracker:lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "he") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = LOCALE_META[lang].dir;
  }, [lang]);

  const setLang = (l: Locale) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (key: StringKey) => STRINGS[key][lang];
  const dir = LOCALE_META[lang].dir;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: DEFAULT_LOCALE as Locale,
      setLang: () => {},
      t: (key: StringKey) => STRINGS[key][DEFAULT_LOCALE],
      dir: "ltr" as const,
    };
  }
  return ctx;
}
