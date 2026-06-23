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
import { I18nProvider, detectLocale } from "./i18n";

// Reflect the active locale on <html lang> from the first paint.
document.documentElement.lang = detectLocale();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
      <UpdatePrompt />
    </I18nProvider>
  </StrictMode>,
);
