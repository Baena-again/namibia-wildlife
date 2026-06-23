import { useEffect, useMemo, useState } from "react";
import type {
  Animal,
  Difficulty,
  FilterMode,
  JournalState,
  SeenState,
  ShoppingState,
  Zone,
  ZoneId,
} from "./types";
import { animals } from "./data/animals";
import { filterAnimals, countSeen } from "./lib/search";
import { getZone, categoriesOf, DIFFICULTY_ORDER } from "./lib/zones";
import {
  loadSeen,
  saveSeen,
  toggleSeen,
  loadJournal,
  saveJournal,
  loadShopping,
  saveShopping,
} from "./lib/storage";
import { AnimalGrid } from "./components/AnimalGrid";
import { AnimalDetail } from "./components/AnimalDetail";
import { NamibiaMap } from "./components/NamibiaMap";
import { ZoneView } from "./components/ZoneView";
import { Settings } from "./components/Settings";
import { Itinerary } from "./components/Itinerary";
import { SafariTips } from "./components/SafariTips";
import { ShoppingList } from "./components/ShoppingList";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useI18n } from "./i18n";

type View =
  | { name: "list" }
  | { name: "map" }
  | { name: "zone"; zone: Zone; from?: View }
  | { name: "detail"; animal: Animal; from: View }
  | { name: "settings" }
  | { name: "itinerary" }
  | { name: "tips" }
  | { name: "shopping" };

const nowIso = () => new Date().toISOString();

