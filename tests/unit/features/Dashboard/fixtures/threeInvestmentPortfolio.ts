import type { Portfolio } from "../../../../../src/features/Dashboard";

export function threeInvestmentPortfolio(example: Portfolio): Portfolio {
  const portfolio = structuredClone(example);
  const third = structuredClone(portfolio.investments[0]!);
  third.id = "third-example";
  third.holdings[0]!.id = "third-example-holding";
  portfolio.investments.push(third);

  return portfolio;
}
