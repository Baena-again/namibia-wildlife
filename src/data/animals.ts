import type { Animal } from "../types";
import img_african_elephant from "../assets/animals/african-elephant.png";
import img_lion from "../assets/animals/lion.png";
import img_leopard from "../assets/animals/leopard.png";
import img_cheetah from "../assets/animals/cheetah.png";
import img_black_rhinoceros from "../assets/animals/black-rhinoceros.png";
import img_white_rhinoceros from "../assets/animals/white-rhinoceros.png";
import img_african_buffalo from "../assets/animals/african-buffalo.png";
import img_giraffe from "../assets/animals/giraffe.png";
import img_hippopotamus from "../assets/animals/hippopotamus.png";
import img_oryx_gemsbok from "../assets/animals/oryx-gemsbok.png";
import img_springbok from "../assets/animals/springbok.png";
import img_impala from "../assets/animals/impala.png";
import img_blue_wildebeest from "../assets/animals/blue-wildebeest.png";
import img_plains_zebra from "../assets/animals/plains-zebra.png";
import img_hartmanns_mountain_zebra from "../assets/animals/hartmanns-mountain-zebra.png";
import img_kudu from "../assets/animals/kudu.png";
import img_eland from "../assets/animals/eland.png";
import img_dik_dik from "../assets/animals/dik-dik.png";
import img_steenbok from "../assets/animals/steenbok.png";
import img_sable_antelope from "../assets/animals/sable-antelope.png";
import img_roan_antelope from "../assets/animals/roan-antelope.png";
import img_red_lechwe from "../assets/animals/red-lechwe.png";
import img_puku from "../assets/animals/puku.png";
import img_tsessebe from "../assets/animals/tsessebe.png";
import img_reedbuck_redunca from "../assets/animals/reedbuck-redunca.png";
import img_spotted_hyena from "../assets/animals/spotted-hyena.png";
import img_brown_hyena from "../assets/animals/brown-hyena.png";
import img_black_backed_jackal from "../assets/animals/black-backed-jackal.png";
import img_african_wild_dog from "../assets/animals/african-wild-dog.png";
import img_warthog from "../assets/animals/warthog.png";
import img_chacma_baboon from "../assets/animals/chacma-baboon.png";
import img_vervet_monkey from "../assets/animals/vervet-monkey.png";
import img_meerkat from "../assets/animals/meerkat.png";
import img_caracal from "../assets/animals/caracal.png";
import img_cape_fox from "../assets/animals/cape-fox.png";
import img_cape_porcupine from "../assets/animals/cape-porcupine.png";
import img_african_wildcat from "../assets/animals/african-wildcat.png";
import img_honey_badger from "../assets/animals/honey-badger.png";
import img_african_civet from "../assets/animals/african-civet.png";
import img_spotted_genet from "../assets/animals/spotted-genet.png";
import img_yellow_mongoose from "../assets/animals/yellow-mongoose.png";
import img_banded_mongoose from "../assets/animals/banded-mongoose.png";
import img_springhare from "../assets/animals/springhare.png";
import img_rock_hyrax from "../assets/animals/rock-hyrax.png";
import img_ostrich from "../assets/animals/ostrich.png";
import img_flamingo from "../assets/animals/flamingo.png";
import img_african_white_backed_vulture from "../assets/animals/african-white-backed-vulture.png";
import img_martial_eagle from "../assets/animals/martial-eagle.png";
import img_secretarybird from "../assets/animals/secretarybird.png";
import img_dune_lark from "../assets/animals/dune-lark.png";
import img_lilac_breasted_roller from "../assets/animals/lilac-breasted-roller.png";
import img_white_pelican from "../assets/animals/white-pelican.png";
import img_cape_cormorant from "../assets/animals/cape-cormorant.png";
import img_african_fish_eagle from "../assets/animals/african-fish-eagle.png";
import img_southern_ground_hornbill from "../assets/animals/southern-ground-hornbill.png";
import img_bateleur from "../assets/animals/bateleur.png";
import img_kori_bustard from "../assets/animals/kori-bustard.png";
import img_grey_crowned_crane from "../assets/animals/grey-crowned-crane.png";
import img_ruppells_bustard from "../assets/animals/ruppells-bustard.png";
import img_african_marabou from "../assets/animals/african-marabou.png";
import img_saddle_billed_stork from "../assets/animals/saddle-billed-stork.png";
import img_gecko_del_namib from "../assets/animals/gecko-del-namib.png";
import img_vibora_del_desierto from "../assets/animals/vibora-del-desierto.png";
import img_culebra_del_desierto from "../assets/animals/culebra-del-desierto.png";
import img_lagarto_del_desierto from "../assets/animals/lagarto-del-desierto.png";
import img_camaleon from "../assets/animals/camaleon.png";
import img_tortuga_terrestre from "../assets/animals/tortuga-terrestre.png";
import img_anfibio_del_desierto from "../assets/animals/anfibio-del-desierto.png";
import img_escarabajo_del_desierto from "../assets/animals/escarabajo-del-desierto.png";
import img_arana_del_desierto from "../assets/animals/arana-del-desierto.png";
import img_escorpion_del_desierto from "../assets/animals/escorpion-del-desierto.png";
import img_insecto_del_desierto from "../assets/animals/insecto-del-desierto.png";
import img_cape_fur_seal from "../assets/animals/cape-fur-seal.png";
import img_heavisides_dolphin from "../assets/animals/heavisides-dolphin.png";
import img_atlantic_bottlenose_dolphin from "../assets/animals/atlantic-bottlenose-dolphin.png";
import img_southern_right_whale from "../assets/animals/southern-right-whale.png";
import img_african_penguin from "../assets/animals/african-penguin.png";
import img_cape_gannet from "../assets/animals/cape-gannet.png";
import img_damara_tern from "../assets/animals/damara-tern.png";
import img_wandering_albatross from "../assets/animals/wandering-albatross.png";
import img_southern_elephant_seal from "../assets/animals/southern-elephant-seal.png";
import img_ghost_crab from "../assets/animals/ghost-crab.png";

