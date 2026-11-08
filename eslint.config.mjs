import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const sourceFiles = ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"];
const reactFiles = ["**/*.{jsx,tsx}"];

export default defineConfig([
  globalIgnores([".astro/**", "coverage/**", "dist/**", "node_modules/**"]),
  {
    files: sourceFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ...eslint.configs.recommended,
    files: sourceFiles,
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    ...jsxA11y.configs.recommended,
    files: reactFiles,
  },
  {
    ...reactHooks.configs.flat.recommended,
    files: reactFiles,
  },
  eslintConfigPrettier,
]);
