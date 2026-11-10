import * as veFormulaMathStyles from "./FormulaMath.css.ts";
import * as veFormulaStepStyles from "./FormulaStep.css.ts";
import * as veFormulaTooltipStyles from "./FormulaTooltip.css.ts";
import * as veLeadingGrowthFormulaTooltipStyles from "./LeadingGrowthFormulaTooltip.css.ts";
import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { leadingGrowthFormulaTooltipCopy } from "@/features/Dashboard/presentation/copies/leadingGrowthFormulaTooltip.copy";
import { Calculator } from "lucide-react";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import type { InvestmentProjection } from "@/shared/domain/types/InvestmentProjection.type";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";

export function LeadingGrowthFormulaTooltip({
  projections,
  leader,
}: {
  projections: InvestmentProjection[];
  leader: InvestmentProjection | null;
}) {
  return (
    <FormulaTooltip
      label={labels.leadingGrowth}
      intro={leadingGrowthFormulaTooltipCopy.compareGrowthAcrossInvestments}
      trigger={<Calculator className="icon-sm" aria-hidden="true" />}
    >
      <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
        <FormulaStep>
          <span className={veFormulaStepStyles.formulaStepDescription}>
            {leadingGrowthFormulaTooltipCopy.calculateEachInvestmentGrowthFirst}
          </span>
          <FormulaMath
            label={leadingGrowthFormulaTooltipCopy.eachInvestmentGrowthEqualsValue}
            tex={`${texText(labels.projectedValue)} - ${texText(labels.currentCapital)} - ${texText(labels.totalContributed)}`}
          />
        </FormulaStep>
        <FormulaStep>
          <span className={veFormulaStepStyles.formulaStepDescription}>
            {leadingGrowthFormulaTooltipCopy.comparaLosResultadosSiDosParecenIguales}
          </span>
          {leader && (
            <FormulaMath
              label={leadingGrowthFormulaTooltipCopy.selectMaximumGrowth}
              tex={`\\max\\left(${texText(leadingGrowthFormulaTooltipCopy.positiveInvestmentGrowths)}\\right)`}
            />
          )}
          <ul
            className={veLeadingGrowthFormulaTooltipStyles.formulaGrowthComparison}
            aria-label={leadingGrowthFormulaTooltipCopy.growthByInvestment}
          >
            {projections.map((projection) => (
              <li
                className={projection === leader ? "is-leading" : undefined}
                key={projection.investment.id}
              >
                <span>{projection.investment.name}</span>
                <strong>{formatAbbreviatedValue(projection.growth, "currency")}</strong>
              </li>
            ))}
          </ul>
          {leader ? (
            <FormulaResult
              name={labels.leadingGrowth}
              value={formatAbbreviatedValue(leader.growth, "currency")}
            />
          ) : (
            <p className={veFormulaMathStyles.formulaNoResult}>
              {leadingGrowthFormulaTooltipCopy.noInvestmentHasPositiveGrowth}
            </p>
          )}
        </FormulaStep>
      </ol>
    </FormulaTooltip>
  );
}
