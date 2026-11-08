export function selectedDistributionAnnualReturnPct(
  portfolioAnnualizedReturnPct: number | null,
  manualAnnualReturnPct: number | null,
) {

  return manualAnnualReturnPct ?? portfolioAnnualizedReturnPct ?? 0;
}
