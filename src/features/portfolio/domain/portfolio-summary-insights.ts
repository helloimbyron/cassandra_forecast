import type { InvestmentProjection } from "./investment-projection";

export interface PortfolioSummaryInsights {
  totalGrowth: number;
  growthPctOfCurrent: number | null;
  gainPctOfInvested: number | null;
  monthlyReturnPct: number | null;
  annualizedReturnPct: number | null;
  monthlyContributionTotal: number;
  leadingGrowthInvestment: InvestmentProjection | null;
}
