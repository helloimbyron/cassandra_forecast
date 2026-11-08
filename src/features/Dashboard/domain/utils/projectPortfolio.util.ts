import type { Portfolio } from "@/shared/domain/types/Portfolio.type";
import type { InvestmentProjection } from "@/shared/domain/types/InvestmentProjection.type";
import { projectInvestment } from "@/features/Dashboard/domain/utils/projectInvestment.util";

export function projectPortfolio(
  portfolio: Portfolio,
  years: number,
  inflationRatePct = 0,
): InvestmentProjection[] {
  return portfolio.investments.map((investment) =>
    projectInvestment(investment, years, inflationRatePct),
  );
}
