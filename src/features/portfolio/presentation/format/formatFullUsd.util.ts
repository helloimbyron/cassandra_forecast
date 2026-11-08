import { MONEY_FORMATTERS } from "./moneyFormatters";

// --- Constants ---

const { fullUsd } = MONEY_FORMATTERS;

// --- Utils ---

export function formatFullUsd(value: number): string {

  return fullUsd.format(value);
}
