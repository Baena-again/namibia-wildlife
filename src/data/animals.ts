import type { Animal } from "../types";
import placeholder from "../assets/animals/placeholder.svg";

/**
 * The fixed catalogue. This is part of the source code, so it is bundled into
 * the app and can never be lost.
 *
 * These are SAMPLE entries so the app runs and looks right. They will be
 * replaced by the real ~40-50 animals extracted from the provided PPT/PDF:
 *  - drop each cut-out image (ideally transparent-background PNG) into
 *    `src/assets/animals/` and import it here as `image`.
 *  - `whereToSee` and `funFacts` are researched, then reviewed.
 */
export const animals: Animal[] = [
  {
    id: "lion",
    commonName: "León",
    scientificName: "Panthera leo",
    image: placeholder,
    whereToSee: ["Parque Nacional de Etosha", "Damaraland (leones del desierto)"],
    funFacts: [
      "Los leones del desierto de Namibia recorren grandes distancias buscando presas escasas.",
      "Es el único felino que vive en grupos sociales, las manadas.",
    ],
  },
  {
    id: "elephant",
    commonName: "Elefante africano",
    scientificName: "Loxodonta africana",
    image: placeholder,
    whereToSee: ["Etosha", "Kaokoland", "Río Kunene"],
    funFacts: [
      "Los elefantes del desierto namibio tienen patas más largas y pies anchos para la arena.",
      "Pueden detectar agua bajo tierra y cavar pozos con la trompa.",
    ],
  },
  {
    id: "oryx",
    commonName: "Órix",
    scientificName: "Oryx gazella",
    image: placeholder,
    whereToSee: ["Namib-Naukluft", "Dunas de Sossusvlei", "Etosha"],
    funFacts: [
      "Aparece en el escudo nacional de Namibia.",
      "Soporta temperaturas corporales muy altas para sobrevivir sin beber durante días.",
    ],
  },
  {
    id: "springbok",
    commonName: "Springbok",
    scientificName: "Antidorcas marsupialis",
    image: placeholder,
    whereToSee: ["Etosha", "Kalahari", "Namib-Naukluft"],
    funFacts: [
      "Hace 'pronking': saltos rígidos y altos con el lomo arqueado.",
      "Puede alcanzar los 88 km/h.",
    ],
  },
  {
    id: "giraffe",
    commonName: "Jirafa",
    scientificName: "Giraffa giraffa angolensis",
    image: placeholder,
    whereToSee: ["Etosha", "Damaraland"],
    funFacts: [
      "El cuello tiene solo siete vértebras, como casi todos los mamíferos.",
      "La subespecie angoleña habita zonas áridas del noroeste namibio.",
    ],
  },
];
