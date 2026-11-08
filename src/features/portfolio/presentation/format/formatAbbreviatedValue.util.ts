import { MONEY_CONSTANTS } from "@/features/Portfolio/presentation/format/moneyConstants.constant";
import { MONEY_FORMATTERS } from "@/features/Portfolio/presentation/format/moneyFormatters";
import { NUMBER_FORMATTERS } from "@/features/Portfolio/presentation/format/numberFormatters";
import { abbreviatedScale } from "@/features/Portfolio/presentation/format/abbreviatedScale.util";
import { formatFullValue } from "@/features/Portfolio/presentation/format/formatFullValue.util";
import { SCIENTIFIC_THRESHOLD } from "@/features/Portfolio/presentation/format/scientificThreshold.constant";
import type { ValuePrecision } from "@/features/Portfolio/presentation/format/ValuePrecision.type";
import type { ValueUnit } from "@/features/Portfolio/presentation/format/ValueUnit.type";

// --- Constants ---

const { MONEY_CURRENCY, MONEY_LOCALE } = MONEY_CONSTANTS;
const { axisNumber, scaledUsd } = MONEY_FORMATTERS;
const { compactNumber } = NUMBER_FORMATTERS;

const SCALE_BREAK = "\u200b";
const scientificNumber = new Intl.NumberFormat(MONEY_LOCALE, {
  notation: "scientific",
  maximumFractionDigits: 2,
});
const scientificUsd = new Intl.NumberFormat(MONEY_LOCALE, {
  style: "currency",
  currency: MONEY_CURRENCY,
  notation: "scientific",
  maximumFractionDigits: 2,
});

// --- Utils ---

/** Formatea valores de moneda y porcentaje de solo lectura. */
export function formatAbbreviatedValue(
  value: number,
  unit: ValueUnit,
  precision: ValuePrecision = "standard",
): string {
  if (!Number.isFinite(value)) {

    return "—";
  }

  if (Math.abs(value) >= SCIENTIFIC_THRESHOLD) {

    return unit === "currency" ? scientificUsd.format(value) : `${scientificNumber.format(value)}%`;
  }

  const { scale, suffix } = abbreviatedScale(value, precision);

  if (!suffix) {
    if (precision === "axis") {

      return unit === "currency" ? `$${axisNumber.format(value)}` : `${axisNumber.format(value)}%`;
    }

    return formatFullValue(value, unit, precision);
  }

  const scaled = value / scale;
  const formatted =
    unit === "currency"
      ? precision === "axis"
        ? `$${axisNumber.format(scaled)}`
        : scaledUsd.format(scaled)
      : precision === "axis"
        ? axisNumber.format(scaled)
        : compactNumber.format(scaled);

  return `${formatted}${SCALE_BREAK}${suffix}${unit === "percent" ? "%" : ""}`;
}
