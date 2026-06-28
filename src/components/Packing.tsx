import type { PackingState } from "../types";
import { packing } from "../data/packing";

type Props = {
  checked: PackingState;
  onToggle: (key: string) => void;
};

/** Stable key for a single packing item. */
export function packingKey(groupTitle: string, item: string) {
  return `${groupTitle}§${item}`;
}

export function Packing({ checked, onToggle }: Props) {
  const total = packing
    .filter((g) => !g.info)
    .reduce((n, g) => n + g.items.length, 0);
  const done = packing
    .filter((g) => !g.info)
    .reduce(
      (n, g) =>
        n + g.items.filter((item) => checked[packingKey(g.title, item)]).length,
      0,
    );

  return (
    <section className="detail packing-page">
      <h1 className="title">La maleta</h1>
      <p className="notice">
        Lista de imprescindibles (hombre) para el invierno austral: amaneceres
        fríos, costa con viento y mediodías calurosos. Toca cada sección para
        desplegarla y marca lo que vayas metiendo — se guarda en este
        dispositivo.
      </p>
      <p className="packing-count">
        {done} de {total} preparados
      </p>

      {packing.map((group) => (
        <details
          key={group.title}
          className="packing-group"
          open={group.defaultOpen}
        >
          <summary className="packing-summary">{group.title}</summary>
          {group.note && <p className="shopping-group-note">{group.note}</p>}

          {group.info ? (
            <ul className="packing-info">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <ul>
              {group.items.map((item) => {
                const key = packingKey(group.title, item);
                const isChecked = checked[key] ?? false;
                return (
                  <li key={key}>
                    <label
                      className={`shopping-item ${isChecked ? "is-checked" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggle(key)}
                      />
                      <span>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </details>
      ))}
    </section>
  );
}
