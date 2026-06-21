import type { ZoneId } from "../types";

/** One stop of the trip — a single night / day in the travel logbook. */
export type ItineraryDay = {
  /** Stable id, also used as the journal key. */
  id: string;
  /** Sequential day number of the trip. */
  dayNumber: number;
  /** Short human date, e.g. "2 jul". */
  label: string;
  /** Headline for the day. */
  title: string;
  /** Where the day starts (where you wake up). */
  start: string;
  /** Where the day ends (that night's base). */
  end: string;
  /** The wildlife map zone this stop belongs to (omitted on transfer days). */
  zone?: ZoneId;
  /** What you'll be doing. */
  summary: string;
  /** Optional driving / logistics note. */
  driving?: string;
  /** Where you sleep, with a tappable phone number. */
  lodging?: { name: string; phone?: string };
  /** Optional booked activity / excursion contact for the day. */
  activity?: { name: string; phone?: string; url?: string };
  /** Animals you're realistically likely to see here (catalogue ids). */
  animalIds: string[];
};

/**
 * Our real July 2026 self-drive route (Windhoek round-trip), as a logbook.
 * Each day links to its wildlife zone and to the species most likely to appear.
 */
export const itinerary: ItineraryDay[] = [
  {
    id: "2026-07-02",
    dayNumber: 1,
    label: "2 jul",
    title: "Rumbo a Sossusvlei",
    start: "Windhoek (recogida del coche)",
    end: "Sesriem (Sossusvlei)",
    zone: "namib",
    summary:
      "Recogemos el coche en Windhoek y conducimos hasta el desierto del Namib. Noche en Sesriem para atacar Deadvlei a primera hora mañana.",
    driving: "Windhoek → Sesriem, ~6 h de carretera y grava.",
    lodging: { name: "Sossus Oasis Campsite (Sesriem)", phone: "+264 63 293 636" },
    animalIds: [
      "oryx-gemsbok",
      "springbok",
      "ostrich",
      "dune-lark",
      "sociable-weaver",
      "pale-chanting-goshawk",
      "bat-eared-fox",
    ],
  },
  {
    id: "2026-07-03",
    dayNumber: 2,
    label: "3 jul",
    title: "Deadvlei y dunas rojas",
    start: "Sesriem",
    end: "Namib (Bushman's, norte de Solitaire)",
    zone: "namib",
    summary:
      "Amanecer en Deadvlei y Dune 45, café en Solitaire y tarde de desierto. Cielo estrellado sin nada de contaminación lumínica.",
    driving: "Sesriem → Bushman's Desert Camp, ~3 h + paradas en el desierto.",
    lodging: {
      name: "Bushman's Desert Camp (Sossus-on-Foot)",
      phone: "+264 81 294 3755",
    },
    animalIds: [
      "oryx-gemsbok",
      "kudu",
      "hartmanns-mountain-zebra",
      "klipspringer",
      "rock-hyrax",
      "steenbok",
      "ostrich",
    ],
  },
  {
    id: "2026-07-04",
    dayNumber: 3,
    label: "4 jul",
    title: "Bajada a Walvis Bay",
    start: "Namib / Solitaire",
    end: "Walvis Bay",
    zone: "costa",
    summary:
      "Vemos el desierto de camino a la costa atlántica. Laguna Ramsar de Walvis Bay con flamencos y pelícanos; Pelican Point con lobos marinos y delfines.",
    driving: "Namib → Walvis Bay, ~3 h por la C14, paisaje lunar; depósito lleno.",
    lodging: { name: "The Rez Guesthouse", phone: "+264 81 245 3244" },
    animalIds: [
      "greater-flamingo",
      "flamingo",
      "white-pelican",
      "cape-fur-seal",
      "heavisides-dolphin",
      "atlantic-bottlenose-dolphin",
      "cape-cormorant",
      "damara-tern",
    ],
  },
  {
    id: "2026-07-05",
    dayNumber: 4,
    label: "5 jul",
    title: "Excursión 4x4 (Sandwich Harbour)",
    start: "Walvis Bay",
    end: "Walvis Bay",
    zone: "costa",
    summary:
      "Día de conducción off-road a Sandwich Harbour, donde las dunas gigantes caen al mar. Aves marinas, focas y, en pleno invierno austral, posible ballena franca austral.",
    lodging: { name: "The Rez Guesthouse", phone: "+264 81 245 3244" },
    activity: {
      name: "Excursión 4x4 — Dominus Dune Tours (ref. Tso 01500)",
      phone: "+264 81 633 5151",
      url: "https://dominusdunedtours.com",
    },
    animalIds: [
      "southern-right-whale",
      "cape-fur-seal",
      "greater-flamingo",
      "white-pelican",
      "ghost-crab",
      "black-backed-jackal",
      "brown-hyena",
    ],
  },
  {
    id: "2026-07-06",
    dayNumber: 5,
    label: "6 jul",
    title: "Walvis Bay + Swakopmund",
    start: "Walvis Bay",
    end: "Swakopmund",
    zone: "costa",
    summary:
      "Salto corto a Swakopmund. Buen día para un Living Desert Tour y encontrar a los 'little five': geco, camaleón, víbora sidewinder, escarabajo y araña de las dunas.",
    driving: "Walvis Bay → Swakopmund, ~30 min por la costa.",
    lodging: { name: "Desert Breeze Lodge", phone: "+264 64 406 236" },
    animalIds: [
      "gecko-del-namib",
      "camaleon",
      "vibora-del-desierto",
      "escarabajo-del-desierto",
      "arana-del-desierto",
      "escorpion-del-desierto",
      "lagarto-del-desierto",
    ],
  },
  {
    id: "2026-07-07",
    dayNumber: 6,
    label: "7 jul",
    title: "Cape Cross y Spitzkoppe",
    start: "Swakopmund",
    end: "Spitzkoppe",
    zone: "kaokoland",
    summary:
      "Subimos a Cape Cross, una de las mayores colonias de lobos marinos del mundo (miles de focas). Por la tarde, los inselbergs de granito de Spitzkoppe: el 'Matterhorn de Namibia', con recorridos de estrellas.",
    driving: "Swakopmund → Cape Cross → Spitzkoppe, ~3 h.",
    lodging: {
      name: "Spitzkoppe Community Rest Camp",
      phone: "+264 81 850 2566",
    },
    animalIds: [
      "cape-fur-seal",
      "rock-hyrax",
      "klipspringer",
      "hartmanns-mountain-zebra",
      "rosy-faced-lovebird",
      "pale-chanting-goshawk",
    ],
  },
  {
    id: "2026-07-08",
    dayNumber: 7,
    label: "8 jul",
    title: "Twyfelfontein y Damaraland",
    start: "Spitzkoppe",
    end: "Damaraland — Granietkop (Twyfelfontein)",
    zone: "kaokoland",
    summary:
      "Pinturas rupestres de Twyfelfontein (Patrimonio de la Humanidad) y búsqueda del elefante del desierto por los cauces secos. Territorio también del rinoceronte negro: avistamientos de premio, con paciencia.",
    driving: "Spitzkoppe → Twyfelfontein / Granietkop, ~3 h.",
    lodging: { name: "Granietkop Campsite", phone: "+264 61 248 137" },
    animalIds: [
      "african-elephant",
      "black-rhinoceros",
      "hartmanns-mountain-zebra",
      "oryx-gemsbok",
      "giraffe",
      "kudu",
      "ostrich",
    ],
  },
  {
    id: "2026-07-09",
    dayNumber: 8,
    label: "9 jul",
    title: "Etosha Sur — medio safari",
    start: "Damaraland (Twyfelfontein)",
    end: "Etosha Sur (Toshari)",
    zone: "etosha",
    summary:
      "Llegamos a las puertas de Etosha por el sur. Si llegamos con luz, primera entrada de tarde por Andersson Gate a las charcas del sur (Nebrownii, Gemsbokvlakte). Hay que salir antes del cierre de puertas.",
    driving:
      "Damaraland → Toshari, ~4 h. Toshari está ~25 km al sur de Andersson Gate; paga las tasas al entrar.",
    lodging: { name: "Toshari Lodge (Etosha South)", phone: "+264 64 405 045" },
    animalIds: [
      "african-elephant",
      "giraffe",
      "plains-zebra",
      "blue-wildebeest",
      "springbok",
      "oryx-gemsbok",
      "black-backed-jackal",
      "ostrich",
    ],
  },
  {
    id: "2026-07-10",
    dayNumber: 9,
    label: "10 jul",
    title: "Etosha — el día grande",
    start: "Etosha Sur (Toshari)",
    end: "Halali (dentro del parque)",
    zone: "etosha",
    summary:
      "Safari de sur a centro: charcas del sur por la mañana, mediodía en Okaukuejo (repostar y comer) y borde del pan por la tarde (Salvadora, Sueda). De noche, en silencio en la charca iluminada de Moringa: rinoceronte negro y, con suerte, leopardo.",
    driving:
      "Andersson → Halali ~70 km, pero con paradas son 4–6 h. ¡Llega antes del cierre de puertas!",
    lodging: { name: "Halali Resort (Etosha)", phone: "+264 67 229 400" },
    animalIds: [
      "lion",
      "leopard",
      "black-rhinoceros",
      "cheetah",
      "spotted-hyena",
      "african-elephant",
      "giraffe",
      "eland",
    ],
  },
  {
    id: "2026-07-11",
    dayNumber: 10,
    label: "11 jul",
    title: "Etosha Este — Fischer's Pan y Onguma",
    start: "Halali",
    end: "Onguma (Von Lindequist Gate)",
    zone: "etosha",
    summary:
      "Safari hacia el este vía Namutoni y las charcas de Chudob y Kalkheuwel; bucle por Fischer's Pan. Dormimos en la reserva privada Onguma: aquí sí se puede hacer game drive nocturno y fuera de pista — reserva la salida de noche.",
    driving: "Namutoni → Von Lindequist → Onguma, muy cerca de la puerta este.",
    lodging: {
      name: "Onguma Tamboti Campsite",
      phone: "+264 61 237 055",
    },
    animalIds: [
      "dik-dik",
      "impala",
      "leopard",
      "spotted-genet",
      "african-wildcat",
      "caracal",
      "springhare",
      "secretarybird",
    ],
  },
  {
    id: "2026-07-12",
    dayNumber: 11,
    label: "12 jul",
    title: "Último safari y bajada a Waterberg",
    start: "Onguma / Namutoni",
    end: "Waterberg",
    zone: "central",
    summary:
      "Medio safari de despedida por el este de Etosha y bajada a la meseta de arenisca de Waterberg, refugio de especies escasas (sable, roan) y de una colonia de buitres.",
    driving: "Onguma → Waterberg, ~4 h hacia el sur.",
    lodging: {
      name: "Waterberg Wilderness Camp",
      phone: "+264 81 716 4056",
    },
    animalIds: [
      "sable-antelope",
      "roan-antelope",
      "eland",
      "kudu",
      "klipspringer",
      "dik-dik",
      "chacma-baboon",
      "lappet-faced-vulture",
    ],
  },
  {
    id: "2026-07-13",
    dayNumber: 12,
    label: "13 jul",
    title: "Safari en Waterberg",
    start: "Waterberg",
    end: "Otjiwarongo (Out of Africa Lodge)",
    zone: "central",
    summary:
      "Día de safari y senderos entre los farallones rojos de Waterberg. Cerca está el Cheetah Conservation Fund, buena visita para despedir la fauna del viaje.",
    lodging: { name: "Out of Africa Town Lodge", phone: "+264 67 302 230" },
    animalIds: [
      "cheetah",
      "warthog",
      "kudu",
      "vervet-monkey",
      "banded-mongoose",
      "rosy-faced-lovebird",
    ],
  },
  {
    id: "2026-07-14",
    dayNumber: 13,
    label: "14 jul",
    title: "Vuelta a Windhoek y vuelo",
    start: "Otjiwarongo",
    end: "Windhoek (aeropuerto)",
    summary:
      "Devolvemos el coche y volamos. Última mañana para cualquier compra o un café tranquilo antes del aeropuerto.",
    driving: "Otjiwarongo → Windhoek, ~3,5 h.",
    animalIds: [],
  },
  {
    id: "2026-07-15",
    dayNumber: 14,
    label: "15 jul",
    title: "Vuelta a la realidad",
    start: "Copenhague",
    end: "Casa",
    summary: "Llegada a casa. Toca revivir el viaje con las fotos y estas notas. :'(",
    animalIds: [],
  },
];
