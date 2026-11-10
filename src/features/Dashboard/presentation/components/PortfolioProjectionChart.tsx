import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import * as vePortfolioProjectionChartStyles from "./PortfolioProjectionChart.css.ts";
import type { readChartVisualTokens } from "@/design-system/utils/readChartVisualTokens.util";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { portfolioChartPanelCopy } from "@/features/Dashboard/presentation/copies/portfolioChartPanel.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { compactMoney } from "@/features/Dashboard/presentation/utils/compactMoney.util";
import { investmentSeriesKey } from "@/features/Dashboard/presentation/utils/investmentSeriesKey.util";
import { CHART_CONSTANTS } from "@/features/Dashboard/presentation/constants/chartConstants.constant";
import { PortfolioTooltip } from "@/features/Dashboard/presentation/components/PortfolioTooltip";
import { ChartSeriesToggle } from "@/features/Dashboard/presentation/components/ChartSeriesToggle";
import { getEmptyYAxisProps } from "@/features/Dashboard/presentation/utils/getEmptyYAxisProps.util";
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

const { COLORS, TOTAL_SERIES_KEY, INVESTED_SERIES_KEY } = CHART_CONSTANTS;
type ChartVisual = ReturnType<typeof readChartVisualTokens>;

export function PortfolioProjectionChart({
  model,
  chartVisual,
  projectedLabel,
  noVisibleChartSeries,
}: {
  model: LoadedDashboardModel;
  chartVisual: ChartVisual;
  projectedLabel: string;
  noVisibleChartSeries: boolean;
}) {
  const {
    portfolio,
    totalYears,
    hiddenChartSeries,
    investmentProjections,
    chartData,
    toggleChartSeries,
  } = model;

  return (
    <>
      <div
        className={[veDashboardPrimitivesStyles.chartWrap, "chart-wrap"].filter(Boolean).join(" ")}
      >
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
        className={veDashboardPrimitivesStyles.investmentLegend}
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
        <div
          className={vePortfolioProjectionChartStyles.seriesLegendDivider}
          role="separator"
          aria-orientation="horizontal"
        />
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
    </>
  );
}
