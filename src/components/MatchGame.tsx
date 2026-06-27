import { useEffect, useMemo, useState } from "react";
import type { Animal } from "../types";
import { AnimalImage } from "./AnimalImage";
import { animalGameRank } from "../data/gameRank";
import { confusables } from "../data/confusables";

/**
 * "Empareja y aprende" — a silly-but-educational matching mini-game to learn
 * Namibia's wildlife before the trip.
 *
 * Each level: a short card explaining the new animal → a 1-vs-1 "duel" test
 * when a look-alike is involved → the matching board. Animals come in
 * "worth-learning-first" order (src/data/gameRank.ts), with each confusable's
 * partner pulled right behind it so you practise telling them apart. Slip up
 * at most once and you still advance. Every 10 levels there's a look-alike
 * "exam". There's also a free "Consolidar" mode to drill what you already know.
 * No sound — feedback is purely visual.
 */

const BASE_PAIRS = 5; // level 1 = 5 pairs
const MAX_PAIRS = 9; // board caps at 9 pairs; then it becomes a sliding window
const MAX_MISTAKES = 1; // you may miss this many and still level up
const BOSS_EVERY = 10; // a look-alike exam every N levels
const BOSS_DUELS = 5; // how many duels the exam asks
const STORAGE_KEY = "namibia-game-v1";

/**
 * Which slice of the ranked pool a level shows.
 * Levels grow 5,6,7,8,9 pairs; once at 9 the window slides one animal at a
 * time toward the harder end until it reaches the last animal.
 */
function levelWindow(level: number, poolLen: number) {
  const want = level + (BASE_PAIRS - 1); // 5, 6, 7, …
  const end = Math.min(want, poolLen);
  const count = Math.min(want, MAX_PAIRS, poolLen);
  const start = end - count;
  return { start, end, count };
}

const WIN_CHEERS = [
  "¡Toma! / Nailed it!",
  "¡Crack! / Nice!",
  "¡Eso es! / Yes!",
  "¡Máquina! / Boom!",
  "¡Olé! / Got it!",
];
const FAIL_GROANS = [
  "¡Casi! / Almost!",
  "¡Uy, no! / Nope!",
  "Ese no… / Not that one…",
  "¡Ojo! / Careful!",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** A short reinforcing snippet shown when you match an animal. */
function rewardLine(a: Animal): string {
  return a.funFacts?.[0] ?? a.distinguish ?? a.description ?? "";
}

type Saved = { level: number; mastered: string[] };

function loadSaved(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<Saved>;
      return {
        level: typeof p.level === "number" && p.level >= 1 ? p.level : 1,
        mastered: Array.isArray(p.mastered) ? p.mastered : [],
      };
    }
  } catch {
    /* private mode / disabled storage — just start fresh */
  }
  return { level: 1, mastered: [] };
}

function saveSaved(s: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore — progress just won't persist */
  }
}

type Card = { uid: string; animalId: string; matched: boolean };
const toCard = (a: Animal): Card => ({
  uid: a.id,
  animalId: a.id,
  matched: false,
});

type Selection = { col: "name" | "image"; uid: string } | null;
type Status = "start" | "playing" | "won";
type Mode = "campaign" | "consolidate";
type Phase = "explain" | "duel" | "board";
type Outcome = null | { kind: "advanced" | "retry" | "consolidate" };
// A look-alike face-off: pick which photo is `askId`, then reveal the diff.
type Duel = { askId: string; diff: string; order: string[] };

function toDuel(c: { a: string; b: string; diff: string }): Duel {
  const askId = Math.random() < 0.5 ? c.a : c.b;
  return { askId, diff: c.diff, order: shuffle([c.a, c.b]) };
}

