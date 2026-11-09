import { globalStyle } from "@vanilla-extract/css";

globalStyle(".formula-month-examples", {
  display: "grid",
  gap: "var(--space-1)",
  width: "100%",
  minWidth: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-month-example", {
  display: "grid",
  justifyItems: "center",
  gap: "var(--space-025)",
  width: "100%",
  minWidth: "0",
  paddingTop: "var(--space-05)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-month-example + .formula-month-example", {
  borderTop: "var(--line-thin) solid var(--border-subtle)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-month-label", {
  color: "var(--text-strong)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-month-gap", {
  margin: "var(--space-05) 0",
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-snug)",
  textWrap: "pretty",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-month-example .formula-math", {
  padding: "var(--space-025) var(--space-025) var(--space-025)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-month-example .formula-math-result", {
  marginTop: "0",
  borderTop: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
