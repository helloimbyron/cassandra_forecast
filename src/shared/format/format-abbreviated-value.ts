import { MONEY_CURRENCY, MONEY_LOCALE } from "./money-constants";
import { compactNumber, fullNumber } from "./number-formatters";
import { axisNumber, fullUsd, scaledUsd } from "./money-formatters";

export type ValueUnit = "currency" | "percent";
export type ValuePrecision = "standard" | "precise" | "axis";

const SCALE_BREAK = "\u200b";
const SUFFIXES = ["", "K", "M", "G", "T", "P", "E", "Z", "Y", "R", "Q"] as const;
const SCIENTIFIC_THRESHOLD = 1e33;
const preciseNumber = new Intl.NumberFormat(MONEY_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 10,
});
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

/** Powers of 1000, with uppercase display suffixes from K=10³ through Q=10³⁰. */
export function abbreviatedScale(value: number, precision: ValuePrecision = "standard") {
  const magnitude = Math.abs(value);
  if (!Number.isFinite(magnitude) || magnitude >= SCIENTIFIC_THRESHOLD)
    return { scale: 1, suffix: "" };

  const factor = precision === "axis" ? 1 : 100;
  let group = 0;
  while (group < SUFFIXES.length - 1 && magnitude >= 10 ** ((group + 1) * 3)) group += 1;
  let scale = 10 ** (group * 3);
  if (Math.round((magnitude / scale) * factor) / factor >= 1000 && group < SUFFIXES.length - 1) {
    group += 1;
    scale = 10 ** (group * 3);
  }
  return { scale, suffix: SUFFIXES[group] };
}

export function formatFullValue(
  value: number,
  unit: ValueUnit,
  precision: ValuePrecision = "standard",
): string {
  if (!Number.isFinite(value)) return "—";
  if (unit === "currency") return fullUsd.format(value);
  return `${(precision === "precise" ? preciseNumber : fullNumber).format(value)}%`;
}

/** Shared display formatter for read-only currency and percentage values. */
export function formatAbbreviatedValue(
  value: number,
  unit: ValueUnit,
  precision: ValuePrecision = "standard",
): string {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value) >= SCIENTIFIC_THRESHOLD) {
    return unit === "currency" ? scientificUsd.format(value) : `${scientificNumber.format(value)}%`;
  }

  const { scale, suffix } = abbreviatedScale(value, precision);
  if (!suffix) {
    if (precision === "axis")
      return unit === "currency" ? `$${axisNumber.format(value)}` : `${axisNumber.format(value)}%`;
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
