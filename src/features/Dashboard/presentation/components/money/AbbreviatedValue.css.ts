import { globalStyle } from "@vanilla-extract/css";

globalStyle(".abbreviated-value,\n.abbreviated-money", {
  whiteSpace: "normal",
  overflowWrap: "anywhere",
} as unknown as Parameters<typeof globalStyle>[1]);
