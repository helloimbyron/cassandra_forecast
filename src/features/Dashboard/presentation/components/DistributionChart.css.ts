import { globalStyle } from "@vanilla-extract/css";

globalStyle(".distribution-chart", {
  height: "var(--size-22)",
} as unknown as Parameters<typeof globalStyle>[1]);
