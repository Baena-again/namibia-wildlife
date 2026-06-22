# Prompts para regenerar las 8 ilustraciones con especie/rasgo equivocado

Para usar con el mismo pipeline de generación de imágenes. Mantén el **mismo nombre de
archivo** (`src/assets/animals/<id>.png`) para no tocar el código.

Los prompts descriptivos van en inglés (suelen rendir mejor en los modelos de imagen);
ajusta el formato a tu herramienta. Cada uno incluye el rasgo diagnóstico que la imagen
actual NO tiene.

## Preámbulo de estilo (añádelo a todos)

> Audubon-style natural-history plate illustration, a single complete animal, full body,
> semi-realistic detailed painted rendering, soft natural lighting, centered composition,
> plain warm cream / off-white background (#f7f1e8) with a subtle soft drop shadow
> beneath, no text, no frame, scientifically accurate.

---

### `flamingo` — Flamenco enano (*Phoeniconaias minor*)
> A **lesser flamingo** standing in side profile. Smaller and more intensely coloured than
> a greater flamingo: deep rosy-pink to crimson plumage, especially on the wing coverts.
> **The bill is dark deep-red and looks almost entirely black**, strongly downcurved. Long
> reddish-pink legs, slender neck in the typical S-curve.
>
> Evitar: pico pálido con punta negra, plumaje rosa muy pálido (eso es flamenco común).

### `cape-cormorant` — Cormorán de El Cabo (*Phalacrocorax capensis*)
> A **Cape cormorant** standing/perched in profile. **Entirely glossy black plumage** with
> a faint blue-green sheen over the whole body and wings. **Small orange-yellow gular
> (throat) patch** at the base of the bill. Slender hooked bill, dark webbed feet.
>
> Evitar: garganta o mejilla blanca, alas pardas escamadas (eso es cormorán grande).

### `camaleon` — Camaleón de Namaqua (*Chamaeleo namaquensis*)
> A **Namaqua chameleon**, terrestrial, walking on flat desert sand / bare ground (**not on
> a branch**). Robust body, grey to grey-brown colour with darker mottled blotches along the
> flanks, a row of enlarged conical spines along the back, large turret eyes. **Short tail,
> clearly shorter than the body** (not a long coiled prehensile tail).
>
> Evitar: verde brillante, rama, cola larga enrollada en espiral.

### `heavisides-dolphin` — Delfín de Heaviside (*Cephalorhynchus heavisidii*)
> A **Heaviside's dolphin**, full body in side profile. Small, stocky, porpoise-like cetacean
> with a **blunt rounded head and no beak/rostrum**, and a **large triangular dorsal fin**
> (not curved/falcate). Distinctive tricolour pattern: dark blue-grey cape over the back,
> paler grey toward the front flanks, **white belly with finger-like white blazes** extending
> up the sides behind the flippers.
>
> Evitar: hocico/pico marcado, aleta dorsal curvada, patrón rayado de delfín común.

### `vibora-del-desierto` — Víbora cornuda del desierto (*Bitis caudalis*)
> A **horned adder** coiled on desert sand, full body. Short, stout viper, sandy buff to pale
> grey-brown with a dorsal row of dark squarish blotches/chevrons. **A single elongated
> horn-like scale erected above each eye.** Broad triangular head, vertical pupils.
>
> Evitar: serpiente sin cuernos sobre los ojos.

### `escarabajo-del-desierto` — Escarabajo del Namib (*Onymacris unguicularis*)
> A **Namib fog-basking darkling beetle**, side / three-quarter view. Jet-black tenebrionid
> with **very long, slender legs holding the body high off the ground** (athletic, almost
> stilt-like) and **smooth glossy elytra** without heavy sculpturing. Exactly six legs, two
> segmented antennae.
>
> Evitar: escarabajo rechoncho de patas cortas con élitros muy rugosos.

### `damara-tern` — Charrancito damara (*Sternula balaenarum*), plumaje reproductor
> A **Damara tern in breeding plumage**, full body. Small tern with a **complete solid black
> cap covering the entire crown from the bill and forehead back to the nape (no white
> forehead)**. Pale grey upperparts, white underparts, black bill, dark legs, slightly
> forked tail.
>
> Evitar: frente blanca, antifaz negro solo alrededor del ojo (eso es plumaje no reproductor).

## Alternativa: un solo prompt para una lámina con los 8 (luego recortar)

Genera una única imagen con los 8 animales bien separados en rejilla, mismo estilo y
fondo crema, para recortar después cada uno a su `src/assets/animals/<id>.png`.

> A single Audubon-style natural-history plate showing **eight different animals arranged
> in a clean 4×2 grid**, each animal as a complete full body, **well separated with generous
> empty space around each (no overlapping, no touching, each one fully inside its own area)**,
> all in the same semi-realistic detailed painted style, consistent soft natural lighting from
> the upper left, **plain uniform warm cream / off-white background (#f7f1e8)** across the whole
> sheet, subtle soft shadow under each animal, no text, no labels, no captions, no frames, no
> grid lines, no panel borders. Each animal must be anatomically accurate, in sharp focus, and
> clearly isolated so it can be cropped out individually. The eight animals are:
>
> **1. Lesser flamingo (*Phoeniconaias minor*)** — standing upright in side profile on long
> legs, neck in a graceful S-curve.
> · DO: deep rosy-pink to crimson plumage, strongest on the wing coverts; a **dark deep-red
>   bill that looks almost solid black**, strongly downcurved; relatively small and compact.
> · DON'T: pale-pink/white plumage; a pale pink bill with only a black tip (that is a greater
>   flamingo).
>
> **2. Cape cormorant (*Phalacrocorax capensis*)** — standing/perched upright in side profile,
> long neck, slender hooked bill.
> · DO: **entirely glossy black plumage** over the whole body and wings with a faint blue-green
>   sheen; a small **orange-yellow gular (throat) patch** at the base of the bill; dark webbed feet.
> · DON'T: any white on throat, cheek or breast; brown, pale-scaled wing feathers (that is a
>   great cormorant).
>
> **3. Namaqua chameleon (*Chamaeleo namaquensis*)** — terrestrial, standing or walking on
> **flat open desert sand / bare ground**, body in side profile.
> · DO: robust thick body, **grey to grey-brown** colour with darker mottled blotches along the
>   flanks, a row of enlarged conical spines along the spine, large independently swivelling
>   turret eyes, and a **short tail clearly shorter than the body**.
> · DON'T: bright green colour; gripping a branch; a long tail coiled into a spiral.
>
> **4. Heaviside's dolphin (*Cephalorhynchus heavisidii*)** — full body in side profile, gently
> arching/leaping.
> · DO: small, **stocky, porpoise-like body**; a **blunt, rounded head with NO beak/rostrum**;
>   a **large triangular dorsal fin**; dark blue-grey cape over the back, lighter grey on the
>   front flanks, **white belly with finger-like white blazes** running up the sides behind the
>   flippers.
> · DON'T: a pointed beak/snout; a curved (falcate) dorsal fin; a slim striped grey body (that is
>   a common/bottlenose dolphin).
>
> **5. Horned adder (*Bitis caudalis*)** — short stout viper loosely coiled on desert sand, head
> raised and facing the viewer.
> · DO: sandy buff to pale grey-brown body with a dorsal row of dark squarish blotches/chevrons;
>   a broad triangular head with vertical pupils; and crucially **a single elongated horn-like
>   scale standing erect above each eye**.
> · DON'T: a smooth round head with no horns above the eyes; a long thin body (it is short and thick).
>
> **6. Namib fog-basking darkling beetle (*Onymacris unguicularis*)** — side / three-quarter view,
> walking.
> · DO: jet-black tenebrionid beetle; **very long, slender legs that hold the rounded body high
>   off the ground** (athletic, stilt-like stance); **smooth glossy elytra (wing cases)** with
>   little sculpturing; exactly **six legs** and two short segmented antennae.
> · DON'T: short stubby legs; a low squat body on the ground; heavily ridged/pitted wing cases; more
>   or fewer than six legs.
>
> **7. Damara tern (*Sternula balaenarum*), breeding plumage** — small tern standing or in flight,
> side profile.
> · DO: a **complete solid black cap covering the whole crown, from the base of the bill and the
>   forehead all the way back to the nape**; pale grey upperparts, white underparts; black bill;
>   dark legs; slightly forked tail.
> · DON'T: a white forehead; a black mask only around the eye (those are non-breeding plumages).
>
> **8. Red hartebeest (*Alcelaphus buselaphus caama*)** — large antelope standing in side profile.
> · DO: reddish-tan coat; a **distinctly long, narrow face**; a back that **slopes downward from
>   high shoulders to a lower rump**; **tall ringed horns that rise close together from a single
>   raised bony pedicel on top of the head and then bend sharply backwards** (bracket / heart
>   shape); bold blackish markings on the face, shoulders, thighs and front of the legs; paler rump.
> · DON'T: a short ordinary face; short simple lyre-shaped horns set wide apart low on the head
>   (that looks like a generic antelope).

---

### `red-hartebeest` — Alcélafo rojo (*Alcelaphus buselaphus caama*)
> A **red hartebeest** standing in side profile. Large reddish-tan antelope with a
> **distinctly long, narrow face**, a back that **slopes down from high shoulders to a lower
> rump**, and **tall ringed horns that rise together from a single bony pedicel on top of the
> head and then sharply bend backwards** (bracket / heart shape). Bold blackish markings on
> the face, shoulders, thighs and front of the legs; paler rump.
>
> Evitar: cara corta, cuernos cortos y simples tipo lira (parece un antílope genérico).
