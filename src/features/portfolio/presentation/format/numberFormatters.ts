import { MONEY_CONSTANTS } from "./moneyConstants.constant";

// --- Constants ---

const { MONEY_LOCALE } = MONEY_CONSTANTS;

export const NUMBER_FORMATTERS = {
  fullNumber: new Intl.NumberFormat(MONEY_LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  compactNumber: new Intl.NumberFormat(MONEY_LOCALE, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }),
};
