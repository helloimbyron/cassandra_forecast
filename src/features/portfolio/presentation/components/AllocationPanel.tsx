import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";
import { copy } from "@/features/Portfolio/presentation/constants/AllocationPanel.constant";
import type { LoadedDashboardModel } from "@/features/Portfolio/presentation/hooks/usePortfolioDashboard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/design-system/components/Card";
import { AbbreviatedMoney } from "@/features/Portfolio/presentation/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/features/Portfolio/presentation/components/money/AbbreviatedValue";
import { formatAbbreviatedValue } from "@/features/Portfolio/presentation/format/formatAbbreviatedValue.util";
import { CHART_CONSTANTS } from "@/features/Portfolio/presentation/constants/chartConstants.constant";
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
