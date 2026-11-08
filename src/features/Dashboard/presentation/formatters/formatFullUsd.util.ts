import { MONEY_FORMATTERS } from "@/features/Dashboard/presentation/constants/moneyFormatters.constant";

// --- Constants ---

const { fullUsd } = MONEY_FORMATTERS;

// --- Utils ---

export function formatFullUsd(value: number): string {
  return fullUsd.format(value);
}
