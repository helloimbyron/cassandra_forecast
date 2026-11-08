import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import messages from "./src/libraries/i18n/es.json" with { type: "json" };

function localizedHtml(): Plugin {
  return {
    name: "localized-html",
    transformIndexHtml(html) {
      return html
        .replaceAll("__APP_TITLE__", messages.site.title)
        .replaceAll("__APP_DESCRIPTION__", messages.site.description);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localizedHtml()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
