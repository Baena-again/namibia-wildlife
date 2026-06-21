import { useEffect, useRef } from "react";
import type { ShoppingState } from "../types";
import { shopping } from "../data/shopping";

type Props = {
  /** Day id of the stop to scroll to when arriving from the logbook. */
  focus?: string | null;
  checked: ShoppingState;
  onToggle: (key: string) => void;
};

/** Stable key for a single shopping item. */
export function itemKey(dayId: string, groupTitle: string, item: string) {
  return `${dayId}§${groupTitle}§${item}`;
}

export function ShoppingList({ focus, checked, onToggle }: Props) {
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (focus && refs.current[focus]) {
      refs.current[focus]?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [focus]);

  return (
    <section className="detail shopping-page">
      <h1 className="title">Lista de la compra</h1>
      <p className="notice">
        Una compra gorda al empezar y dos reposiciones por el camino. Marca lo
        que vayas metiendo en el carro — se guarda en este dispositivo.
      </p>

      {shopping.map((stop) => (
        <section
          key={stop.dayId}
          className="shopping-stop"
          ref={(el) => {
            refs.current[stop.dayId] = el;
          }}
        >
          <h2 className="shopping-stop-title">{stop.title}</h2>
          {stop.note && <p className="shopping-note">{stop.note}</p>}
          {stop.groups?.map((group) => (
            <div key={group.title} className="shopping-group">
              <h3 className="shopping-group-title">{group.title}</h3>
              {group.note && (
                <p className="shopping-group-note">{group.note}</p>
              )}
              <ul>
                {group.items.map((item) => {
                  const key = itemKey(stop.dayId, group.title, item);
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
            </div>
          ))}
        </section>
      ))}
    </section>
  );
}
