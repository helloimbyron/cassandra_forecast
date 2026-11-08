import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { allocationPanelCopy } from "@/features/Dashboard/presentation/copies/allocationPanel.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { Card } from "@/design-system/components/cards/Card";
import { CardHeader } from "@/design-system/components/cards/CardHeader";
import { CardTitle } from "@/design-system/components/cards/CardTitle";
import { CardDescription } from "@/design-system/components/cards/CardDescription";
import { CardContent } from "@/design-system/components/cards/CardContent";
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
    <Card className="panel-card allocation-panel">
      <CardHeader className="panel-header">
        <div>
          <CardTitle>{allocationPanelCopy.composicionActual}</CardTitle>
          <CardDescription>{allocationPanelCopy.capitalDistributionByInvestment}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="donut-wrap">
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
          <div className="donut-center">
            <strong>
              <AbbreviatedMoney value={initial} />
            </strong>
            <span>{labels.currentCapital}</span>
          </div>
        </div>
        <div className="allocation-list">
          {portfolio.investments.map((investment, index) => {
            const amount = investment.holdings.reduce(
              (sum, holding) => sum + holding.currentValue,
              0,
            );

            return (
              <div className="allocation-row" key={investment.id}>
                <span className="allocation-name">
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
