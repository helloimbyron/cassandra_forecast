import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";

// --- Constants ---

const { PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export function realAnnualRatePct(nominalRatePct: number, inflationRatePct: number) {
  return (
    ((1 + nominalRatePct / PERCENT_SCALE) / (1 + inflationRatePct / PERCENT_SCALE) - 1) *
    PERCENT_SCALE
  );
}
