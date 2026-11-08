import { PORTFOLIO_CONSTANTS } from "./portfolioConstants.constant";

// --- Constants ---

const { MONTHS_PER_YEAR, PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export function monthlyWithdrawalForAnnualRate(annualRatePct: number, projectedTotal: number) {

  return (annualRatePct * projectedTotal) / PERCENT_SCALE / MONTHS_PER_YEAR;
}
