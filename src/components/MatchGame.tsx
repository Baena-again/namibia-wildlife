import { useEffect, useMemo, useState } from "react";
import type { Animal } from "../types";
import { AnimalImage } from "./AnimalImage";
import { animalGameRank } from "../data/gameRank";
import { confusables } from "../data/confusables";

/**
 * "Empareja y aprende" — a silly-but-educational matching mini-game to learn
 * Namibia's wildlife before the trip.
 *
 * You match each name card (always shown in Spanish AND English) with its
 * photo. Animals are introduced in "worth-learning-first" order (a mixed score
 * of how easy each is to learn × how often you actually see it on safari, see
 * src/data/gameRank.ts). Level 1 has 5 pairs and every level adds one more.
 *
 * The twists that make it teach rather than just test:
 *  - Miss a pair → the correct name flashes on the photo for a moment, so a
 *    mistake teaches you instead of only punishing.
 *  - Match a pair → a quick fun-fact / "how to tell it apart" card pops up.
 *  - Clear a level perfectly to advance; slip up and you replay it, with the
 *    ones you missed flagged "repasa" (review-focused, not blind repetition).
 *  - No sound — feedback is purely visual (respects prefers-reduced-motion).
 */

const BASE_PAIRS = 5; // level 1 = 5 pairs
const MAX_PAIRS = 9; // board caps at 9 pairs; then it becomes a sliding window
const STORAGE_KEY = "namibia-game-v1";

