import type { InvestmentProjection } from "../../domain/investment-projection";
import { labels } from "../copy/labels";
import { formatYears } from "./formatYears";

export function createInvestmentChartData(projection: InvestmentProjection) {
  return projection.points.map((point) => ({
    year: point.year === 0 ? labels.today : formatYears(point.year),
    total: point.balance,
    invested: projection.initialValue + point.contributions,
  }));
}
