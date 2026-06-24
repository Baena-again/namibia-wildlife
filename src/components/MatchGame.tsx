import { useEffect, useMemo, useRef, useState } from "react";
import type { Animal } from "../types";
import { AnimalImage } from "./AnimalImage";

/**
 * "Empareja el bicho" — a silly little matching mini-game.
 *
 * You match each name card (shown in Spanish AND English) with its photo.
 * Level 1 has 5 pairs and every level adds one more animal, drawn from an
 * easy → hard list of recognisable big mammals first. Make a mistake and you
 * don't level up: you replay the same level (reshuffled).
 */

/**
 * Animals used by the game, ordered from "everyone knows it" to trickier.
 * Level N uses the first (N + 4) of these, so the easy icons are always in
 * and harder ones get added as you climb. Ids must exist in the catalogue;
 * any that don't are silently skipped.
 */
const GAME_ORDER = [
  "african-elephant",
  "giraffe",
  "plains-zebra",
  "lion",
  "hippopotamus",
  "black-rhinoceros",
  "cheetah",
  "leopard",
  "african-buffalo",
  "springbok",
  "oryx-gemsbok",
  "warthog",
  "kudu",
  "blue-wildebeest",
  "ostrich",
  "greater-flamingo",
  "meerkat",
  "spotted-hyena",
  "impala",
  "chacma-baboon",
];

const BASE_PAIRS = 5; // level 1 = 5 pairs

const WIN_CHEERS = [
  "¡Toma! / Nailed it!",
  "¡Crack! / Nice!",
  "¡Eso es! / Yes!",
  "¡Máquina! / Boom!",
  "¡Olé! / Got it!",
];
const FAIL_GROANS = [
  "¡Casi! / Almost!",
  "¡Uy! / Nope!",
  "Ese no… / Not that one…",
  "¡Ñam, fallo! / Oops!",
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

/** Tiny Web Audio blips so the game feels juicy without bundling audio files. */
function useBeeper(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  return useMemo(() => {
    const play = (freq: number, dur: number, type: OscillatorType) => {
      if (muted) return;
      try {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!ctxRef.current) ctxRef.current = new Ctx();
        const ctx = ctxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + dur,
        );
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch {
        /* audio not available — no big deal for a silly game */
      }
    };
    return {
      good: () => {
        play(660, 0.12, "sine");
        setTimeout(() => play(990, 0.14, "sine"), 90);
      },
      bad: () => play(160, 0.25, "sawtooth"),
      win: () => {
        [523, 659, 784, 1047].forEach((f, i) =>
          setTimeout(() => play(f, 0.18, "triangle"), i * 110),
        );
      },
    };
  }, [muted]);
}

type Card = { uid: string; animalId: string; matched: boolean };
type Selection = { col: "name" | "image"; uid: string } | null;
type Status = "start" | "playing" | "won";

