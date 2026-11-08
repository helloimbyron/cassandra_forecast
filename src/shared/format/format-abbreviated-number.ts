import { abbreviatedScale, formatAbbreviatedValue } from "./format-abbreviated-value";

export { abbreviatedScale };

/** Compatibility wrapper for callers that need a number without a unit. */
export function formatAbbreviatedNumber(value: number): string {
  const formatted = formatAbbreviatedValue(value, "percent");
  return formatted.endsWith("%") ? formatted.slice(0, -1) : formatted;
}
