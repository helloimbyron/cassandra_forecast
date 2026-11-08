import { MONEY_CURRENCY, MONEY_LOCALE } from "./money-constants";

export const fullUsd = new Intl.NumberFormat(MONEY_LOCALE, {
  style: "currency",
  currency: MONEY_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const scientificUsd = new Intl.NumberFormat(MONEY_LOCALE, {
  style: "currency",
  currency: MONEY_CURRENCY,
  notation: "scientific",
  maximumFractionDigits: 2,
});

export const scaledUsd = new Intl.NumberFormat(MONEY_LOCALE, {
  style: "currency",
  currency: MONEY_CURRENCY,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const axisNumber = new Intl.NumberFormat(MONEY_LOCALE, { maximumFractionDigits: 0 });
