import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import * as veAllocationPanelStyles from "./AllocationPanel.css.ts";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { allocationPanelCopy } from "@/features/Dashboard/presentation/copies/allocationPanel.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { Card } from "@/libraries/shadcn/components/cards/Card";
import { CardHeader } from "@/libraries/shadcn/components/cards/CardHeader";
import { CardTitle } from "@/libraries/shadcn/components/cards/CardTitle";
import { CardDescription } from "@/libraries/shadcn/components/cards/CardDescription";
import { CardContent } from "@/libraries/shadcn/components/cards/CardContent";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/features/Dashboard/presentation/components/money/AbbreviatedValue";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { CHART_CONSTANTS } from "@/features/Dashboard/presentation/constants/chartConstants.constant";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// --- Constants ---

const { COLORS } = CHART_CONSTANTS;

// --- Components ---

export function AllocationPanel({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const { portfolio, initial } = model;

  // --- Return ---

  return (
    <Card
      className={[
        veDashboardPrimitivesStyles.dashboardCardSurface,
        veAllocationPanelStyles.allocationPanel,
        "panel-card allocation-panel",
      ].join(" ")}
    >
      <CardHeader
        className={[veDashboardPrimitivesStyles.panelHeader, "panel-header"]
          .filter(Boolean)
          .join(" ")}
      >
        <div>
          <CardTitle>{allocationPanelCopy.currentAllocation}</CardTitle>
          <CardDescription>{allocationPanelCopy.capitalDistributionByInvestment}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={[veAllocationPanelStyles.donutWrap, "donut-wrap"].filter(Boolean).join(" ")}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart accessibilityLayer>
              <Pie
                data={portfolio.investments.map((investment, index) => ({
                  name: investment.name,
                  value: investment.holdings.reduce(
                    (sum, holding) => sum + holding.currentValue,
                    0,
                  ),
                  fill: COLORS[index % COLORS.length],
                }))}
                innerRadius={68}
                outerRadius={98}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                isAnimationActive={false}
              />
              <Tooltip
                formatter={(value) => formatAbbreviatedValue(Number(value), "currency")}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--input)",
                  borderRadius: "var(--radius)",
                  color: "var(--popover-foreground)",
                  fontSize: "var(--text-meta)",
                }}
                itemStyle={{ color: "var(--popover-foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={veAllocationPanelStyles.donutCenter}>
            <strong>
              <AbbreviatedMoney value={initial} />
            </strong>
            <span>{labels.currentCapital}</span>
          </div>
        </div>
        <div className={veAllocationPanelStyles.allocationList}>
          {portfolio.investments.map((investment, index) => {
            const amount = investment.holdings.reduce(
              (sum, holding) => sum + holding.currentValue,
              0,
            );

            return (
              <div className={veAllocationPanelStyles.allocationRow} key={investment.id}>
                <span
                  className={[veAllocationPanelStyles.allocationName, "allocation-name"]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <i style={{ background: COLORS[index % COLORS.length] }} />
                  {investment.name}
                </span>
                <span>
                  <AbbreviatedValue value={initial ? (amount / initial) * 100 : 0} unit="percent" />
                </span>
                <strong>
                  <AbbreviatedMoney value={amount} />
                </strong>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
