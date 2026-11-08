export function areChartSeriesHidden(
  hiddenChartSeries: ReadonlySet<string>,
  seriesKeys: readonly string[],
) {

  return seriesKeys.every((seriesKey) => hiddenChartSeries.has(seriesKey));
}
