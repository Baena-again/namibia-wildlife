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
  /** Where you sleep, with a tappable phone number and validated location. */
  lodging?: {
    name: string;
    phone?: string;
    /** Postal/road address as provided by the traveller's bookings. */
    address?: string;
    /** Verified GPS coordinates "lat, long" (omitted if unverified). */
    coords?: string;
    /** Exact Google Maps link (coordinate-based when verified). */
    mapUrl?: string;
  };
  /** Optional booked activity / excursion contact for the day. */
  activity?: { name: string; phone?: string; url?: string };
  /** Curiosities + road tips for the day (double-validated). */
  tips?: string[];
  /** Animals you're realistically likely to see here (catalogue ids). */
  animalIds: string[];
};

/**
 * Our real July 2026 self-drive route (Windhoek round-trip), as a logbook.
 * Each day links to its wildlife zone and to the species most likely to appear.
 * Lodging coordinates / map links are double-validated; where two independent
 * sources couldn't confirm a point, only a name-based Maps search is used.
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
    lodging: {
      name: "Sossus Oasis Campsite (Sesriem)",
      phone: "+264 63 293 636",
      address: "C27, Sesriem",
      coords: "-24.48903, 15.80128",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=-24.48903,15.80128",
    },
    tips: [
      "Casi todo el trayecto Windhoek–Sesriem es de grava por el altiplano del Khomas Hochland: cuenta 4,5–6 h según el estado de la pista.",
      "Si subes por el Spreetshoogte Pass, es el paso más empinado de Namibia: baja casi 1.000 m de golpe hasta las llanuras del Namib.",
      "Solitaire es el último combustible fiable antes de Sossusvlei: reposta sí o sí (y prueba su panadería).",
      "Entras por la puerta de Sesriem, acceso al Namib-Naukluft: allí están los permisos, la tienda y la gasolinera.",
    ],
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
      address: "Farm Cha-Re, C14, 33 km al norte de Solitaire",
      coords: "-23.62542, 15.86597",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=-23.62542,15.86597",
    },
    tips: [
      "Madruga para la Dune 45 (a 45 km de la puerta, ~170 m): es la duna estrella del amanecer, con luz suave y sin calor.",
      "Los árboles de Deadvlei llevan ~600-700 años muertos y ennegrecidos por el sol: no están petrificados, es que el clima es demasiado seco para pudrirlos.",
      "En Solitaire, la panadería del escocés 'Moose' McGregor es famosa por su tarta de manzana, entre coches antiguos oxidados.",
      "El Trópico de Capricornio cruza la C14 al norte de Solitaire: parada de foto clásica.",
    ],
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
    lodging: {
      name: "The Rez Guesthouse",
      phone: "+264 81 245 3244",
      address: "16 Mandume Ndemufayo Circle, Meersig, 9000, Walvis Bay",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Rez+Guesthouse+16+Mandume+Ndemufayo+Circle+Meersig+Walvis+Bay+Namibia",
    },
    tips: [
      "La C14 cruza el cañón del Kuiseb por el Kuiseb Pass, excavado durante millones de años en el borde del Namib-Naukluft.",
      "El río Kuiseb marca la frontera del mar de arena: al sur, grandes dunas; al norte, roca y grava.",
      "La laguna de Walvis Bay es humedal Ramsar: flamencos comunes y enanos junto a las salinas.",
      "Walvis Bay es buen sitio para repostar (Shell, Engen) antes de seguir.",
    ],
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
    lodging: {
      name: "The Rez Guesthouse",
      phone: "+264 81 245 3244",
      address: "16 Mandume Ndemufayo Circle, Meersig, 9000, Walvis Bay",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Rez+Guesthouse+16+Mandume+Ndemufayo+Circle+Meersig+Walvis+Bay+Namibia",
    },
    activity: {
      name: "Excursión 4x4 — Dominus Dune Tours (ref. Tso 01500)",
      phone: "+264 81 633 5151",
      url: "https://dominusdunedtours.com",
    },
    tips: [
      "En Sandwich Harbour, dunas de más de 100 m caen directas al Atlántico: el desierto pegado al mar.",
      "Es laguna y humedal Ramsar dentro del Namib-Naukluft, de los más importantes del sur de África.",
      "El acceso por la playa depende de la marea (solo unas horas con marea baja): por eso exige 4x4 y guía con licencia.",
      "Pelican Point: lengua de arena con faro de 1932 y una gran colonia de lobos marinos.",
    ],
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
    lodging: {
      name: "Desert Breeze Lodge",
      phone: "+264 64 406 236",
      address: "Desert Breeze, Swakopmund (junto al río Swakop)",
      coords: "-22.680244, 14.552731",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=-22.680244,14.552731",
    },
    tips: [
      "Swakopmund se fundó en 1892 como puerto de la colonia alemana: conserva arquitectura colonial como el Woermannhaus de 1906.",
      "Su muelle (jetty) de acero se empezó en 1914, tras fracasar el primer embarcadero de madera.",
      "El 'Moon Landscape' lo esculpió el río Swakop durante millones de años; en el valle crecen welwitschias, 'fósiles vivientes' de dos hojas que superan los 1.000 años.",
      "Para los 'little five' del desierto, un Living Desert Tour con guía es casi obligatorio: sin él es muy difícil verlos.",
    ],
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
      address: "D1925, Spitzkoppe, Damaraland",
      coords: "-21.839548, 15.201605",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=-21.839548,15.201605",
    },
    tips: [
      "Cape Cross tiene una de las mayores colonias de lobos marinos del mundo: hasta 210.000 en la cría de nov-dic (y un olor que no olvidarás).",
      "Allí el portugués Diogo Cão plantó una cruz de piedra en 1486: el primer europeo en pisar la zona.",
      "Vas por la 'salt road' costera (C34), de superficie de sal y arena, asfaltada solo entre Swakopmund y Henties Bay.",
    ],
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
    lodging: {
      name: "Granietkop Campsite",
      phone: "+264 61 248 137",
      address: "D2612, Damaraland",
      coords: "-20.635521, 14.568150",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=-20.635521,14.568150",
    },
    tips: [
      "El granito de Spitzkoppe tiene más de 120 millones de años y se alza ~670 m sobre la llanura: el 'Matterhorn de África'.",
      "Tiene un arco natural de roca y, en Bushman's Paradise, pinturas rupestres prehistóricas (monumento nacional).",
      "Twyfelfontein fue el primer Patrimonio UNESCO de Namibia (2007), con más de 2.000 grabados rupestres.",
      "Cerca: las Organ Pipes (columnas de dolerita de ~4 m) y la Burnt Mountain, que parece arder al amanecer.",
    ],
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
    lodging: {
      name: "Toshari Lodge (Etosha South)",
      phone: "+264 64 405 045",
      address: "Portion 1, Farm Afguns, C38, Outjo (Etosha South)",
      coords: "-19.5558, 15.8771",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=-19.5558,15.8771",
    },
    tips: [
      "Outjo es parada clásica camino a Etosha por sus panaderías de estilo alemán.",
      "Las puertas de Etosha abren al amanecer y cierran al atardecer: hay que estar dentro del campamento antes de la puesta de sol.",
      "Se paga una tasa diaria de conservación (~280 NAD por adulto extranjero) en la puerta; confírmala allí.",
      "Dentro de Etosha el límite es 60 km/h.",
    ],
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
    lodging: {
      name: "Halali Resort (Etosha)",
      phone: "+264 67 229 400",
      address: "Halali, Parque Nacional de Etosha",
      coords: "-19.0349, 16.4707",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=-19.0349,16.4707",
    },
    tips: [
      "El Etosha Pan es un antiguo lago desecado tan grande (~4.800 km²) que se ve desde el espacio: la mayor salina de su tipo en África.",
      "Las charcas del sur y centro (Okaukuejo, Nebrownii, Gemsbokvlakte, Salvadora, Sueda, Rietfontein, Goas) concentran la fauna camino a Halali.",
      "De noche, la charca iluminada de Moringa (Halali) es ideal para rinoceronte y elefante tras el anochecer.",
    ],
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
      address: "Onguma Nature Reserve, Von Lindequist Gate, Etosha",
      coords: "-18.7832, 17.0602",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=-18.7832,17.0602",
    },
    tips: [
      "El fuerte Namutoni es un antiguo fuerte colonial alemán, destruido en 1904 y reconstruido: hoy monumento nacional.",
      "Twee Palms, en Fischer's Pan, es famosa por sus dos palmeras makalani: punto fotográfico.",
      "Sales por la puerta este, Von Lindequist, a pocos km de Namutoni.",
      "Onguma es reserva privada: aquí sí puedes hacer safari nocturno, prohibido dentro de Etosha.",
    ],
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
      address: "D2512, Waterberg",
      coords: "-20.4778, 17.3007",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=-20.4778,17.3007",
    },
    tips: [
      "La meseta del Waterberg es arenisca Etjo porosa que absorbe la lluvia como una esponja y la suelta en manantiales al pie: por eso 'montaña de agua'.",
      "Refugio de antílopes escasos como el sable y el ruano (reintroducidos), además de rinocerontes.",
      "Aquí se libró la Batalla del Waterberg (11 ago 1904), que desencadenó el genocidio herero.",
    ],
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
    lodging: {
      name: "Out of Africa Town Lodge",
      phone: "+264 67 302 230",
      address: "Long Street, 9000, Otjiwarongo",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Out+of+Africa+Town+Lodge+Long+Street+Otjiwarongo+Namibia",
    },
    tips: [
      "Waterberg tiene senderos guiados de varios días y rutas cortas autoguiadas desde el resort.",
      "Su 'restaurante de buitres' (alimentación con carroña) atrae al buitre de El Cabo, cuya última colonia de Namibia está aquí.",
      "Cerca de Otjiwarongo: el Cheetah Conservation Fund (a ~44 km), abierto al público.",
      "Otjiwarongo tiene la única granja de cocodrilos del país (1985), con visitas guiadas.",
    ],
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
    tips: [
      "La B1 (asfaltada) une Otjiwarongo y Windhoek vía Okahandja: ~250 km, 2,5-3 h.",
      "Devuelve el coche con el depósito lleno: si no, te cobran el combustible a tarifa superior.",
      "El aeropuerto Hosea Kutako está ~45 km al este de Windhoek (B6), unos 40 min más.",
      "En la B1 hay gasolineras de servicio completo (Okahandja, Otjiwarongo); lleva algo de efectivo, algunas solo aceptan metálico.",
    ],
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
