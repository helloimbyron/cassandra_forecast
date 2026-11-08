export function getVisibleInvestmentTotal(
  row: Record<string, number | string>,
  visibleInvestmentIds: string[],
) {

  return visibleInvestmentIds.reduce((total, investmentId) => {
    const value = Number(row[investmentId]);

    return Number.isFinite(value) ? total + value : total;
  }, 0);
}
