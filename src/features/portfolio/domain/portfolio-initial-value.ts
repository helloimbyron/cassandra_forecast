import type { Portfolio } from "./portfolio-schema";

export function portfolioInitialValue(portfolio: Portfolio): number {
  return portfolio.investments.reduce(
    (total, investment) =>
      total + investment.holdings.reduce((sum, holding) => sum + holding.currentValue, 0),
    0,
  );
}
