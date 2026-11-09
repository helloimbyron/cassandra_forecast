import { globalStyle } from "@vanilla-extract/css";

globalStyle(".series-legend-divider", {
  width: "100%",
  flex: "0 0 100%",
  height: "0",
  margin: "var(--space-05) 0",
  border: "0",
  borderTop: "var(--line-thin) solid var(--border-subtle)",
} as unknown as Parameters<typeof globalStyle>[1]);
