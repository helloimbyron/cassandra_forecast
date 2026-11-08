export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [".astro/**", "dist/**", "node_modules/**"],
  rules: {
    // Intentional state and feature overrides are ordered by cascade, not by selector weight.
    "no-descending-specificity": null,
    // Astro/Tailwind resolve bare CSS imports; url() turns them into file paths.
    "import-notation": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["custom-variant", "theme"],
      },
    ],
  },
};
