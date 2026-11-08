import type { DetailSeries } from "../detail-series";

export function investmentDetailSeriesKey(investmentId: string, series: DetailSeries): string {
  return `detail:${investmentId}:${series}`;
}
