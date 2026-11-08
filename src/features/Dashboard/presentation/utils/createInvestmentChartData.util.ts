import type { InvestmentProjection } from "@/shared/domain/types/InvestmentProjection.type";
import { labels } from "@/features/Dashboard/presentation/constants/labels.constant";
import { formatYears } from "@/features/Dashboard/presentation/utils/formatYears.util";

export function createInvestmentChartData(projection: InvestmentProjection) {
  return projection.points.map((point) => ({
    year: point.year === 0 ? labels.today : formatYears(point.year),
    total: point.balance,
    invested: projection.initialValue + point.contributions,
  }));
}
