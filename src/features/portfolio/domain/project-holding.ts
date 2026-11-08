import type { Holding } from "./holding-schema";
import type { HoldingProjection } from "./holding-projection";
import type { ProjectionPoint } from "./projection-point";
import { MAX_HORIZON_YEARS, MIN_HORIZON_YEARS, MONTHS_PER_YEAR } from "./portfolio-constants";
import { MIN_ANNUAL_RATE_PCT } from "./portfolio-constants";
import { portfolioMessages } from "./portfolio-messages";
import { monthlyInflationFactor, monthlyRateFromAnnualPct, realAnnualRatePct } from "./real-rate";

/**
 * Interprets the annual rate as an effective annual return and applies its
 * equivalent monthly rate. Contributions are added at the end of each month.
 */
export function projectHolding(
  holding: Holding,
  annualRatePct: number,
  years: number,
  inflationRatePct = 0,
): HoldingProjection {
  if (!Number.isInteger(years) || years < MIN_HORIZON_YEARS || years > MAX_HORIZON_YEARS)
    throw new RangeError(portfolioMessages.horizonRange);
  if (!Number.isFinite(annualRatePct) || annualRatePct <= MIN_ANNUAL_RATE_PCT)
    throw new RangeError(portfolioMessages.annualRateRange);
  if (!Number.isFinite(inflationRatePct) || inflationRatePct <= MIN_ANNUAL_RATE_PCT)
    throw new RangeError("La inflación anual debe ser mayor que -100 %.");

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
