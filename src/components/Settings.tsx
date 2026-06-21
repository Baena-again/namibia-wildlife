import { useRef, useState } from "react";
import type { SeenState } from "../types";
import { buildBackup, parseBackup, mergeBackup } from "../lib/storage";

type Props = {
  seenState: SeenState;
  onImport: (next: SeenState) => void;
  onBack: () => void;
  nowIso: () => string;
};

export function Settings({ seenState, onImport, onBack, nowIso }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function handleExport() {
    const backup = buildBackup(seenState, nowIso());
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `namibia-wildlife-copia-${nowIso().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Copia descargada.");
  }

  async function handleImportFile(file: File) {
    try {
      const text = await file.text();
      const backup = parseBackup(text);
      onImport(mergeBackup(seenState, backup.seen));
      setMessage("Copia importada correctamente.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "No se pudo importar.");
    }
  }

  return (
    <section className="detail">
      <button className="back-link" onClick={onBack}>
        ← Volver al catálogo
      </button>
      <h1 className="title">Copia de seguridad</h1>
      <p className="notice">
        Los animales marcados se guardan en este dispositivo. Exporta una copia
        para no perderlos si cambias de móvil o borras los datos del navegador.
      </p>

      <div className="settings-actions">
        <button className="action-btn" onClick={handleExport}>
          Exportar copia
        </button>
        <button
          className="action-btn"
          onClick={() => fileInput.current?.click()}
        >
          Importar copia
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImportFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {message && <p className="notice">{message}</p>}
    </section>
  );
}
