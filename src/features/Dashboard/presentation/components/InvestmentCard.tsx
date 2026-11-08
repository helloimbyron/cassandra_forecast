import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { signedOutcomeLabel } from "@/features/Dashboard/domain/utils/signedOutcomeLabel.util";
import { investmentCardCopy } from "@/features/Dashboard/presentation/copies/investmentCard.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import type { Investment } from "@/shared/domain/types/Investment.type";
import { createElement, type CSSProperties } from "react";
import { Badge } from "@/design-system/components/Badge";
import { Card } from "@/design-system/components/cards/Card";
import { CardHeader } from "@/design-system/components/cards/CardHeader";
import { CardTitle } from "@/design-system/components/cards/CardTitle";
import { CardDescription } from "@/design-system/components/cards/CardDescription";
import { CardContent } from "@/design-system/components/cards/CardContent";
import { Label } from "@/design-system/components/Label";
import { DebouncedSlider } from "@/design-system/components/sliders/DebouncedSlider";
import { NumericUnitInput } from "@/features/Dashboard/presentation/components/NumericUnitInput";
import { projectInvestment } from "@/features/Dashboard/domain/utils/projectInvestment.util";
import { compactMoney } from "@/features/Dashboard/presentation/utils/compactMoney.util";
import { categoryIcon } from "@/features/Dashboard/presentation/utils/categoryIcon.util";
import { CHART_CONSTANTS } from "@/features/Dashboard/presentation/constants/chartConstants.constant";
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
import { ArrowDown, ArrowUp, Link2, Minus } from "lucide-react";
import { InvestmentGrowthFormulaTooltip } from "@/features/Dashboard/presentation/components/InvestmentGrowthFormulaTooltip";
import { ProjectedValueFormulaTooltip } from "@/features/Dashboard/presentation/components/ProjectedValueFormulaTooltip";
import { PortfolioTooltip } from "@/features/Dashboard/presentation/components/PortfolioTooltip";
import { HoldingRow } from "@/features/Dashboard/presentation/components/HoldingRow";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { categoryLabels } from "@/features/Dashboard/presentation/copies/categoryLabels.copy";
import { PROJECTION_SCOPE_VALUES } from "@/features/Dashboard/presentation/enums/projectionScope.enum";
import { createInvestmentChartData } from "@/features/Dashboard/presentation/utils/createInvestmentChartData.util";
import { DETAIL_SERIES_VALUES } from "@/features/Dashboard/presentation/enums/detailSeries.enum";
import { investmentDetailSeriesKey } from "@/features/Dashboard/presentation/utils/investmentDetailSeriesKey.util";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/features/Dashboard/presentation/components/money/AbbreviatedValue";
import { RateNoteTooltip } from "@/features/Dashboard/presentation/components/RateNoteTooltip";
import { InvestmentGrowthPercentFormulaTooltip } from "@/features/Dashboard/presentation/components/InvestmentGrowthPercentFormulaTooltip";
import { getInvestmentGrowthPercent } from "@/features/Dashboard/presentation/utils/getInvestmentGrowthPercent.util";
import { getEmptyYAxisProps } from "@/features/Dashboard/presentation/utils/getEmptyYAxisProps.util";
import { areChartSeriesHidden } from "@/features/Dashboard/presentation/utils/areChartSeriesHidden.util";
import { ChartSeriesToggle } from "@/features/Dashboard/presentation/components/ChartSeriesToggle";

// --- Constants ---

const {
  DEFAULT_HORIZON_YEARS,
  HORIZON_STEP,
  MAX_ANNUAL_RATE_PCT,
  MAX_HORIZON_YEARS,
  MIN_ANNUAL_RATE_INPUT_PCT,
  MIN_HORIZON_YEARS,
} = PORTFOLIO_CONSTANTS;
const { COLORS } = CHART_CONSTANTS;

// --- Components ---

