import { formatAbbreviatedValue } from "./formatAbbreviatedValue.util";

export function formatAbbreviatedUsd(value: number): string {

  return formatAbbreviatedValue(value, "currency");
}
