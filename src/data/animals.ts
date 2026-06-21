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
import img_giant_anteater from "../assets/animals/giant-anteater.png";
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
import img_namibian_roadrunner from "../assets/animals/namibian-roadrunner.png";
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
 * Auto-generated from the source presentation (cut-out images + names).
 * whereToSee / funFacts / scientificName are filled in separately.
 */
export const animals: Animal[] = [
  {
    id: "african-elephant",
    commonName: "African Elephant",
    image: img_african_elephant,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "lion",
    commonName: "Lion",
    image: img_lion,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "leopard",
    commonName: "Leopard",
    image: img_leopard,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "cheetah",
    commonName: "Cheetah",
    image: img_cheetah,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "black-rhinoceros",
    commonName: "Black Rhinoceros",
    image: img_black_rhinoceros,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "white-rhinoceros",
    commonName: "White Rhinoceros",
    image: img_white_rhinoceros,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "african-buffalo",
    commonName: "African Buffalo",
    image: img_african_buffalo,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "giraffe",
    commonName: "Giraffe",
    image: img_giraffe,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "hippopotamus",
    commonName: "Hippopotamus",
    image: img_hippopotamus,
    category: "Grandes mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "oryx-gemsbok",
    commonName: "Oryx (Gemsbok)",
    image: img_oryx_gemsbok,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "springbok",
    commonName: "Springbok",
    image: img_springbok,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "impala",
    commonName: "Impala",
    image: img_impala,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "blue-wildebeest",
    commonName: "Blue Wildebeest",
    image: img_blue_wildebeest,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "plains-zebra",
    commonName: "Plains Zebra",
    image: img_plains_zebra,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "hartmanns-mountain-zebra",
    commonName: "Hartmann's Mountain Zebra",
    image: img_hartmanns_mountain_zebra,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "kudu",
    commonName: "Kudu",
    image: img_kudu,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "eland",
    commonName: "Eland",
    image: img_eland,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "dik-dik",
    commonName: "Dik-dik",
    image: img_dik_dik,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "steenbok",
    commonName: "Steenbok",
    image: img_steenbok,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "sable-antelope",
    commonName: "Sable Antelope",
    image: img_sable_antelope,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "roan-antelope",
    commonName: "Roan Antelope",
    image: img_roan_antelope,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "red-lechwe",
    commonName: "Red Lechwe",
    image: img_red_lechwe,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "puku",
    commonName: "Puku",
    image: img_puku,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "tsessebe",
    commonName: "Tsessebe",
    image: img_tsessebe,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "reedbuck-redunca",
    commonName: "Reedbuck (Redunca)",
    image: img_reedbuck_redunca,
    category: "Herbívoros",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "spotted-hyena",
    commonName: "Spotted Hyena",
    image: img_spotted_hyena,
    category: "Carnívoros y otros mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "brown-hyena",
    commonName: "Brown Hyena",
    image: img_brown_hyena,
    category: "Carnívoros y otros mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "black-backed-jackal",
    commonName: "Black-backed Jackal",
    image: img_black_backed_jackal,
    category: "Carnívoros y otros mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "african-wild-dog",
    commonName: "African Wild Dog",
    image: img_african_wild_dog,
    category: "Carnívoros y otros mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "warthog",
    commonName: "Warthog",
    image: img_warthog,
    category: "Carnívoros y otros mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "chacma-baboon",
    commonName: "Chacma Baboon",
    image: img_chacma_baboon,
    category: "Carnívoros y otros mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "vervet-monkey",
    commonName: "Vervet Monkey",
    image: img_vervet_monkey,
    category: "Carnívoros y otros mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "meerkat",
    commonName: "Meerkat",
    image: img_meerkat,
    category: "Carnívoros y otros mamíferos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "caracal",
    commonName: "Caracal",
    image: img_caracal,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "cape-fox",
    commonName: "Cape Fox",
    image: img_cape_fox,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "cape-porcupine",
    commonName: "Cape Porcupine",
    image: img_cape_porcupine,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "african-wildcat",
    commonName: "African Wildcat",
    image: img_african_wildcat,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "honey-badger",
    commonName: "Honey Badger",
    image: img_honey_badger,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "giant-anteater",
    commonName: "Giant Anteater",
    image: img_giant_anteater,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "african-civet",
    commonName: "African Civet",
    image: img_african_civet,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "spotted-genet",
    commonName: "Spotted Genet",
    image: img_spotted_genet,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "yellow-mongoose",
    commonName: "Yellow Mongoose",
    image: img_yellow_mongoose,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "banded-mongoose",
    commonName: "Banded Mongoose",
    image: img_banded_mongoose,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "springhare",
    commonName: "Springhare",
    image: img_springhare,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "rock-hyrax",
    commonName: "Rock Hyrax",
    image: img_rock_hyrax,
    category: "Mamíferos pequeños y medianos",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "ostrich",
    commonName: "Ostrich",
    image: img_ostrich,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "flamingo",
    commonName: "Flamingo",
    image: img_flamingo,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "african-white-backed-vulture",
    commonName: "African White-backed Vulture",
    image: img_african_white_backed_vulture,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "martial-eagle",
    commonName: "Martial Eagle",
    image: img_martial_eagle,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "secretarybird",
    commonName: "Secretarybird",
    image: img_secretarybird,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "namibian-roadrunner",
    commonName: "Namibian Roadrunner",
    image: img_namibian_roadrunner,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "dune-lark",
    commonName: "Dune Lark",
    image: img_dune_lark,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "lilac-breasted-roller",
    commonName: "Lilac-breasted Roller",
    image: img_lilac_breasted_roller,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "white-pelican",
    commonName: "White Pelican",
    image: img_white_pelican,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "cape-cormorant",
    commonName: "Cape Cormorant",
    image: img_cape_cormorant,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "african-fish-eagle",
    commonName: "African Fish Eagle",
    image: img_african_fish_eagle,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "southern-ground-hornbill",
    commonName: "Southern Ground Hornbill",
    image: img_southern_ground_hornbill,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "bateleur",
    commonName: "Bateleur",
    image: img_bateleur,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "kori-bustard",
    commonName: "Kori Bustard",
    image: img_kori_bustard,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "grey-crowned-crane",
    commonName: "Grey Crowned Crane",
    image: img_grey_crowned_crane,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "ruppells-bustard",
    commonName: "Ruppell's Bustard",
    image: img_ruppells_bustard,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "african-marabou",
    commonName: "African Marabou",
    image: img_african_marabou,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "saddle-billed-stork",
    commonName: "Saddle-billed Stork",
    image: img_saddle_billed_stork,
    category: "Aves",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "gecko-del-namib",
    commonName: "Gecko del Namib",
    image: img_gecko_del_namib,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "vibora-del-desierto",
    commonName: "Vibora del desierto",
    image: img_vibora_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "culebra-del-desierto",
    commonName: "Culebra del desierto",
    image: img_culebra_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "lagarto-del-desierto",
    commonName: "Lagarto del desierto",
    image: img_lagarto_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "camaleon",
    commonName: "Camaleon",
    image: img_camaleon,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "tortuga-terrestre",
    commonName: "Tortuga terrestre",
    image: img_tortuga_terrestre,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "anfibio-del-desierto",
    commonName: "Anfibio del desierto",
    image: img_anfibio_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "escarabajo-del-desierto",
    commonName: "Escarabajo del desierto",
    image: img_escarabajo_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "arana-del-desierto",
    commonName: "Arana del desierto",
    image: img_arana_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "escorpion-del-desierto",
    commonName: "Escorpion del desierto",
    image: img_escorpion_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "insecto-del-desierto",
    commonName: "Insecto del desierto",
    image: img_insecto_del_desierto,
    category: "Reptiles, anfibios e invertebrados",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "cape-fur-seal",
    commonName: "Cape Fur Seal",
    image: img_cape_fur_seal,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "heavisides-dolphin",
    commonName: "Heaviside's Dolphin",
    image: img_heavisides_dolphin,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "atlantic-bottlenose-dolphin",
    commonName: "Atlantic Bottlenose Dolphin",
    image: img_atlantic_bottlenose_dolphin,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "southern-right-whale",
    commonName: "Southern Right Whale",
    image: img_southern_right_whale,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "african-penguin",
    commonName: "African Penguin",
    image: img_african_penguin,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "cape-gannet",
    commonName: "Cape Gannet",
    image: img_cape_gannet,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "damara-tern",
    commonName: "Damara Tern",
    image: img_damara_tern,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "wandering-albatross",
    commonName: "Wandering Albatross",
    image: img_wandering_albatross,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "southern-elephant-seal",
    commonName: "Southern Elephant Seal",
    image: img_southern_elephant_seal,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
  {
    id: "ghost-crab",
    commonName: "Ghost Crab",
    image: img_ghost_crab,
    category: "Especies costeras",
    whereToSee: [],
    funFacts: [],
  },
];
