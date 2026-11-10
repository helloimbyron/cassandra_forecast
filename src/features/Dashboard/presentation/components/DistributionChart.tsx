import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import * as veChartTooltipStyles from "./ChartTooltip.css.ts";
import * as veDistributionChartStyles from "./DistributionChart.css.ts";
import type { readChartVisualTokens } from "@/design-system/utils/readChartVisualTokens.util";
import { distributionSectionCopy } from "@/features/Dashboard/presentation/copies/distributionSection.copy";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import type { DistributionPoint } from "@/shared/domain/types/DistributionPoint.type";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { compactMoney } from "@/features/Dashboard/presentation/utils/compactMoney.util";

type ChartVisual = ReturnType<typeof readChartVisualTokens>;

function DistributionTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number; color?: string; payload?: DistributionPoint }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;

  const balance = payload[0]?.value ?? 0;
  const year = Number(label ?? payload[0]?.payload?.year ?? 0);

  return (
    <div className={veChartTooltipStyles.chartTooltip}>
      <span>{distributionSectionCopy.year(year)}</span>
      <div style={{ color: payload[0]?.color }}>
        <i style={{ background: payload[0]?.color }} />
        {distributionSectionCopy.balance}
        <strong>
          <AbbreviatedMoney value={balance} interaction="text" />
        </strong>
      </div>
    </div>
  );
}

export function DistributionChart({
  points,
  chartVisual,
  years,
  withInflation,
}: {
  points: DistributionPoint[];
  chartVisual: ChartVisual;
  years: number;
  withInflation: boolean;
}) {
  return (
    <div
      className={[
        veDashboardPrimitivesStyles.chartWrap,
        [veDistributionChartStyles.distributionChart, "chart-wrap distribution-chart"]
          .filter(Boolean)
          .join(" "),
      ]
        .filter(Boolean)
        .join(" ")}
      role="img"
      aria-label={`${distributionSectionCopy.chartTitle(withInflation)}, ${distributionSectionCopy.yearCount(years)}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart accessibilityLayer data={points} margin={chartVisual.margin}>
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
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--chart-axis)", fontSize: "var(--text-meta)" }}
            tickFormatter={compactMoney}
            width={chartVisual.distributionYAxisWidth}
          />
          <Tooltip content={<DistributionTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            name={distributionSectionCopy.balance}
            stroke="var(--chart-1)"
            fill="var(--chart-1)"
            fillOpacity={chartVisual.distributionFillOpacity}
            strokeWidth="var(--line-chart-highlight)"
            activeDot={{
              r: chartVisual.activeDotRadius,
              fill: "var(--chart-1)",
              stroke: "var(--card)",
              strokeWidth: chartVisual.activeDotStrokeWidth,
            }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