export default function App() {
  const { t } = useI18n();
  const [seenState, setSeenState] = useState<SeenState>(() => loadSeen());
  const [journal, setJournal] = useState<JournalState>(() => loadJournal());
  const [shoppingChecked, setShoppingChecked] = useState<ShoppingState>(() =>
    loadShopping(),
  );
  const [storageOk, setStorageOk] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [view, setView] = useState<View>({ name: "map" });
  // Which shopping stop to scroll to when opened from the logbook (null = top).
  const [shoppingFocus, setShoppingFocus] = useState<string | null>(null);

  // Persist whenever the seen-state changes.
  useEffect(() => {
    setStorageOk(saveSeen(seenState));
  }, [seenState]);

  // Persist the trip logbook notes as they're written.
  useEffect(() => {
    saveJournal(journal);
  }, [journal]);

  // Persist the shopping checks as they're ticked.
  useEffect(() => {
    saveShopping(shoppingChecked);
  }, [shoppingChecked]);

  const categories = useMemo(() => categoriesOf(animals), []);
  const visible = useMemo(
    () =>
      filterAnimals(
        animals,
        { query, filter, category, difficulty },
        seenState,
      ),
    [query, filter, category, difficulty, seenState],
  );
  const seenCount = useMemo(
    () => countSeen(animals, seenState),
    [seenState],
  );

  function handleToggleSeen(id: string) {
    setSeenState((prev) => toggleSeen(prev, id, nowIso()));
  }

  function handleSetNote(dayId: string, text: string) {
    setJournal((prev) => ({ ...prev, [dayId]: text }));
  }

  function openShopping(dayId: string) {
    setShoppingFocus(dayId);
    setView({ name: "shopping" });
  }

  function handleToggleShopping(key: string) {
    setShoppingChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleImport(
    seen: SeenState,
    journalIn: JournalState,
    shoppingIn: ShoppingState,
  ) {
    setSeenState(seen);
    setJournal(journalIn);
    setShoppingChecked(shoppingIn);
  }

  function openZone(zoneId: ZoneId, from?: View) {
    const zone = getZone(zoneId);
    if (zone) setView({ name: "zone", zone, from });
  }

  if (view.name === "detail") {
    const from = view.from;
    return (
      <AnimalDetail
        animal={view.animal}
        seen={seenState[view.animal.id]?.seen ?? false}
        onToggleSeen={() => handleToggleSeen(view.animal.id)}
        onBack={() => setView(from)}
        backLabel={
          from.name === "zone"
            ? t("detail.backZone", { zone: from.zone.short })
            : from.name === "itinerary"
              ? t("detail.backLogbook")
              : undefined
        }
      />
    );
  }

  if (view.name === "zone") {
    const back = view.from ?? { name: "map" as const };
    return (
      <ZoneView
        zone={view.zone}
        animals={animals}
        seenState={seenState}
        onSelect={(animal) =>
          setView({ name: "detail", animal, from: view })
        }
        onToggleSeen={handleToggleSeen}
        onBack={() => setView(back)}
      />
    );
  }

  if (view.name === "settings") {
    return (
      <Settings
        seenState={seenState}
        journal={journal}
        shopping={shoppingChecked}
        onImport={handleImport}
        onBack={() => setView({ name: "list" })}
        nowIso={nowIso}
      />
    );
  }

  // The top-level tabs, in display order (Catálogo stays last).
  const tabs = [
    { name: "map", labelKey: "tab.map" },
    { name: "itinerary", labelKey: "tab.itinerary" },
    { name: "tips", labelKey: "tab.tips" },
    { name: "shopping", labelKey: "tab.shopping" },
    { name: "list", labelKey: "tab.list" },
  ] as const;

  function goTab(name: (typeof tabs)[number]["name"]) {
    if (name === "shopping") setShoppingFocus(null);
    setView({ name } as View);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <header className="app-header">
        <LanguageSwitcher />
        <h1>Namibia Wildlife</h1>
        <div className="subtitle">{t("app.subtitle")}</div>
        <div className="counter">
          {t("app.counter", { seen: seenCount, total: animals.length })}
        </div>
      </header>

      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`tab ${view.name === tab.name ? "active" : ""}`}
            onClick={() => goTab(tab.name)}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </nav>

      {!storageOk && <p className="notice">{t("app.storageWarning")}</p>}

      {view.name === "map" && (
        <>
          <p className="map-intro">{t("app.mapIntro")}</p>
          <NamibiaMap
            animals={animals}
            seenState={seenState}
            onSelect={openZone}
          />
        </>
      )}

      {view.name === "itinerary" && (
        <Itinerary
          animals={animals}
          seenState={seenState}
          journal={journal}
          onSetNote={handleSetNote}
          onSelectAnimal={(animal) =>
            setView({ name: "detail", animal, from: { name: "itinerary" } })
          }
          onOpenZone={(zoneId) => openZone(zoneId, { name: "itinerary" })}
          onOpenShopping={openShopping}
        />
      )}

      {view.name === "tips" && <SafariTips />}

      {view.name === "shopping" && (
        <ShoppingList
          focus={shoppingFocus}
          checked={shoppingChecked}
          onToggle={handleToggleShopping}
        />
      )}

      {view.name === "list" && (
        <>
          <div className="controls">
            <input
              className="search-input"
              type="search"
              placeholder={t("controls.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="filters">
              {(["all", "seen", "pending"] as FilterMode[]).map((mode) => (
                <button
                  key={mode}
                  className={`filter-btn ${filter === mode ? "active" : ""}`}
                  onClick={() => setFilter(mode)}
                >
                  {mode === "all"
                    ? t("controls.all")
                    : mode === "seen"
                      ? t("controls.seen")
                      : t("controls.pending")}
                </button>
              ))}
            </div>

            <div className="catalogue-filter">
              <span className="label catalogue-filter-label">
                {t("controls.easyToSee")}
              </span>
              <div className="chips">
                <button
                  className={`chip ${difficulty === null ? "active" : ""}`}
                  onClick={() => setDifficulty(null)}
                >
                  {t("controls.allFem")}
                </button>
                {DIFFICULTY_ORDER.map((d) => (
                  <button
                    key={d}
                    className={`chip chip-${d} ${difficulty === d ? "active" : ""}`}
                    onClick={() => setDifficulty(difficulty === d ? null : d)}
                  >
                    {t(`difficulty.${d}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="catalogue-filter">
              <span className="label catalogue-filter-label">
                {t("controls.category")}
              </span>
              <div className="chips">
                <button
                  className={`chip ${category === "" ? "active" : ""}`}
                  onClick={() => setCategory("")}
                >
                  {t("controls.allFem")}
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`chip ${category === c ? "active" : ""}`}
                    onClick={() => setCategory(category === c ? "" : c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimalGrid
            animals={visible}
            seenState={seenState}
            onSelect={(animal) =>
              setView({ name: "detail", animal, from: { name: "list" } })
            }
            onToggleSeen={handleToggleSeen}
          />
        </>
      )}

      <nav className="foot-nav">
        <button onClick={() => setView({ name: "settings" })}>
          {t("app.backup")}
        </button>
      </nav>
    </>
  );
}
