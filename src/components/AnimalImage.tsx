import { useState } from "react";
import placeholder from "../assets/animals/placeholder.svg";

/** Animal image that falls back to the silhouette placeholder on error. */
export function AnimalImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? placeholder : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
