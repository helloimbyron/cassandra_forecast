import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";

// --- Constants ---

const { MONTHS_PER_YEAR, PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export function annualRateForMonthlyWithdrawal(monthlyWithdrawal: number, projectedTotal: number) {
  if (projectedTotal <= 0) {
    return 0;
  }

  return (monthlyWithdrawal * MONTHS_PER_YEAR * PERCENT_SCALE) / projectedTotal;
}
