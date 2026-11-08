import { scientificUsd } from "./money-formatters";
import { formatFullUsd } from "./format-full-usd";
import { SCIENTIFIC_DISPLAY_THRESHOLD } from "./money-constants";

export function formatFullMoneyDisplay(value: number): string {
  return Math.abs(value) >= SCIENTIFIC_DISPLAY_THRESHOLD
    ? scientificUsd.format(value)
    : formatFullUsd(value);
}
