/** @type {import('prettier').Config} */
const config = {
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  printWidth: 100,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  tailwindStylesheet: "./src/styles/global.css",
  trailingComma: "all",
  useTabs: false,
};

export default config;
