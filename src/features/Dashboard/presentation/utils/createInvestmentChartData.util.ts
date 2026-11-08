import type { InvestmentProjection } from "@/shared/domain/types/InvestmentProjection.type";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";

export function createInvestmentChartData(projection: InvestmentProjection) {
  return projection.points.map((point) => ({
    year: point.year === 0 ? labels.today : formatYears(point.year),
    total: point.balance,
    invested: projection.initialValue + point.contributions,
  }));
}
