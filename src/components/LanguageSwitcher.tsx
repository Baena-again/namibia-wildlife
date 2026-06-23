import { useI18n } from "../i18n";
import { LOCALES } from "../i18n/messages";

/** Compact segmented control to switch the UI language. */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={t("lang.switchAria")}>
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-btn ${locale === l.code ? "active" : ""}`}
          aria-pressed={locale === l.code}
          title={l.name}
          onClick={() => setLocale(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
