import { formatAbbreviatedValue } from "./formatAbbreviatedValue.util";

/** Adaptador para consumidores que necesitan un número sin unidad. */
export function formatAbbreviatedNumber(value: number): string {
  const formatted = formatAbbreviatedValue(value, "percent");

  return formatted.endsWith("%") ? formatted.slice(0, -1) : formatted;
}
