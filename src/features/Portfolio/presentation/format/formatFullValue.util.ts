import { MONEY_CONSTANTS } from "@/features/Portfolio/presentation/constants/moneyConstants.constant";
import { MONEY_FORMATTERS } from "@/features/Portfolio/presentation/format/moneyFormatters";
import { NUMBER_FORMATTERS } from "@/features/Portfolio/presentation/format/numberFormatters";
import type { ValuePrecision } from "@/features/Portfolio/presentation/types/ValuePrecision.type";
import type { ValueUnit } from "@/features/Portfolio/presentation/types/ValueUnit.type";

// --- Constants ---

const { MONEY_LOCALE } = MONEY_CONSTANTS;
const { fullUsd } = MONEY_FORMATTERS;
const { fullNumber } = NUMBER_FORMATTERS;

const preciseNumber = new Intl.NumberFormat(MONEY_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 10,
});

// --- Utils ---

export function formatFullValue(
  value: number,
  unit: ValueUnit,
  precision: ValuePrecision = "standard",
): string {
  if (!Number.isFinite(value)) {

    return "—";
  }

  if (unit === "currency") {

    return fullUsd.format(value);
  }

  return `${(precision === "precise" ? preciseNumber : fullNumber).format(value)}%`;
}
