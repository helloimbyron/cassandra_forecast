import { labels, projectedBalanceLabel, signedOutcomeLabel } from "../copy/labels";
import { copy } from "../copy/InvestmentCard";
import type { LoadedDashboardModel } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";
import type { Investment } from "@/lib/portfolio";
import { createElement, type CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DebouncedSlider } from "@/components/ui/DebouncedSlider";
import { NumericUnitInput } from "@/components/financial/NumericUnitInput";
import { projectInvestment } from "@/lib/portfolio";
import { compactMoney } from "../utils/compactMoney";
import { categoryIcon } from "../utils/categoryIcon";
import { COLORS } from "../chart-constants";
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
import { InvestmentGrowthFormulaTooltip } from "./InvestmentGrowthFormulaTooltip";
import { ProjectedValueFormulaTooltip } from "./ProjectedValueFormulaTooltip";
import { PortfolioTooltip } from "./PortfolioTooltip";
import { HoldingRow } from "./HoldingRow";
import { formatYears } from "../utils/formatYears";
import {
  DEFAULT_HORIZON_YEARS,
  HORIZON_STEP,
  MAX_ANNUAL_RATE_PCT,
  MAX_HORIZON_YEARS,
  MIN_ANNUAL_RATE_INPUT_PCT,
  MIN_HORIZON_YEARS,
} from "../../domain/portfolio-constants";
import { categoryLabels } from "../copy/category-labels";
import { PROJECTION_SCOPE } from "../projection-scope";
import { createInvestmentChartData } from "../utils/createInvestmentChartData";
import { DETAIL_SERIES } from "../detail-series";
import { investmentDetailSeriesKey } from "../utils/investmentDetailSeriesKey";
import { AbbreviatedMoney } from "@/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/components/money/AbbreviatedValue";
import { RateNoteTooltip } from "./RateNoteTooltip";
import { InvestmentGrowthPercentFormulaTooltip } from "./InvestmentGrowthPercentFormulaTooltip";
import { getInvestmentGrowthPercent } from "../utils/getInvestmentGrowthPercent";
import { getEmptyYAxisProps } from "../utils/getEmptyYAxisProps";
import { areChartSeriesHidden } from "../utils/areChartSeriesHidden";
import { ChartSeriesToggle } from "./ChartSeriesToggle";

export function InvestmentCard({
  investment,
  index,
  model,
}: {
  investment: Investment;
  index: number;
  model: LoadedDashboardModel;
}) {
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
  const investmentTotalKey = investmentDetailSeriesKey(investment.id, DETAIL_SERIES.total);
  const investmentInvestedKey = investmentDetailSeriesKey(investment.id, DETAIL_SERIES.invested);
  const projectedLabel = projectedBalanceLabel(withInflation);
  const noVisibleChartSeries = areChartSeriesHidden(hiddenChartSeries, [
    investmentTotalKey,
    investmentInvestedKey,
  ]);
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
              {investment.holdings.length === 1 ? copy.posicion : copy.posiciones}
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
              aria-label={copy.rateSource(investment.rateSource.asOf)}
              title={copy.rateSource(investment.rateSource.asOf)}
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
                  scope={PROJECTION_SCOPE.investment}
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
          aria-label={copy.chartFor(investment.name, years)}
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
          aria-label={copy.seriesFor(investment.name)}
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
            aria-label={copy.horizonFor(investment.name)}
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
            <span>{copy.text40}</span>
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
        <div className="holding-list" role="table" aria-label={copy.positionsFor(investment.name)}>
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
