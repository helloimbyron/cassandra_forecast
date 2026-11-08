import type { DetailSeries } from "@/features/Dashboard/presentation/types/DetailSeries.type";

export function investmentDetailSeriesKey(investmentId: string, series: DetailSeries): string {
  return `detail:${investmentId}:${series}`;
}
