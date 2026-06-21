type TipSection = {
  title: string;
  tips: string[];
};

const SECTIONS: TipSection[] = [
  {
    title: "La regla de oro",
    tips: [
      "En seco, los animales van al agua. Aparca en una charca (waterhole) y espera: la paciencia rinde mucho más que sumar kilómetros.",
      "Conduce despacio (límite 60 km/h) y para el motor a menudo para escuchar: muchos avistamientos empiezan por un sonido o por ver otros coches parados.",
      "Lee el tablón de avistamientos de cada campamento: la gente apunta qué ha visto y dónde.",
    ],
  },
  {
    title: "Horarios y luz",
    tips: [
      "Sal justo cuando abre la puerta, al amanecer: es la mejor franja, con depredadores aún activos y temperatura fresca.",
      "Al mediodía hace calor y los animales descansan; aprovecha para comer y reponer en el campamento.",
      "Segunda salida a última hora de la tarde. Calcula bien: debes estar dentro de un campamento antes del cierre de puertas (atardecer).",
      "En Etosha solo puedes dormir dentro en campamentos NWR. Las charcas iluminadas de Okaukuejo y Halali de noche son lo mejor: siéntate en silencio.",
    ],
  },
  {
    title: "Conducción self-drive",
    tips: [
      "Llena el depósito siempre que puedas (en Etosha: Okaukuejo y Namutoni).",
      "No te bajes del coche salvo en campamentos y zonas señalizadas. Nada de off-road dentro del parque.",
      "El coche es tu escondite: los animales lo ven como un bloque inofensivo. Saca la cabeza y cambias la silueta — quédate dentro y quieto.",
      "Mantén distancia, sobre todo con elefantes; si mueven las orejas o la cabeza, retrocede.",
      "Lleva agua de sobra, snacks, rueda de repuesto y algo de efectivo para tasas e imprevistos.",
    ],
  },
  {
    title: "Cómo buscar (el ojo de safari)",
    tips: [
      "Escanea despacio y en horizontal; busca lo que 'no encaja': una línea horizontal entre vegetación vertical, un movimiento de orejas o cola.",
      "Mira a la sombra de los árboles a mediodía (felinos) y en las ramas (leopardo).",
      "Sigue las miradas: si los antílopes miran todos en una dirección y alerta, suele haber un depredador.",
      "Aves y buitres en círculo o bajando pueden marcar una presa o un cadáver.",
      "Unos prismáticos por persona cambian el viaje: reparte el rastreo.",
    ],
  },
  {
    title: "Fotografía",
    tips: [
      "Apaga el motor para evitar vibración y dispara con velocidad alta (la grava y el teleobjetivo no perdonan).",
      "Apoya el objetivo en la ventanilla o en un cojín/saco de arroz sobre el marco.",
      "La mejor luz es la primera y la última hora; al mediodía busca sombra y retratos.",
      "Lleva tarjetas y batería de sobra, y protege el equipo del polvo: el Namib lo mete por todas partes.",
    ],
  },
  {
    title: "Costa y desierto",
    tips: [
      "En Walvis Bay y Sandwich Harbour, los tours de barco/4x4 acercan a focas, delfines y, en invierno austral, ballenas.",
      "Para los 'little five' del desierto (geco, camaleón, víbora, escarabajo, araña) contrata un Living Desert Tour: sin guía es casi imposible verlos.",
      "Madruga para las dunas (Deadvlei, Dune 45): mejor luz, menos calor y menos gente.",
    ],
  },
  {
    title: "Salud y seguridad",
    tips: [
      "Sol fuerte: gorra, gafas y protección solar incluso con la brisa fresca de la costa.",
      "Riesgo de malaria bajo en la estación seca, pero existe en el norte/Etosha: consulta profilaxis y usa repelente al atardecer.",
      "Respeta a los animales y mantén el silencio: ni ruidos ni comida fuera para 'atraerlos'.",
    ],
  },
];

type Props = { onBack?: () => void };

export function SafariTips({ onBack }: Props) {
  return (
    <section className="detail tips">
      {onBack && (
        <button className="back-link" onClick={onBack}>
          ← Volver
        </button>
      )}
      <h1 className="title">Trucos para el safari</h1>
      <p className="notice">
        Lo que de verdad marca la diferencia para ver más animales en un
        self-drive por Namibia.
      </p>

      {SECTIONS.map((section) => (
        <section key={section.title} className="detail-section">
          <h2 className="label">{section.title}</h2>
          <ul>
            {section.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
