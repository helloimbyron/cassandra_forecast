import type { Investment } from "@/shared/domain/portfolio/Investment.type";
import type { InvestmentProjection } from "@/shared/domain/portfolio/InvestmentProjection.type";
import { projectHolding } from "@/features/Dashboard/domain/utils/projectHolding.util";

export function projectInvestment(
  investment: Investment,
  years: number,
  inflationRatePct = 0,
): InvestmentProjection {
  const holdings = investment.holdings.map((holding) =>
    projectHolding(holding, investment.annualRatePct, years, inflationRatePct),
  );
  const points = Array.from({ length: years + 1 }, (_, year) => {
    const balance = holdings.reduce((sum, item) => sum + item.points[year]!.balance, 0);
    const contributions = holdings.reduce((sum, item) => sum + item.points[year]!.contributions, 0);
    const initial = investment.holdings.reduce((sum, item) => sum + item.currentValue, 0);

    return { year, balance, contributions, growth: balance - initial - contributions };
  });
  const initialValue = investment.holdings.reduce((sum, item) => sum + item.currentValue, 0);
  const totalContributions = holdings.reduce((sum, item) => sum + item.totalContributions, 0);
  const finalValue = holdings.reduce((sum, item) => sum + item.finalValue, 0);

  return {
    investment,
    holdings,
    points,
    finalValue,
    initialValue,
    totalContributions,
    growth: finalValue - initialValue - totalContributions,
  };
}
