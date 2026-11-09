import "./MetricsGrid.css.ts";
import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { signedOutcomeLabel } from "@/features/Dashboard/domain/utils/signedOutcomeLabel.util";
import { metricsGridCopy } from "@/features/Dashboard/presentation/copies/metricsGrid.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { ArrowDownToLine } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { Calculator } from "lucide-react";
import { Trophy } from "lucide-react";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/features/Dashboard/presentation/components/money/AbbreviatedValue";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";
import { LeadingGrowthFormulaTooltip } from "@/features/Dashboard/presentation/components/LeadingGrowthFormulaTooltip";
import { Metric } from "@/features/Dashboard/presentation/components/Metric";
import { AnnualizedReturnMetric } from "@/features/Dashboard/presentation/components/AnnualizedReturnMetric";

// --- Components ---

export function MetricsGrid({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

  const {
    totalYears,
    initial,
    investmentProjections,
    totalContributions,
    summaryInsights,
    totalGrowth,
    totalInvested,
  } = model;
  const projectedLabel = projectedBalanceLabel(model.withInflation);

  // --- Return ---

  return (
    <section className="metrics-grid" aria-label={metricsGridCopy.portfolioMetrics}>
      <Metric
        icon={<ChartNoAxesCombined className="icon-sm" />}
        label={
          summaryInsights.gainPctOfInvested === null
            ? labels.returnOnInvestment
            : signedOutcomeLabel(summaryInsights.gainPctOfInvested, "invested")
        }
        value={
          summaryInsights.gainPctOfInvested === null ? (
            "—"
          ) : (
            <AbbreviatedValue value={summaryInsights.gainPctOfInvested} unit="percent" />
          )
        }
        note={metricsGridCopy.cumulativeGainOnInvested(totalYears)}
        positive={
          summaryInsights.gainPctOfInvested !== null && summaryInsights.gainPctOfInvested > 0
        }
        tooltip={
          <FormulaTooltip
            label={
              summaryInsights.gainPctOfInvested === null
                ? labels.returnOnInvestment
                : signedOutcomeLabel(summaryInsights.gainPctOfInvested, "invested")
            }
            intro={metricsGridCopy.comparesGrowthOrLossToInvested}
            example={
              summaryInsights.gainPctOfInvested === null
                ? undefined
                : metricsGridCopy.investedExample(
                    formatAbbreviatedValue(initial, "currency"),
                    formatAbbreviatedValue(totalContributions, "currency"),
                    formatAbbreviatedValue(totalInvested, "currency"),
                    formatAbbreviatedValue(totalGrowth, "currency"),
                    formatAbbreviatedValue(summaryInsights.gainPctOfInvested, "percent"),
                  )
            }
            trigger={<Calculator className="icon-sm" aria-hidden="true" />}
          >
            <ol className="formula-tooltip-copy">
              <FormulaStep>
                <span className="formula-step-description">
                  {metricsGridCopy.firstAddAllContributions}
                </span>
                <FormulaMath
                  label={metricsGridCopy.totalInvestedFormula}
                  tex={`${texText(labels.totalInvested)} = ${texText(labels.currentCapital)} + ${texText(labels.plannedContributions)}`}
                />
                <FormulaMath
                  label={metricsGridCopy.totalInvestedSubstitution}
                  className="formula-math-substitution"
                  tex={`${texText(formatAbbreviatedValue(initial, "currency"))} + ${texText(formatAbbreviatedValue(totalContributions, "currency"))}`}
                />
                <FormulaResult
                  name={labels.totalInvested}
                  value={formatAbbreviatedValue(totalInvested, "currency")}
                />
              </FormulaStep>
              <FormulaStep>
                <span className="formula-step-description">
                  {summaryInsights.gainPctOfInvested === null
                    ? metricsGridCopy.noInvestedCapital
                    : metricsGridCopy.comparesGrowthToTotalInvested}
                </span>
                <FormulaMath
                  label={metricsGridCopy.growthAsPercentOfTotalInvested}
                  tex={`\\frac{${texText(labels.growth)}}{${texText(labels.totalInvested)}} \\times 100`}
                />
                {summaryInsights.gainPctOfInvested !== null && (
                  <FormulaMath
                    label={metricsGridCopy.returnOnInvestmentValueSubstitution}
                    className="formula-math-substitution"
                    tex={`\\frac{${texText(formatAbbreviatedValue(totalGrowth, "currency"))}}{${texText(formatAbbreviatedValue(totalInvested, "currency"))}} \\times 100`}
                  />
                )}
                {summaryInsights.gainPctOfInvested !== null && (
                  <FormulaResult
                    name={signedOutcomeLabel(summaryInsights.gainPctOfInvested, "invested")}
                    value={formatAbbreviatedValue(summaryInsights.gainPctOfInvested, "percent")}
                  />
                )}
              </FormulaStep>
            </ol>
          </FormulaTooltip>
        }
      />
      <Metric
        icon={<ArrowDownToLine className="icon-sm" />}
        label={labels.monthlyContribution}
        value={<AbbreviatedMoney value={summaryInsights.monthlyContributionTotal} />}
        note={metricsGridCopy.monthlyContributionsByPosition}
      />
      <AnnualizedReturnMetric model={model} projectedLabel={projectedLabel} />

      <Metric
        icon={<Trophy className="icon-sm" />}
        label={labels.leadingGrowth}
        value={
          summaryInsights.leadingGrowthInvestment ? (
            <AbbreviatedMoney value={summaryInsights.leadingGrowthInvestment.growth} />
          ) : (
            "—"
          )
        }
        note={
          summaryInsights.leadingGrowthInvestment?.investment.name ??
          metricsGridCopy.noPositiveGrowthWithinHorizon
        }
        positive={Boolean(summaryInsights.leadingGrowthInvestment)}
        tooltip={
          <LeadingGrowthFormulaTooltip
            projections={investmentProjections}
            leader={summaryInsights.leadingGrowthInvestment}
          />
        }
      />
    </section>
  );
}
