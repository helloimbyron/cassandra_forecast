import type { InvestmentProjection } from "@/shared/domain/portfolio/InvestmentProjection.type";

export type PortfolioSummaryInsights = {
  totalGrowth: number;
  growthPctOfCurrent: number | null;
  gainPctOfInvested: number | null;
  monthlyReturnPct: number | null;
  annualizedReturnPct: number | null;
  monthlyContributionTotal: number;
  leadingGrowthInvestment: InvestmentProjection | null;
};
