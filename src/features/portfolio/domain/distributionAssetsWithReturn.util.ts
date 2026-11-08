export function distributionAssetsWithReturn(
  positions: ReadonlyArray<{ balance: number }>,
  annualReturnPct: number,
) {

  return positions.map(({ balance }) => ({ balance, annualReturnPct }));
}
