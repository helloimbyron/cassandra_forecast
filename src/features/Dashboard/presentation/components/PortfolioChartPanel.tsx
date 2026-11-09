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
import { compactMoney } from "@/features/Dashboard/presentation/utils/compactMoney.util";
import { investmentSeriesKey } from "@/features/Dashboard/presentation/utils/investmentSeriesKey.util";
import { CHART_CONSTANTS } from "@/features/Dashboard/presentation/constants/chartConstants.constant";
import { PortfolioTooltip } from "@/features/Dashboard/presentation/components/PortfolioTooltip";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";
import { getEmptyYAxisProps } from "@/features/Dashboard/presentation/utils/getEmptyYAxisProps.util";
import { areChartSeriesHidden } from "@/features/Dashboard/presentation/utils/areChartSeriesHidden.util";
import { ChartSeriesToggle } from "@/features/Dashboard/presentation/components/ChartSeriesToggle";

// --- Constants ---

const { COLORS, TOTAL_SERIES_KEY, INVESTED_SERIES_KEY } = CHART_CONSTANTS;

// --- Components ---

export function PortfolioChartPanel({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const {
    portfolio,
    totalYears,
    hiddenChartSeries,
    investmentProjections,
    chartData,
    toggleChartSeries,
    withInflation,
  } = model;
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
    <Card className="panel-card chart-panel">
      <CardHeader className="panel-header">
        <div>
          <CardTitle>{portfolioChartPanelCopy.portfolioProjection}</CardTitle>
          <CardDescription>{portfolioChartPanelCopy.timeEffectOnCapital}</CardDescription>
        </div>
        <Badge variant="outline">{totalYears === 0 ? labels.today : formatYears(totalYears)}</Badge>
      </CardHeader>
      <CardContent>
        <div className="chart-wrap total-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart accessibilityLayer data={chartData} margin={chartVisual.margin}>
              <defs>
                <linearGradient id="totalFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset={chartVisual.gradientStartOffset}
                    stopColor="var(--chart-1)"
                    stopOpacity={chartVisual.gradientStartOpacity}
                  />
                  <stop
                    offset={chartVisual.gradientEndOffset}
                    stopColor="var(--chart-1)"
                    stopOpacity={chartVisual.gradientEndOpacity}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="var(--chart-grid)"
                strokeDasharray={chartVisual.gridDasharray}
              />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: "var(--text-meta)" }}
                minTickGap={chartVisual.xMinTickGap}
              />
              <YAxis
                {...getEmptyYAxisProps(noVisibleChartSeries)}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: "var(--text-meta)" }}
                tickFormatter={compactMoney}
                width={chartVisual.yAxisWidth}
              />
              <Tooltip content={<PortfolioTooltip />} />
              {investmentProjections.map((projection, index) => (
                <Area
                  key={projection.investment.id}
                  type="monotone"
                  dataKey={projection.investment.id}
                  name={projection.investment.name}
                  stackId="investments"
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={chartVisual.areaFillOpacity}
                  strokeWidth="var(--line-chart-subtle)"
                  isAnimationActive={false}
                  hide={hiddenChartSeries.has(investmentSeriesKey(projection.investment.id))}
                />
              ))}
              <Line
                type="monotone"
                dataKey="total"
                name={projectedLabel}
                stroke="var(--chart-1)"
                strokeWidth="var(--line-focus)"
                dot={totalYears === 0}
                activeDot={{
                  r: chartVisual.activeDotRadius,
                  fill: "var(--chart-1)",
                  stroke: "var(--card)",
                  strokeWidth: chartVisual.activeDotStrokeWidth,
                }}
                isAnimationActive={false}
                hide={hiddenChartSeries.has(TOTAL_SERIES_KEY)}
              />
              <Line
                type="monotone"
                dataKey="invested"
                name={labels.totalInvested}
                stroke="var(--chart-invested)"
                strokeWidth="var(--line-medium)"
                strokeDasharray={chartVisual.investedDasharray}
                dot={totalYears === 0}
                isAnimationActive={false}
                hide={hiddenChartSeries.has(INVESTED_SERIES_KEY)}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          className="investment-legend"
          role="group"
          aria-label={portfolioChartPanelCopy.projectionSeries}
        >
          {[
            {
              key: TOTAL_SERIES_KEY,
              label: projectedLabel,
              color: "var(--chart-1)",
              dashed: false,
            },
            {
              key: INVESTED_SERIES_KEY,
              label: labels.totalInvested,
              color: "var(--chart-invested)",
              dashed: true,
            },
          ].map(({ key, label, color, dashed }) => {
            const hidden = hiddenChartSeries.has(key);

            return (
              <ChartSeriesToggle
                key={key}
                checked={!hidden}
                onChange={() => toggleChartSeries(key)}
                swatch="line"
                color={color}
                dashed={dashed}
                label={label}
              />
            );
          })}
          <div className="series-legend-divider" role="separator" aria-orientation="horizontal" />
          {portfolio.investments.map((investment, index) => {
            const seriesKey = investmentSeriesKey(investment.id);
            const hidden = hiddenChartSeries.has(seriesKey);

            return (
              <ChartSeriesToggle
                key={investment.id}
                checked={!hidden}
                onChange={() => toggleChartSeries(seriesKey)}
                swatch="dot"
                color={COLORS[index % COLORS.length]}
                label={investment.name}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
