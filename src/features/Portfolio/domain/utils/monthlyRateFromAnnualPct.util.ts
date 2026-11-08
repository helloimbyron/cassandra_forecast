import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";

// --- Constants ---

const { MONTHS_PER_YEAR, PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export function monthlyRateFromAnnualPct(annualRatePct: number) {
  return Math.pow(1 + annualRatePct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR) - 1;
}
