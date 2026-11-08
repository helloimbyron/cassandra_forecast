import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { projectedValueFormulaTooltipCopy } from "@/features/Dashboard/presentation/copies/projectedValueFormulaTooltip.copy";
import { Calculator } from "lucide-react";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { projectedPositionLabel } from "@/features/Dashboard/domain/utils/projectedPositionLabel.util";
import { formatMonths } from "@/features/Dashboard/domain/utils/formatMonths.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { MonthlyBalanceExamples } from "@/features/Dashboard/presentation/components/MonthlyBalanceExamples";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";
import { PROJECTION_SCOPE_VALUES } from "@/features/Dashboard/presentation/enums/projectionScope.enum";
import type { ProjectionScope } from "@/features/Dashboard/presentation/types/ProjectionScope.type";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { monthlyRateFromAnnualPct } from "@/features/Dashboard/domain/utils/monthlyRateFromAnnualPct.util";
import { realAnnualRatePct } from "@/features/Dashboard/domain/utils/realAnnualRatePct.util";

// --- Constants ---

const { MONTHS_PER_YEAR, PERCENT_SCALE } = PORTFOLIO_CONSTANTS;

// --- Components ---

export function ProjectedValueFormulaTooltip({
  annualRatePct,
  inflationRatePct = 0,
  realMode = inflationRatePct > 0,
  currentValue,
  monthlyContribution,
  projectedFinalValue,
  years,
  scope,
  holdingValues,
  holdingLabel,
}: {
  annualRatePct: number;
  inflationRatePct?: number;
  realMode?: boolean;
  currentValue?: number;
  monthlyContribution?: number;
  projectedFinalValue?: number;
  years: number;
  scope: ProjectionScope;
  holdingValues?: Array<{ label: string; value: number }>;
  holdingLabel?: string;
}) {
  // --- Variables ---

  const effectiveAnnualRatePct = realAnnualRatePct(annualRatePct, inflationRatePct);
  const monthlyRate = monthlyRateFromAnnualPct(effectiveAnnualRatePct);
  const monthlyRatePct = monthlyRate * PERCENT_SCALE;
  const monthCount = years * MONTHS_PER_YEAR;
  const real = realMode;
  const label =
    scope === PROJECTION_SCOPE_VALUES.investment
      ? holdingValues?.length === 1
        ? projectedPositionLabel(holdingValues[0]!.label, real)
        : projectedValueFormulaTooltipCopy.positionsLabel(projectedBalanceLabel(real))
      : projectedPositionLabel(holdingLabel ?? projectedValueFormulaTooltipCopy.thisPosition, real);

  if (scope === PROJECTION_SCOPE_VALUES.investment) {
    const values = holdingValues ?? [];
    const investmentValue = values.reduce((sum, holding) => sum + holding.value, 0);
    if (values.length === 1) {
      const investmentLabel = projectedPositionLabel(values[0]!.label, real);

      return (
        <FormulaTooltip
          label={label}
          intro={projectedValueFormulaTooltipCopy.singlePositionInvestmentExplanation}
          example={projectedValueFormulaTooltipCopy.partsExample(
            formatAbbreviatedValue(investmentValue, "currency"),
            formatAbbreviatedValue(investmentValue, "currency"),
          )}
          trigger={<Calculator className="icon-sm" aria-hidden="true" />}
        >
          <ol className="formula-tooltip-copy formula-investment-expression">
            <FormulaStep>
              <span className="formula-step-description">
                {projectedValueFormulaTooltipCopy.noOtherPositionsToAdd}
              </span>
              <FormulaResult
                name={investmentLabel}
                value={formatAbbreviatedValue(investmentValue, "currency")}
              />
            </FormulaStep>
          </ol>
        </FormulaTooltip>
      );
    }

    const expression = values
      .map(({ label: holdingName }) => texText(projectedPositionLabel(holdingName, real)))
      .join(" \\,+\\, ");
    const substitution = values
      .map(({ value }) => texText(formatAbbreviatedValue(value, "currency")))
      .join(" \\,+\\, ");
    const amountsDifferAfterRounding =
      values.reduce((sum, { value }) => sum + Math.round(value * PERCENT_SCALE), 0) !==
      Math.round(investmentValue * PERCENT_SCALE);

    return (
      <FormulaTooltip
        label={label}
        intro={projectedValueFormulaTooltipCopy.investmentTotalCombinesPositionValues}
        example={projectedValueFormulaTooltipCopy.partsExample(
          values.map(({ value }) => formatAbbreviatedValue(value, "currency")).join(" + "),
          formatAbbreviatedValue(investmentValue, "currency"),
        )}
        trigger={<Calculator className="icon-sm" aria-hidden="true" />}
      >
        <ol className="formula-tooltip-copy formula-investment-expression">
          <FormulaStep>
            <span className="formula-step-description">
              {projectedValueFormulaTooltipCopy.sumProjectedValueForEachPosition}
            </span>
            <FormulaMath
              label={values
                .map(({ label: holdingName }) => projectedPositionLabel(holdingName, real))
                .join(" + ")}
              tex={expression || texText("—")}
            />
          </FormulaStep>
          <FormulaStep>
            <span className="formula-step-description">
              {amountsDifferAfterRounding
                ? projectedValueFormulaTooltipCopy.useDisplayedAmountsForTotal
                : projectedValueFormulaTooltipCopy.replaceEachPositionWithProjectedAmount}
            </span>
            <FormulaMath
              label={values
                .map(({ value }) => formatAbbreviatedValue(value, "currency"))
                .join(" + ")}
              className="formula-math-substitution"
              tex={substitution || texText("—")}
            />
            <FormulaResult
              name={projectedBalanceLabel(real)}
              value={formatAbbreviatedValue(investmentValue, "currency")}
              rounded={amountsDifferAfterRounding}
            />
          </FormulaStep>
        </ol>
      </FormulaTooltip>
    );
  }

  const positionName = holdingLabel ?? projectedValueFormulaTooltipCopy.thisPosition;
  const current = currentValue ?? 0;
  const contribution = monthlyContribution ?? 0;
  const projectedValue = projectedFinalValue ?? current;
  const monthlyRateDisplay = formatAbbreviatedValue(monthlyRatePct, "percent", "precise");
  const monthsLabel = texText(labels.projectionMonths);

  // --- Return ---

  return (
    <FormulaTooltip
      label={label}
      intro={
        inflationRatePct > 0
          ? projectedValueFormulaTooltipCopy.realBalanceMeansPositionValue
          : projectedValueFormulaTooltipCopy.balanceMeansPositionValue
      }
      example={projectedValueFormulaTooltipCopy.positionExample(
        formatAbbreviatedValue(current, "currency"),
        formatAbbreviatedValue(contribution, "currency"),
        years,
        formatAbbreviatedValue(projectedValue, "currency"),
        real,
      )}
      trigger={<Calculator className="icon-sm" aria-hidden="true" />}
      className="holding-formula-trigger"
    >
      <ol className="formula-tooltip-copy">
        <FormulaStep>
          <span className="formula-step-description">
            {projectedValueFormulaTooltipCopy.findMonthlyRateAppliedOver}
          </span>
          {inflationRatePct > 0 && (
            <>
              <FormulaMath
                label={projectedValueFormulaTooltipCopy.realAnnualRate}
                tex={`(1 + r_{nominal}) / (1 + ${texText(labels.inflation)}) - 1`}
              />
              <FormulaMath
                label={projectedValueFormulaTooltipCopy.fisherSubstitution}
                className="formula-math-substitution"
                tex={`(1 + ${texText(formatAbbreviatedValue(annualRatePct, "percent", "precise"))}) / (1 + ${texText(formatAbbreviatedValue(inflationRatePct, "percent", "precise"))}) - 1 = ${texText(formatAbbreviatedValue(effectiveAnnualRatePct, "percent", "precise"))}`}
              />
            </>
          )}
          <FormulaMath
            label={projectedValueFormulaTooltipCopy.equivalentMonthlyRateFromAnnualRate}
            tex={`${texText(projectedValueFormulaTooltipCopy.equivalentMonthlyRate)} = (1 + ${texText(real ? labels.realAnnualRate : labels.annualRate)})^{1/12} - 1`}
          />
          <FormulaMath
            label={projectedValueFormulaTooltipCopy.annualRateSubstitutionForMonthlyRate}
            className="formula-math-substitution"
            tex={`${texText(projectedValueFormulaTooltipCopy.equivalentMonthlyRate)} = (1 + ${texText(formatAbbreviatedValue(effectiveAnnualRatePct, "percent", "precise"))})^{1/12} - 1`}
          />
          <FormulaResult
            name={projectedValueFormulaTooltipCopy.equivalentMonthlyRate}
            value={monthlyRateDisplay}
          />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">
            {projectedValueFormulaTooltipCopy.convertHorizonToMonths}
          </span>
          <FormulaMath
            label={projectedValueFormulaTooltipCopy.projectionMonthsFromHorizon}
            tex={`${monthsLabel} = ${texText(labels.horizon)} \\times 12`}
          />
          <FormulaMath
            label={projectedValueFormulaTooltipCopy.horizonToMonthsSubstitution}
            className="formula-math-substitution"
            tex={`${monthsLabel} = ${years} \\times 12`}
          />
          <FormulaResult name={labels.projectionMonths} value={formatMonths(monthCount)} />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">
            {inflationRatePct > 0
              ? projectedValueFormulaTooltipCopy.inflationAdjustedMonthlyContribution
              : projectedValueFormulaTooltipCopy.nominalMonthlyContribution}
          </span>
          <FormulaMath
            label={
              inflationRatePct > 0
                ? projectedValueFormulaTooltipCopy.realContributionRule
                : projectedValueFormulaTooltipCopy.nominalContributionRule
            }
            tex={
              inflationRatePct > 0
                ? `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)} / (1 + ${texText(labels.annualInflation)})^{m/12}`
                : `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)}`
            }
          />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">
            {projectedValueFormulaTooltipCopy.seeHowOneMonthChangesTheBalance}
          </span>
          <MonthlyBalanceExamples
            initialBalance={current}
            monthlyRate={monthlyRate}
            monthlyRateDisplay={monthlyRateDisplay}
            monthlyContribution={contribution}
            inflationRatePct={inflationRatePct}
            months={monthCount}
            finalLabel={projectedPositionLabel(positionName, real)}
            finalValue={projectedValue}
          />
        </FormulaStep>
      </ol>
    </FormulaTooltip>
  );
}
