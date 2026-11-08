import { PORTFOLIO_CONSTANTS } from "@/shared/domain/portfolio/portfolioConstants.constant";

// --- Constants ---

const { PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export function weightedEffectiveAnnualReturnPct(
  positions: ReadonlyArray<{ balance: number; annualReturnPct: number }>,
): number | null {
  positions.forEach(({ balance, annualReturnPct }) => {
    if (!Number.isFinite(balance) || balance < 0) {
      throw new RangeError("Position balances must be non-negative numbers.");
    }
    if (!Number.isFinite(annualReturnPct) || annualReturnPct <= -PERCENT_SCALE) {
      throw new RangeError("Annual returns must be greater than -100%.");
    }
  });
  const totalBalance = positions.reduce((total, position) => total + position.balance, 0);
  if (totalBalance <= 0) {
    return null;
  }

  return (
    positions.reduce(
      (weightedReturn, position) => weightedReturn + position.balance * position.annualReturnPct,
      0,
    ) / totalBalance
  );
}
