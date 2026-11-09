import "./ProjectedInvestmentFormula.css.ts";
import { Calculator } from "lucide-react";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { projectedPositionLabel } from "@/features/Dashboard/domain/utils/projectedPositionLabel.util";
import { projectedValueFormulaTooltipCopy } from "@/features/Dashboard/presentation/copies/projectedValueFormulaTooltip.copy";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";

type HoldingValue = { label: string; value: number };

export function ProjectedInvestmentFormula({
  label,
  real,
  values,
  investmentValue,
  expression,
  substitution,
  amountsDifferAfterRounding,
}: {
  label: string;
  real: boolean;
  values: HoldingValue[];
  investmentValue: number;
  expression: string;
  substitution: string;
  amountsDifferAfterRounding: boolean;
}) {
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
            label={values.map(({ value }) => formatAbbreviatedValue(value, "currency")).join(" + ")}
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
