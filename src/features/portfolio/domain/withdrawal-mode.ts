import { MONTHS_PER_YEAR, PERCENT_SCALE } from "./portfolio-constants";

export function weightedEffectiveAnnualReturnPct(
  positions: ReadonlyArray<{ balance: number; annualReturnPct: number }>,
): number | null {
  positions.forEach(({ balance, annualReturnPct }) => {
    if (!Number.isFinite(balance) || balance < 0)
      throw new RangeError("Position balances must be non-negative numbers.");
    if (!Number.isFinite(annualReturnPct) || annualReturnPct <= -PERCENT_SCALE)
      throw new RangeError("Annual returns must be greater than -100%.");
  });
  const totalBalance = positions.reduce((total, position) => total + position.balance, 0);
  if (totalBalance <= 0) return null;
  return (
    positions.reduce(
      (weightedReturn, position) => weightedReturn + position.balance * position.annualReturnPct,
      0,
    ) / totalBalance
  );
}

export function selectedDistributionAnnualReturnPct(
  portfolioAnnualizedReturnPct: number | null,
  manualAnnualReturnPct: number | null,
) {
  return manualAnnualReturnPct ?? portfolioAnnualizedReturnPct ?? 0;
}

export function distributionAssetsWithReturn(
  positions: ReadonlyArray<{ balance: number }>,
  annualReturnPct: number,
) {
  return positions.map(({ balance }) => ({ balance, annualReturnPct }));
}

export function annualRateForMonthlyWithdrawal(monthlyWithdrawal: number, projectedTotal: number) {
  if (projectedTotal <= 0) return 0;
  return (monthlyWithdrawal * MONTHS_PER_YEAR * PERCENT_SCALE) / projectedTotal;
}

export function monthlyWithdrawalForAnnualRate(annualRatePct: number, projectedTotal: number) {
  return (annualRatePct * projectedTotal) / PERCENT_SCALE / MONTHS_PER_YEAR;
}

export function withdrawalRateSliderMax(ratePct: number, standardMax = 20, step = 0.25) {
  return Math.max(standardMax, Math.ceil(ratePct / step) * step);
}
