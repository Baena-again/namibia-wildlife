import { useEffect, useRef } from "react";
import { shopping } from "../data/shopping";

type Props = {
  /** Day id of the stop to scroll to when arriving from the logbook. */
  focus?: string | null;
};

export function ShoppingList({ focus }: Props) {
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
        Una compra gorda al empezar y dos reposiciones por el camino. Se reabre
        desde cada día del cuaderno de bitácora.
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
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </section>
  );
}
