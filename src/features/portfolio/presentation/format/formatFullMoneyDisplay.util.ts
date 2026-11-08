import { MONEY_FORMATTERS } from "./moneyFormatters";
import { formatFullUsd } from "./formatFullUsd.util";
import { MONEY_CONSTANTS } from "@/features/Portfolio/presentation/constants/moneyConstants.constant";

// --- Constants ---

const { SCIENTIFIC_DISPLAY_THRESHOLD } = MONEY_CONSTANTS;
const { scientificUsd } = MONEY_FORMATTERS;

// --- Utils ---

export function formatFullMoneyDisplay(value: number): string {

  return Math.abs(value) >= SCIENTIFIC_DISPLAY_THRESHOLD
    ? scientificUsd.format(value)
    : formatFullUsd(value);
}
