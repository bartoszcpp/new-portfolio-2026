import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { dictionaries } from "./translations";
import type { Dictionary, Language } from "./translations";

const cookieName = "lang";
const cookieMaxAgeSeconds = 60 * 60 * 24 * 365; // one year
const supportedLanguages: Language[] = ["en", "pl"];

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
    () => ({ language, setLanguage, t: dictionaries[language] }),
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
