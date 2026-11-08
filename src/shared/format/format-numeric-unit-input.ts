import { MONEY_LOCALE } from "./money-constants";

const formatNumber = new Intl.NumberFormat(MONEY_LOCALE, {
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatNumericUnitValue(value: number) {
  return formatNumber.format(value);
}

export function parseNumericUnitValue(text: string): number | null {
  const normalized = text.trim().replace(",", ".");
  if (!normalized || normalized === "-" || normalized === "." || normalized === "-.") return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}
