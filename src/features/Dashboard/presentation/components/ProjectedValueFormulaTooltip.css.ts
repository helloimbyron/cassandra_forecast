import { globalStyle } from "@vanilla-extract/css";

globalStyle(".holding-formula-trigger", {
  width: "var(--space-35)",
  height: "var(--space-35)",
  margin: "0",
  color: "var(--primary)",
} as unknown as Parameters<typeof globalStyle>[1]);
globalStyle(".formula-tooltip-trigger.holding-formula-trigger", {
  margin: "0",
} as unknown as Parameters<typeof globalStyle>[1]);
