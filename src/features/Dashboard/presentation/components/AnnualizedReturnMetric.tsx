import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { formatMonths } from "@/features/Dashboard/domain/utils/formatMonths.util";
import { metricsGridCopy } from "@/features/Dashboard/presentation/copies/metricsGrid.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { Calculator, ChartNoAxesCombined } from "lucide-react";
import { AbbreviatedValue } from "@/features/Dashboard/presentation/components/money/AbbreviatedValue";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { MonthlyBalanceExamples } from "@/features/Dashboard/presentation/components/MonthlyBalanceExamples";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";
import { Metric } from "@/features/Dashboard/presentation/components/Metric";

export function AnnualizedReturnMetric({
  model,
  projectedLabel,
}: {
  model: LoadedDashboardModel;
  projectedLabel: string;
}) {
  const {
    totalYears,
    initial,
    totalAtHorizon,
    monthlyReturnDisplay,
    returnMonthCount,
    summaryMonthlyRate,
    activeInflationRatePct,
    summaryInsights,
    withInflation,
  } = model;

  return (
    <Metric
      icon={<ChartNoAxesCombined className="icon-sm" />}
      label={withInflation ? labels.realAnnualReturn : labels.annualReturn}
      value={
        summaryInsights.annualizedReturnPct === null ? (
          "—"
        ) : (
          <AbbreviatedValue value={summaryInsights.annualizedReturnPct} unit="percent" />
        )
      }
      note={
        totalYears === 0
          ? metricsGridCopy.notCalculableYet
          : metricsGridCopy.annualizedWithMonthlyContributions
      }
      positive={
        summaryInsights.annualizedReturnPct !== null && summaryInsights.annualizedReturnPct > 0
      }
      tooltip={
        <FormulaTooltip
          label={withInflation ? labels.realAnnualReturn : labels.annualReturn}
          intro={
            activeInflationRatePct > 0
              ? metricsGridCopy.realBalanceMeansTotalPortfolioValue
              : metricsGridCopy.balanceMeansTotalPortfolioValue
          }
          example={
            summaryInsights.annualizedReturnPct === null
              ? undefined
              : metricsGridCopy.annualExample(
                  formatAbbreviatedValue(initial, "currency"),
                  formatAbbreviatedValue(summaryInsights.monthlyContributionTotal, "currency"),
                  formatAbbreviatedValue(totalAtHorizon, "currency"),
                  formatAbbreviatedValue(summaryInsights.annualizedReturnPct, "percent"),
                  withInflation,
                )
          }
          trigger={<Calculator className="icon-sm" aria-hidden="true" />}
        >
          <ol className="formula-tooltip-copy">
            {summaryInsights.monthlyReturnPct === null ? (
              <FormulaStep>
                <span className="formula-step-description">
                  {totalYears === 0
                    ? metricsGridCopy.notEnoughMonthsToCalculateYet
                    : metricsGridCopy.noRateAvailable}
                </span>
              </FormulaStep>
            ) : (
              <>
                <FormulaStep>
                  <span className="formula-step-description">
                    {metricsGridCopy.expressHorizonInMonthsPerYear}
                  </span>
                  <FormulaMath
                    label={metricsGridCopy.projectionMonthsEqualTotalHorizon}
                    tex={`${texText(metricsGridCopy.months)} = ${texText(labels.totalHorizon)} \\times 12`}
                  />
                  <FormulaMath
                    label={metricsGridCopy.horizonYearsSubstitution}
                    className="formula-math-substitution"
                    tex={`${totalYears} \\times 12`}
                  />
                  <FormulaResult
                    name={labels.projectionMonths}
                    value={formatMonths(returnMonthCount)}
                  />
                </FormulaStep>
                <FormulaStep>
                  <span className="formula-step-description">
                    {activeInflationRatePct > 0
                      ? metricsGridCopy.realContributionStep
                      : metricsGridCopy.monthlyGrowthBeforeContributionStep}
                  </span>
                  <FormulaMath
                    label={metricsGridCopy.monthlyBalanceRule}
                    tex={
                      activeInflationRatePct > 0
                        ? `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)} / (1 + ${texText(labels.annualInflation)})^{m/12}`
                        : `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)}`
                    }
                  />
                </FormulaStep>
                <FormulaStep>
                  <span className="formula-step-description">
                    {metricsGridCopy.appTestsAndAdjustsRate}
                    {returnMonthCount} {metricsGridCopy.monthsUntilBalanceMatchesValue}
                  </span>
                  <FormulaResult
                    name={labels.monthlyRate}
                    value={monthlyReturnDisplay ?? "0,00%"}
                  />
                </FormulaStep>
                <FormulaStep>
                  <span className="formula-step-description">
                    {metricsGridCopy.tracksPortfolioValueEvery}
                  </span>
                  <MonthlyBalanceExamples
                    initialBalance={initial}
                    monthlyRate={summaryMonthlyRate}
                    monthlyRateDisplay={monthlyReturnDisplay ?? "0,00%"}
                    monthlyContribution={summaryInsights.monthlyContributionTotal}
                    inflationRatePct={activeInflationRatePct}
                    months={returnMonthCount}
                    finalLabel={projectedLabel}
                    finalValue={totalAtHorizon}
                  />
                </FormulaStep>
                <FormulaStep>
                  <span className="formula-step-description">
                    {metricsGridCopy.convertsMonthlyRateToAnnualRate}
                  </span>
                  <FormulaMath
                    label={metricsGridCopy.equivalentAnnualRateFormula}
                    tex={`(1 + ${texText(labels.monthlyRate)})^{12} - 1`}
                  />
                  <FormulaMath
                    label={metricsGridCopy.equivalentAnnualRateSubstitution}
                    className="formula-math-substitution"
                    tex={`(1 + ${texText(monthlyReturnDisplay ?? "0,00%")})^{12} - 1`}
                  />
                  <FormulaResult
                    name={withInflation ? labels.realAnnualReturn : labels.annualReturn}
                    value={formatAbbreviatedValue(
                      summaryInsights.annualizedReturnPct ?? 0,
                      "percent",
                    )}
                  />
                </FormulaStep>
              </>
            )}
          </ol>
        </FormulaTooltip>
      }
    />
  );
}
