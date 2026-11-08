import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const sourceFiles = ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"];
const reactFiles = ["**/*.{jsx,tsx}"];

export default defineConfig([
  globalIgnores([
    "coverage/**",
    "dist/**",
    "node_modules/**",
    "test-results/**",
    "playwright-report/**",
  ]),
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
