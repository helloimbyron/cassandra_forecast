import { formatAbbreviatedValue } from "./format-abbreviated-value";

export function formatAbbreviatedUsd(value: number): string {
  return formatAbbreviatedValue(value, "currency");
}