export function MatchGame({ animals }: { animals: Animal[] }) {
  const animalById = useMemo(
    () => new Map(animals.map((a) => [a.id, a])),
    [animals],
  );

  // Game order: worth-learning-first, but each confusable's partner is pulled
  // to immediately follow it, so look-alikes share a board and get practised.
  const pool = useMemo(() => {
    const ranked = animalGameRank
      .map((r) => animalById.get(r.id))
      .filter((a): a is Animal => Boolean(a));
    const partner = new Map<string, string>();
    for (const c of confusables) {
      partner.set(c.a, c.b);
      partner.set(c.b, c.a);
    }
    const placed = new Set<string>();
    const seq: Animal[] = [];
    for (const a of ranked) {
      if (placed.has(a.id)) continue;
      seq.push(a);
      placed.add(a.id);
      const p = partner.get(a.id);
      const partnerAnimal = p ? animalById.get(p) : undefined;
      if (partnerAnimal && !placed.has(partnerAnimal.id)) {
        seq.push(partnerAnimal);
        placed.add(partnerAnimal.id);
      }
    }
    return seq;
  }, [animalById]);

  const maxLevel = Math.max(1, pool.length - (BASE_PAIRS - 1));

  // The look-alike duel(s) introduced at each level (when the second of a pair
  // first appears on the board).
  const duelsByLevel = useMemo(() => {
    const pos = new Map(pool.map((a, i) => [a.id, i]));
    const byLevel = new Map<number, { a: string; b: string; diff: string }[]>();
    for (const c of confusables) {
      const pa = pos.get(c.a);
      const pb = pos.get(c.b);
      if (pa === undefined || pb === undefined) continue;
      const lvl = Math.max(1, Math.max(pa, pb) - (BASE_PAIRS - 2));
      const list = byLevel.get(lvl) ?? [];
      list.push(c);
      byLevel.set(lvl, list);
    }
    return byLevel;
  }, [pool]);

  const [saved] = useState<Saved>(() => loadSaved());
  const [mastered, setMastered] = useState<Set<string>>(
    () => new Set(saved.mastered),
  );
  const [status, setStatus] = useState<Status>("start");
  const [mode, setMode] = useState<Mode>("campaign");
  const [phase, setPhase] = useState<Phase>("board");
  const [level, setLevel] = useState(1);
  const [boardSize, setBoardSize] = useState(BASE_PAIRS);
  const [nameCards, setNameCards] = useState<Card[]>([]);
  const [imageCards, setImageCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Selection>(null);
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  const [revealUid, setRevealUid] = useState<string | null>(null);
  const [missedIds, setMissedIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [toast, setToast] = useState("");
  const [reward, setReward] = useState("");
  const [outcome, setOutcome] = useState<Outcome>(null);
  // The new animal to explain before the test, if any.
  const [explainAnimal, setExplainAnimal] = useState<Animal | null>(null);
  // Duels to clear before the board (a single look-alike, or the boss exam).
  const [duels, setDuels] = useState<Duel[]>([]);
  const [duelIdx, setDuelIdx] = useState(0);
  const [duelAnswer, setDuelAnswer] = useState<null | boolean>(null);
  const [isBoss, setIsBoss] = useState(false);

  function resetBoardState() {
    setSelected(null);
    setWrongPair([]);
    setRevealUid(null);
    setMissedIds(new Set());
    setMistakes(0);
    setMatchedCount(0);
    setOutcome(null);
    setToast("");
    setReward("");
    setDuelIdx(0);
    setDuelAnswer(null);
  }

  function dealLevel(lvl: number, review: Set<string>, fresh: boolean) {
    const { start, end } = levelWindow(lvl, pool.length);
    const chosen = pool.slice(start, end);
    setNameCards(shuffle(chosen.map(toCard)));
    setImageCards(shuffle(chosen.map(toCard)));
    setBoardSize(chosen.length);
    setReviewIds(review);

    const boss = fresh && lvl % BOSS_EVERY === 0;
    const queue: Duel[] = !fresh
      ? []
      : boss
        ? shuffle(confusables)
            .slice(0, Math.min(BOSS_DUELS, confusables.length))
            .map(toDuel)
        : (duelsByLevel.get(lvl) ?? []).map(toDuel);
    setDuels(queue);
    setIsBoss(boss && queue.length > 0);

    // Explain the newly-introduced animal before the test (campaign only).
    const newAnimal = fresh ? (pool[end - 1] ?? null) : null;
    setExplainAnimal(newAnimal);

    resetBoardState();
    setPhase(newAnimal ? "explain" : queue.length ? "duel" : "board");
  }

  function dealConsolidate() {
    const ids = shuffle([...mastered]);
    const chosen = ids
      .slice(0, Math.min(MAX_PAIRS, ids.length))
      .map((id) => animalById.get(id))
      .filter((a): a is Animal => Boolean(a));
    setNameCards(shuffle(chosen.map(toCard)));
    setImageCards(shuffle(chosen.map(toCard)));
    setBoardSize(chosen.length);
    setReviewIds(new Set());
    setDuels([]);
    setIsBoss(false);
    setExplainAnimal(null);
    resetBoardState();
    setPhase("board");
  }

  function startCampaign(fromLevel: number) {
    setMode("campaign");
    setLevel(fromLevel);
    setStatus("playing");
    dealLevel(fromLevel, new Set(), true);
  }

  function startConsolidate() {
    setMode("consolidate");
    setStatus("playing");
    dealConsolidate();
  }

  function backToMenu() {
    setStatus("start");
    setMode("campaign");
  }

  const currentDuel =
    phase === "duel" && duelIdx < duels.length ? duels[duelIdx] : null;

  function answerDuel(pickedId: string) {
    if (!currentDuel || duelAnswer !== null) return;
    setDuelAnswer(pickedId === currentDuel.askId);
  }

  function nextDuel() {
    if (duelIdx >= duels.length - 1) {
      setPhase("board");
    } else {
      setDuelAnswer(null);
      setDuelIdx((i) => i + 1);
    }
  }

  function proceedFromExplain() {
    setPhase(duels.length ? "duel" : "board");
  }

  function finishBoard() {
    if (mode === "consolidate") {
      setOutcome({ kind: "consolidate" });
      return;
    }
    const advanced = mistakes <= MAX_MISTAKES;
    if (advanced) {
      const { start, end } = levelWindow(level, pool.length);
      const chosen = pool.slice(start, end);
      setMastered((prev) => {
        const next = new Set(prev);
        chosen.forEach((a) => next.add(a.id));
        saveSaved({
          level: Math.min(level + 1, maxLevel),
          mastered: [...next],
        });
        return next;
      });
      if (level >= maxLevel) {
        setTimeout(() => setStatus("won"), 700);
        return;
      }
    }
    setOutcome({ kind: advanced ? "advanced" : "retry" });
  }

  function handleCard(col: "name" | "image", card: Card) {
    if (card.matched || outcome) return;

    if (!selected) {
      setSelected({ col, uid: card.uid });
      return;
    }
    if (selected.col === col) {
      setSelected({ col, uid: card.uid });
      return;
    }

    const otherCards = selected.col === "name" ? nameCards : imageCards;
    const other = otherCards.find((c) => c.uid === selected.uid);
    if (!other) {
      setSelected({ col, uid: card.uid });
      return;
    }

    if (other.animalId === card.animalId) {
      const animal = animalById.get(card.animalId);
      const mark = (cards: Card[]) =>
        cards.map((c) =>
          c.animalId === card.animalId ? { ...c, matched: true } : c,
        );
      setNameCards(mark);
      setImageCards(mark);
      setSelected(null);
      setToast(pick(WIN_CHEERS));
      if (animal) setReward(`${animal.commonName} · ${rewardLine(animal)}`);

      const newCount = matchedCount + 1;
      setMatchedCount(newCount);
      if (newCount === boardSize) finishBoard();
    } else {
      const photoCard = col === "image" ? card : other;
      setMistakes((m) => m + 1);
      setMissedIds((s) => new Set(s).add(photoCard.animalId));
      setWrongPair([selected.uid, card.uid]);
      setRevealUid(photoCard.uid);
      setToast(pick(FAIL_GROANS));
      setSelected(null);
      setTimeout(() => setWrongPair([]), 450);
      setTimeout(() => setRevealUid(null), 1300);
    }
  }

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1100);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!reward) return;
    const t = setTimeout(() => setReward(""), 3600);
    return () => clearTimeout(t);
  }, [reward]);

  if (pool.length < BASE_PAIRS) {
    return (
      <p className="empty">
        No hay suficientes animales para el juego ahora mismo.
      </p>
    );
  }

  const masteredCount = mastered.size;

  // ----------------------------- start screen -----------------------------
  if (status === "start") {
    const resume = Math.min(Math.max(saved.level, 1), maxLevel);
    const canConsolidate = masteredCount >= BASE_PAIRS;
    return (
      <section className="game game-intro">
        <h2 className="game-title">Empareja y aprende 🦁</h2>
        <p className="game-lead">
          Une cada <strong>nombre</strong> (español e inglés) con su{" "}
          <strong>foto</strong>. Cada nivel te presenta un animal nuevo, te
          reta con un <strong>duelo</strong> si tiene un primo parecido y luego
          a emparejar. Aprendes primero los más fáciles y vistos; falla como
          mucho uno y subes. Cada {BOSS_EVERY} niveles, examen de parecidos. 🐘🦓🦒
        </p>
        <div className="game-cta">
          <button className="game-btn game-btn-big" onClick={() => startCampaign(1)}>
            Empezar de cero
          </button>
          {resume > 1 && (
            <button
              className="game-btn game-btn-ghost"
              onClick={() => startCampaign(resume)}
            >
              Seguir en nivel {resume}
            </button>
          )}
        </div>
        <div className="game-cta">
          <button
            className="game-btn game-btn-ghost"
            onClick={startConsolidate}
            disabled={!canConsolidate}
            title={
              canConsolidate
                ? undefined
                : `Necesitas dominar al menos ${BASE_PAIRS} animales`
            }
          >
            🔁 Consolidar (repaso al azar)
          </button>
        </div>
        {masteredCount > 0 && (
          <p className="game-learned">
            Llevas <strong>{masteredCount}</strong> de {pool.length} animales
            dominados.
          </p>
        )}
      </section>
    );
  }

  // ------------------------------- you won --------------------------------
  if (status === "won") {
    return (
      <section className="game game-intro">
        <div className="game-confetti" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="confetti-bit"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.8}s`,
                background: ["#b0543b", "#6d6f44", "#caa15a", "#6f5c43"][i % 4],
              }}
            />
          ))}
        </div>
        <h2 className="game-title">¡Te los sabes todos! 🏆</h2>
        <p className="game-lead">
          Has superado los {maxLevel} niveles y dominado los {pool.length}{" "}
          animales del juego. Llegas a Namibia hecho un <em>ranger</em>. 🛻🦒
        </p>
        <button className="game-btn game-btn-big" onClick={() => startCampaign(1)}>
          Jugar otra vez
        </button>
      </section>
    );
  }

  // ---------------------------- explain phase -----------------------------
  if (phase === "explain" && explainAnimal) {
    const a = explainAnimal;
    return (
      <section className="game game-explain">
        <div className="game-explain-tag">Nivel {level} · Nuevo animal</div>
        <div className="game-explain-photo">
          <AnimalImage src={a.image} alt={a.commonName} />
        </div>
        <h2 className="game-explain-name">{a.commonName}</h2>
        {a.commonNameEn && (
          <div className="game-explain-en">{a.commonNameEn}</div>
        )}
        {a.scientificName && (
          <div className="game-explain-sci">{a.scientificName}</div>
        )}
        {a.description && <p className="game-explain-desc">{a.description}</p>}
        {a.distinguish && (
          <p className="game-explain-diff">
            <strong>Cómo reconocerlo:</strong> {a.distinguish}
          </p>
        )}
        <button className="game-btn game-btn-big" onClick={proceedFromExplain}>
          {duels.length ? "Hacer el test →" : "Empezar nivel →"}
        </button>
      </section>
    );
  }

  // ------------------------------ duel phase ------------------------------
  if (phase === "duel" && currentDuel) {
    const ask = animalById.get(currentDuel.askId)!;
    const answered = duelAnswer !== null;
    const last = duelIdx === duels.length - 1;
    return (
      <section className="game game-duel">
        <div className="game-duel-head">
          <span className="game-duel-tag">
            {isBoss ? "🏆 Examen de parecidos" : "⚔️ Duelo de parecidos"}
          </span>
          {duels.length > 1 && (
            <span className="game-duel-count">
              {duelIdx + 1} / {duels.length}
            </span>
          )}
        </div>
        <p className="game-duel-q">
          ¿Cuál es el <strong>{ask.commonName}</strong>
          {ask.commonNameEn ? ` (${ask.commonNameEn})` : ""}?
        </p>
        <div className="game-duel-pair">
          {currentDuel.order.map((id) => {
            const a = animalById.get(id)!;
            const isCorrect = id === currentDuel.askId;
            const cls = answered ? (isCorrect ? "is-right" : "is-wrong") : "";
            return (
              <button
                key={id}
                className={`game-duel-photo ${cls}`}
                disabled={answered}
                onClick={() => answerDuel(id)}
                aria-label={answered ? a.commonName : "elige este"}
              >
                <AnimalImage src={a.image} alt="" />
                {answered && (
                  <span className="game-duel-photo-name">{a.commonName}</span>
                )}
              </button>
            );
          })}
        </div>

        {answered ? (
          <>
            <p className={`game-duel-verdict ${duelAnswer ? "ok" : "no"}`}>
              {duelAnswer ? "¡Correcto! 🎯" : "Casi… fíjate bien 👇"}
            </p>
            <p className="game-duel-diff">{currentDuel.diff}</p>
            <button className="game-btn game-btn-big" onClick={nextDuel}>
              {last
                ? isBoss
                  ? "Al tablero →"
                  : "Empezar nivel →"
                : "Siguiente →"}
            </button>
          </>
        ) : (
          <p className="game-duel-hint">Toca la foto correcta.</p>
        )}
      </section>
    );
  }

  // ------------------------------ the board -------------------------------
  const advanced = outcome?.kind === "advanced";
  return (
    <section className="game">
      <div className="game-hud">
        <span className="game-level">
          {mode === "consolidate" ? "🔁 Consolidar" : `Nivel ${level}`}
        </span>
        <span className="game-progress">
          {matchedCount} / {boardSize} parejas
        </span>
        <span
          className={`game-mistakes ${mistakes > 0 ? "has-miss" : ""}`}
          aria-label={`${mistakes} fallos`}
        >
          {mistakes === 0 ? "✨ pleno" : `✕ ${mistakes}`}
        </span>
        <button className="game-exit" onClick={backToMenu}>
          ✕ Salir
        </button>
      </div>

      <div className="game-toast" aria-live="polite">
        {toast}
      </div>

      {outcome ? (
        <div className="game-overlay">
          {outcome.kind === "consolidate" ? (
            <>
              <p className="game-overlay-title">¡Ronda completada! 🔁</p>
              <p className="game-overlay-sub">
                {mistakes === 0
                  ? "Sin fallos. ¡Crack!"
                  : `Con ${mistakes} ${mistakes === 1 ? "fallo" : "fallos"}.`}
              </p>
              <div className="game-cta">
                <button
                  className="game-btn game-btn-big"
                  onClick={dealConsolidate}
                >
                  Otra ronda 🔁
                </button>
                <button className="game-btn game-btn-ghost" onClick={backToMenu}>
                  Salir
                </button>
              </div>
            </>
          ) : advanced ? (
            <>
              <div className="game-confetti" aria-hidden="true">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className="confetti-bit"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 0.7}s`,
                      background: ["#b0543b", "#6d6f44", "#caa15a", "#6f5c43"][
                        i % 4
                      ],
                    }}
                  />
                ))}
              </div>
              <p className="game-overlay-title">¡Nivel {level} superado! 🎉</p>
              <p className="game-overlay-sub">
                {mistakes === 0
                  ? "¡Sin fallos! ¡Toca uno más!"
                  : "Con un fallito, pero válido. ¡A por el siguiente!"}
              </p>
              <button
                className="game-btn game-btn-big"
                onClick={() => {
                  const next = level + 1;
                  setLevel(next);
                  dealLevel(next, new Set(), true);
                }}
              >
                Nivel {level + 1} →
              </button>
            </>
          ) : (
            <>
              <p className="game-overlay-title">
                Demasiados fallos ({mistakes}) 😅
              </p>
              <p className="game-overlay-sub">
                Para subir puedes fallar como mucho {MAX_MISTAKES}. Repetimos y
                repasamos los que se te atragantaron.
              </p>
              <button
                className="game-btn game-btn-big"
                onClick={() => dealLevel(level, missedIds, false)}
              >
                Repetir nivel {level} ↻
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="game-board">
          <div className="game-side">
            <div className="game-col-label">Nombres</div>
            <div className="game-names">
              {nameCards.map((c) => {
                const a = animalById.get(c.animalId)!;
                const isSel = selected?.col === "name" && selected.uid === c.uid;
                const isWrong = wrongPair.includes(c.uid);
                const review = reviewIds.has(c.animalId) && !c.matched;
                return (
                  <button
                    key={`n-${c.uid}`}
                    className={`game-name ${c.matched ? "is-matched" : ""} ${
                      isSel ? "is-selected" : ""
                    } ${isWrong ? "is-wrong" : ""} ${review ? "is-review" : ""}`}
                    disabled={c.matched}
                    onClick={() => handleCard("name", c)}
                  >
                    <span className="game-name-es">{a.commonName}</span>
                    {a.commonNameEn && (
                      <span className="game-name-en">{a.commonNameEn}</span>
                    )}
                    {review && <span className="game-review-tag">repasa</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="game-side">
            <div className="game-col-label">Fotos</div>
            <div className="game-photos">
              {imageCards.map((c) => {
                const a = animalById.get(c.animalId)!;
                const isSel =
                  selected?.col === "image" && selected.uid === c.uid;
                const isWrong = wrongPair.includes(c.uid);
                const reveal = revealUid === c.uid;
                return (
                  <button
                    key={`i-${c.uid}`}
                    className={`game-photo ${c.matched ? "is-matched" : ""} ${
                      isSel ? "is-selected" : ""
                    } ${isWrong ? "is-wrong" : ""}`}
                    disabled={c.matched}
                    onClick={() => handleCard("image", c)}
                    aria-label={c.matched ? a.commonName : "¿Qué animal es?"}
                  >
                    <AnimalImage src={a.image} alt="" />
                    {(c.matched || reveal) && (
                      <span className="game-photo-name">{a.commonName}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {reward && !outcome && (
        <div className="game-reward" aria-live="polite">
          💡 {reward}
        </div>
      )}

      <div className="game-hint">
        Toca un nombre y luego su foto (o al revés). Al fallar te enseño cuál
        era.
      </div>
    </section>
  );
}
