import { useRegisterSW } from "virtual:pwa-register/react";
import { useT } from "../i18n";

/**
 * Small banner shown when a new version of the app has been deployed. Tapping
 * "Update" activates the waiting service worker and reloads — no need to
 * fight the cache by hand on the phone.
 */
export function UpdatePrompt() {
  const t = useT();
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="update-toast" role="status">
      <span className="update-text">{t("update.newVersion")}</span>
      <button
        className="update-btn"
        onClick={() => updateServiceWorker(true)}
      >
        {t("update.update")}
      </button>
      <button
        className="update-dismiss"
        aria-label={t("update.dismiss")}
        onClick={() => setNeedRefresh(false)}
      >
        ✕
      </button>
    </div>
  );
}