export function InvestmentCard({
  investment,
  index,
  model,
}: {
  investment: Investment;
  index: number;
  model: LoadedDashboardModel;
}) {
  // --- Variables ---

  const {
    investmentYears,
    setInvestmentYears,
    hiddenChartSeries,
    setRate,
    setContribution,
    toggleChartSeries,
    activeInflationRatePct,
    withInflation,
  } = model;
  const years = investmentYears[investment.id] ?? DEFAULT_HORIZON_YEARS;
  const projection = projectInvestment(investment, years, activeInflationRatePct);
  const Icon = categoryIcon(investment.category);
  const investmentChartData = createInvestmentChartData(projection);
  const growthPercent = getInvestmentGrowthPercent(projection.growth, projection.initialValue);
  const investmentTotalKey = investmentDetailSeriesKey(investment.id, DETAIL_SERIES_VALUES.total);
  const investmentInvestedKey = investmentDetailSeriesKey(
    investment.id,
    DETAIL_SERIES_VALUES.invested,
  );
  const projectedLabel = projectedBalanceLabel(withInflation);
  const noVisibleChartSeries = areChartSeriesHidden(hiddenChartSeries, [
    investmentTotalKey,
    investmentInvestedKey,
  ]);

  // --- Return ---

  return (
    <Card className="investment-card">
      <CardHeader className="investment-card-header">
        <div className="investment-identity">
          <span
            className="investment-icon"
            style={{ "--investment-accent": COLORS[index % COLORS.length] } as CSSProperties}
          >
            {createElement(Icon, { size: 17 })}
          </span>
          <div>
            <CardTitle>{investment.name}</CardTitle>
            <CardDescription>
              {investment.holdings.length}{" "}
              {investment.holdings.length === 1
                ? investmentCardCopy.position
                : investmentCardCopy.positions}
            </CardDescription>
          </div>
        </div>
        <div className="investment-header-actions">
          {investment.rateSource?.url && (
            <a
              className="source-icon-link"
              href={investment.rateSource.url}
              target="_blank"
              rel="noreferrer"
              aria-label={investmentCardCopy.rateSource(investment.rateSource.asOf)}
              title={investmentCardCopy.rateSource(investment.rateSource.asOf)}
            >
              <Link2 className="icon-sm" aria-hidden="true" />
            </a>
          )}
          <Badge variant="outline">{categoryLabels[investment.category]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="investment-card-content">
        <div className="investment-metrics">
          <div className="investment-primary-metric">
            <div className="investment-value-label">
              {years === 0 ? (
                labels.currentValueUpper
              ) : (
                <>
                  <span>{projectedLabel.toUpperCase()}</span>
                </>
              )}
            </div>
            <div className="investment-value-row">
              <div className="investment-value">
                <AbbreviatedMoney value={projection.finalValue} />
              </div>
              {years > 0 && (
                <ProjectedValueFormulaTooltip
                  annualRatePct={investment.annualRatePct}
                  inflationRatePct={activeInflationRatePct}
                  realMode={withInflation}
                  years={years}
                  scope={PROJECTION_SCOPE_VALUES.investment}
                  holdingValues={projection.holdings.map(({ holding, finalValue }) => ({
                    label: holding.label,
                    value: finalValue,
                  }))}
                />
              )}
            </div>
          </div>
          <div className="investment-secondary-metrics">
            <div className="investment-secondary-metric">
              <div className="investment-value-label investment-secondary-heading">
                <span className="growth-arrow">
                  {projection.growth > 0 ? (
                    <ArrowUp className="icon-sm" aria-hidden="true" />
                  ) : projection.growth < 0 ? (
                    <ArrowDown className="icon-sm" aria-hidden="true" />
                  ) : (
                    <Minus className="icon-sm" aria-hidden="true" />
                  )}
                </span>
                <span>{signedOutcomeLabel(projection.growth)}</span>
              </div>
              <div
                className="investment-growth-values"
                role="group"
                aria-label={signedOutcomeLabel(projection.growth)}
              >
                <div className="investment-value-row investment-growth-row">
                  <div className="investment-growth-value">
                    <AbbreviatedMoney value={projection.growth} />
                  </div>
                  <InvestmentGrowthFormulaTooltip
                    projection={projection}
                    years={years}
                    inflationRatePct={activeInflationRatePct}
                    realMode={withInflation}
                  />
                </div>
                <div className="investment-value-row investment-growth-row">
                  <div className="investment-growth-value">
                    {growthPercent === null ? (
                      "—"
                    ) : (
                      <AbbreviatedValue value={growthPercent} unit="percent" />
                    )}
                  </div>
                  <InvestmentGrowthPercentFormulaTooltip
                    projection={projection}
                    value={growthPercent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="chart-wrap investment-chart"
          role="img"
          aria-label={investmentCardCopy.chartFor(investment.name, years)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={investmentChartData}
              margin={{ top: 14, right: 8, left: 2, bottom: 0 }}
            >
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
              <Area
                type="monotone"
                dataKey="total"
                name={investment.name}
                stroke={COLORS[index % COLORS.length]}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={0.09}
                strokeWidth="var(--line-chart-subtle)"
                isAnimationActive={false}
                hide={hiddenChartSeries.has(investmentTotalKey)}
              />
              <Line
                type="monotone"
                dataKey="total"
                name={projectedLabel}
                stroke="var(--chart-1)"
                strokeWidth="var(--line-focus)"
                dot={years === 0}
                activeDot={{ r: 5, fill: "var(--chart-1)", stroke: "var(--card)", strokeWidth: 2 }}
                isAnimationActive={false}
                hide={hiddenChartSeries.has(investmentTotalKey)}
              />
              <Line
                type="monotone"
                dataKey="invested"
                name={labels.totalInvested}
                stroke="var(--chart-invested)"
                strokeWidth="var(--line-medium)"
                strokeDasharray="5 5"
                dot={years === 0}
                isAnimationActive={false}
                hide={hiddenChartSeries.has(investmentInvestedKey)}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          className="investment-legend investment-chart-legend"
          role="group"
          aria-label={investmentCardCopy.seriesFor(investment.name)}
        >
          <ChartSeriesToggle
            checked={!hiddenChartSeries.has(investmentTotalKey)}
            onChange={() => toggleChartSeries(investmentTotalKey)}
            swatch="line"
            color="var(--chart-1)"
            label={projectedLabel}
          />
          <ChartSeriesToggle
            checked={!hiddenChartSeries.has(investmentInvestedKey)}
            onChange={() => toggleChartSeries(investmentInvestedKey)}
            swatch="line"
            color="var(--chart-invested)"
            dashed
            label={labels.totalInvested}
          />
        </div>

        <div className="slider-block">
          <div className="slider-heading">
            <Label htmlFor={`horizon-${investment.id}`}>{labels.horizon}</Label>
            <strong>{years === 0 ? labels.today : formatYears(years)}</strong>
          </div>
          <DebouncedSlider
            id={`horizon-${investment.id}`}
            aria-label={investmentCardCopy.horizonFor(investment.name)}
            min={MIN_HORIZON_YEARS}
            max={MAX_HORIZON_YEARS}
            step={HORIZON_STEP}
            value={[years]}
            onValueChange={(value) =>
              setInvestmentYears((current) => ({
                ...current,
                [investment.id]: value[0] ?? DEFAULT_HORIZON_YEARS,
              }))
            }
          />
          <div className="range-labels">
            <span>{labels.zeroToday}</span>
            <span>{investmentCardCopy.text40}</span>
          </div>
        </div>

        <div className="rate-edit-row">
          <Label htmlFor={`rate-${investment.id}`}>{labels.annualRate}</Label>
          <div className="rate-input-controls">
            <NumericUnitInput
              id={`rate-${investment.id}`}
              label={labels.annualRate}
              unit="percent"
              min={MIN_ANNUAL_RATE_INPUT_PCT}
              max={MAX_ANNUAL_RATE_PCT}
              value={investment.annualRatePct}
              onChange={(value) => setRate(investment.id, String(value))}
            />
            <RateNoteTooltip investmentName={investment.name} note={investment.rateNote} />
          </div>
        </div>
        <div
          className="holding-list"
          role="table"
          aria-label={investmentCardCopy.positionsFor(investment.name)}
        >
          <div className="holding-table-header" role="row">
            <span role="columnheader">{labels.position}</span>
            <span role="columnheader">{labels.currentValue}</span>
            <span role="columnheader">{labels.monthlyContribution}</span>
            <span role="columnheader">{labels.totalContributed}</span>
            <span role="columnheader">{years === 0 ? labels.currentValue : projectedLabel}</span>
          </div>
          {projection.holdings.map((holdingProjection) => (
            <HoldingRow
              key={holdingProjection.holding.id}
              projection={holdingProjection}
              investment={investment}
              years={years}
              inflationRatePct={activeInflationRatePct}
              realMode={withInflation}
              setContribution={setContribution}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
