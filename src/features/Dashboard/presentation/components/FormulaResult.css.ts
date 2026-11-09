import { globalStyle } from "@vanilla-extract/css";

globalStyle(".formula-math-result", {
  marginTop: "var(--space-025)",
  paddingTop: "var(--space-075)",
  borderTop: "var(--line-thin) dashed var(--border-subtle)",
  color: "var(--primary)",
  fontWeight: "var(--font-weight-semibold)",
} as unknown as Parameters<typeof globalStyle>[1]);
