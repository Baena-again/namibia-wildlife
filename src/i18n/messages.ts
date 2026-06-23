/**
 * Lightweight, dependency-free i18n for the field guide.
 *
 * The UI chrome (tabs, buttons, section headings, notices) lives here, keyed by
 * a flat dotted string and translated per locale. The bulk catalogue content
 * (animal facts, zone descriptions, tips, itinerary) is still authored in
 * Spanish in `src/data/*` — translating that is a separate, incremental effort.
 *
 * Everything is bundled into the app, so language switching works fully offline,
 * which is the whole point of the PWA.
 */

export type Locale = "es" | "en";

/** Locales offered in the switcher, in display order. */
export const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
];

/** Fallback when nothing else matches. The original audience is Spanish. */
export const DEFAULT_LOCALE: Locale = "es";

/** Translatable UI strings. `en` mirrors `es` key for key. */
const es = {
  "app.subtitle": "Guía de campo",
  "app.counter": "{seen} de {total} vistos",
  "app.storageWarning":
    "Este navegador no guarda datos: los animales marcados se perderán al cerrar. Prueba a instalar la app en la pantalla de inicio.",
  "app.mapIntro": "Toca una zona de Namibia para ver qué animales esperar allí.",
  "app.backup": "Copia de seguridad",

  "tab.map": "Mapa",
  "tab.itinerary": "Cuaderno",
  "tab.tips": "Trucos",
  "tab.shopping": "Compra",
  "tab.list": "Catálogo",

  "controls.searchPlaceholder": "Buscar por nombre…",
  "controls.all": "Todos",
  "controls.seen": "Vistos",
  "controls.pending": "Pendientes",
  "controls.easyToSee": "Fáciles de ver",
  "controls.category": "Categoría",
  "controls.allFem": "Todas",

  "difficulty.facil": "Fácil de ver",
  "difficulty.media": "Con suerte",
  "difficulty.dificil": "Difícil de ver",

  "grid.empty": "Ningún animal coincide con la búsqueda.",
  "grid.markSeen": "Marcar visto",
  "grid.seen": "✓ Visto",
  "grid.markSeenAria": "Marcar {name} como visto",
  "grid.markUnseenAria": "Marcar {name} como no visto",
  "grid.others": "Otros",

  "detail.backCatalogue": "Volver al catálogo",
  "detail.backZone": "Volver a {zone}",
  "detail.backLogbook": "Volver al cuaderno",
  "detail.sizeAria": "Tamaño y peso",
  "detail.size": "Tamaño",
  "detail.weight": "Peso",
  "detail.reference": "Referencia",
  "detail.distinguish": "Cómo distinguirlo",
  "detail.whereToSee": "Dónde verlo",
  "detail.spottingTips": "Trucos para avistarlo",
  "detail.funFacts": "Datos curiosos",
  "detail.seen": "✓ Visto",
  "detail.markSeen": "Marcar como visto",

  "zone.backMap": "Volver al mapa",
  "zone.climate": "Clima",
  "zone.terrain": "Terreno",
  "zone.counterHere": "{seen} de {total} vistos aquí",
  "zone.difficulty": "Dificultad",
  "zone.all": "Todas",
  "zone.empty": "Ningún animal coincide con estos filtros.",

  "map.imgAlt": "Mapa ilustrado de Namibia con sus zonas de fauna",
  "map.areaAria": "{zone}: {seen} de {total} animales vistos",
  "map.hint": "Toca o selecciona con el tabulador una zona para abrir su ficha.",

  "settings.title": "Copia de seguridad",
  "settings.intro":
    "Los animales marcados y las notas del cuaderno de bitácora se guardan en este dispositivo. Exporta una copia para no perderlos si cambias de móvil o borras los datos del navegador.",
  "settings.export": "Exportar copia",
  "settings.import": "Importar copia",
  "settings.downloaded": "Copia descargada.",
  "settings.imported": "Copia importada correctamente.",
  "settings.importFailed": "No se pudo importar.",

  "shopping.title": "Lista de la compra",
  "shopping.intro":
    "Una compra gorda al empezar y dos reposiciones por el camino. Marca lo que vayas metiendo en el carro — se guarda en este dispositivo.",

  "itinerary.back": "Volver",
  "itinerary.title": "Cuaderno de bitácora",
  "itinerary.intro":
    "Nuestra ruta por Namibia, día a día. Toca la zona para ver todos sus animales, abre una ficha tocando una foto, y escribe abajo lo que hayáis visto y hecho — se guarda en este dispositivo.",
  "itinerary.day": "Día {n}",
  "itinerary.openMaps": "Abrir en Maps",
  "itinerary.web": "web",
  "itinerary.onTheRoad": "En el camino",
  "itinerary.myDiary": "Mi diario",
  "itinerary.diaryPlaceholder": "¿Qué hemos visto y hecho hoy?",

  "update.newVersion": "Nueva versión disponible",
  "update.update": "Actualizar",
  "update.dismiss": "Cerrar aviso",

  "lang.switchAria": "Cambiar idioma",
} as const;

