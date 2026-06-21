# Zone data — public sources

This documents the public, English-language evidence behind the **Mapa** feature:
each zone's climate and terrain, which animals are listed there, and the
spotting-difficulty ratings. Source priority, as requested:

1. **Official** — Namibian government (MEFT), Ramsar, Namibia Wildlife Resorts
   (NWR), Atlas of Namibia, Gobabeb, universities, IUCN / peer-reviewed.
2. **Operator** — reputable safari / tour operators and lodges.
3. **Review** — TripAdvisor and similar (only where 1–2 were insufficient).

Researched June 2026. The data lives in `src/data/zones.ts` (zones + region→animal
mapping) and `src/data/difficulty.ts` (per-animal spotting difficulty).

---

## Corrections applied from this research

- **Removed two non-Namibian catalogue entries** (no source can back them):
  - *Giant Anteater* — a South American species, does not occur in Africa.
  - *Namibian Roadrunner* — no such bird exists; roadrunners are New-World only.
- **Kalahari — removed Lion.** Wild, free-ranging lions do **not** occur in the
  Namibian Kalahari; the "black-maned Kalahari lion" range is the South-African /
  Botswana Kgalagadi. The only lions on the Namibian side are a fenced
  reintroduction at Kalahari Game Lodge. (Lion remains under Etosha and Zambezi.)
- **Central Highlands — removed Meerkat, African Civet, Banded Mongoose.**
  Meerkat is a Kalahari/southern species absent from the montane highlands;
  civet and banded mongoose are northern/marginal there. (They remain in the
  zones where sources confirm them.)
- **White Rhino → difficulty "difícil"** (scarce in the wild: only W. Etosha and
  private reserves).
- **Climate/terrain wording** refined to match sources (fog as the Namib's main
  water source; cold nights in several zones; rainfall figures; Kalahari dunes
  are vegetated/fossil with camelthorn savanna).

### Caveats kept (real species, but read the difficulty)

- **African Penguin (Costa)** — breeds only on offshore islands; realistically
  seen on a Lüderitz island boat trip, not from the mainland.
- **Wandering Albatross, Southern Elephant Seal (Costa)** — genuine but rare
  (pelagic / vagrant); kept and rated *difícil*.
- **Puku, Grey Crowned Crane (Zambezi)** — present but very localized/uncommon;
  rated *difícil*.
- **Naming nit:** the catalogue's "Rüppell's Bustard" is more correctly
  **Rüppell's Korhaan** (*Eupodotis rueppellii*); the desert reptile/invertebrate
  placeholders map to real Namib/Kalahari species (see Namib & Kalahari below).

---

## Etosha National Park

- **Climate:** semi-arid; dry season May–Oct (warm days, cold nights ~10 °C),
  peak heat and rains in summer Nov–Apr (~350–450 mm/yr).
- **Terrain:** open savanna and mopane (~80 % of trees) around the vast Etosha
  Pan (~5,000 km²); waterholes concentrate game in the dry season.
- **Wildlife:** all listed species confirmed for the park. Notes: Black-faced
  Impala is a park specialty; Roan and White Rhino are uncommon/localized;
  Chacma Baboon is marginal here. Buffalo and Wild Dog are absent (correctly not
  listed). Leopard/White Rhino hardest; Black Rhino reliable at night at the
  Okaukuejo floodlit waterhole; elephant/giraffe/zebra/springbok/oryx easy.
