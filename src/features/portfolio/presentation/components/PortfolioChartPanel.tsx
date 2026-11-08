import { labels, projectedBalanceLabel } from "../copy/labels";
import { copy } from "../copy/PortfolioChartPanel";
import type { LoadedDashboardModel } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { compactMoney } from "../utils/compactMoney";
import { investmentSeriesKey } from "../utils/investmentSeriesKey";
import { COLORS, TOTAL_SERIES_KEY, INVESTED_SERIES_KEY } from "../chart-constants";
import { PortfolioTooltip } from "./PortfolioTooltip";
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
import { formatYears } from "../utils/formatYears";
import { getEmptyYAxisProps } from "../utils/getEmptyYAxisProps";
import { areChartSeriesHidden } from "../utils/areChartSeriesHidden";
import { ChartSeriesToggle } from "./ChartSeriesToggle";

export function PortfolioChartPanel({ model }: { model: LoadedDashboardModel }) {
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
  const portfolioChartSeriesKeys = [
    TOTAL_SERIES_KEY,
    INVESTED_SERIES_KEY,
    ...portfolio.investments.map((investment) => investmentSeriesKey(investment.id)),
  ];
  const noVisibleChartSeries = areChartSeriesHidden(hiddenChartSeries, portfolioChartSeriesKeys);
  return (
    <Card className="panel-card chart-panel">
      <CardHeader className="panel-header">
        <div>
          <CardTitle>{copy.proyeccionDeLaCartera}</CardTitle>
          <CardDescription>{copy.elEfectoDelTiempoSobreTuCapital}</CardDescription>
        </div>
        <Badge variant="outline">{totalYears === 0 ? labels.today : formatYears(totalYears)}</Badge>
      </CardHeader>
      <CardContent>
        <div className="chart-wrap total-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 14, right: 8, left: 2, bottom: 0 }}
            >
              <defs>
                <linearGradient id="totalFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.015} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="4 5" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: "var(--text-meta)" }}
                minTickGap={22}
              />
              <YAxis
                {...getEmptyYAxisProps(noVisibleChartSeries)}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--chart-axis)", fontSize: "var(--text-meta)" }}
                tickFormatter={compactMoney}
                width={58}
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
                  fillOpacity={0.09}
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
                activeDot={{ r: 5, fill: "var(--chart-1)", stroke: "var(--card)", strokeWidth: 2 }}
                isAnimationActive={false}
                hide={hiddenChartSeries.has(TOTAL_SERIES_KEY)}
              />
              <Line
                type="monotone"
                dataKey="invested"
                name={labels.totalInvested}
                stroke="var(--chart-invested)"
                strokeWidth="var(--line-medium)"
                strokeDasharray="5 5"
                dot={totalYears === 0}
                isAnimationActive={false}
                hide={hiddenChartSeries.has(INVESTED_SERIES_KEY)}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="investment-legend" role="group" aria-label={copy.seriesDeLaProyeccion}>
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
