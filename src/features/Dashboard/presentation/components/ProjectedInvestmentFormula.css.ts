import { globalStyle } from "@vanilla-extract/css";

globalStyle(".formula-investment-expression .formula-math", {
  paddingBlock: "var(--space-075)",
  fontSize: "var(--text-card-fluid)",
  fontWeight: "var(--font-weight-semibold)",
} as unknown as Parameters<typeof globalStyle>[1]);
