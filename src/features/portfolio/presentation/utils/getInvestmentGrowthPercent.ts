export function getInvestmentGrowthPercent(growth: number, initialValue: number): number | null {
  return initialValue === 0 ? null : (growth / initialValue) * 100;
}
