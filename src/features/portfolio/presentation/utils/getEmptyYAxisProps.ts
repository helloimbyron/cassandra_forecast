export function getEmptyYAxisProps(allSeriesHidden: boolean) {
  if (!allSeriesHidden) return {};

  return {
    allowDataOverflow: true,
    domain: [0, 1] as [number, number],
    ticks: [0],
  };
}
