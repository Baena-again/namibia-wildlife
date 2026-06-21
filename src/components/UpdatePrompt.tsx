import { useRegisterSW } from "virtual:pwa-register/react";

/**
 * Small banner shown when a new version of the app has been deployed. Tapping
 * "Actualizar" activates the waiting service worker and reloads — no need to
 * fight the cache by hand on the phone.
 */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="update-toast" role="status">
      <span className="update-text">Nueva versión disponible</span>
      <button
        className="update-btn"
        onClick={() => updateServiceWorker(true)}
      >
        Actualizar
      </button>
      <button
        className="update-dismiss"
        aria-label="Cerrar aviso"
        onClick={() => setNeedRefresh(false)}
      >
        ✕
      </button>
    </div>
  );
}
