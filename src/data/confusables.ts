/**
 * Confusable look-alike pairs — animals that are easy to mix up in the field.
 * Both ids are in the catalogue, so they can land on the same game board.
 * When they do, the game runs a quick "duel" to teach how to tell them apart.
 *
 * The `diff` text is a short, field-ready key (distilled from each animal's
 * `distinguish` entry in src/data/animals.ts).
 */
export type Confusable = { a: string; b: string; diff: string };

export const confusables: Confusable[] = [
  {
    a: "leopard",
    b: "cheetah",
    diff: "Leopardo: manchas en roseta, robusto, sin líneas faciales. Guepardo: puntos negros sólidos, esbelto, líneas negras «de lágrima» de los ojos al hocico.",
  },
  {
    a: "black-rhinoceros",
    b: "white-rhinoceros",
    diff: "Negro: labio puntiagudo en gancho (ramonea arbustos), cabeza en alto. Blanco: labio ancho y cuadrado (pasta hierba), cabeza baja y joroba en la nuca.",
  },
  {
    a: "springbok",
    b: "impala",
    diff: "Springbok: franja lateral oscura y pliegue blanco eréctil en la grupa; cuernos en ambos sexos. Impala: sin franja, «M» negra en los muslos; solo el macho tiene cuernos.",
  },
  {
    a: "plains-zebra",
    b: "hartmanns-mountain-zebra",
    diff: "Común: sin papada, franjas anchas que cruzan el vientre y «franjas de sombra» pardas. Hartmann: papada en la garganta, vientre blanco y rejilla de franjas finas en la grupa.",
  },
  {
    a: "kudu",
    b: "eland",
    diff: "Kudú: esbelto, franjas blancas nítidas, cuernos largos en espiral abierta. Eland: macizo casi bovino, papada, cuernos cortos rectos y retorcidos.",
  },
  {
    a: "dik-dik",
    b: "steenbok",
    diff: "Dik-dik: diminuto, hocico-trompa móvil y mechón frontal. Steenbok: más alto y rojizo, orejas enormes, hocico corto y respingón sin trompa.",
  },
  {
    a: "sable-antelope",
    b: "roan-antelope",
    diff: "Sable (macho): negro azabache, cuernos larguísimos en cimitarra. Ruano: pardo rojizo, máscara facial negra, orejas largas y cuernos más cortos.",
  },
  {
    a: "red-lechwe",
    b: "puku",
    diff: "Lechwe: más alto, marcas negras en las patas delanteras, cuernos largos liriformes. Puku: más bajo y dorado uniforme, sin negro en las patas, cuernos cortos.",
  },
  {
    a: "tsessebe",
    b: "red-hartebeest",
    diff: "Sasebí (tsessebe): castaño oscuro lustroso, cara más corta, cuernos en media luna. Búbalo rojo: rojizo más claro, cara muy larga y cuernos largos angulados.",
  },
  {
    a: "spotted-hyena",
    b: "brown-hyena",
    diff: "Manchada: grande, pelo corto con manchas, orejas redondas; social y ruidosa. Parda: menor, pelaje largo sin manchas con melena clara, orejas puntiagudas; solitaria.",
  },
  {
    a: "black-backed-jackal",
    b: "cape-fox",
    diff: "Chacal: mayor, con la «silla de montar» negra y plateada en el lomo. Zorro de El Cabo: diminuto, gris plateado sin silla, cola muy poblada.",
  },
  {
    a: "chacma-baboon",
    b: "vervet-monkey",
    diff: "Babuino: grande y terrestre, hocico perruno largo, cola acodada. Cercopiteco verde: pequeño y arborícola, cara plana, cola más larga que el cuerpo, escroto azul.",
  },
  {
    a: "meerkat",
    b: "yellow-mongoose",
    diff: "Suricato: gris pálido, antifaz ocular, se yergue a vigilar, muy social. Mangosta amarilla: más rojiza, cola poblada (punta blanca), bastante solitaria y sin antifaz.",
  },
  {
    a: "african-white-backed-vulture",
    b: "lappet-faced-vulture",
    diff: "Dorsiblanco: menor, cabeza con plumón blanquecino y dorso blanco. Orejudo: enorme, cabeza rosada desnuda con pliegues carnosos y pico inmenso; domina en la carroña.",
  },
  {
    a: "cape-fur-seal",
    b: "southern-elephant-seal",
    diff: "Lobo marino: tiene orejas externas y «camina» girando las aletas; pequeño. Elefante marino: foca sin orejas, se arrastra sobre el vientre, gigantesco; el macho con nariz inflable.",
  },
  {
    a: "heavisides-dolphin",
    b: "atlantic-bottlenose-dolphin",
    diff: "Heaviside: diminuto (~1,7 m), sin pico, aleta dorsal triangular, manchas blancas en el vientre. Mular: grande (2,5–4 m), gris, pico corto y aleta alta y ganchuda.",
  },
  {
    a: "ground-pangolin",
    b: "aardvark",
    diff: "Pangolín: cubierto de escamas córneas, se enrolla en bola, pequeño. Oricteropo: piel desnuda, orejas largas tipo conejo y hocico porcino; mucho mayor.",
  },
  {
    a: "greater-flamingo",
    b: "flamingo",
    diff: "Común: mayor y más pálido, pico claro de punta negra y patas rosadas. Enano: menor, rosa más intenso, pico oscuro casi negro y patas rojizas.",
  },
  {
    a: "blue-wildebeest",
    b: "african-buffalo",
    diff: "Ñu azul: gris pizarra con melena y cola negras, cuernos curvados hacia los lados; esbelto y en grandes manadas que corren. Búfalo cafre: negro, mucho más macizo y pesado, con cuernos que forman un escudo frontal continuo.",
  },
  {
    a: "kori-bustard",
    b: "ruppells-bustard",
    diff: "Avutarda kori: enorme (hasta 19 kg), cuello grueso gris y patas largas. Avutarda de Rüppell: mucho menor (~60 cm), con líneas negras a los lados del cuello y raya facial sobre fondo gris-arenoso.",
  },
  {
    a: "grey-crowned-crane",
    b: "wattled-crane",
    diff: "Grulla coronada: penacho de plumas doradas y mejillas blancas. Grulla carunculada: carúnculas blancas colgantes, cuello blanco y cara roja, sin penacho dorado.",
  },
  {
    a: "african-marabou",
    b: "saddle-billed-stork",
    diff: "Marabú: cabeza y cuello desnudos, saco gular colgante, manto gris y vientre blanco; aire de carroñero. Cigüeña ensillada: pico enorme rojo-negro-amarillo y plumaje limpio blanco y negro.",
  },
];
