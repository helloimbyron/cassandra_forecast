import { MONEY_CONSTANTS } from "@/features/Dashboard/presentation/constants/moneyConstants.constant";

// --- Constants ---

const { MONEY_LOCALE } = MONEY_CONSTANTS;

// --- Utils ---

export function formatPortfolioDate(asOf: string): string {
  return new Date(`${asOf}T12:00:00`).toLocaleDateString(MONEY_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
