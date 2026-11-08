import type { Portfolio } from "./portfolio-schema";
import type { InvestmentProjection } from "./investment-projection";
import { projectInvestment } from "./project-investment";

export function projectPortfolio(
  portfolio: Portfolio,
  years: number,
  inflationRatePct = 0,
): InvestmentProjection[] {
  return portfolio.investments.map((investment) =>
    projectInvestment(investment, years, inflationRatePct),
  );
}
