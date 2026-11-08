import { labels } from "../copy/labels";
import { copy } from "../copy/AllocationPanel";
import type { LoadedDashboardModel } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AbbreviatedMoney } from "@/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/components/money/AbbreviatedValue";
import { formatAbbreviatedValue } from "@/shared/format/format-abbreviated-value";
import { COLORS } from "../chart-constants";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export function AllocationPanel({ model }: { model: LoadedDashboardModel }) {
  const { portfolio, initial } = model;
  return (
    <Card className="panel-card allocation-panel">
      <CardHeader className="panel-header">
        <div>
          <CardTitle>{copy.composicionActual}</CardTitle>
          <CardDescription>{copy.capitalDistributionByInvestment}</CardDescription>
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
