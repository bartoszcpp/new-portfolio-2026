import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { dictionaries } from "./translations";
import type { Dictionary, Language } from "./translations";

const cookieName = "lang";
const cookieMaxAgeSeconds = 60 * 60 * 24 * 365; // one year
const supportedLanguages: Language[] = ["en", "pl"];

const nonBreakingSpace = "\u00A0";
const orphanPattern = /(^|[\s([{„"'-])([aiouwzAIOUWZ])[ \t]+/g;

const fixOrphans = (text: string): string =>
  text.replace(orphanPattern, (_match, prefix: string, letter: string) => `${prefix}${letter}${nonBreakingSpace}`);

const fixDictionaryOrphans = (dictionary: Dictionary): Dictionary => {
  const transform = (value: unknown): unknown => {
    if (typeof value === "string") {
      return fixOrphans(value);
    }

    if (Array.isArray(value)) {
      return value.map(transform);
    }

    if (value !== null && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, transform(entry)]));
    }

    return value;
  };

  return transform(dictionary) as Dictionary;
};

const localizedDictionaries: Record<Language, Dictionary> = {
  en: dictionaries.en,
  pl: fixDictionaryOrphans(dictionaries.pl),
};

const isLanguage = (value: string | undefined): value is Language =>
  value !== undefined && supportedLanguages.includes(value as Language);

const readLanguageCookie = (): Language | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${cookieName}=`));

  const value = match?.split("=")[1];
  return isLanguage(value) ? value : undefined;
};

const detectInitialLanguage = (): Language => {
  const fromCookie = readLanguageCookie();
  if (fromCookie) {
    return fromCookie;
  }

  if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("pl")) {
    return "pl";
  }

  return "en";
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.cookie = `${cookieName}=${language}; path=/; max-age=${cookieMaxAgeSeconds}; samesite=lax`;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: localizedDictionaries[language] }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};

export const useTranslation = (): Dictionary => useLanguage().t;
