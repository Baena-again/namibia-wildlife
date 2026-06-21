import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted serif fonts (no CDN → works fully offline).
import "@fontsource/cinzel/600.css";
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/400-italic.css";
import "@fontsource/eb-garamond/500.css";

import "./styles.css";
import App from "./App";
import { UpdatePrompt } from "./components/UpdatePrompt";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <UpdatePrompt />
  </StrictMode>,
);
