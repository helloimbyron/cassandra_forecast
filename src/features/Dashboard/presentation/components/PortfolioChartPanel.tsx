import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import { readChartVisualTokens } from "@/design-system/utils/readChartVisualTokens.util";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { portfolioChartPanelCopy } from "@/features/Dashboard/presentation/copies/portfolioChartPanel.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { Badge } from "@/libraries/shadcn/components/Badge";
import { Card } from "@/libraries/shadcn/components/cards/Card";
import { CardHeader } from "@/libraries/shadcn/components/cards/CardHeader";
import { CardTitle } from "@/libraries/shadcn/components/cards/CardTitle";
import { CardDescription } from "@/libraries/shadcn/components/cards/CardDescription";
import { CardContent } from "@/libraries/shadcn/components/cards/CardContent";
import { investmentSeriesKey } from "@/features/Dashboard/presentation/utils/investmentSeriesKey.util";
import { CHART_CONSTANTS } from "@/features/Dashboard/presentation/constants/chartConstants.constant";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";
import { areChartSeriesHidden } from "@/features/Dashboard/presentation/utils/areChartSeriesHidden.util";
import { PortfolioProjectionChart } from "@/features/Dashboard/presentation/components/PortfolioProjectionChart";

// --- Constants ---

const { TOTAL_SERIES_KEY, INVESTED_SERIES_KEY } = CHART_CONSTANTS;

// --- Components ---

export function PortfolioChartPanel({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const { portfolio, totalYears, hiddenChartSeries, withInflation } = model;
  const projectedLabel = projectedBalanceLabel(withInflation);
  const chartVisual = readChartVisualTokens();
  const portfolioChartSeriesKeys = [
    TOTAL_SERIES_KEY,
    INVESTED_SERIES_KEY,
    ...portfolio.investments.map((investment) => investmentSeriesKey(investment.id)),
  ];
  const noVisibleChartSeries = areChartSeriesHidden(hiddenChartSeries, portfolioChartSeriesKeys);

  // --- Return ---

  return (
    <Card
      className={[veDashboardPrimitivesStyles.dashboardCardSurface, "panel-card chart-panel"].join(
        " ",
      )}
    >
      <CardHeader
        className={[veDashboardPrimitivesStyles.panelHeader, "panel-header"]
          .filter(Boolean)
          .join(" ")}
      >
        <div>
          <CardTitle>{portfolioChartPanelCopy.portfolioProjection}</CardTitle>
          <CardDescription>{portfolioChartPanelCopy.timeEffectOnCapital}</CardDescription>
        </div>
        <Badge variant="outline">{totalYears === 0 ? labels.today : formatYears(totalYears)}</Badge>
      </CardHeader>
      <CardContent>
        <PortfolioProjectionChart
          model={model}
          chartVisual={chartVisual}
          projectedLabel={projectedLabel}
          noVisibleChartSeries={noVisibleChartSeries}
        />
      </CardContent>
    </Card>
  );
}
