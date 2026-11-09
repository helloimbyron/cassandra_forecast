export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["dist/**", "node_modules/**"],
  rules: {
    // Intentional state and feature overrides are ordered by cascade, not by selector weight.
    "no-descending-specificity": null,
    // Tailwind CSS imports intentionally use bare package specifiers.
    "import-notation": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["custom-variant", "theme", "variant"],
      },
    ],
  },
};
