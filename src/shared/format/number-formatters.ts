import { MONEY_LOCALE } from "./money-constants";

export const fullNumber = new Intl.NumberFormat(MONEY_LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const compactNumber = new Intl.NumberFormat(MONEY_LOCALE, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
