import { globalStyle } from "@vanilla-extract/css";

globalStyle(".formula-math .katex", {
  color: "inherit",
  fontSize: "var(--text-body)",
} as unknown as Parameters<typeof globalStyle>[1]);
