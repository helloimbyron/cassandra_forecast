import type { InvestmentProjection } from "@/features/Portfolio/domain/InvestmentProjection.type";
import type { PortfolioSummaryInsights } from "@/features/Portfolio/domain/PortfolioSummaryInsights.type";
import { moneyWeightedMonthlyReturn } from "@/features/Portfolio/domain/moneyWeightedMonthlyReturn.util";
import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/portfolioConstants.constant";
import { monthlyInflationFactor } from "@/features/Portfolio/domain/monthlyInflationFactor.util";

// --- Constants ---

const { MONTHS_PER_YEAR, PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export function getPortfolioSummaryInsights(
  initialValue: number,
  finalValue: number,
  totalContributions: number,
  investmentProjections: InvestmentProjection[],
  years = 0,
  inflationRatePct = 0,
): PortfolioSummaryInsights {
  const totalGrowth = finalValue - initialValue - totalContributions;
  const leadingGrowthInvestment = investmentProjections.reduce<InvestmentProjection | null>(
    (leader, projection) => {
      if (projection.growth <= 0) {

        return leader;
      }

      return !leader || projection.growth > leader.growth ? projection : leader;
    },
    null,
  );
  const totalInvested = initialValue + totalContributions;
  const monthlyContributionTotal = investmentProjections.reduce(
    (total, projection) =>
      total +
      projection.investment.holdings.reduce((sum, holding) => sum + holding.monthlyContribution, 0),
    0,
  );
  const annualInflationFactor = 1 + inflationRatePct / PERCENT_SCALE;
  const nominalFinalValue = finalValue * Math.pow(annualInflationFactor, years);
  const nominalMonthlyReturn = moneyWeightedMonthlyReturn(
    initialValue,
    nominalFinalValue,
    monthlyContributionTotal,
    years * MONTHS_PER_YEAR,
  );
  const monthlyInflationRate = monthlyInflationFactor(inflationRatePct) - 1;
  const monthlyReturn =
    nominalMonthlyReturn === null
      ? null
      : (1 + nominalMonthlyReturn) / (1 + monthlyInflationRate) - 1;

  return {
    totalGrowth,
    growthPctOfCurrent: initialValue === 0 ? null : (totalGrowth / initialValue) * PERCENT_SCALE,
    gainPctOfInvested: totalInvested === 0 ? null : (totalGrowth / totalInvested) * PERCENT_SCALE,
    monthlyReturnPct: monthlyReturn === null ? null : monthlyReturn * PERCENT_SCALE,
    annualizedReturnPct:
      monthlyReturn === null
        ? null
        : (Math.pow(1 + monthlyReturn, MONTHS_PER_YEAR) - 1) * PERCENT_SCALE,
    monthlyContributionTotal,
    leadingGrowthInvestment,
  };
}
