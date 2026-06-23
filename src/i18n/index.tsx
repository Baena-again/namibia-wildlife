import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  messages,
  type Locale,
  type MessageKey,
} from "./messages";

const STORAGE_KEY = "namibia.locale";

/** Values interpolated into a message, e.g. `{ seen: 3, total: 40 }`. */
export type TVars = Record<string, string | number>;

/** Replace `{name}` placeholders; leaves unknown ones visible for debugging. */
export function format(template: string, vars?: TVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in vars ? String(vars[key]) : whole,
  );
}

/** Translate a key for a locale, falling back to the default locale. */
export function translate(
  locale: Locale,
  key: MessageKey,
  vars?: TVars,
): string {
  const table = messages[locale] ?? messages[DEFAULT_LOCALE];
  const template = table[key] ?? messages[DEFAULT_LOCALE][key] ?? key;
  return format(template, vars);
}

/** Best initial locale: saved choice → browser language → default. */
export function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    // localStorage may be unavailable (private mode); fall through.
  }
  const nav =
    typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, vars?: TVars) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persisting the choice is best-effort.
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, vars) => translate(locale, key, vars),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}

/** Shorthand for components that only need the translate function. */
export function useT() {
  return useI18n().t;
}
