import { MONTHS_PER_YEAR, PERCENT_SCALE } from "./portfolio-constants";

export function realAnnualRatePct(nominalRatePct: number, inflationRatePct: number) {
  return (
    ((1 + nominalRatePct / PERCENT_SCALE) / (1 + inflationRatePct / PERCENT_SCALE) - 1) *
    PERCENT_SCALE
  );
}

export function monthlyRateFromAnnualPct(annualRatePct: number) {
  return Math.pow(1 + annualRatePct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR) - 1;
}

export function monthlyInflationFactor(inflationRatePct: number) {
  return Math.pow(1 + inflationRatePct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR);
}
