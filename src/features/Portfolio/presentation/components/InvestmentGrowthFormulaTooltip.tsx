import { FormulaStep } from "@/features/Portfolio/presentation/components/FormulaStep";
import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";
import { projectedBalanceLabel } from "@/features/Portfolio/presentation/utils/projectedBalanceLabel.util";
import { signedOutcomeLabel } from "@/features/Portfolio/presentation/utils/signedOutcomeLabel.util";
import { copy } from "@/features/Portfolio/presentation/constants/InvestmentGrowthFormulaTooltip.constant";
import { Calculator } from "lucide-react";
import { formatAbbreviatedValue } from "@/features/Portfolio/presentation/format/formatAbbreviatedValue.util";
import type { InvestmentProjection } from "@/features/Portfolio/domain/types/InvestmentProjection.type";
import { texText } from "@/features/Portfolio/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Portfolio/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Portfolio/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Portfolio/presentation/components/FormulaTooltip";

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
      label={`${signedOutcomeLabel(projection.growth)} de ${projection.investment.name}`}
      intro={
        years === 0 ? copy.hoyTodaviaNoTranscurreTiempoNiSe : copy.esLaDiferenciaEntreElValorFinal
      }
      example={copy.example(
        formatAbbreviatedValue(projection.finalValue, "currency"),
        formatAbbreviatedValue(projection.initialValue, "currency"),
        formatAbbreviatedValue(projection.totalContributions, "currency"),
        formatAbbreviatedValue(projection.growth, "currency"),
      )}
      trigger={<Calculator className="icon-sm" aria-hidden="true" />}
      className="investment-growth-formula-trigger"
    >
      <ol className="formula-tooltip-copy">
        <FormulaStep>
          <span className="formula-step-description">{copy.restaElValorQueYaTenianSus}</span>
          <FormulaMath
            label={copy.differenceLabel(finalLabel)}
            tex={`${texText(finalLabel)} - ${texText(labels.currentCapital)} - ${texText(labels.totalContributed)}`}
          />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">
            {roundedDifference
              ? copy.sustituyeLosImportesVisiblesElResultadoUsa
              : copy.substituteInvestmentAmounts}
          </span>
          <FormulaMath
            label={copy.investmentGrowthSubstitution}
            className="formula-math-substitution"
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
