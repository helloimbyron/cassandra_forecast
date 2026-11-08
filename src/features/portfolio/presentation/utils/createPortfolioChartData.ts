import { projectPortfolio, type Portfolio } from "../../../../lib/portfolio";
import { labels } from "../copy/labels";
import { formatYears } from "./formatYears";

export function createPortfolioChartData(
  portfolio: Portfolio,
  totalYears: number,
  initial: number,
  inflationRatePct = 0,
) {
  const projections = projectPortfolio(portfolio, totalYears, inflationRatePct);
  return Array.from({ length: totalYears + 1 }, (_, year) => {
    const row: Record<string, number | string> = {
      year: year === 0 ? labels.today : formatYears(year),
    };
    projections.forEach((projection) => {
      row[projection.investment.id] = projection.points[year]!.balance;
      row[`${projection.investment.id}-aporte`] = projection.points[year]!.contributions;
    });
    row.total = projections.reduce((sum, projection) => sum + projection.points[year]!.balance, 0);
    row.aportes = projections.reduce(
      (sum, projection) => sum + projection.points[year]!.contributions,
      0,
    );
    row.invested = initial + Number(row.aportes);
    return row;
  });
}
