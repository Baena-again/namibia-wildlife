import { useRef, useState } from "react";
import type { JournalState, SeenState, ShoppingState } from "../types";
import {
  buildBackup,
  parseBackup,
  mergeBackup,
  mergeJournal,
  mergeShopping,
} from "../lib/storage";
import { useT } from "../i18n";

type Props = {
  seenState: SeenState;
  journal: JournalState;
  shopping: ShoppingState;
  onImport: (
    seen: SeenState,
    journal: JournalState,
    shopping: ShoppingState,
  ) => void;
  onBack: () => void;
  nowIso: () => string;
};

export function Settings({
  seenState,
  journal,
  shopping,
  onImport,
  onBack,
  nowIso,
}: Props) {
  const t = useT();
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function handleExport() {
    const backup = buildBackup(seenState, journal, shopping, nowIso());
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `namibia-wildlife-copia-${nowIso().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage(t("settings.downloaded"));
  }

  async function handleImportFile(file: File) {
    try {
      const text = await file.text();
      const backup = parseBackup(text);
      onImport(
        mergeBackup(seenState, backup.seen),
        mergeJournal(journal, backup.journal),
        mergeShopping(shopping, backup.shopping),
      );
      setMessage(t("settings.imported"));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : t("settings.importFailed"));
    }
  }

  return (
    <section className="detail">
      <button className="back-link" onClick={onBack}>
        ← {t("detail.backCatalogue")}
      </button>
      <h1 className="title">{t("settings.title")}</h1>
      <p className="notice">{t("settings.intro")}</p>

      <div className="settings-actions">
        <button className="action-btn" onClick={handleExport}>
          {t("settings.export")}
        </button>
        <button
          className="action-btn"
          onClick={() => fileInput.current?.click()}
        >
          {t("settings.import")}
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
