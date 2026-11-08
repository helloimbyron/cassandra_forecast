import type { Holding } from "@/features/Portfolio/domain/types/Holding.type";
import type { HoldingProjection } from "@/features/Portfolio/domain/types/HoldingProjection.type";
import type { ProjectionPoint } from "@/features/Portfolio/domain/types/ProjectionPoint.type";
import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";

import { portfolioMessages } from "@/features/Portfolio/domain/constants/portfolioMessages.constant";
import { monthlyInflationFactor } from "@/features/Portfolio/domain/utils/monthlyInflationFactor.util";
import { monthlyRateFromAnnualPct } from "@/features/Portfolio/domain/utils/monthlyRateFromAnnualPct.util";
import { realAnnualRatePct } from "@/features/Portfolio/domain/utils/realAnnualRatePct.util";

// --- Constants ---

const { MAX_HORIZON_YEARS, MIN_HORIZON_YEARS, MONTHS_PER_YEAR, MIN_ANNUAL_RATE_PCT } =
  PORTFOLIO_CONSTANTS;

// --- Utils ---

/**
 * Interpreta la tasa anual como rendimiento anual efectivo y aplica su tasa
 * mensual equivalente. Los aportes se agregan al final de cada mes.
 */
export function projectHolding(
  holding: Holding,
  annualRatePct: number,
  years: number,
  inflationRatePct = 0,
): HoldingProjection {
  if (!Number.isInteger(years) || years < MIN_HORIZON_YEARS || years > MAX_HORIZON_YEARS) {

    throw new RangeError(portfolioMessages.horizonRange);
  }
  if (!Number.isFinite(annualRatePct) || annualRatePct <= MIN_ANNUAL_RATE_PCT) {

    throw new RangeError(portfolioMessages.annualRateRange);
  }
  if (!Number.isFinite(inflationRatePct) || inflationRatePct <= MIN_ANNUAL_RATE_PCT) {

    throw new RangeError("La inflación anual debe ser mayor que -100 %.");
  }

  const monthlyInflation = monthlyInflationFactor(inflationRatePct);
  const monthlyRate = monthlyRateFromAnnualPct(realAnnualRatePct(annualRatePct, inflationRatePct));
  let balance = holding.currentValue;
  let contributions = 0;
  const points: ProjectionPoint[] = [{ year: 0, balance, contributions, growth: 0 }];

  for (let month = 1; month <= years * MONTHS_PER_YEAR; month += 1) {
    balance *= 1 + monthlyRate;
    const realContribution = holding.monthlyContribution / Math.pow(monthlyInflation, month);
    balance += realContribution;
    contributions += realContribution;
    if (month % MONTHS_PER_YEAR === 0) {
      const year = month / MONTHS_PER_YEAR;
      points.push({
        year,
        balance,
        contributions,
        growth: balance - holding.currentValue - contributions,
      });
    }
  }

  return { holding, points, finalValue: balance, totalContributions: contributions };
}
