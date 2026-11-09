import "./InvestmentCard.css.ts";
import { readChartVisualTokens } from "@/design-system/utils/readChartVisualTokens.util";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { signedOutcomeLabel } from "@/features/Dashboard/domain/utils/signedOutcomeLabel.util";
import { investmentCardCopy } from "@/features/Dashboard/presentation/copies/investmentCard.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import type { Investment } from "@/shared/domain/types/Investment.type";
import { createElement, type CSSProperties } from "react";
import { Badge } from "@/libraries/shadcn/components/Badge";
import { Card } from "@/libraries/shadcn/components/cards/Card";
import { CardHeader } from "@/libraries/shadcn/components/cards/CardHeader";
import { CardTitle } from "@/libraries/shadcn/components/cards/CardTitle";
import { CardDescription } from "@/libraries/shadcn/components/cards/CardDescription";
import { CardContent } from "@/libraries/shadcn/components/cards/CardContent";
import { Label } from "@/libraries/shadcn/components/Label";
import { DebouncedSlider } from "@/libraries/cassandra/components/DebouncedSlider";
import { NumericUnitInput } from "@/features/Dashboard/presentation/components/NumericUnitInput";
import { projectInvestment } from "@/features/Dashboard/domain/utils/projectInvestment.util";
import { categoryIcon } from "@/features/Dashboard/presentation/utils/categoryIcon.util";
import { CHART_CONSTANTS } from "@/features/Dashboard/presentation/constants/chartConstants.constant";
import { ArrowDown, ArrowUp, Link2, Minus } from "lucide-react";
import { InvestmentGrowthFormulaTooltip } from "@/features/Dashboard/presentation/components/InvestmentGrowthFormulaTooltip";
import { ProjectedValueFormulaTooltip } from "@/features/Dashboard/presentation/components/ProjectedValueFormulaTooltip";
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
import { InvestmentChart } from "@/features/Dashboard/presentation/components/InvestmentChart";

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
  const chartVisual = readChartVisualTokens();
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

  // --- Return ---

  return (
    <Card className="investment-card" data-testid="dashboard-investment-card">
      <CardHeader className="investment-card-header">
        <div className="investment-identity">
          <span
            className="investment-icon"
            style={{ "--investment-accent": COLORS[index % COLORS.length] } as CSSProperties}
          >
            {createElement(Icon, { "aria-hidden": true })}
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
        <InvestmentChart
          investment={investment}
          index={index}
          years={years}
          chartData={investmentChartData}
          chartVisual={chartVisual}
          hiddenChartSeries={hiddenChartSeries}
          totalSeriesKey={investmentTotalKey}
          investedSeriesKey={investmentInvestedKey}
          projectedLabel={projectedLabel}
          onToggleSeries={toggleChartSeries}
        />

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