export function MatchGame({ animals }: { animals: Animal[] }) {
  const pool = useMemo(() => {
    const byId = new Map(animals.map((a) => [a.id, a]));
    return GAME_ORDER.map((id) => byId.get(id)).filter(
      (a): a is Animal => Boolean(a),
    );
  }, [animals]);

  const maxLevel = Math.max(1, pool.length - (BASE_PAIRS - 1));

  const [status, setStatus] = useState<Status>("start");
  const [level, setLevel] = useState(1);
  const [nameCards, setNameCards] = useState<Card[]>([]);
  const [imageCards, setImageCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Selection>(null);
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [toast, setToast] = useState<string>("");
  const [muted, setMuted] = useState(false);
  // Set once a level is finished: did the player earn the next level?
  const [outcome, setOutcome] = useState<null | { advanced: boolean }>(null);

  const beep = useBeeper(muted);

  const pairsThisLevel = Math.min(level + (BASE_PAIRS - 1), pool.length);

  function dealLevel(lvl: number) {
    const chosen = pool.slice(0, Math.min(lvl + (BASE_PAIRS - 1), pool.length));
    const make = (a: Animal): Card => ({
      uid: `${a.id}`,
      animalId: a.id,
      matched: false,
    });
    setNameCards(shuffle(chosen.map(make)));
    setImageCards(shuffle(chosen.map(make)));
    setSelected(null);
    setWrongPair([]);
    setMistakes(0);
    setMatchedCount(0);
    setOutcome(null);
    setToast("");
  }

  function startGame() {
    setLevel(1);
    setStatus("playing");
    dealLevel(1);
  }

  const animalById = useMemo(
    () => new Map(animals.map((a) => [a.id, a])),
    [animals],
  );

  function flashToast(msg: string) {
    setToast(msg);
  }

  function handleCard(col: "name" | "image", card: Card) {
    if (card.matched || outcome) return;

    // Nothing selected yet → just select this card.
    if (!selected) {
      setSelected({ col, uid: card.uid });
      return;
    }

    // Re-clicking within the same column moves the selection.
    if (selected.col === col) {
      setSelected({ col, uid: card.uid });
      return;
    }

    // Cross-column click → a match attempt.
    const otherCards = selected.col === "name" ? nameCards : imageCards;
    const other = otherCards.find((c) => c.uid === selected.uid);
    if (!other) {
      setSelected({ col, uid: card.uid });
      return;
    }

    if (other.animalId === card.animalId) {
      // Hit!
      beep.good();
      const mark = (cards: Card[], animalId: string) =>
        cards.map((c) =>
          c.animalId === animalId ? { ...c, matched: true } : c,
        );
      setNameCards((cs) => mark(cs, card.animalId));
      setImageCards((cs) => mark(cs, card.animalId));
      setSelected(null);
      flashToast(pick(WIN_CHEERS));
      const newCount = matchedCount + 1;
      setMatchedCount(newCount);
      if (newCount === pairsThisLevel) {
        const advanced = mistakes === 0 && level < maxLevel;
        beep.win();
        if (mistakes === 0 && level >= maxLevel) {
          setTimeout(() => setStatus("won"), 600);
        } else {
          setOutcome({ advanced });
        }
      }
    } else {
      // Miss.
      beep.bad();
      setMistakes((m) => m + 1);
      setWrongPair([selected.uid, card.uid]);
      flashToast(pick(FAIL_GROANS));
      setSelected(null);
      setTimeout(() => setWrongPair([]), 500);
    }
  }

  // Clear the toast a moment after it shows.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1100);
    return () => clearTimeout(t);
  }, [toast]);

  function nextOrRetry() {
    if (!outcome) return;
    if (outcome.advanced) {
      const next = level + 1;
      setLevel(next);
      dealLevel(next);
    } else {
      dealLevel(level); // replay same level, reshuffled
    }
  }

  if (pool.length < BASE_PAIRS) {
    return (
      <p className="empty">
        No hay suficientes animales para el juego ahora mismo.
      </p>
    );
  }

  if (status === "start") {
    return (
      <section className="game game-intro">
        <h2 className="game-title">Empareja el bicho</h2>
        <p className="game-lead">
          Une cada <strong>nombre</strong> (en español e inglés) con su{" "}
          <strong>foto</strong>. Empiezas con 5 animales y cada nivel suma uno
          más. ¿Fallas? No subes de nivel. Tan tonto como suena. 🦁🐘🦓
        </p>
        <button className="game-btn game-btn-big" onClick={startGame}>
          ¡A jugar! / Play
        </button>
      </section>
    );
  }

  if (status === "won") {
    return (
      <section className="game game-intro">
        <h2 className="game-title">¡Te los sabes todos! 🏆</h2>
        <p className="game-lead">
          Has superado los {maxLevel} niveles. Eres oficialmente un{" "}
          <em>ranger</em> de sofá. 🛋️🦒
        </p>
        <button className="game-btn game-btn-big" onClick={startGame}>
          Otra vez / Again
        </button>
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
        <span className="game-mistakes" aria-label={`${mistakes} fallos`}>
          {mistakes === 0 ? "✨ sin fallos" : "💩".repeat(mistakes)}
        </span>
        <button
          className="game-mute"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      <div className="game-toast" aria-live="polite">
        {toast}
      </div>

      {outcome ? (
        <div className="game-overlay">
          {outcome.advanced ? (
            <>
              <p className="game-overlay-title">
                ¡Nivel {level} superado! 🎉
              </p>
              <p className="game-overlay-sub">Sin fallos. ¡Sube uno más!</p>
              <button className="game-btn game-btn-big" onClick={nextOrRetry}>
                Nivel {level + 1} →
              </button>
            </>
          ) : (
            <>
              <p className="game-overlay-title">
                Completado, pero con {mistakes}{" "}
                {mistakes === 1 ? "fallo" : "fallos"} 😅
              </p>
              <p className="game-overlay-sub">
                Para subir de nivel hay que hacerlo perfecto. ¡Otra vez!
              </p>
              <button className="game-btn game-btn-big" onClick={nextOrRetry}>
                Repetir nivel {level} ↻
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="game-board">
          <div className="game-col game-col-names">
            {nameCards.map((c) => {
              const a = animalById.get(c.animalId)!;
              const isSel =
                selected?.col === "name" && selected.uid === c.uid;
              const isWrong = wrongPair.includes(c.uid);
              return (
                <button
                  key={`n-${c.uid}`}
                  className={`game-name ${c.matched ? "is-matched" : ""} ${
                    isSel ? "is-selected" : ""
                  } ${isWrong ? "is-wrong" : ""}`}
                  disabled={c.matched}
                  onClick={() => handleCard("name", c)}
                >
                  <span className="game-name-es">{a.commonName}</span>
                  {a.commonNameEn && (
                    <span className="game-name-en">{a.commonNameEn}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="game-col game-col-images">
            {imageCards.map((c) => {
              const a = animalById.get(c.animalId)!;
              const isSel =
                selected?.col === "image" && selected.uid === c.uid;
              const isWrong = wrongPair.includes(c.uid);
              return (
                <button
                  key={`i-${c.uid}`}
                  className={`game-photo ${c.matched ? "is-matched" : ""} ${
                    isSel ? "is-selected" : ""
                  } ${isWrong ? "is-wrong" : ""}`}
                  disabled={c.matched}
                  onClick={() => handleCard("image", c)}
                  aria-label="foto de animal"
                >
                  <AnimalImage src={a.image} alt="¿Qué animal es?" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="game-hint">
        Toca un nombre y luego su foto (o al revés).
      </div>
    </section>
  );
}
