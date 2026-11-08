import { formatAbbreviatedValue } from "./format-abbreviated-value";

/** Chart-axis labels are plain text and never create an interactive tooltip. */
export function formatAxisUsd(value: number): string {
  return formatAbbreviatedValue(value, "currency", "axis");
}
