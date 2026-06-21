# Revisión de realismo y fidelidad de las ilustraciones

Auditoría visual de las 98 ilustraciones de `src/assets/animals/` para verificar que
cada imagen (1) representa la especie correcta, (2) es anatómicamente realista y sin
artefactos de IA, y (3) tiene los colores y marcas diagnósticas adecuados.

Método: revisión por agentes en paralelo (cada uno inspeccionó visualmente un lote de
~14 imágenes comparándolas con la especie real), con verificación manual posterior de
todos los casos marcados como graves para descartar falsos positivos.

Fecha: 2026-06-21.

## Resumen

| Veredicto | Nº | Significado |
|---|---|---|
| OK | 63 | Especie correcta, realista, marcas adecuadas |
| MENOR | 27 | Reconocible y aceptable; falta algún detalle de color/marca |
| GRAVE | 8 | Especie equivocada o falta el rasgo diagnóstico principal |

## GRAVE — recomendado reemplazar

| id | Especie objetivo | Qué muestra la imagen | Qué debería mostrar |
|---|---|---|---|
| `flamingo` | Flamenco enano (*Phoeniconaias minor*) | Flamenco rosa pálido con pico claro de punta negra = flamenco común; prácticamente idéntico a `greater-flamingo` | Ave más pequeña, rosa más intenso/carmesí y **pico rojo oscuro casi negro** |
| `cape-cormorant` | Cormorán de El Cabo (*Phalacrocorax capensis*) | Garganta blanca y alas pardas escamadas = cormorán grande (*P. carbo*) | Ave **toda negra brillante** con reflejos verdosos y pequeña bolsa gular naranja |
| `camaleon` | Camaleón de Namaqua (*Chamaeleo namaquensis*) | Camaleón **arborícola verde** agarrado a una rama, casco alto | Camaleón **terrestre**, gris-pardo, espinas dorsales, **cola corta** |
| `heavisides-dolphin` | Delfín de Heaviside (*Cephalorhynchus heavisidii*) | Delfín con **pico marcado** y aleta dorsal falcada | Cetáceo rechoncho **sin pico**, **aleta dorsal triangular**, patrón negro-gris-blanco con manchas |
| `vibora-del-desierto` | Víbora cornuda del desierto (*Bitis caudalis*) | Víbora de arena enrollada **sin cuernos** | Víbora corta color arena con un **cuerno erecto sobre cada ojo** |
| `escarabajo-del-desierto` | Escarabajo del Namib (*Onymacris unguicularis*) | Tenebriónido rechoncho de **patas cortas** y élitros rugosos | Escarabajo negro de **patas muy largas** y élitros lisos (postura elevada) |
| `damara-tern` | Charrancito damara (*Sternula balaenarum*) | Frente blanca y antifaz negro = plumaje **no reproductor** | Corona **totalmente negra** de la frente a la nuca (plumaje reproductor) |
| `red-hartebeest` | Alcélafo rojo (*Alcelaphus buselaphus caama*) | Antílope rojizo genérico de cara corta y cuernos simples | Cara **muy larga y estrecha**, cuernos altos sobre pedúnculo óseo, marcas oscuras en cara/patas |

> Nota: `flamingo` (enano) y `greater-flamingo` (común) son a efectos prácticos la
> misma ilustración de flamenco común, así que el catálogo tiene dos flamencos casi
> idénticos y le falta un flamenco enano de verdad.

## MENOR — aceptable, mejorable

Reconocibles como la especie correcta; les falta algún detalle de color o marca:

- `black-rhinoceros` / `white-rhinoceros` — labios poco diferenciados (la postura sí es
  correcta: negro con la cabeza alta, blanco cabizbajo con joroba). **No** están
  intercambiados.
- `giraffe` — patrón reticulado regular en vez del dentado de la jirafa angoleña.
- `springbok` — poco marcada la franja lateral oscura.
- `impala` — faltan las marcas negras en "M" de los muslos.
- `plains-zebra` — faltan las "shadow stripes" pardas; rayas hasta el vientre.
- `dik-dik` — falta el hocico alargado en forma de pequeña trompa.
- `red-lechwe` — cuernos cortos tipo impala (deberían ser largos y muy liriformes).
- `reedbuck-redunca` — cuernos cortos/poco curvados.
- `vervet-monkey` — máscara facial negra poco delimitada.
- `african-wildcat` — patrón demasiado contrastado (aspecto de gato atigrado doméstico).
- `african-civet` — falta la cresta dorsal eréctil y las bandas negras del cuello.
- `yellow-mongoose` — falta la punta blanca de la cola.
- `ostrich` — cuello y patas pálidos (sin tonos rosados de cría).
- `african-white-backed-vulture` — no se aprecia el parche dorsal blanco; cuello muy emplumado.
- `bateleur` — cola no tan extremadamente corta como la real.
- `ruppells-bustard` — rasgos de cuello/garganta poco marcados.
- `culebra-del-desierto` — patrón no inequívocamente *Psammophis namibensis*.
- `insecto-del-desierto` — langosta demasiado oscura/jaspeada.
- `african-penguin` — banda pectoral negra en "U" poco definida.
- `wandering-albatross` — dorso alar oscuro (patrón de juvenil, no de adulto).
- `ghost-crab` — patas traseras poco claras (verificar 8 patas + 2 pinzas).
- `klipspringer` — pelaje/postura genéricos (falta la textura granulada).
- `greater-flamingo` — color rosa algo intenso/uniforme.
- `waterbuck` — no se ve el anillo blanco de la grupa (ángulo); por lo demás reconocible.
- `wattled-crane` — carúnculas algo pequeñas.
- `puff-adder` — cabeza poco triangular y chevrones difusos.

## OK (63)

african-elephant, lion, leopard, cheetah, african-buffalo, hippopotamus, oryx-gemsbok,
blue-wildebeest, hartmanns-mountain-zebra, kudu, eland, steenbok, sable-antelope,
roan-antelope, puku, tsessebe, spotted-hyena, brown-hyena, black-backed-jackal,
african-wild-dog, warthog, chacma-baboon, meerkat, caracal, cape-fox, cape-porcupine,
honey-badger, spotted-genet, banded-mongoose, springhare, rock-hyrax, martial-eagle,
secretarybird, dune-lark, lilac-breasted-roller, white-pelican, african-fish-eagle,
southern-ground-hornbill, kori-bustard, grey-crowned-crane, african-marabou,
saddle-billed-stork, gecko-del-namib, lagarto-del-desierto, tortuga-terrestre,
anfibio-del-desierto, arana-del-desierto, escorpion-del-desierto, cape-fur-seal,
atlantic-bottlenose-dolphin, southern-right-whale, cape-gannet, southern-elephant-seal,
nile-crocodile, bat-eared-fox, cape-ground-squirrel, sociable-weaver, ground-pangolin,
aardvark, aardwolf, rosy-faced-lovebird, lappet-faced-vulture, pale-chanting-goshawk.

> No se detectaron artefactos de IA imposibles (miembros extra, caras derretidas,
> animales dobles) en ninguna imagen: todos los problemas son de identidad de especie o
> de marcas diagnósticas, no de anatomía imposible.
