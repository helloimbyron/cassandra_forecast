import * as veFormulaMathStyles from "./FormulaMath.css.ts";
import * as veFormulaStepStyles from "./FormulaStep.css.ts";
import * as veFormulaTooltipStyles from "./FormulaTooltip.css.ts";
import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { Calculator } from "lucide-react";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { signedOutcomeLabel } from "@/features/Dashboard/domain/utils/signedOutcomeLabel.util";
import { investmentGrowthPercentFormulaTooltipCopy } from "@/features/Dashboard/presentation/copies/investmentGrowthPercentFormulaTooltip.copy";
import { investmentGrowthFormulaTooltipCopy } from "@/features/Dashboard/presentation/copies/investmentGrowthFormulaTooltip.copy";
import type { InvestmentProjection } from "@/shared/domain/types/InvestmentProjection.type";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";

export function InvestmentGrowthPercentFormulaTooltip({
  projection,
  value,
}: {
  projection: InvestmentProjection;
  value: number | null;
}) {
  return (
    <FormulaTooltip
      label={investmentGrowthFormulaTooltipCopy.investmentOutcomeLabel(
        value === null ? labels.growthPercent : signedOutcomeLabel(value),
        projection.investment.name,
      )}
      intro={investmentGrowthPercentFormulaTooltipCopy.intro}
      example={
        value === null
          ? undefined
          : investmentGrowthPercentFormulaTooltipCopy.example(
              formatAbbreviatedValue(projection.growth, "currency"),
              formatAbbreviatedValue(projection.initialValue, "currency"),
              formatAbbreviatedValue(value, "percent"),
            )
      }
      trigger={<Calculator className="icon-sm" aria-hidden="true" />}
      className={veFormulaTooltipStyles.investmentGrowthFormulaTrigger}
    >
      <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
        <FormulaStep>
          <span className={veFormulaStepStyles.formulaStepDescription}>
            {investmentGrowthPercentFormulaTooltipCopy.description}
          </span>
          <FormulaMath
            label={investmentGrowthPercentFormulaTooltipCopy.expressionLabel}
            tex={`\\frac{${texText(labels.growth)}}{${texText(labels.currentCapital)}} \\times 100`}
          />
        </FormulaStep>
        <FormulaStep>
          <span className={veFormulaStepStyles.formulaStepDescription}>
            {value === null
              ? investmentGrowthPercentFormulaTooltipCopy.noCurrentValue
              : investmentGrowthPercentFormulaTooltipCopy.substitutionDescription}
          </span>
          {value !== null && (
            <>
              <FormulaMath
                label={investmentGrowthPercentFormulaTooltipCopy.substitutionLabel}
                className={veFormulaMathStyles.formulaMathSubstitution}
                tex={`\\frac{${texText(formatAbbreviatedValue(projection.growth, "currency"))}}{${texText(formatAbbreviatedValue(projection.initialValue, "currency"))}} \\times 100`}
              />
              <FormulaResult
                name={signedOutcomeLabel(value)}
                value={formatAbbreviatedValue(value, "percent")}
              />
            </>
          )}
        </FormulaStep>
      </ol>
    </FormulaTooltip>
  );
}