/**
 * Which slice of the ranked pool a level shows.
 * Levels grow 5,6,7,8,9 pairs; once at 9 the window slides one animal at a
 * time toward the harder end — each new level adds the next (harder) animal
 * and drops the oldest (easiest) one — until it reaches the last animal.
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
type Selection = { col: "name" | "image"; uid: string } | null;
type Status = "start" | "playing" | "won";
// A look-alike face-off shown before a level when both animals are on the
// board: ask which photo is `askId`, then reveal the differences.
type Duel = {
  askId: string;
  otherId: string;
  diff: string;
  order: string[]; // the two photos, in display order
};

export function MatchGame({ animals }: { animals: Animal[] }) {
  const animalById = useMemo(
    () => new Map(animals.map((a) => [a.id, a])),
    [animals],
  );

  // Animals available to the game, ordered most-worth-learning-first.
  const pool = useMemo(
    () =>
      animalGameRank
        .map((r) => animalById.get(r.id))
        .filter((a): a is Animal => Boolean(a)),
    [animalById],
  );

  const maxLevel = Math.max(1, pool.length - (BASE_PAIRS - 1));

  // Which look-alike duels fire at each level. A pair's duel is shown at the
  // level that introduces the *later* (harder/rarer) of the two — i.e. when
  // you first meet the look-alike — even if its partner isn't on this board,
  // because the two are rarely close enough in the ranking to share one.
  const duelsByLevel = useMemo(() => {
    const pos = new Map(pool.map((a, i) => [a.id, i]));
    const byLevel = new Map<number, { a: string; b: string; diff: string }[]>();
    for (const c of confusables) {
      const pa = pos.get(c.a);
      const pb = pos.get(c.b);
      if (pa === undefined || pb === undefined) continue;
      // Level whose newly-introduced animal is the later member.
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
  const [level, setLevel] = useState(1);
  const [nameCards, setNameCards] = useState<Card[]>([]);
  const [imageCards, setImageCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Selection>(null);
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  // The photo card currently flashing its correct name after a miss.
  const [revealUid, setRevealUid] = useState<string | null>(null);
  // Animals missed during this attempt at the level → flagged "repasa" on retry.
  const [missedIds, setMissedIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [toast, setToast] = useState("");
  const [reward, setReward] = useState("");
  // Set once a level is finished: did the player earn the next level?
  const [outcome, setOutcome] = useState<null | { advanced: boolean }>(null);
  // Look-alike duels to clear before the board starts, and the current one.
  const [duels, setDuels] = useState<Duel[]>([]);
  const [duelIdx, setDuelIdx] = useState(0);
  // null = awaiting answer; otherwise whether the player picked correctly.
  const [duelAnswer, setDuelAnswer] = useState<null | boolean>(null);

  const pairsThisLevel = levelWindow(level, pool.length).count;

  function dealLevel(lvl: number, review: Set<string>, withDuels: boolean) {
    const { start, end } = levelWindow(lvl, pool.length);
    const chosen = pool.slice(start, end);
    const make = (a: Animal): Card => ({
      uid: a.id,
      animalId: a.id,
      matched: false,
    });
    setNameCards(shuffle(chosen.map(make)));
    setImageCards(shuffle(chosen.map(make)));
    setReviewIds(review);

    // Build the duel queue for this level (look-alikes introduced here).
    const queue: Duel[] = withDuels
      ? (duelsByLevel.get(lvl) ?? []).map((c) => {
          const askId = Math.random() < 0.5 ? c.a : c.b;
          const otherId = askId === c.a ? c.b : c.a;
          return { askId, otherId, diff: c.diff, order: shuffle([c.a, c.b]) };
        })
      : [];
    setDuels(queue);
    setDuelIdx(0);
    setDuelAnswer(null);

    setSelected(null);
    setWrongPair([]);
    setRevealUid(null);
    setMissedIds(new Set());
    setMistakes(0);
    setMatchedCount(0);
    setOutcome(null);
    setToast("");
    setReward("");
  }

  function startGame(fromLevel: number) {
    setLevel(fromLevel);
    setStatus("playing");
    dealLevel(fromLevel, new Set(), true);
  }

  // We're in the duel phase while there are unfinished duels queued.
  const inDuel = duels.length > 0 && duelIdx < duels.length;
  const currentDuel = inDuel ? duels[duelIdx] : null;

  function answerDuel(pickedId: string) {
    if (!currentDuel || duelAnswer !== null) return;
    setDuelAnswer(pickedId === currentDuel.askId);
  }

  function nextDuel() {
    setDuelAnswer(null);
    setDuelIdx((i) => i + 1);
  }

  function handleCard(col: "name" | "image", card: Card) {
    if (card.matched || outcome) return;

    if (!selected) {
      setSelected({ col, uid: card.uid });
      return;
    }
    // Re-clicking within the same column moves the selection.
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
      // Hit!
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
      if (newCount === pairsThisLevel) finishLevel();
    } else {
      // Miss — reveal the correct name on the photo the player pointed at.
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

  function finishLevel() {
    const perfect = mistakes === 0;
    if (perfect) {
      // Mark this level's animals as mastered.
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
    setOutcome({ advanced: perfect });
  }

  function nextOrRetry() {
    if (!outcome) return;
    if (outcome.advanced) {
      const next = level + 1;
      setLevel(next);
      dealLevel(next, new Set(), true);
    } else {
      // Replay the same level; flag the ones we missed as "repasa".
      // No duels on a retry — they were just shown.
      dealLevel(level, missedIds, false);
    }
  }

  // Auto-clear the cheer/groan toast shortly after it shows.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1100);
    return () => clearTimeout(t);
  }, [toast]);

  // Reward card lingers a touch longer so the fact can be read.
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

  if (status === "start") {
    const resume = Math.min(Math.max(saved.level, 1), maxLevel);
    return (
      <section className="game game-intro">
        <h2 className="game-title">Empareja y aprende 🦁</h2>
        <p className="game-lead">
          Une cada <strong>nombre</strong> (español e inglés) con su{" "}
          <strong>foto</strong>. Aprenderás primero los animales que más se ven
          y más fáciles son de reconocer en Namibia. Empiezas con 5 y el
          tablero crece hasta 9; luego van entrando los más difíciles y saliendo
          los más fáciles, hasta dominarlos todos. ¿Fallas? Te enseña la
          respuesta y, para subir, tendrás que clavar el nivel. 🐘🦓🦒
        </p>
        <div className="game-cta">
          <button
            className="game-btn game-btn-big"
            onClick={() => startGame(1)}
          >
            Empezar de cero
          </button>
          {resume > 1 && (
            <button
              className="game-btn game-btn-ghost"
              onClick={() => startGame(resume)}
            >
              Seguir en nivel {resume}
            </button>
          )}
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
        <button className="game-btn game-btn-big" onClick={() => startGame(1)}>
          Jugar otra vez
        </button>
      </section>
    );
  }

  // Duel phase — shown before the level when look-alikes share the board.
  if (inDuel && currentDuel) {
    const ask = animalById.get(currentDuel.askId)!;
    const answered = duelAnswer !== null;
    const last = duelIdx === duels.length - 1;
    return (
      <section className="game game-duel">
        <div className="game-duel-head">
          <span className="game-duel-tag">⚔️ Duelo de parecidos</span>
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
            const cls = answered
              ? isCorrect
                ? "is-right"
                : "is-wrong"
              : "";
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
            <p
              className={`game-duel-verdict ${
                duelAnswer ? "ok" : "no"
              }`}
            >
              {duelAnswer ? "¡Correcto! 🎯" : "Casi… fíjate bien 👇"}
            </p>
            <p className="game-duel-diff">{currentDuel.diff}</p>
            <button className="game-btn game-btn-big" onClick={nextDuel}>
              {last ? "Empezar nivel →" : "Siguiente duelo →"}
            </button>
          </>
        ) : (
          <p className="game-duel-hint">Toca la foto correcta.</p>
        )}
      </section>
    );
  }

  return (
    <section className="game">
      <div className="game-hud">
        <span className="game-level">Nivel {level}</span>
        <span className="game-progress">
          {matchedCount} / {pairsThisLevel} parejas
        </span>
        <span
          className={`game-mistakes ${mistakes > 0 ? "has-miss" : ""}`}
          aria-label={`${mistakes} fallos`}
        >
          {mistakes === 0 ? "✨ pleno" : `✕ ${mistakes}`}
        </span>
        <span className="game-learned-mini">
          {masteredCount}/{pool.length} dominados
        </span>
      </div>

      <div className="game-toast" aria-live="polite">
        {toast}
      </div>

      {outcome ? (
        <div className="game-overlay">
          {outcome.advanced ? (
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
              <p className="game-overlay-title">¡Nivel {level} clavado! 🎉</p>
              <p className="game-overlay-sub">Sin fallos. ¡Toca uno más!</p>
              <button className="game-btn game-btn-big" onClick={nextOrRetry}>
                Nivel {level + 1} →
              </button>
            </>
          ) : (
            <>
              <p className="game-overlay-title">
                Nivel completado, pero con {mistakes}{" "}
                {mistakes === 1 ? "fallo" : "fallos"} 😅
              </p>
              <p className="game-overlay-sub">
                Para subir hay que hacerlo perfecto. Repetimos y repasamos los
                que se te atragantaron.
              </p>
              <button className="game-btn game-btn-big" onClick={nextOrRetry}>
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
              const isSel =
                selected?.col === "name" && selected.uid === c.uid;
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
