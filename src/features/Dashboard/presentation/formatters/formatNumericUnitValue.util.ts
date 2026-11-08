import { MONEY_CONSTANTS } from "@/features/Dashboard/presentation/constants/moneyConstants.constant";

// --- Constants ---

const { MONEY_LOCALE } = MONEY_CONSTANTS;

const formatNumber = new Intl.NumberFormat(MONEY_LOCALE, {
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// --- Utils ---

export function formatNumericUnitValue(value: number) {
  return formatNumber.format(value);
}