export type MessageKey = keyof typeof es;

const en: Record<MessageKey, string> = {
  "app.subtitle": "Field guide",
  "app.counter": "{seen} of {total} seen",
  "app.storageWarning":
    "This browser won't save data: animals you mark will be lost when you close it. Try installing the app to your home screen.",
  "app.mapIntro": "Tap a region of Namibia to see which animals to expect there.",
  "app.backup": "Backup",

  "tab.map": "Map",
  "tab.itinerary": "Logbook",
  "tab.tips": "Tips",
  "tab.shopping": "Shopping",
  "tab.list": "Catalogue",

  "controls.searchPlaceholder": "Search by name…",
  "controls.all": "All",
  "controls.seen": "Seen",
  "controls.pending": "Pending",
  "controls.easyToSee": "Easy to spot",
  "controls.category": "Category",
  "controls.allFem": "All",

  "difficulty.facil": "Easy to spot",
  "difficulty.media": "If you're lucky",
  "difficulty.dificil": "Hard to spot",

  "grid.empty": "No animals match your search.",
  "grid.markSeen": "Mark seen",
  "grid.seen": "✓ Seen",
  "grid.markSeenAria": "Mark {name} as seen",
  "grid.markUnseenAria": "Mark {name} as not seen",
  "grid.others": "Others",

  "detail.backCatalogue": "Back to catalogue",
  "detail.backZone": "Back to {zone}",
  "detail.backLogbook": "Back to logbook",
  "detail.sizeAria": "Size and weight",
  "detail.size": "Size",
  "detail.weight": "Weight",
  "detail.reference": "Reference",
  "detail.distinguish": "How to tell it apart",
  "detail.whereToSee": "Where to see it",
  "detail.spottingTips": "Spotting tips",
  "detail.funFacts": "Fun facts",
  "detail.seen": "✓ Seen",
  "detail.markSeen": "Mark as seen",

  "zone.backMap": "Back to the map",
  "zone.climate": "Climate",
  "zone.terrain": "Terrain",
  "zone.counterHere": "{seen} of {total} seen here",
  "zone.difficulty": "Difficulty",
  "zone.all": "All",
  "zone.empty": "No animals match these filters.",

  "map.imgAlt": "Illustrated map of Namibia with its wildlife regions",
  "map.areaAria": "{zone}: {seen} of {total} animals seen",
  "map.hint": "Tap or tab to a region to open its page.",

  "settings.title": "Backup",
  "settings.intro":
    "The animals you mark and your logbook notes are saved on this device. Export a backup so you don't lose them if you switch phones or clear the browser data.",
  "settings.export": "Export backup",
  "settings.import": "Import backup",
  "settings.downloaded": "Backup downloaded.",
  "settings.imported": "Backup imported successfully.",
  "settings.importFailed": "Could not import.",

  "shopping.title": "Shopping list",
  "shopping.intro":
    "One big shop at the start and two top-ups along the way. Check off what you put in the cart — it's saved on this device.",

  "itinerary.back": "Back",
  "itinerary.title": "Travel logbook",
  "itinerary.intro":
    "Our route through Namibia, day by day. Tap the region to see all its animals, open a page by tapping a photo, and write below what you saw and did — it's saved on this device.",
  "itinerary.day": "Day {n}",
  "itinerary.openMaps": "Open in Maps",
  "itinerary.web": "website",
  "itinerary.onTheRoad": "On the road",
  "itinerary.myDiary": "My diary",
  "itinerary.diaryPlaceholder": "What did we see and do today?",

  "update.newVersion": "New version available",
  "update.update": "Update",
  "update.dismiss": "Dismiss",

  "lang.switchAria": "Change language",
};

export const messages: Record<Locale, Record<MessageKey, string>> = { es, en };
