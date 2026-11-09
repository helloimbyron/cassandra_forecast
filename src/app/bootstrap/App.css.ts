import { globalStyle } from "@vanilla-extract/css";

globalStyle(".app-shell", {
  minHeight: "100vh",
  overflowX: "clip",
  background: "var(--background)",
} as unknown as Parameters<typeof globalStyle>[1]);
