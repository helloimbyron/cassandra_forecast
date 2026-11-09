import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig, type Plugin } from "vite";
import messages from "./src/libraries/i18n/es.json" with { type: "json" };

const tokenSheet = new URL("./src/design-system/styles/tokens.css", import.meta.url);
const faviconTemplate = new URL("./src/design-system/assets/favicon.template.svg", import.meta.url);

function readDesignToken(name: string, theme: "dark" | "light" = "dark"): string {
  const css = readFileSync(tokenSheet, "utf8");
  const block = [...css.matchAll(/:root(\.light)?\s*\{([^}]*)\}/g)].find(
    (match) => Boolean(match[1]) === (theme === "light"),
  )?.[2];
  const value = block?.match(new RegExp(`(?:^|\\n)\\s*${name}:\\s*([^;]+);`))?.[1]?.trim();
  if (!value) throw new Error(`Missing design token ${name} for ${theme}`);
  return value;
}

function designTokens(): Plugin {
  return {
    name: "design-tokens",
    transformIndexHtml(html) {
      const darkBackground = readDesignToken("--background");
      const lightBackground = readDesignToken("--background", "light");
      const favicon = readFileSync(faviconTemplate, "utf8")
        .replaceAll("__FAVICON_BACKGROUND__", darkBackground)
        .replaceAll("__FAVICON_FOREGROUND__", readDesignToken("--primary"));
      return html
        .replaceAll("__DARK_THEME_COLOR__", darkBackground)
        .replaceAll("__LIGHT_THEME_COLOR__", lightBackground)
        .replaceAll("__FAVICON_DATA_URI__", `data:image/svg+xml,${encodeURIComponent(favicon)}`);
    },
  };
}

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
  plugins: [designTokens(), vanillaExtractPlugin(), react(), tailwindcss(), localizedHtml()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
