import { readFileSync } from "node:fs";

const tokens = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");

function readBreakpoint(name: string): string {
  const value = tokens.match(new RegExp(`--breakpoint-${name}:\\s*([^;]+);`))?.[1]?.trim();
  if (!value) throw new Error(`Missing design token --breakpoint-${name}`);
  return value;
}

export const breakpoints = {
  compact: readBreakpoint("compact"),
  tablet: readBreakpoint("tablet"),
  wide: readBreakpoint("wide"),
  "extra-wide": readBreakpoint("extra-wide"),
} as const;
