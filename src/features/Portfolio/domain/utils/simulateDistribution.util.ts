import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";
import type { DistributionPoint } from "@/features/Portfolio/domain/types/DistributionPoint.type";
import type { DistributionProjection } from "@/features/Portfolio/domain/types/DistributionProjection.type";

// --- Constants ---

const { MAX_HORIZON_YEARS, MIN_HORIZON_YEARS, MONTHS_PER_YEAR, PERCENT_SCALE } =
  PORTFOLIO_CONSTANTS;

// --- Utils ---

/**
 * Proyecta retiros fijos al final del mes desde un saldo inicial con una tasa
 * anual efectiva. Los retiros se detienen cuando el saldo disponible llega a 0.
 */
export function simulateDistribution(
  initialBalance: number,
  monthlyWithdrawal: number,
  annualReturnPct: number,
  years: number,
): DistributionProjection {
  if (!Number.isFinite(initialBalance) || initialBalance < 0) {

    throw new RangeError("Initial balance must be a non-negative number.");
  }

  if (!Number.isFinite(monthlyWithdrawal) || monthlyWithdrawal < 0) {

    throw new RangeError("Monthly withdrawal must be a non-negative number.");
  }

  if (!Number.isFinite(annualReturnPct) || annualReturnPct <= -PERCENT_SCALE) {

    throw new RangeError("Annual return must be greater than -100%.");
  }

  if (!Number.isInteger(years) || years < MIN_HORIZON_YEARS || years > MAX_HORIZON_YEARS) {

    throw new RangeError("Distribution horizon must be between 0 and 40 whole years.");
  }

  const monthlyRate = Math.pow(1 + annualReturnPct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR) - 1;
  const points: DistributionPoint[] = [{ year: 0, balance: initialBalance }];
  let balance = initialBalance;
  let depletionMonth: number | null = initialBalance === 0 ? 0 : null;

  for (let month = 1; month <= years * MONTHS_PER_YEAR; month += 1) {
    balance = Math.max(0, balance * (1 + monthlyRate) - monthlyWithdrawal);

    if (balance === 0 && depletionMonth === null) {
      depletionMonth = month;
    }

    if (month % MONTHS_PER_YEAR === 0) {
      points.push({ year: month / MONTHS_PER_YEAR, balance });
    }
  }

  return { points, finalBalance: balance, depletionMonth };
}
