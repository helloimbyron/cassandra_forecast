import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import * as veInvestmentChartStyles from "./InvestmentChart.css.ts";
import { CHART_CONSTANTS } from "@/features/Dashboard/presentation/constants/chartConstants.constant";
import { investmentCardCopy } from "@/features/Dashboard/presentation/copies/investmentCard.copy";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { ChartSeriesToggle } from "@/features/Dashboard/presentation/components/ChartSeriesToggle";
import { PortfolioTooltip } from "@/features/Dashboard/presentation/components/PortfolioTooltip";
import { compactMoney } from "@/features/Dashboard/presentation/utils/compactMoney.util";
import { getEmptyYAxisProps } from "@/features/Dashboard/presentation/utils/getEmptyYAxisProps.util";
import { areChartSeriesHidden } from "@/features/Dashboard/presentation/utils/areChartSeriesHidden.util";
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
import type { Investment } from "@/shared/domain/types/Investment.type";
import type { readChartVisualTokens } from "@/design-system/utils/readChartVisualTokens.util";
import type { createInvestmentChartData } from "@/features/Dashboard/presentation/utils/createInvestmentChartData.util";

const { COLORS } = CHART_CONSTANTS;
type ChartVisual = ReturnType<typeof readChartVisualTokens>;
type InvestmentChartData = ReturnType<typeof createInvestmentChartData>;

export function InvestmentChart({
  investment,
  index,
  years,
  chartData,
  chartVisual,
  hiddenChartSeries,
  totalSeriesKey,
  investedSeriesKey,
  projectedLabel,
  onToggleSeries,
}: {
  investment: Investment;
  index: number;
  years: number;
  chartData: InvestmentChartData;
  chartVisual: ChartVisual;
  hiddenChartSeries: Set<string>;
  totalSeriesKey: string;
  investedSeriesKey: string;
  projectedLabel: string;
  onToggleSeries: (key: string) => void;
}) {
  const noVisibleChartSeries = areChartSeriesHidden(hiddenChartSeries, [
    totalSeriesKey,
    investedSeriesKey,
  ]);

  return (
    <>
      <div
        className={[
          veDashboardPrimitivesStyles.chartWrap,
          [veInvestmentChartStyles.investmentChart, "chart-wrap investment-chart"]
            .filter(Boolean)
            .join(" "),
        ]
          .filter(Boolean)
          .join(" ")}
        role="img"
        aria-label={investmentCardCopy.chartFor(investment.name, years)}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart accessibilityLayer data={chartData} margin={chartVisual.margin}>
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
            <Area
              type="monotone"
              dataKey="total"
              name={investment.name}
              stroke={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
              fillOpacity={chartVisual.areaFillOpacity}
              strokeWidth="var(--line-chart-subtle)"
              isAnimationActive={false}
              hide={hiddenChartSeries.has(totalSeriesKey)}
            />
            <Line
              type="monotone"
              dataKey="total"
              name={projectedLabel}
              stroke="var(--chart-1)"
              strokeWidth="var(--line-focus)"
              dot={years === 0}
              activeDot={{
                r: chartVisual.activeDotRadius,
                fill: "var(--chart-1)",
                stroke: "var(--card)",
                strokeWidth: chartVisual.activeDotStrokeWidth,
              }}
              isAnimationActive={false}
              hide={hiddenChartSeries.has(totalSeriesKey)}
            />
            <Line
              type="monotone"
              dataKey="invested"
              name={labels.totalInvested}
              stroke="var(--chart-invested)"
              strokeWidth="var(--line-medium)"
              strokeDasharray={chartVisual.investedDasharray}
              dot={years === 0}
              isAnimationActive={false}
              hide={hiddenChartSeries.has(investedSeriesKey)}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div
        className={[
          veDashboardPrimitivesStyles.investmentLegend,
          [
            veInvestmentChartStyles.investmentChartLegend,
            "investment-legend investment-chart-legend",
          ]
            .filter(Boolean)
            .join(" "),
        ]
          .filter(Boolean)
          .join(" ")}
        role="group"
        aria-label={investmentCardCopy.seriesFor(investment.name)}
      >
        <ChartSeriesToggle
          checked={!hiddenChartSeries.has(totalSeriesKey)}
          onChange={() => onToggleSeries(totalSeriesKey)}
          swatch="line"
          color="var(--chart-1)"
          label={projectedLabel}
        />
        <ChartSeriesToggle
          checked={!hiddenChartSeries.has(investedSeriesKey)}
          onChange={() => onToggleSeries(investedSeriesKey)}
          swatch="line"
          color="var(--chart-invested)"
          dashed
          label={labels.totalInvested}
        />
      </div>
    </>
  );
}
