import { MONEY_LOCALE } from "../../../shared/format/money-constants";

export const percent = new Intl.NumberFormat(MONEY_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const precisePercent = new Intl.NumberFormat(MONEY_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 10,
});
