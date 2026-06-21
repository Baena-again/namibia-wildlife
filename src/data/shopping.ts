/** A labelled group of items within a shopping stop. */
export type ShoppingGroup = {
  /** Group heading, with its emoji. */
  title: string;
  /** Optional note shown under the heading. */
  note?: string;
  items: string[];
};

/** A shopping stop tied to an itinerary day (big shop or restock). */
export type ShoppingStop = {
  /** Matches an itinerary day id. */
  dayId: string;
  /** Tappable summary / link text, with its emoji. */
  title: string;
  /** Optional one-line note (used for the simpler restock stops). */
  note?: string;
  /** Detailed groups (used for the big shop). */
  groups?: ShoppingGroup[];
};

/** Where and what to buy along the route, surfaced inside the logbook. */
export const shopping: ShoppingStop[] = [
  {
    dayId: "2026-07-02",
    title: "🛒 COMPRA GORDA — SuperSpar Maerua (jue 2)",
    groups: [
      {
        title: "🥩 Carnicería",
        note: "Congela la mitad — te hace de hielo los primeros días.",
        items: [
          "Boerewors (salchicha gruesa en espiral) – 2 paquetes",
          "Chuletas de cordero – 1 bandeja (6-8)",
          "Pollo (muslos/contramuslos) – 1-2 bandejas",
          "Sosaties (brochetas ya marinadas) – 1-2 bandejas",
          "Filetes de ternera – 1 paquete (1-2 cenas)",
          "Bacon – 2 paquetes",
        ],
      },
      {
        title: "🧀 Charcutería y quesos",
        items: [
          "Queso curado – 1 buena cuña",
          "Chorizo/salchichón (sección importación) – 1-2",
          "Biltong (cecina) + droëwors (cecina en salchicha, tipo fuet) – bolsa generosa",
        ],
      },
      {
        title: "🥛 Lácteos y huevos",
        items: [
          "Huevos – 2 docenas",
          "Leche UHT (larga duración) – 3 L",
          "Maas (leche fermentada tipo kéfir) – 1-2 (es fresco, repón por el camino)",
          "Yogur con cultivos vivos – 1 pack",
        ],
      },
      {
        title: "🥦 Frutería — verdura",
        items: [
          "Patata + boniato – buena bolsa",
          "Butternut (calabaza alargada) + gem squash (calabacita verde redonda)",
          "Repollo (ensalada de col, dura mucho) + zanahoria",
          "Tomate, pimiento",
          "Ajo, cebolla, jengibre fresco (prebióticos)",
        ],
      },
      {
        title: "🍊 Frutería — fruta",
        items: ["Naranjas, limones, manzanas, plátanos"],
      },
      {
        title: "🥫 Conservas y legumbre",
        items: [
          "Legumbre en bote: garbanzos, alubias, lentejas – 5-6 botes",
          "Latas de pescado: atún, sardinas, caballa – 6",
          "Tomate triturado en lata – 3-4 (shakshuka, salsas)",
        ],
      },
      {
        title: "🍞 Panadería y cereales",
        items: [
          "Wraps/tortillas (aguantan más que el pan) – 2 paquetes",
          "Crackers / picos",
          "Rusks (biscotes para mojar en café) – 1-2 paquetes",
          "Avena (porridge) – 1 bolsa grande",
          "Pap (harina de maíz, tipo polenta) – 1 bolsa (opcional)",
        ],
      },
      {
        title: "🧂 Despensa y condimentos",
        items: [
          "Café molido + rooibos (infusión roja sin teína)",
          "Aceite de oliva, sal, pimienta",
          "Especias braai (mezcla para bbq, tipo Robertsons), pimentón, peri-peri (guindilla picante)",
          "Mantequilla de cacahuete, miel",
          "Mostaza, kétchup",
          "Mrs Ball's chutney (salsa agridulce local, va con todo)",
        ],
      },
      {
        title: "🍫 Snacks y dulce",
        items: ["Frutos secos + fruta deshidratada", "Chocolate negro"],
      },
      {
        title: "🍺 Bebidas (cubre el domingo 5)",
        items: [
          "Cerveza Windhoek / Tafel (las locales) – a tu criterio 😏 (2 cajas como base)",
          "Vino SA (sudafricano) / Savanna (sidra) – opcional",
          "Agua embotellada – mucha (garrafas de 5L ×varias)",
          "Sales de rehidratación – 1 caja",
        ],
      },
      {
        title: "🧼 Droguería y camping",
        items: [
          "Leña/carbón para braai (bbq) + pastillas de encendido",
          "Hielo en bolsa",
          "Bolsas con cierre (zip) + papel albal + film",
          "Bolsas de basura",
          "Papel de cocina + toallitas húmedas",
          "Gel hidroalcohólico",
          "Lavavajillas + estropajo",
          "Repelente de mosquitos (para Etosha)",
        ],
      },
    ],
  },
  {
    dayId: "2026-07-06",
    title: "🐟 REPOSICIÓN — Swakopmund (lun 6)",
    note: "Pescado/marisco fresco, fruta y verdura nueva, maas (leche fermentada)/yogur fresco, pan, hielo y cerveza (cubre lo que quede de semana).",
  },
  {
    dayId: "2026-07-09",
    title: "🦓 REPOSICIÓN — Outjo (jue 9)",
    note: "Última antes de Etosha: fruta, fresco, hielo y cerveza para el domingo 12 (Waterberg, sin súper).",
  },
];
