import { MONEY_CONSTANTS } from "@/features/Dashboard/presentation/constants/moneyConstants.constant";

// --- Constants ---

const { MONEY_CURRENCY, MONEY_LOCALE } = MONEY_CONSTANTS;

export const MONEY_FORMATTERS = {
  fullUsd: new Intl.NumberFormat(MONEY_LOCALE, {
    style: "currency",
    currency: MONEY_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  scientificUsd: new Intl.NumberFormat(MONEY_LOCALE, {
    style: "currency",
    currency: MONEY_CURRENCY,
    notation: "scientific",
    maximumFractionDigits: 2,
  }),
  scaledUsd: new Intl.NumberFormat(MONEY_LOCALE, {
    style: "currency",
    currency: MONEY_CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }),
  axisNumber: new Intl.NumberFormat(MONEY_LOCALE, { maximumFractionDigits: 0 }),
};