- **Sources:** Official: [MEFT — Etosha](https://www.meft.gov.na/national-parks/etosha-national-park/217/),
  [Wikipedia — Etosha NP](https://en.wikipedia.org/wiki/Etosha_National_Park),
  [Avibase — Etosha checklist](https://avibase.bsc-eoc.org/checklist.jsp?region=NAot01).
  Operator: [NWR — Etosha weather](https://nwrnamibia.com/etosha-weather.htm),
  [SafariBookings — Etosha climate](https://www.safaribookings.com/etosha/climate) /
  [wildlife](https://www.safaribookings.com/etosha/wildlife),
  [etoshanationalpark.org](https://www.etoshanationalpark.org/wildlife),
  [MAT-Travel — Etosha wildlife](https://mat-travel.com/namibia/etosha/wildlife/),
  [Arebbusch — Predators of Etosha](https://www.arebbusch.com/travel-blog/predators-of-etosha-and-where-to-find-them/).

## Kaokoland & Damaraland (Kunene)

- **Climate:** arid; very hot days, cold nights; one of the driest parts of the
  country (<150 mm/yr).
- **Terrain:** rocky mountains, dry riverbeds and gravel plains; remote, sparsely
  populated wilderness.
- **Wildlife:** all listed species confirmed; famous for desert-adapted Elephant
  and Black Rhino (both special but require tracking — hard), plus Hartmann's
  Mountain Zebra, Oryx, Springbok, Rock Hyrax (easier).
- **Sources:** Official/conservation: [Save the Rhino Trust](https://www.savetherhinotrust.org/),
  [Save the Rhino — the Kunene](https://www.savetherhino.org/africa/namibia/the-kunene-a-special-place-for-rhinos-and-people/),
  [Birds of the World — Rüppell's Korhaan](https://birdsoftheworld.org/bow/species/ruebus1/cur/introduction).
  Operator: [SafariBookings — Damaraland wildlife](https://www.safaribookings.com/damaraland/wildlife),
  [Wild Wings — Kunene/Damaraland](https://wild-wings-safaris.com/africa-travel-guide/kunene-region-damaraland),
  [Wilderness — Damaraland](https://www.wildernessdestinations.com/africa/namibia/damaraland),
  [TravelButlers — Damaraland](https://www.travelbutlers.com/namibia/damaraland/).

## Zambezi / Caprivi

- **Climate:** subtropical; hot, humid, stormy summers and mild (cold-night)
  winters; the wettest region of Namibia (~600–700 mm).
- **Terrain:** the meeting of five perennial rivers — channels, floodplains and
  riverine forest; Namibia's most water-rich landscape.
- **Wildlife:** confirmed by MEFT park sheets (Bwabwata, Nkasa Rupara): Elephant,
  Buffalo (largest concentration in Namibia), Hippo, Lion, Leopard, Lechwe, Roan,
  Sable, Reedbuck, Wild Dog, etc. **Puku** occurs only here (Namibia's sole
  population — very hard). Grey Crowned Crane is uncommon (the region's signature
  cranes are Wattled Crane and Pel's Fishing Owl). Civet/Genet/Banded Mongoose
  present per regional guides.
- **Sources:** Official: [MEFT — Nkasa Rupara](https://www.meft.gov.na/national-parks/nkasa-rupara-national-park/221/),
  [MEFT — Bwabwata](https://www.meft.gov.na/national-parks/bwabwata-national-park/213/),
  [Atlas of Namibia — terrestrial wildlife](https://atlasofnamibia.online/chapter-7/terrestrial-wildlife),
  [Wikipedia — Nkasa Rupara NP](https://en.wikipedia.org/wiki/Nkasa_Rupara_National_Park).
  Operator: [Gondwana — Mudumu & Nkasa Rupara](https://gondwana.travel/blog/zambezi-wildernesses-in-the-national-parks),
  [SafariBookings — Nkasa Rupara wildlife](https://www.safaribookings.com/nkasa-rupara/wildlife),
  [SafariBookings — Zambezi climate](https://www.safaribookings.com/zambezi-region/climate),
  [Travel Namibia — birding Nkasa Rupara](https://travelnam.com/birding-nkasa-rupara-national-park/).

## Atlantic Coast

- **Climate:** cool and foggy year-round (cold Benguela Current); among the
  driest inhabited coasts in Africa (Walvis Bay ~13 mm/yr).
- **Terrain:** beaches, lagoons (Walvis Bay, Sandwich Harbour) and dunes meeting
  the sea; frequent fog, almost no rain.
- **Wildlife:** Cape Fur Seal (Cape Cross — world's largest colony), Greater/
  Lesser Flamingo, Great White Pelican, Cape Cormorant, Cape Gannet (easy on
  cruises); Heaviside's Dolphin (Benguela endemic — regional special) and
  Bottlenose Dolphin; Southern Right Whale (seasonal Jun–Nov); Damara Tern (~98 %
  of world population breeds in Namibia); Brown Hyena & Black-backed Jackal at
  seal colonies; Namib web-footed Gecko and fog-basking Tenebrionid beetles on
  the dunes. African Penguin = island boat trip only; Albatross/Elephant Seal =
  rare/vagrant.
- **Sources:** Official/academic: [MEFT — Cape Cross Seal Reserve](https://www.meft.gov.na/national-parks/cape-cross-seal-reserve/214/),
  [Ramsar — Walvis Bay](https://rsis.ramsar.org/ris/742),
  [Namibian Dolphin Project — bottlenose & Heaviside's](https://seasearch.co.za/namibian-dolphin-project/population-ecology-of-bottlenose-and-heavisides-dolphins/),
  [Conservation Namibia — Cape fur seals](https://conservationnamibia.com/articles/cn2021-cape-fur-seals.php),
  [Conservation Namibia — penguin risk](https://conservationnamibia.com/articles/namibia-penguin-extinction-2025.php),
  [NAMCOB — Damara Tern Red Data](https://www.namcob.org.na/sites/default/files/red-data-account/Damara_Tern.pdf).
  Operator: [Walvis Bay — climate](https://www.walvisbaynamibia.com/climate-weather-overview/) /
  [seal & pelican cruise](https://www.walvisbaynamibia.com/seal-and-pelican-cruise/),
  [Mola Mola — coastal wildlife](https://www.mola-namibia.com/coastal-wildlife/),
  [andBeyond — Cape Cross](https://www.andbeyond.com/experiences/africa/namibia/skeleton-coast/cape-fur-seal-colony-at-cape-cross/).

## Namib Desert

- **Climate:** hyperarid; very hot days, cold nights, almost no rain — coastal
  **fog** is the main water source (Gobabeb ~24 mm rain, ~94 fog days/yr).
- **Terrain:** the Namib Sand Sea (UNESCO) — among the world's tallest dunes,
  gravel plains and rocky outcrops; fog-adapted life.
- **Wildlife:** Oryx, Springbok, Ostrich easy at Sossusvlei; Hartmann's Mountain
  Zebra, Steenbok, Dune Lark (Namib endemic), Rüppell's Korhaan, Kori Bustard.
  The placeholder reptiles/inverts map to real species — *desert viper* =
  Peringuey's adder (*Bitis peringueyi*); *desert lizard* = shovel-snouted
  *Meroles anchietae*; Namaqua Chameleon; web-footed Gecko; *desert spider* =
  dancing white lady (*Leucorchestris arenicola*); *beetle* = fog-basking
  *Onymacris*; scorpions (*Parabuthus/Opistophthalmus*). The "desert amphibian"
  is defensible only as the southern-Namib desert rain frog (*Breviceps macrops*);
  it is absent from the central sand sea. Reptiles/inverts are best seen on a
  guided "Little Five" / Living Desert tour.
- **Sources:** Official/peer-reviewed: [Gobabeb](https://en.wikipedia.org/wiki/Gobabeb),
  [Atlas of Namibia — temperature](https://atlasofnamibia.online/chapter-3/temperature),
  [UNESCO — Namib Sand Sea](https://whc.unesco.org/en/list/1430/),
  [Natural WHS — Namib Sand Sea](https://www.naturalworldheritagesites.org/sites/namib-sand-sea/),
  [Herpetological checklist of the Namib](https://www.researchgate.net/publication/256941643),
  [List of birds of Namibia](https://en.wikipedia.org/wiki/List_of_birds_of_Namibia) (no "roadrunner").
  Operator: [Expert Africa — Namib-Naukluft](https://www.expertafrica.com/namibia/namib-naukluft-national-park),
  [Nature Travel — endemic birds](https://naturetravelnamibia.com/namibia-endemics-birding/),
  [Living Desert tour — Little Five](https://www.swakopmundnamibia.com/living-desert-tour-from-swakopmund/).

## Central Highlands (Windhoek & Erongo)

- **Climate:** high-plateau semi-arid (1,700–2,000 m); warm days, cool nights by
  altitude (~370 mm/yr).
- **Terrain:** the Khomas Hochland plateau, the granite Erongo massif (inselbergs)
  and dry acacia woodland around the capital.
- **Wildlife:** anchored to Daan Viljoen Game Park (MEFT), Erongo conservancy and
  Okonjima/AfriCat. Kudu, Hartmann's Zebra, Baboon, Rock Hyrax, Warthog,
  Steenbok easy; Eland, Wildebeest, Giraffe medium. Leopard, Cheetah, White Rhino
  are reliably seen at sanctuaries (Okonjima/AfriCat) but elusive in the wild.
  Removed Meerkat (Kalahari species), Civet & Banded Mongoose (northern/marginal).
  The highland chameleon is the Flap-necked, not the Namaqua (a Namib species).
- **Sources:** Official: [MEFT — Daan Viljoen](https://www.meft.gov.na/national-parks/daan-viljoen-game-park/215/),
  [Visit Namibia / NTB — Daan Viljoen](https://visitnamibia.com.na/2022/02/daan-viljoen-game-park/),
  [Erongo geology (MME PDF)](https://mme.gov.na/files/publications/c55_A4_Erongo_en.pdf),
  [Khomas Hochland vegetation survey (SciELO)](https://scielo.org.za/scielo.php?script=sci_arttext&pid=S0006-82412021000200004),
  [Wikipedia — Meerkat range](https://en.wikipedia.org/wiki/Meerkat).
  Operator: [The AfriCat Foundation](https://africat.org/),
  [Expert Africa — Okonjima](https://www.expertafrica.com/namibia/okonjima-nature-reserve),
  [Wildlife Worldwide — Erongo](https://www.wildlifeworldwide.com/locations/erongo-mountains).

## Kalahari

- **Climate:** semi-arid; very hot days, cold nights (sub-zero in winter);
  irregular summer thunderstorms; surface water largely absent.
- **Terrain:** red, mostly vegetated/fossil linear dunes with camelthorn
  (*Vachellia erioloba*) thornbush savanna, grassland, pans and dry riverbeds.
- **Wildlife:** Oryx (keystone), Springbok, Ostrich, Kori Bustard easy; Meerkat
  often habituated at lodges; Brown Hyena (its southern-Kalahari stronghold),
  Caracal, Cape Fox, African Wildcat, Spotted Hyena mostly nocturnal (hard);
  Cheetah scarce. Reptiles/inverts map to Puff Adder, Cape Cobra, Kalahari sand
  lizards, Leopard/Kalahari tent tortoise, solifuges, *Parabuthus* thicktail
  scorpions. **Wild lion absent** (see corrections).
- **Sources:** Official/encyclopedic: [Britannica — Kalahari climate](https://www.britannica.com/place/Kalahari-Desert/Climate),
  [Britannica — Kgalagadi Transfrontier Park](https://www.britannica.com/place/Kgalagadi-Transfrontier-Park),
  [Namibia carnivore Red Data — lion (PDF)](https://n-c-e.org/wp-content/uploads/Carnivore-Red-Data-Book-species-account-lion.pdf),
  [BirdLife SA — Kalahari Gemsbok IBA](https://www.birdlife.org.za/iba-directory/kalahari-gemsbok-national-park/),
  [Kalahari Research Centre — fauna & flora](https://kalahariresearchcentre.org/krc/fauna-and-flora/).
  Operator: [info-namibia — Kalahari](https://www.info-namibia.com/regions/kalahari),
  [Kalahari Game Lodge — lion reintroduction](https://kalaharigamelodge.com/wildlife-and-sustainability/),
  [Wild Wings — Kalahari guide](https://wild-wings-safaris.com/africa-travel-guide/kalahari-desert).
  Specialist: [African Snakebite Institute — Kalahari scorpions](https://www.africansnakebiteinstitute.com/scorpion/kalahari-thicktail-scorpion/).
