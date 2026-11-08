import { FormulaStep } from "@/features/Portfolio/presentation/components/FormulaStep";
import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";
import { projectedBalanceLabel } from "@/features/Portfolio/presentation/utils/projectedBalanceLabel.util";
import { copy } from "@/features/Portfolio/presentation/constants/ProjectedValueFormulaTooltip.constant";
import { Calculator } from "lucide-react";
import { formatAbbreviatedValue } from "@/features/Portfolio/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Portfolio/presentation/utils/texText.util";
import { projectedPositionLabel } from "@/features/Portfolio/presentation/utils/projectedPositionLabel.util";
import { formatMonths } from "@/features/Portfolio/presentation/utils/formatMonths.util";
import { FormulaMath } from "@/features/Portfolio/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Portfolio/presentation/components/FormulaResult";
import { MonthlyBalanceExamples } from "@/features/Portfolio/presentation/components/MonthlyBalanceExamples";
import { FormulaTooltip } from "@/features/Portfolio/presentation/components/FormulaTooltip";
import { PROJECTION_SCOPE_VALUES } from "@/features/Portfolio/presentation/enums/projectionScope.enum";
import type { ProjectionScope } from "@/features/Portfolio/presentation/types/ProjectionScope.type";
import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";
import { monthlyRateFromAnnualPct } from "@/features/Portfolio/domain/utils/monthlyRateFromAnnualPct.util";
import { realAnnualRatePct } from "@/features/Portfolio/domain/utils/realAnnualRatePct.util";

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
        : `${projectedBalanceLabel(real)} de las posiciones`
      : projectedPositionLabel(holdingLabel ?? copy.estaPosicion, real);

  if (scope === PROJECTION_SCOPE_VALUES.investment) {
    const values = holdingValues ?? [];
    const investmentValue = values.reduce((sum, holding) => sum + holding.value, 0);
    if (values.length === 1) {
      const investmentLabel = projectedPositionLabel(values[0]!.label, real);

      return (
        <FormulaTooltip
          label={label}
          intro={copy.singlePositionInvestmentExplanation}
          example={copy.partsExample(
            formatAbbreviatedValue(investmentValue, "currency"),
            formatAbbreviatedValue(investmentValue, "currency"),
          )}
          trigger={<Calculator className="icon-sm" aria-hidden="true" />}
        >
          <ol className="formula-tooltip-copy formula-investment-expression">
            <FormulaStep>
              <span className="formula-step-description">{copy.noHayOtrasPosicionesQueSumar}</span>
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
        intro={copy.investmentTotalCombinesPositionValues}
        example={copy.partsExample(
          values.map(({ value }) => formatAbbreviatedValue(value, "currency")).join(" + "),
          formatAbbreviatedValue(investmentValue, "currency"),
        )}
        trigger={<Calculator className="icon-sm" aria-hidden="true" />}
      >
        <ol className="formula-tooltip-copy formula-investment-expression">
          <FormulaStep>
            <span className="formula-step-description">
              {copy.sumaElValorProyectadoDeCadaPosicion}
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
                ? copy.sustituyeLosImportesMostradosElTotalUsa
                : copy.sustituyeCadaPosicionPorSuImporteProyectado}
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

  const positionName = holdingLabel ?? copy.estaPosicion;
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
          ? copy.saldoRealSignificaElValorDeEstaPosicion
          : copy.saldoSignificaElValorDeEstaPosicion
      }
      example={copy.positionExample(
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
            {copy.buscaLaTasaMensualQueAplicadaDurante}
          </span>
          {inflationRatePct > 0 && (
            <>
              <FormulaMath
                label={copy.realAnnualRate}
                tex="(1 + r_{nominal}) / (1 + inflación) - 1"
              />
              <FormulaMath
                label={copy.fisherSubstitution}
                className="formula-math-substitution"
                tex={`(1 + ${texText(formatAbbreviatedValue(annualRatePct, "percent", "precise"))}) / (1 + ${texText(formatAbbreviatedValue(inflationRatePct, "percent", "precise"))}) - 1 = ${texText(formatAbbreviatedValue(effectiveAnnualRatePct, "percent", "precise"))}`}
              />
            </>
          )}
          <FormulaMath
            label={copy.tasaMensualEquivalenteAPartirDeLa}
            tex={`${texText(copy.tasaMensualEquivalente)} = (1 + ${texText(real ? labels.realAnnualRate : labels.annualRate)})^{1/12} - 1`}
          />
          <FormulaMath
            label={copy.sustitucionDeLaTasaAnualParaObtener}
            className="formula-math-substitution"
            tex={`${texText(copy.tasaMensualEquivalente)} = (1 + ${texText(formatAbbreviatedValue(effectiveAnnualRatePct, "percent", "precise"))})^{1/12} - 1`}
          />
          <FormulaResult name={copy.tasaMensualEquivalente} value={monthlyRateDisplay} />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">{copy.convierteElPlazoEnMesesParaSaber}</span>
          <FormulaMath
            label={copy.mesesDeProyeccionAPartirDelPlazo}
            tex={`${monthsLabel} = ${texText(labels.horizon)} \\times 12`}
          />
          <FormulaMath
            label={copy.sustitucionDelPlazoParaObtenerLosMeses}
            className="formula-math-substitution"
            tex={`${monthsLabel} = ${years} \\times 12`}
          />
          <FormulaResult name={labels.projectionMonths} value={formatMonths(monthCount)} />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">
            {inflationRatePct > 0
              ? copy.inflationAdjustedMonthlyContribution
              : copy.nominalMonthlyContribution}
          </span>
          <FormulaMath
            label={inflationRatePct > 0 ? copy.realContributionRule : copy.nominalContributionRule}
            tex={
              inflationRatePct > 0
                ? `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)} / (1 + ${texText("inflación anual")})^{m/12}`
                : `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)}`
            }
          />
        </FormulaStep>
        <FormulaStep>
          <span className="formula-step-description">{copy.miraComoElResultadoDeUnMes}</span>
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
