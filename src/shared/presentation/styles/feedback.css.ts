import { style } from "@vanilla-extract/css";

export const dropHint = style({
  color: "var(--text-soft)",
  fontSize: "var(--text-meta)",
});

export const errorMessage = style({
  margin: "var(--space-3) 0 0",
  color: "var(--destructive)",
  fontSize: "var(--text-body)",
  fontWeight: "var(--font-weight-semibold)",
});
