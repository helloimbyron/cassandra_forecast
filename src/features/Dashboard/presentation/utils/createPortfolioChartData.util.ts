import { projectPortfolio } from "@/features/Dashboard/domain/utils/projectPortfolio.util";
import type { Portfolio } from "@/shared/domain/types/Portfolio.type";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";

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
      row[`${projection.investment.id}-contribution`] = projection.points[year]!.contributions;
    });
    row.total = projections.reduce((sum, projection) => sum + projection.points[year]!.balance, 0);
    row.contributions = projections.reduce(
      (sum, projection) => sum + projection.points[year]!.contributions,
      0,
    );
    row.invested = initial + Number(row.contributions);

    return row;
  });
}
