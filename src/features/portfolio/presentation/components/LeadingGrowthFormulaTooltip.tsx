import { FormulaStep } from "@/features/Portfolio/presentation/components/FormulaStep";
import { labels } from "@/features/Portfolio/presentation/copy/labels.constant";
import { copy } from "@/features/Portfolio/presentation/copy/LeadingGrowthFormulaTooltip.constant";
import { Calculator } from "lucide-react";
import { formatAbbreviatedValue } from "@/features/Portfolio/presentation/format/formatAbbreviatedValue.util";
import type { InvestmentProjection } from "@/features/Portfolio/domain/InvestmentProjection.type";
import { texText } from "@/features/Portfolio/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Portfolio/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Portfolio/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Portfolio/presentation/components/FormulaTooltip";

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
      intro={copy.seComparanLosCrecimientosDeTodosLos}
      trigger={<Calculator className="icon-sm" aria-hidden="true" />}
    >
      <ol className="formula-tooltip-copy">
        <FormulaStep>
          <span className="formula-step-description">
            {copy.calculateEachInvestmentGrowthFirst}
          </span>
          <FormulaMath
            label={copy.eachInvestmentGrowthEqualsValue}
            tex={`${texText(labels.projectedValue)} - ${texText(labels.currentCapital)} - ${texText(labels.totalContributed)}`}
          />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">
            {copy.comparaLosResultadosSiDosParecenIguales}
          </span>
          {leader && (
            <FormulaMath
              label={copy.seEligeElMaximoEntreLosCrecimientos}
              tex={`\\max\\left(${texText(copy.positiveInvestmentGrowths)}\\right)`}
            />
          )}
          <ul className="formula-growth-comparison" aria-label={copy.growthByInvestment}>
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
            <p className="formula-no-result">{copy.noInvestmentHasPositiveGrowth}</p>
          )}
        </FormulaStep>
      </ol>
    </FormulaTooltip>
  );
}
