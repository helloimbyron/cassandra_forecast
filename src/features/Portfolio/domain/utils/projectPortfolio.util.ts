import type { Portfolio } from "@/features/Portfolio/domain/types/Portfolio.type";
import type { InvestmentProjection } from "@/features/Portfolio/domain/types/InvestmentProjection.type";
import { projectInvestment } from "@/features/Portfolio/domain/utils/projectInvestment.util";

export function projectPortfolio(
  portfolio: Portfolio,
  years: number,
  inflationRatePct = 0,
): InvestmentProjection[] {
  return portfolio.investments.map((investment) =>
    projectInvestment(investment, years, inflationRatePct),
  );
}
