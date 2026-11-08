import type { DetailSeries } from "@/features/Portfolio/presentation/DetailSeries.type";

export function investmentDetailSeriesKey(investmentId: string, series: DetailSeries): string {

  return `detail:${investmentId}:${series}`;
}
