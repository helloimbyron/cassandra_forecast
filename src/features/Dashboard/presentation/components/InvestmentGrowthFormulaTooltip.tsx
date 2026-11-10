import * as veFormulaMathStyles from "./FormulaMath.css.ts";
import * as veFormulaStepStyles from "./FormulaStep.css.ts";
import * as veFormulaTooltipStyles from "./FormulaTooltip.css.ts";
import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { signedOutcomeLabel } from "@/features/Dashboard/domain/utils/signedOutcomeLabel.util";
import { investmentGrowthFormulaTooltipCopy } from "@/features/Dashboard/presentation/copies/investmentGrowthFormulaTooltip.copy";
import { Calculator } from "lucide-react";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import type { InvestmentProjection } from "@/shared/domain/types/InvestmentProjection.type";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";

// --- Components ---

export function InvestmentGrowthFormulaTooltip({
  projection,
  years,
  inflationRatePct = 0,
  realMode = inflationRatePct > 0,
}: {
  projection: InvestmentProjection;
  years: number;
  inflationRatePct?: number;
  realMode?: boolean;
}) {
  // --- Variables ---

  const finalLabel = years === 0 ? labels.currentValue : projectedBalanceLabel(realMode);
  const displayedDifference =
    Math.round(projection.finalValue * 100) -
    Math.round(projection.initialValue * 100) -
    Math.round(projection.totalContributions * 100);
  const roundedDifference = displayedDifference !== Math.round(projection.growth * 100);

  // --- Return ---

  return (
    <FormulaTooltip
      label={investmentGrowthFormulaTooltipCopy.investmentOutcomeLabel(
        signedOutcomeLabel(projection.growth),
        projection.investment.name,
      )}
      intro={
        years === 0
          ? investmentGrowthFormulaTooltipCopy.noTimeHasElapsedYet
          : investmentGrowthFormulaTooltipCopy.finalValueDifferenceExplanation
      }
      example={investmentGrowthFormulaTooltipCopy.example(
        formatAbbreviatedValue(projection.finalValue, "currency"),
        formatAbbreviatedValue(projection.initialValue, "currency"),
        formatAbbreviatedValue(projection.totalContributions, "currency"),
        formatAbbreviatedValue(projection.growth, "currency"),
      )}
      trigger={<Calculator className="icon-sm" aria-hidden="true" />}
      className={veFormulaTooltipStyles.investmentGrowthFormulaTrigger}
    >
      <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
        <FormulaStep>
          <span className={veFormulaStepStyles.formulaStepDescription}>
            {investmentGrowthFormulaTooltipCopy.subtractTheirPreviousValue}
          </span>
          <FormulaMath
            label={investmentGrowthFormulaTooltipCopy.differenceLabel(finalLabel)}
            tex={`${texText(finalLabel)} - ${texText(labels.currentCapital)} - ${texText(labels.totalContributed)}`}
          />
        </FormulaStep>
        <FormulaStep>
          <span className={veFormulaStepStyles.formulaStepDescription}>
            {roundedDifference
              ? investmentGrowthFormulaTooltipCopy.useVisibleAmountsForResult
              : investmentGrowthFormulaTooltipCopy.substituteInvestmentAmounts}
          </span>
          <FormulaMath
            label={investmentGrowthFormulaTooltipCopy.investmentGrowthSubstitution}
            className={veFormulaMathStyles.formulaMathSubstitution}
            tex={`${texText(formatAbbreviatedValue(projection.finalValue, "currency"))} - ${texText(formatAbbreviatedValue(projection.initialValue, "currency"))} - ${texText(formatAbbreviatedValue(projection.totalContributions, "currency"))}`}
          />
          <FormulaResult
            name={signedOutcomeLabel(projection.growth)}
            value={formatAbbreviatedValue(projection.growth, "currency")}
            rounded={roundedDifference}
          />
        </FormulaStep>
      </ol>
    </FormulaTooltip>
  );
}
