/**
 * Packing list for our July 2026 Namibia self-drive (one adult, male).
 * Tuned to the real route + austral-winter weather: cold desert dawns and
 * nights (~0–6 °C), windy/foggy Atlantic coast, warm midday, lots of gravel
 * and dust — and a fully camping-equipped Land Cruiser, so no sleeping or
 * kitchen gear is needed.
 *
 * Rendered as collapsible sections with tickable items, reusing the shopping
 * list's checkbox + persistence pattern.
 */

export type PackingGroup = {
  title: string;
  /** Optional context shown under the section title. */
  note?: string;
  /**
   * When true the items are shown as plain bullets (reminders, not things to
   * pack), e.g. "already in the car" or "buy on arrival".
   */
  info?: boolean;
  /** Whether the section starts expanded. */
  defaultOpen?: boolean;
  items: string[];
};

export const packing: PackingGroup[] = [
  {
    title: "Sistema de capas (lo más importante)",
    note: "Térmica + polar + chaqueta apilados = amaneceres de safari y noches de desierto a 0–6 °C. La North Face hace de capa caliente y de cortavientos, así que te ahorras el plumón y el cortavientos aparte.",
    defaultOpen: true,
    items: [
      "Camiseta/malla térmica (también de pijama las noches de desierto)",
      "Polar de montaña (la capa media que de verdad abriga)",
      "Chaqueta ligera con pit-zips (North Face azul): caliente + cortaviento, vale para la costa",
      "Gorro de lana (game drives al alba y para dormir)",
      "Guantes finos",
      "Calcetines gruesos para dormir",
    ],
  },
  {
    title: "Ropa de día (tonos tierra: beige, oliva, caqui)",
    note: "El color neutro importa en lo que llevas puesto todo el día; evita blanco impoluto y camuflaje.",
    items: [
      "5–6 camisetas (mezcla manga corta + un par de manga larga UV)",
      "1–2 camisas ligeras de manga larga",
      "2 pantalones de safari (uno convertible a short)",
      "1 pantalón corto (solo mediodía de desierto/Etosha)",
      "Ropa interior y calcetines para ~5 días (se lava por el camino)",
      "Bañador (piscina de Desert Breeze, Swakopmund)",
      "Ropa de correr ligera (opcional: ejercicio / muda de coche / capa fina extra)",
    ],
  },
  {
    title: "Calzado",
    items: [
      "Zapatillas cerradas o botas ligeras (Deadvlei, senderos de Waterberg/Spitzkoppe)",
      "Sandalias/chanclas (costa, lodge, ducha de camping)",
    ],
  },
  {
    title: "Sol y polvo (UV muy alto + grava)",
    items: [
      "Gorra o sombrero de ala",
      "Gafas de sol buenas",
      "Protector solar SPF 50+",
      "Cacao labial con SPF",
      "Buff/pañuelo para el polvo",
      "Gotas oculares (+ gafas de repuesto si usas lentillas)",
    ],
  },
  {
    title: "Salud (el botiquín del coche es básico)",
    items: [
      "Antimalaria — consúltalo con tu médico ya (Etosha/Waterberg)",
      "Analgésico, antidiarreico, antihistamínico, tiritas",
      "Repelente de insectos",
      "Tu medicación habitual + gel de manos",
    ],
  },
  {
    title: "Trastos del self-drive (no incluidos en el coche)",
    items: [
      "Linterna frontal (la luz LED del coche es de mesa)",
      "Toalla de microfibra: una de cuerpo + una pequeña (no hay toallas)",
      "Power bank + cargador de coche 12V (el coche tiene USB)",
      "Adaptador de enchufe tipo M/D namibio (¡no vale el europeo ni el danés!)",
      "Prismáticos (clave en Etosha)",
      "Botella/cantimplora reutilizable (el coche lleva 40 L de agua + hervidor)",
      "Efectivo en NAD/ZAR (combustible y tasas, a veces solo metálico)",
      "Bolsas zip + bolsas de basura (aislar móvil/cámara del polvo)",
      "Mechero/cerillas largas (para BBQ/hornillos)",
    ],
  },
  {
    title: "Documentos",
    items: [
      "Pasaporte",
      "Carné de conducir + permiso internacional",
      "e-Visa de Namibia (tramitar online antes de viajar)",
      "Seguro de viaje",
      "Reservas + la bitácora con teléfonos (ya en esta app)",
    ],
  },
  {
    title: "Ya incluido en el coche — NO traer",
    info: true,
    items: [
      "Tienda de techo, colchón con sábana, edredones y almohadas",
      "Cocina completa: hornillos, nevera 12V, cafetera, ollas, platos, cubiertos, BBQ",
      "Mesa y sillas de camping, luz LED",
      "Herramientas, gato, compresor, cuerda de remolque, pala, extintor y botiquín básico",
    ],
  },
  {
    title: "Comprar al llegar (Windhoek/Swakopmund)",
    info: true,
    items: [
      "Comida y bebida para los días de camping",
      "Hielo/packs para la nevera de 12V",
      "Garrafas extra de agua potable",
    ],
  },
];
