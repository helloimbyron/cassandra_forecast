import { FormulaStep } from "@/features/Portfolio/presentation/components/FormulaStep";
import { Calculator } from "lucide-react";
import { labels } from "@/features/Portfolio/presentation/copy/labels.constant";
import { signedOutcomeLabel } from "@/features/Portfolio/presentation/utils/signedOutcomeLabel.util";
import { copy } from "@/features/Portfolio/presentation/copy/InvestmentGrowthPercentFormulaTooltip.constant";
import type { InvestmentProjection } from "@/features/Portfolio/domain/InvestmentProjection.type";
import { formatAbbreviatedValue } from "@/features/Portfolio/presentation/format/formatAbbreviatedValue.util";
import { texText } from "@/features/Portfolio/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Portfolio/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Portfolio/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Portfolio/presentation/components/FormulaTooltip";

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
