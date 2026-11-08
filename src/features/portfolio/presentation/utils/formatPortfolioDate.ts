import { MONEY_LOCALE } from "../../../../shared/format/money-constants";

export function formatPortfolioDate(asOf: string): string {
  return new Date(`${asOf}T12:00:00`).toLocaleDateString(MONEY_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
