import type { Portfolio } from "@/features/Portfolio/domain/types/Portfolio.type";

export function portfolioInitialValue(portfolio: Portfolio): number {
  return portfolio.investments.reduce(
    (total, investment) =>
      total + investment.holdings.reduce((sum, holding) => sum + holding.currentValue, 0),
    0,
  );
}
