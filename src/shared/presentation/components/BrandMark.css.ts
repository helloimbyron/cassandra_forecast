import { globalStyle } from "@vanilla-extract/css";

globalStyle(".icon-lg,\n.brand-symbol", {
  width: "var(--icon-lg)",
  height: "var(--icon-lg)",
} as unknown as Parameters<typeof globalStyle>[1]);