/**
 * Catalogue extracted from the source presentation (cut-out images + names).
 * scientificName / whereToSee / funFacts researched and filled in for Namibia.
 * A few names from the AI-generated source were corrected to the real,
 * most plausible Namibian species after inspecting each image (see PR notes):
 *   atlantic-bottlenose-dolphin -> Common Bottlenose Dolphin (Tursiops truncatus)
 *   ruppells-bustard -> Rüppell's Korhaan (Eupodotis rueppellii)
 *   the generic Namib reptiles/invertebrates -> real Namib desert species.
 * Ids and image filenames are kept stable; only commonName changed.
 *
 * Two entries from the AI source had no real Namibian counterpart whose image
 * we could trust, so they were removed entirely: "giant-anteater" (a South
 * American species) and "namibian-roadrunner" (not a real bird).
 */
export const animals: Animal[] = [
  {
    id: "african-elephant",
    commonName: "African Elephant",
    scientificName: "Loxodonta africana",
    image: img_african_elephant,
    category: "Grandes mamíferos",
    whereToSee: ["Parque Nacional de Etosha", "Damaraland", "Kaokoland", "Franja de Caprivi/Zambezi"],
    funFacts: [
      "Los elefantes del desierto de Damaraland recorren grandes distancias y cavan en cauces secos para encontrar agua.",
      "Sus orejas, recorridas por una densa red de vasos sanguíneos, actúan como radiadores para refrescar el cuerpo.",
    ],
  },
  {
    id: "lion",
    commonName: "Lion",
    scientificName: "Panthera leo",
    image: img_lion,
    category: "Grandes mamíferos",
    whereToSee: ["Parque Nacional de Etosha", "Franja de Caprivi/Zambezi", "Kaokoland"],
    funFacts: [
      "Los leones del desierto del noroeste de Namibia sobreviven en uno de los entornos más áridos donde existe la especie.",
      "El rugido de un macho puede oírse a más de 8 km de distancia.",
    ],
  },
  {
    id: "leopard",
    commonName: "Leopard",
    scientificName: "Panthera pardus",
    image: img_leopard,
    category: "Grandes mamíferos",
    whereToSee: ["Parque Nacional de Etosha", "Montañas Erongo", "Damaraland", "Cañón del Fish River"],
    funFacts: [
      "Es capaz de subir a un árbol arrastrando una presa más pesada que él mismo para protegerla de hienas y leones.",
      "Su patrón de rosetas es único en cada ejemplar, como una huella dactilar.",
    ],
  },
  {
    id: "cheetah",
    commonName: "Cheetah",
    scientificName: "Acinonyx jubatus",
    image: img_cheetah,
    category: "Grandes mamíferos",
    whereToSee: ["Mesetas de la región central (Otjiwarongo)", "Parque Nacional de Etosha", "Kalahari"],
    funFacts: [
      "Namibia alberga la mayor población de guepardos en libertad del mundo.",
      "Acelera de 0 a 100 km/h en unos tres segundos, pero solo puede mantener el esprint unos pocos cientos de metros.",
    ],
  },
  {
    id: "black-rhinoceros",
    commonName: "Black Rhinoceros",
    scientificName: "Diceros bicornis",
    image: img_black_rhinoceros,
    category: "Grandes mamíferos",
    whereToSee: ["Damaraland (Palmwag)", "Parque Nacional de Etosha"],
    funFacts: [
      "Damaraland acoge la mayor población de rinocerontes negros que vive libre fuera de áreas valladas.",
      "Tiene un labio superior prensil y puntiagudo con el que ramonea arbustos espinosos.",
    ],
  },
  {
    id: "white-rhinoceros",
    commonName: "White Rhinoceros",
    scientificName: "Ceratotherium simum",
    image: img_white_rhinoceros,
    category: "Grandes mamíferos",
    whereToSee: ["Parque Nacional de Etosha", "Parque de Rinocerontes de Waterberg"],
    funFacts: [
      "Su nombre no viene del color, sino del término afrikáans «wyd» (ancho), por su hocico cuadrado para pastar.",
      "Es el rinoceronte más grande y el mamífero terrestre más pesado tras el elefante.",
    ],
  },
  {
    id: "african-buffalo",
    commonName: "African Buffalo",
    scientificName: "Syncerus caffer",
    image: img_african_buffalo,
    category: "Grandes mamíferos",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Bwabwata", "Parque Nacional de Mahango"],
    funFacts: [
      "En Namibia se concentra en los ríos del noreste; está casi ausente del árido oeste.",
      "Las manadas pueden actuar en grupo para ahuyentar a los leones, su principal depredador.",
    ],
  },
  {
    id: "giraffe",
    commonName: "Giraffe",
    scientificName: "Giraffa camelopardalis",
    image: img_giraffe,
    category: "Grandes mamíferos",
    whereToSee: ["Parque Nacional de Etosha", "Damaraland", "Montañas Erongo"],
    funFacts: [
      "A pesar de su largo cuello, tiene el mismo número de vértebras cervicales que un humano: siete.",
      "En Damaraland se la ve caminar entre cauces secos buscando acacias de las que ramonear.",
    ],
  },
  {
    id: "hippopotamus",
    commonName: "Hippopotamus",
    scientificName: "Hippopotamus amphibius",
    image: img_hippopotamus,
    category: "Grandes mamíferos",
    whereToSee: ["Río Kunene", "Franja de Caprivi/Zambezi", "Parque Nacional de Mahango"],
    funFacts: [
      "Segrega un líquido rojizo, la «sudoración de sangre», que actúa como protector solar y antibiótico natural.",
      "Aunque no sabe nadar bien, se desplaza dando saltos por el fondo de ríos y lagunas.",
    ],
  },
  {
    id: "oryx-gemsbok",
    commonName: "Oryx (Gemsbok)",
    scientificName: "Oryx gazella",
    image: img_oryx_gemsbok,
    category: "Herbívoros",
    whereToSee: ["Sossusvlei y Namib-Naukluft", "Parque Nacional de Etosha", "Kalahari"],
    funFacts: [
      "Es el animal nacional de Namibia y aparece en su escudo.",
      "Soporta el calor del desierto dejando subir su temperatura corporal y enfriando la sangre que riega el cerebro.",
    ],
  },
  {
    id: "springbok",
    commonName: "Springbok",
    scientificName: "Antidorcas marsupialis",
    image: img_springbok,
    category: "Herbívoros",
    whereToSee: ["Parque Nacional de Etosha", "Namib-Naukluft", "Kalahari"],
    funFacts: [
      "Realiza el «pronking»: saltos verticales con el lomo arqueado y las patas rígidas para confundir a los depredadores.",
      "Puede pasar largos periodos sin beber, obteniendo agua de las plantas que come.",
    ],
  },
  {
    id: "impala",
    commonName: "Impala",
    scientificName: "Aepyceros melampus",
    image: img_impala,
    category: "Herbívoros",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Etosha (impala de cara negra)", "Parque Nacional de Mahango"],
    funFacts: [
      "El impala de cara negra es una subespecie rara y protegida, casi exclusiva del norte de Namibia y el sur de Angola.",
      "De un solo salto puede cubrir 10 m de longitud y 3 m de altura.",
    ],
  },
  {
    id: "blue-wildebeest",
    commonName: "Blue Wildebeest",
    scientificName: "Connochaetes taurinus",
    image: img_blue_wildebeest,
    category: "Herbívoros",
    whereToSee: ["Parque Nacional de Etosha", "Kalahari", "Franja de Caprivi/Zambezi"],
    funFacts: [
      "También llamado ñu, suele asociarse con cebras y avestruces para detectar antes a los depredadores.",
      "Las crías se ponen de pie y corren a los pocos minutos de nacer.",
    ],
  },
  {
    id: "plains-zebra",
    commonName: "Plains Zebra",
    scientificName: "Equus quagga",
    image: img_plains_zebra,
    category: "Herbívoros",
    whereToSee: ["Parque Nacional de Etosha", "Franja de Caprivi/Zambezi"],
    funFacts: [
      "Cada cebra tiene un patrón de rayas único que le sirve para reconocerse dentro de la manada.",
      "Sus rayas confunden a las moscas tse-tsé y dificultan que los depredadores fijen a un individuo en el grupo.",
    ],
  },
  {
    id: "hartmanns-mountain-zebra",
    commonName: "Hartmann's Mountain Zebra",
    scientificName: "Equus zebra hartmannae",
    image: img_hartmanns_mountain_zebra,
    category: "Herbívoros",
    whereToSee: ["Naukluft", "Damaraland", "Montañas Erongo", "Kaokoland"],
    funFacts: [
      "Está adaptada al terreno rocoso y escarpado del oeste de Namibia, donde trepa con gran agilidad.",
      "A diferencia de la cebra de llanura, tiene el vientre blanco sin rayas y una papada característica.",
    ],
  },
  {
    id: "kudu",
    commonName: "Kudu",
    scientificName: "Tragelaphus strepsiceros",
    image: img_kudu,
    category: "Herbívoros",
    whereToSee: ["Montañas Erongo", "Parque Nacional de Etosha", "Waterberg", "Damaraland"],
    funFacts: [
      "Los machos lucen unos cuernos en espiral que pueden superar el metro y medio siguiendo la curva.",
      "Pese a su tamaño, salta sin esfuerzo vallas de más de dos metros de altura.",
    ],
  },
  {
    id: "eland",
    commonName: "Eland",
    scientificName: "Taurotragus oryx",
    image: img_eland,
    category: "Herbívoros",
    whereToSee: ["Kalahari", "Parque Nacional de Etosha", "Meseta de Waterberg"],
    funFacts: [
      "Es el antílope más grande del mundo; un macho puede pesar cerca de una tonelada.",
      "Al caminar, sus tendones producen un característico chasquido audible a cierta distancia.",
    ],
  },
  {
    id: "dik-dik",
    commonName: "Dik-dik",
    scientificName: "Madoqua kirkii",
    image: img_dik_dik,
    category: "Herbívoros",
    whereToSee: ["Parque Nacional de Etosha", "Montañas Erongo", "Damaraland"],
    funFacts: [
      "Es uno de los antílopes más pequeños: apenas llega a la altura de la rodilla de una persona.",
      "Forma parejas que permanecen unidas de por vida y defienden un territorio común.",
    ],
  },
  {
    id: "steenbok",
    commonName: "Steenbok",
    scientificName: "Raphicerus campestris",
    image: img_steenbok,
    category: "Herbívoros",
    whereToSee: ["Parque Nacional de Etosha", "Kalahari", "Namib-Naukluft"],
    funFacts: [
      "Cuando se siente amenazado, se queda inmóvil pegado al suelo antes de salir disparado en zigzag.",
      "Suele enterrar sus excrementos, un comportamiento poco común entre los antílopes.",
    ],
  },
  {
    id: "sable-antelope",
    commonName: "Sable Antelope",
    scientificName: "Hippotragus niger",
    image: img_sable_antelope,
    category: "Herbívoros",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Bwabwata"],
    funFacts: [
      "Los machos adultos son de un negro intenso y poseen cuernos arqueados hacia atrás muy largos.",
      "Acorralado, se defiende con eficacia de los depredadores usando sus cuernos como sables.",
    ],
  },
  {
    id: "roan-antelope",
    commonName: "Roan Antelope",
    scientificName: "Hippotragus equinus",
    image: img_roan_antelope,
    category: "Herbívoros",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Khaudum", "Parque Nacional de Bwabwata"],
    funFacts: [
      "Es el segundo antílope más grande de África, tras el eland.",
      "Se reconoce por su cara con máscara blanca y negra y sus largas orejas con mechón.",
    ],
  },
  {
    id: "red-lechwe",
    commonName: "Red Lechwe",
    scientificName: "Kobus leche",
    image: img_red_lechwe,
    category: "Herbívoros",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Mahango", "Llanuras inundables del río Kwando"],
    funFacts: [
      "Vive en humedales y se mueve con soltura por el agua, donde escapa de los depredadores.",
      "Sus pezuñas alargadas y una sustancia hidrófuga en las patas facilitan el desplazamiento por terreno encharcado.",
    ],
  },
  {
    id: "puku",
    commonName: "Puku",
    scientificName: "Kobus vardonii",
    image: img_puku,
    category: "Herbívoros",
    whereToSee: ["Riberas del río Chobe (Zambezi)", "Parque Nacional de Nkasa Rupara"],
    funFacts: [
      "En Namibia es muy escaso y solo se encuentra en una pequeña zona del extremo noreste.",
      "Emite un silbido agudo y repetido para avisar al grupo del peligro.",
    ],
  },
  {
    id: "tsessebe",
    commonName: "Tsessebe",
    scientificName: "Damaliscus lunatus",
    image: img_tsessebe,
    category: "Herbívoros",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Mahango", "Parque Nacional de Khaudum"],
    funFacts: [
      "Está considerado el antílope más rápido de África, capaz de mantener cerca de 90 km/h.",
      "Los machos vigilan su territorio desde termiteros u otras elevaciones del terreno.",
    ],
  },
  {
    id: "reedbuck-redunca",
    commonName: "Reedbuck (Redunca)",
    scientificName: "Redunca arundinum",
    image: img_reedbuck_redunca,
    category: "Herbívoros",
    whereToSee: ["Franja de Caprivi/Zambezi", "Llanuras inundables del río Kwando", "Parque Nacional de Nkasa Rupara"],
    funFacts: [
      "Habita herbazales altos y cañaverales cerca del agua, donde se camufla con facilidad.",
      "Al huir levanta la cola mostrando su parte inferior blanca como señal de alarma.",
    ],
  },
  {
    id: "spotted-hyena",
    commonName: "Spotted Hyena",
    scientificName: "Crocuta crocuta",
    image: img_spotted_hyena,
    category: "Carnívoros y otros mamíferos",
    whereToSee: ["Parque Nacional de Etosha", "Franja de Caprivi/Zambezi", "Kalahari"],
    funFacts: [
      "Vive en clanes matriarcales dominados por las hembras, más grandes y fuertes que los machos.",
      "Sus mandíbulas figuran entre las más potentes de los carnívoros y trituran huesos con facilidad.",
    ],
  },
  {
    id: "brown-hyena",
    commonName: "Brown Hyena",
    scientificName: "Parahyaena brunnea",
    image: img_brown_hyena,
    category: "Carnívoros y otros mamíferos",
    whereToSee: ["Costa de los Esqueletos", "Namib-Naukluft", "Kalahari"],
    funFacts: [
      "En la costa namibia patrulla las playas en busca de carroña y de crías de lobo marino.",
      "Es la hiena más rara y se reconoce por su largo pelaje desgreñado de color chocolate.",
    ],
  },
  {
    id: "black-backed-jackal",
    commonName: "Black-backed Jackal",
    scientificName: "Lupulella mesomelas",
    image: img_black_backed_jackal,
    category: "Carnívoros y otros mamíferos",
    whereToSee: ["Parque Nacional de Etosha", "Costa de los Esqueletos", "Namib-Naukluft"],
    funFacts: [
      "Es muy adaptable: caza pequeñas presas, come carroña e incluso fruta según la estación.",
      "Las parejas se mantienen unidas durante años y defienden juntas su territorio.",
    ],
  },
  {
    id: "african-wild-dog",
    commonName: "African Wild Dog",
    scientificName: "Lycaon pictus",
    image: img_african_wild_dog,
    category: "Carnívoros y otros mamíferos",
    whereToSee: ["Parque Nacional de Khaudum", "Franja de Caprivi/Zambezi", "Parque Nacional de Bwabwata"],
    funFacts: [
      "Es uno de los carnívoros más amenazados de África y sus cacerías en grupo tienen un éxito altísimo.",
      "Cada ejemplar tiene un patrón de manchas único; su nombre científico significa «lobo pintado».",
    ],
  },
  {
    id: "warthog",
    commonName: "Warthog",
    scientificName: "Phacochoerus africanus",
    image: img_warthog,
    category: "Carnívoros y otros mamíferos",
    whereToSee: ["Parque Nacional de Etosha", "Franja de Caprivi/Zambezi", "Waterberg"],
    funFacts: [
      "Corre con la cola levantada como una antena y se refugia en madrigueras de oríctero, entrando de espaldas.",
      "Se arrodilla sobre las patas delanteras para hozar y pastar la hierba corta.",
    ],
  },
  {
    id: "chacma-baboon",
    commonName: "Chacma Baboon",
    scientificName: "Papio ursinus",
    image: img_chacma_baboon,
    category: "Carnívoros y otros mamíferos",
    whereToSee: ["Cañón del Fish River", "Montañas Erongo", "Waterberg", "Damaraland"],
    funFacts: [
      "Es uno de los primates más grandes y vive en tropas con una compleja jerarquía social.",
      "Centinelas apostados en alto avisan al grupo con fuertes ladridos al detectar un leopardo.",
    ],
  },
  {
    id: "vervet-monkey",
    commonName: "Vervet Monkey",
    scientificName: "Chlorocebus pygerythrus",
    image: img_vervet_monkey,
    category: "Carnívoros y otros mamíferos",
    whereToSee: ["Franja de Caprivi/Zambezi", "Río Kunene", "Bosques ribereños del Kavango"],
    funFacts: [
      "Usa llamadas de alarma distintas según el depredador sea un águila, una serpiente o un felino.",
      "Prefiere los bosques ribereños y rara vez se aleja del agua.",
    ],
  },
  {
    id: "meerkat",
    commonName: "Meerkat",
    scientificName: "Suricata suricatta",
    image: img_meerkat,
    category: "Carnívoros y otros mamíferos",
    whereToSee: ["Kalahari", "Namib-Naukluft", "Sur de Namibia (Keetmanshoop)"],
    funFacts: [
      "Se yergue sobre las patas traseras como vigía mientras el resto del grupo busca insectos.",
      "Las oscuras ojeras que rodean sus ojos reducen el deslumbramiento del sol del desierto.",
    ],
  },
  {
    id: "caracal",
    commonName: "Caracal",
    scientificName: "Caracal caracal",
    image: img_caracal,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Namib-Naukluft", "Kalahari", "Montañas Erongo"],
    funFacts: [
      "Salta hasta tres metros en vertical para atrapar aves al vuelo.",
      "Sus largos mechones negros en las orejas le sirven para comunicarse y localizar presas.",
    ],
  },
  {
    id: "cape-fox",
    commonName: "Cape Fox",
    scientificName: "Vulpes chama",
    image: img_cape_fox,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Kalahari", "Namib-Naukluft", "Sur de Namibia"],
    funFacts: [
      "Es el único zorro verdadero del África austral y tiene hábitos nocturnos.",
      "Emite un característico aullido agudo para comunicarse a distancia por la noche.",
    ],
  },
  {
    id: "cape-porcupine",
    commonName: "Cape Porcupine",
    scientificName: "Hystrix africaeaustralis",
    image: img_cape_porcupine,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Montañas Erongo", "Waterberg", "Cañón del Fish River"],
    funFacts: [
      "Es el roedor más grande del África austral y sus púas pueden superar los 30 cm.",
      "No «dispara» las púas: retrocede contra el agresor para clavárselas y luego se sueltan.",
    ],
  },
  {
    id: "african-wildcat",
    commonName: "African Wildcat",
    scientificName: "Felis lybica",
    image: img_african_wildcat,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Parque Nacional de Etosha", "Kalahari", "Namib-Naukluft"],
    funFacts: [
      "Es el antepasado salvaje de todos los gatos domésticos actuales.",
      "Para conservar la pureza de la especie es clave que no se cruce con gatos asilvestrados.",
    ],
  },
  {
    id: "honey-badger",
    commonName: "Honey Badger",
    scientificName: "Mellivora capensis",
    image: img_honey_badger,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Parque Nacional de Etosha", "Kalahari", "Namib-Naukluft"],
    funFacts: [
      "Tiene fama de ser uno de los animales más intrépidos: planta cara a leopardos y leones.",
      "Su piel gruesa y suelta le permite girarse y morder cuando un depredador lo agarra.",
    ],
  },
  {
    id: "african-civet",
    commonName: "African Civet",
    scientificName: "Civettictis civetta",
    image: img_african_civet,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Franja de Caprivi/Zambezi", "Bosques del Kavango", "Parque Nacional de Bwabwata"],
    funFacts: [
      "Marca su territorio con una secreción almizclada que tradicionalmente se usó en perfumería.",
      "Es nocturna y omnívora: come fruta, insectos, pequeños vertebrados e incluso carroña.",
    ],
  },
  {
    id: "spotted-genet",
    commonName: "Spotted Genet",
    scientificName: "Genetta genetta",
    image: img_spotted_genet,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Montañas Erongo", "Waterberg", "Bosques ribereños del Kavango"],
    funFacts: [
      "Pese a su aspecto felino, está más emparentada con civetas y mangostas que con los gatos.",
      "Es una ágil trepadora nocturna gracias a su cuerpo esbelto y su larga cola anillada.",
    ],
  },
  {
    id: "yellow-mongoose",
    commonName: "Yellow Mongoose",
    scientificName: "Cynictis penicillata",
    image: img_yellow_mongoose,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Kalahari", "Sur de Namibia", "Namib-Naukluft"],
    funFacts: [
      "A veces comparte madriguera con suricatas y ardillas terrestres en un mismo sistema de túneles.",
      "Su pelaje amarillo rojizo y la punta blanca de la cola la distinguen de otras mangostas.",
    ],
  },
  {
    id: "banded-mongoose",
    commonName: "Banded Mongoose",
    scientificName: "Mungos mungo",
    image: img_banded_mongoose,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Franja de Caprivi/Zambezi", "Waterberg", "Parque Nacional de Etosha"],
    funFacts: [
      "Vive en grupos numerosos y muy cohesionados que se desplazan y buscan comida juntos.",
      "Las bandas oscuras del lomo, que cruzan su pelaje grisáceo, le dan nombre.",
    ],
  },
  {
    id: "springhare",
    commonName: "Springhare",
    scientificName: "Pedetes capensis",
    image: img_springhare,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Kalahari", "Parque Nacional de Etosha", "Llanuras del norte"],
    funFacts: [
      "Pese a su nombre no es una liebre, sino un roedor que se desplaza a saltos como un canguro en miniatura.",
      "De noche sus ojos brillan con intensidad al reflejar la luz de las linternas.",
    ],
  },
  {
    id: "rock-hyrax",
    commonName: "Rock Hyrax",
    scientificName: "Procavia capensis",
    image: img_rock_hyrax,
    category: "Mamíferos pequeños y medianos",
    whereToSee: ["Montañas Erongo", "Damaraland", "Cañón del Fish River", "Waterberg"],
    funFacts: [
      "Aunque parece un roedor, su pariente vivo más cercano es el elefante.",
      "Toma el sol en grupo sobre las rocas para regular su temperatura corporal por la mañana.",
    ],
  },
  {
    id: "ostrich",
    commonName: "Ostrich",
    scientificName: "Struthio camelus",
    image: img_ostrich,
    category: "Aves",
    whereToSee: ["Parque Nacional de Etosha", "Namib-Naukluft", "Sossusvlei"],
    funFacts: [
      "Es el ave más grande del mundo y, aunque no vuela, corre a más de 70 km/h.",
      "Pone los huevos más grandes de todas las aves vivas; uno equivale a unas dos docenas de huevos de gallina.",
    ],
  },
  {
    id: "flamingo",
    commonName: "Flamingo",
    scientificName: "Phoeniconaias minor",
    image: img_flamingo,
    category: "Aves",
    whereToSee: ["Laguna de Walvis Bay", "Sandwich Harbour", "Bahía de Swakopmund"],
    funFacts: [
      "Walvis Bay reúne decenas de miles de flamencos enanos y comunes que se alimentan en sus lagunas.",
      "Su color rosado procede de los pigmentos de las algas y crustáceos de los que se alimenta.",
    ],
  },
  {
    id: "african-white-backed-vulture",
    commonName: "African White-backed Vulture",
    scientificName: "Gyps africanus",
    image: img_african_white_backed_vulture,
    category: "Aves",
    whereToSee: ["Parque Nacional de Etosha", "Franja de Caprivi/Zambezi", "Waterberg"],
    funFacts: [
      "Planea durante horas aprovechando las corrientes térmicas para localizar carroña desde gran altura.",
      "Está en peligro crítico de extinción, en buena parte por los envenenamientos.",
    ],
  },
  {
    id: "martial-eagle",
    commonName: "Martial Eagle",
    scientificName: "Polemaetus bellicosus",
    image: img_martial_eagle,
    category: "Aves",
    whereToSee: ["Parque Nacional de Etosha", "Kalahari", "Damaraland"],
    funFacts: [
      "Es el águila más grande y poderosa de África, capaz de derribar presas del tamaño de un pequeño antílope.",
      "Su vista es tan aguda que detecta presas a varios kilómetros de distancia.",
    ],
  },
  {
    id: "secretarybird",
    commonName: "Secretarybird",
    scientificName: "Sagittarius serpentarius",
    image: img_secretarybird,
    category: "Aves",
    whereToSee: ["Parque Nacional de Etosha", "Kalahari", "Llanuras de la región central"],
    funFacts: [
      "Caza a pie por la sabana y mata serpientes y otras presas a pisotones precisos y veloces.",
      "Su nombre alude a las largas plumas de la nuca, que recuerdan a las plumas de escribir tras la oreja.",
    ],
  },
  {
    id: "dune-lark",
    commonName: "Dune Lark",
    scientificName: "Calendulauda erythrochlamys",
    image: img_dune_lark,
    category: "Aves",
    whereToSee: ["Dunas de Sossusvlei", "Namib-Naukluft", "Valle del río Kuiseb"],
    funFacts: [
      "Es la única ave endémica exclusiva de Namibia y vive solo en las dunas del Namib.",
      "Obtiene casi toda el agua que necesita de las semillas e insectos que come, sin depender de beber.",
    ],
  },
  {
    id: "lilac-breasted-roller",
    commonName: "Lilac-breasted Roller",
    scientificName: "Coracias caudatus",
    image: img_lilac_breasted_roller,
    category: "Aves",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Etosha", "Waterberg"],
    funFacts: [
      "Debe su nombre a las acrobacias de cortejo, con picados y giros en el aire.",
      "Su plumaje combina hasta ocho tonos distintos, del lila al turquesa.",
    ],
  },
  {
    id: "white-pelican",
    commonName: "Great White Pelican",
    scientificName: "Pelecanus onocrotalus",
    image: img_white_pelican,
    category: "Aves",
    whereToSee: ["Laguna de Walvis Bay", "Sandwich Harbour", "Desembocadura del río Kunene"],
    funFacts: [
      "La bolsa de su pico funciona como una red con la que captura peces y escurre el agua.",
      "A veces pescan en grupo formando un semicírculo para acorralar a los peces.",
    ],
  },
  {
    id: "cape-cormorant",
    commonName: "Cape Cormorant",
    scientificName: "Phalacrocorax capensis",
    image: img_cape_cormorant,
    category: "Aves",
    whereToSee: ["Costa de Walvis Bay", "Bahía de Swakopmund", "Costa de los Esqueletos"],
    funFacts: [
      "Forma enormes colonias de cría y se alimenta sobre todo de sardinas y anchoas de la corriente de Benguela.",
      "Bucea desde la superficie persiguiendo bancos de peces bajo el agua.",
    ],
  },
  {
    id: "african-fish-eagle",
    commonName: "African Fish Eagle",
    scientificName: "Haliaeetus vocifer",
    image: img_african_fish_eagle,
    category: "Aves",
    whereToSee: ["Río Kunene", "Franja de Caprivi/Zambezi", "Río Kavango"],
    funFacts: [
      "Su penetrante reclamo es uno de los sonidos más emblemáticos de los ríos africanos.",
      "Se lanza en picado para arrancar peces de la superficie del agua con sus garras.",
    ],
  },
  {
    id: "southern-ground-hornbill",
    commonName: "Southern Ground Hornbill",
    scientificName: "Bucorvus leadbeateri",
    image: img_southern_ground_hornbill,
    category: "Aves",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Mahango", "Parque Nacional de Bwabwata"],
    funFacts: [
      "Su grito grave y resonante se confunde a veces con el rugido lejano de un león.",
      "Es un ave longeva y de cría muy lenta: una pareja puede sacar adelante una sola cría cada varios años.",
    ],
  },
  {
    id: "bateleur",
    commonName: "Bateleur",
    scientificName: "Terathopius ecaudatus",
    image: img_bateleur,
    category: "Aves",
    whereToSee: ["Parque Nacional de Etosha", "Franja de Caprivi/Zambezi", "Kalahari"],
    funFacts: [
      "Su nombre, del francés «volatinero», alude a cómo se balancea en vuelo con su cortísima cola.",
      "Puede recorrer cientos de kilómetros al día patrullando su territorio en busca de carroña y presas.",
    ],
  },
  {
    id: "kori-bustard",
    commonName: "Kori Bustard",
    scientificName: "Ardeotis kori",
    image: img_kori_bustard,
    category: "Aves",
    whereToSee: ["Parque Nacional de Etosha", "Kalahari", "Namib-Naukluft"],
    funFacts: [
      "Está considerada una de las aves voladoras más pesadas del mundo.",
      "En el cortejo, el macho hincha el cuello hasta dejarlo casi esférico y lanza un profundo bramido.",
    ],
  },
  {
    id: "grey-crowned-crane",
    commonName: "Grey Crowned Crane",
    scientificName: "Balearica regulorum",
    image: img_grey_crowned_crane,
    category: "Aves",
    whereToSee: ["Llanuras inundables del Zambezi", "Parque Nacional de Nkasa Rupara", "Río Kwando"],
    funFacts: [
      "Luce una vistosa cresta de plumas doradas rígidas sobre la cabeza.",
      "Es de las pocas grullas que se posan en los árboles, gracias a un dedo trasero prensil.",
    ],
  },
  {
    id: "ruppells-bustard",
    commonName: "Rüppell's Korhaan",
    scientificName: "Eupodotis rueppellii",
    image: img_ruppells_bustard,
    category: "Aves",
    whereToSee: ["Namib-Naukluft", "Costa de los Esqueletos", "Damaraland"],
    funFacts: [
      "Es casi endémica de Namibia y el suroeste de Angola, ligada a las llanuras áridas del Namib.",
      "Al amanecer, los machos emiten un reclamo resonante y repetitivo que marca su territorio.",
    ],
  },
  {
    id: "african-marabou",
    commonName: "Marabou Stork",
    scientificName: "Leptoptilos crumenifer",
    image: img_african_marabou,
    category: "Aves",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Etosha", "Río Kavango"],
    funFacts: [
      "Su envergadura figura entre las mayores de las aves terrestres, superando a menudo los 2,5 m.",
      "La cabeza y el cuello desnudos son una adaptación higiénica a su dieta carroñera.",
    ],
  },
  {
    id: "saddle-billed-stork",
    commonName: "Saddle-billed Stork",
    scientificName: "Ephippiorhynchus senegalensis",
    image: img_saddle_billed_stork,
    category: "Aves",
    whereToSee: ["Franja de Caprivi/Zambezi", "Parque Nacional de Mahango", "Río Kwando"],
    funFacts: [
      "Su llamativo pico rojo y negro lleva un «escudete» amarillo que recuerda a una silla de montar.",
      "Los sexos se distinguen por el ojo: amarillo en las hembras y oscuro en los machos.",
    ],
  },
  {
    id: "gecko-del-namib",
    commonName: "Geco terrestre gigante",
    scientificName: "Chondrodactylus angulifer",
    image: img_gecko_del_namib,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Namib-Naukluft", "Llanuras de grava del Namib", "Sur de Namibia"],
    funFacts: [
      "Es un geco terrestre nocturno de grandes ojos que cava madrigueras en el suelo arenoso.",
      "Cuando se siente amenazado se yergue sobre las patas y arquea el cuerpo para parecer más grande.",
    ],
  },
  {
    id: "vibora-del-desierto",
    commonName: "Víbora cornuda",
    scientificName: "Bitis caudalis",
    image: img_vibora_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Namib-Naukluft", "Kalahari", "Damaraland"],
    funFacts: [
      "Suele lucir una pequeña escama en forma de cuerno sobre cada ojo, de donde viene su nombre.",
      "Se entierra en la arena dejando solo los ojos fuera para emboscar a sus presas.",
    ],
  },
  {
    id: "culebra-del-desierto",
    commonName: "Culebra de arena del Namib",
    scientificName: "Psammophis namibensis",
    image: img_culebra_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Namib-Naukluft", "Llanuras de grava del Namib", "Damaraland"],
    funFacts: [
      "Es una serpiente diurna, esbelta y muy veloz, perfectamente adaptada a la arena del Namib.",
      "Caza activamente lagartijas a las que persigue a gran velocidad en pleno día.",
    ],
  },
  {
    id: "lagarto-del-desierto",
    commonName: "Lagarto de hocico en cuña",
    scientificName: "Meroles cuneirostris",
    image: img_lagarto_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Dunas de Sossusvlei", "Namib-Naukluft", "Valle del río Kuiseb"],
    funFacts: [
      "Practica una «danza térmica»: levanta las patas por parejas para no quemarse en la arena ardiente.",
      "Su hocico en forma de cuña le permite «bucear» y esconderse bajo la arena en un instante.",
    ],
  },
  {
    id: "camaleon",
    commonName: "Camaleón de Namaqua",
    scientificName: "Chamaeleo namaquensis",
    image: img_camaleon,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Namib-Naukluft", "Costa de los Esqueletos", "Damaraland"],
    funFacts: [
      "Es uno de los camaleones más grandes y de hábitos terrestres, adaptado a vivir en pleno desierto.",
      "Cambia de color para regular su temperatura: oscuro por la mañana para calentarse y pálido al mediodía.",
    ],
  },
  {
    id: "tortuga-terrestre",
    commonName: "Tortuga leopardo",
    scientificName: "Stigmochelys pardalis",
    image: img_tortuga_terrestre,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Parque Nacional de Etosha", "Kalahari", "Damaraland"],
    funFacts: [
      "Es la tortuga terrestre más grande de Namibia y debe su nombre al moteado de su caparazón.",
      "Puede vivir varias décadas y obtiene gran parte del agua de las plantas que come.",
    ],
  },
  {
    id: "anfibio-del-desierto",
    commonName: "Sapo gutural",
    scientificName: "Sclerophrys gutturalis",
    image: img_anfibio_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Franja de Caprivi/Zambezi", "Río Kavango", "Charcas tras las lluvias en el norte"],
    funFacts: [
      "Tras las lluvias, los machos forman coros nocturnos junto a charcas y embalses.",
      "En la estación seca puede enterrarse y permanecer inactivo a la espera del agua.",
    ],
  },
  {
    id: "escarabajo-del-desierto",
    commonName: "Escarabajo del Namib",
    scientificName: "Onymacris unguicularis",
    image: img_escarabajo_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Dunas del Namib", "Namib-Naukluft", "Sossusvlei"],
    funFacts: [
      "Recoge agua haciendo el pino en la cresta de las dunas: la niebla condensa en su cuerpo y resbala hasta la boca.",
      "Esta técnica de captación de niebla ha inspirado diseños de superficies que cosechan agua del aire.",
    ],
  },
  {
    id: "arana-del-desierto",
    commonName: "Araña dama blanca bailarina",
    scientificName: "Leucorchestris arenicola",
    image: img_arana_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Dunas del Namib", "Namib-Naukluft", "Sossusvlei"],
    funFacts: [
      "Para huir de sus enemigos da volteretas laterales y rueda dunas abajo como una rueda.",
      "Cava madrigueras en la arena que recubre con seda para reforzar las paredes.",
    ],
  },
  {
    id: "escorpion-del-desierto",
    commonName: "Escorpión de cola gruesa",
    scientificName: "Parabuthus granulatus",
    image: img_escorpion_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Namib-Naukluft", "Kalahari", "Sur de Namibia"],
    funFacts: [
      "La regla general en los escorpiones se cumple aquí: pinzas pequeñas y cola gruesa indican veneno potente.",
      "Es uno de los escorpiones más peligrosos del África austral; algunos Parabuthus incluso rocían el veneno.",
    ],
  },
  {
    id: "insecto-del-desierto",
    commonName: "Langosta parda",
    scientificName: "Locustana pardalina",
    image: img_insecto_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: ["Kalahari", "Sur de Namibia", "Llanuras áridas del interior"],
    funFacts: [
      "Tras buenas lluvias puede multiplicarse y formar enjambres de millones de individuos.",
      "Sus huevos resisten enterrados largas sequías y eclosionan cuando por fin llega el agua.",
    ],
  },
  {
    id: "cape-fur-seal",
    commonName: "Cape Fur Seal",
    scientificName: "Arctocephalus pusillus",
    image: img_cape_fur_seal,
    category: "Especies costeras",
    whereToSee: ["Cabo Cross", "Pelican Point (Walvis Bay)", "Costa de los Esqueletos"],
    funFacts: [
      "La colonia de Cabo Cross reúne a decenas de miles de lobos marinos, una de las mayores del mundo.",
      "Las hembras reconocen a su cría entre miles por su voz y su olor.",
    ],
  },
  {
    id: "heavisides-dolphin",
    commonName: "Heaviside's Dolphin",
    scientificName: "Cephalorhynchus heavisidii",
    image: img_heavisides_dolphin,
    category: "Especies costeras",
    whereToSee: ["Walvis Bay", "Bahía de Swakopmund", "Costa central"],
    funFacts: [
      "Es un pequeño delfín que solo vive frente a las costas de Namibia, Sudáfrica y el sur de Angola.",
      "Suele acercarse a las embarcaciones y dar espectaculares saltos verticales fuera del agua.",
    ],
  },
  {
    id: "atlantic-bottlenose-dolphin",
    commonName: "Bottlenose Dolphin",
    scientificName: "Tursiops truncatus",
    image: img_atlantic_bottlenose_dolphin,
    category: "Especies costeras",
    whereToSee: ["Walvis Bay", "Bahía de Swakopmund", "Costa central"],
    funFacts: [
      "Es el delfín más conocido y el habitual en las salidas en barco desde Walvis Bay.",
      "Cada individuo tiene un silbido propio, a modo de «nombre», con el que se identifica ante los demás.",
    ],
  },
  {
    id: "southern-right-whale",
    commonName: "Southern Right Whale",
    scientificName: "Eubalaena australis",
    image: img_southern_right_whale,
    category: "Especies costeras",
    whereToSee: ["Walvis Bay", "Costa central", "Lüderitz"],
    funFacts: [
      "Se acerca a la costa namibia durante su migración invernal desde aguas antárticas.",
      "Las callosidades blancas de su cabeza forman un patrón único que permite identificar a cada ballena.",
    ],
  },
  {
    id: "african-penguin",
    commonName: "African Penguin",
    scientificName: "Spheniscus demersus",
    image: img_african_penguin,
    category: "Especies costeras",
    whereToSee: ["Isla Halifax (Lüderitz)", "Islas Mercury e Ichaboe", "Costa sur"],
    funFacts: [
      "Es el único pingüino que cría en África y está en peligro de extinción.",
      "También se le llama «pingüino jackass» por su rebuzno, parecido al de un burro.",
    ],
  },
  {
    id: "cape-gannet",
    commonName: "Cape Gannet",
    scientificName: "Morus capensis",
    image: img_cape_gannet,
    category: "Especies costeras",
    whereToSee: ["Isla Mercury", "Islas Ichaboe y Possession", "Costa frente a Lüderitz"],
    funFacts: [
      "Se lanza al agua en picado desde 30 m para pescar, alcanzando los peces a gran velocidad.",
      "Cría en colonias densísimas donde cada pareja defiende un pequeño territorio a picotazos.",
    ],
  },
  {
    id: "damara-tern",
    commonName: "Damara Tern",
    scientificName: "Sternula balaenarum",
    image: img_damara_tern,
    category: "Especies costeras",
    whereToSee: ["Costa central (Walvis Bay-Swakopmund)", "Costa de los Esqueletos", "Lüderitz"],
    funFacts: [
      "La mayor parte de la población mundial cría en la costa de Namibia, donde es casi endémica.",
      "Anida en la grava del desierto, a veces a kilómetros del mar, para esquivar a los depredadores.",
    ],
  },
  {
    id: "wandering-albatross",
    commonName: "Wandering Albatross",
    scientificName: "Diomedea exulans",
    image: img_wandering_albatross,
    category: "Especies costeras",
    whereToSee: ["Aguas oceánicas frente a Walvis Bay", "Mar abierto frente a la costa de Namibia"],
    funFacts: [
      "Tiene la mayor envergadura de cualquier ave viva: sus alas superan los tres metros.",
      "Puede planear miles de kilómetros aprovechando el viento casi sin batir las alas.",
    ],
  },
  {
    id: "southern-elephant-seal",
    commonName: "Southern Elephant Seal",
    scientificName: "Mirounga leonina",
    image: img_southern_elephant_seal,
    category: "Especies costeras",
    whereToSee: ["Pelican Point (Walvis Bay)", "Costa central (visitante ocasional)"],
    funFacts: [
      "Es el mayor de todos los pinnípedos: un macho puede pesar varias toneladas.",
      "Bucea a más de mil metros de profundidad y aguanta la respiración cerca de dos horas.",
    ],
  },
  {
    id: "ghost-crab",
    commonName: "Ghost Crab",
    scientificName: "Ocypode africana",
    image: img_ghost_crab,
    category: "Especies costeras",
    whereToSee: ["Playas de Swakopmund", "Walvis Bay", "Costa de los Esqueletos"],
    funFacts: [
      "Su color arenoso lo vuelve casi invisible sobre la playa, de ahí el nombre de cangrejo fantasma.",
      "Es uno de los crustáceos más veloces y se refugia en profundas galerías que excava en la arena.",
    ],
  },
];
