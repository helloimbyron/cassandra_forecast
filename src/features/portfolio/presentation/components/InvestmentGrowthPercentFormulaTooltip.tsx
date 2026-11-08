import { FormulaStep } from "./FormulaStep";
import { Calculator } from "lucide-react";
import { labels, signedOutcomeLabel } from "../copy/labels";
import { copy } from "../copy/InvestmentGrowthPercentFormulaTooltip";
import type { InvestmentProjection } from "../../domain/investment-projection";
import { formatAbbreviatedValue } from "@/shared/format/format-abbreviated-value";
import { texText } from "../utils/texText";
import { FormulaMath } from "./FormulaMath";
import { FormulaResult } from "./FormulaResult";
import { FormulaTooltip } from "./FormulaTooltip";

export function InvestmentGrowthPercentFormulaTooltip({
  projection,
  value,
}: {
  projection: InvestmentProjection;
  value: number | null;
}) {
  return (
    <FormulaTooltip
      label={`${value === null ? labels.growthPercent : signedOutcomeLabel(value)} de ${projection.investment.name}`}
      intro={copy.intro}
      example={
        value === null
          ? undefined
          : copy.example(
              formatAbbreviatedValue(projection.growth, "currency"),
              formatAbbreviatedValue(projection.initialValue, "currency"),
              formatAbbreviatedValue(value, "percent"),
            )
      }
      trigger={<Calculator className="icon-sm" aria-hidden="true" />}
      className="investment-growth-formula-trigger"
    >
      <ol className="formula-tooltip-copy">
        <FormulaStep>
          <span className="formula-step-description">{copy.description}</span>
          <FormulaMath
            label={copy.expressionLabel}
            tex={`\\frac{${texText(labels.growth)}}{${texText(labels.currentCapital)}} \\times 100`}
          />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">
            {value === null ? copy.noCurrentValue : copy.substitutionDescription}
          </span>
          {value !== null && (
            <>
              <FormulaMath
                label={copy.substitutionLabel}
                className="formula-math-substitution"
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
