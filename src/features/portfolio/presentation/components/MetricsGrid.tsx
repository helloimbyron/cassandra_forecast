import { FormulaStep } from "./FormulaStep";
import { labels, projectedBalanceLabel, signedOutcomeLabel } from "../copy/labels";
import { formatMonths } from "../utils/formatMonths";
import { copy } from "../copy/MetricsGrid";
import type { LoadedDashboardModel } from "@/features/portfolio/presentation/hooks/usePortfolioDashboard";
import { formatAbbreviatedValue } from "@/shared/format/format-abbreviated-value";
import { texText } from "../utils/texText";
import { ArrowDownToLine } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { Calculator } from "lucide-react";
import { Trophy } from "lucide-react";
import { AbbreviatedMoney } from "@/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/components/money/AbbreviatedValue";
import { FormulaMath } from "./FormulaMath";
import { FormulaResult } from "./FormulaResult";
import { MonthlyBalanceExamples } from "./MonthlyBalanceExamples";
import { FormulaTooltip } from "./FormulaTooltip";
import { LeadingGrowthFormulaTooltip } from "./LeadingGrowthFormulaTooltip";
import { Metric } from "./Metric";

export function MetricsGrid({ model }: { model: LoadedDashboardModel }) {
  const {
    totalYears,
    initial,
    investmentProjections,
    totalAtHorizon,
    totalContributions,
    summaryInsights,
    totalGrowth,
    totalInvested,
    monthlyReturnDisplay,
    returnMonthCount,
    summaryMonthlyRate,
    activeInflationRatePct,
    withInflation,
  } = model;
  const projectedLabel = projectedBalanceLabel(withInflation);
  return (
    <section className="metrics-grid" aria-label={copy.indicadoresDeCartera}>
      <Metric
        icon={<ChartNoAxesCombined className="icon-sm" />}
        label={
          summaryInsights.gainPctOfInvested === null
            ? labels.returnOnInvestment
            : signedOutcomeLabel(summaryInsights.gainPctOfInvested, "invested")
        }
        value={
          summaryInsights.gainPctOfInvested === null ? (
            "—"
          ) : (
            <AbbreviatedValue value={summaryInsights.gainPctOfInvested} unit="percent" />
          )
        }
        note={copy.gananciaAcumuladaSobreInvertido(totalYears)}
        positive={
          summaryInsights.gainPctOfInvested !== null && summaryInsights.gainPctOfInvested > 0
        }
        tooltip={
          <FormulaTooltip
            label={
              summaryInsights.gainPctOfInvested === null
                ? labels.returnOnInvestment
                : signedOutcomeLabel(summaryInsights.gainPctOfInvested, "invested")
            }
            intro={copy.comparaElCrecimientoOLaPerdidaCon}
            example={
              summaryInsights.gainPctOfInvested === null
                ? undefined
                : copy.investedExample(
                    formatAbbreviatedValue(initial, "currency"),
                    formatAbbreviatedValue(totalContributions, "currency"),
                    formatAbbreviatedValue(totalInvested, "currency"),
                    formatAbbreviatedValue(totalGrowth, "currency"),
                    formatAbbreviatedValue(summaryInsights.gainPctOfInvested, "percent"),
                  )
            }
            trigger={<Calculator className="icon-sm" aria-hidden="true" />}
          >
            <ol className="formula-tooltip-copy">
              <FormulaStep>
                <span className="formula-step-description">
                  {copy.primeroSumaTodoElDineroQueHabras}
                </span>
                <FormulaMath
                  label={copy.totalInvertidoIgualACapitalActualMas}
                  tex={`${texText(labels.totalInvested)} = ${texText(labels.currentCapital)} + ${texText(labels.plannedContributions)}`}
                />
                <FormulaMath
                  label={copy.sustitucionDelTotalInvertido}
                  className="formula-math-substitution"
                  tex={`${texText(formatAbbreviatedValue(initial, "currency"))} + ${texText(formatAbbreviatedValue(totalContributions, "currency"))}`}
                />
                <FormulaResult
                  name={labels.totalInvested}
                  value={formatAbbreviatedValue(totalInvested, "currency")}
                />
              </FormulaStep>
              <FormulaStep>
                <span className="formula-step-description">
                  {summaryInsights.gainPctOfInvested === null
                    ? copy.noInvestedCapital
                    : copy.comparaElCrecimientoConEseTotalY}
                </span>
                <FormulaMath
                  label={copy.crecimientoDivididoParaTotalInvertidoPorCien}
                  tex={`\\frac{${texText(labels.growth)}}{${texText(labels.totalInvested)}} \\times 100`}
                />
                {summaryInsights.gainPctOfInvested !== null && (
                  <FormulaMath
                    label={copy.sustitucionDeValoresDeLaGananciaSobre}
                    className="formula-math-substitution"
                    tex={`\\frac{${texText(formatAbbreviatedValue(totalGrowth, "currency"))}}{${texText(formatAbbreviatedValue(totalInvested, "currency"))}} \\times 100`}
                  />
                )}
                {summaryInsights.gainPctOfInvested !== null && (
                  <FormulaResult
                    name={signedOutcomeLabel(summaryInsights.gainPctOfInvested, "invested")}
                    value={formatAbbreviatedValue(summaryInsights.gainPctOfInvested, "percent")}
                  />
                )}
              </FormulaStep>
            </ol>
          </FormulaTooltip>
        }
      />
      <Metric
        icon={<ArrowDownToLine className="icon-sm" />}
        label={labels.monthlyContribution}
        value={<AbbreviatedMoney value={summaryInsights.monthlyContributionTotal} />}
        note={copy.sumaDeAportesMensualesPorPosicion}
      />
      <Metric
        icon={<ChartNoAxesCombined className="icon-sm" />}
        label={withInflation ? labels.realAnnualReturn : labels.annualReturn}
        value={
          summaryInsights.annualizedReturnPct === null ? (
            "—"
          ) : (
            <AbbreviatedValue value={summaryInsights.annualizedReturnPct} unit="percent" />
          )
        }
        note={totalYears === 0 ? copy.noCalculableHoy : copy.anualizadoConAportesMensuales}
        positive={
          summaryInsights.annualizedReturnPct !== null && summaryInsights.annualizedReturnPct > 0
        }
        tooltip={
          <FormulaTooltip
            label={withInflation ? labels.realAnnualReturn : labels.annualReturn}
            intro={
              activeInflationRatePct > 0
                ? copy.saldoRealSignificaElValorDeTodaTu
                : copy.saldoSignificaElValorDeTodaTu
            }
            example={
              summaryInsights.annualizedReturnPct === null
                ? undefined
                : copy.annualExample(
                    formatAbbreviatedValue(initial, "currency"),
                    formatAbbreviatedValue(summaryInsights.monthlyContributionTotal, "currency"),
                    formatAbbreviatedValue(totalAtHorizon, "currency"),
                    formatAbbreviatedValue(summaryInsights.annualizedReturnPct, "percent"),
                    withInflation,
                  )
            }
            trigger={<Calculator className="icon-sm" aria-hidden="true" />}
          >
            <ol className="formula-tooltip-copy">
              {summaryInsights.monthlyReturnPct === null ? (
                <FormulaStep>
                  <span className="formula-step-description">
                    {totalYears === 0
                      ? copy.hoyNoHanTranscurridoMesesParaCalcular
                      : copy.noRateAvailable}
                  </span>
                </FormulaStep>
              ) : (
                <>
                  <FormulaStep>
                    <span className="formula-step-description">
                      {copy.expresaElHorizonteEnMesesCadaAno}
                    </span>
                    <FormulaMath
                      label={copy.mesesDeProyeccionIgualAPlazoTotal}
                      tex={`${texText(copy.meses)} = ${texText(labels.totalHorizon)} \\times 12`}
                    />
                    <FormulaMath
                      label={copy.sustitucionDelPlazoEnAnos}
                      className="formula-math-substitution"
                      tex={`${totalYears} \\times 12`}
                    />
                    <FormulaResult
                      name={labels.projectionMonths}
                      value={formatMonths(returnMonthCount)}
                    />
                  </FormulaStep>
                  <FormulaStep>
                    <span className="formula-step-description">
                      {activeInflationRatePct > 0
                        ? copy.realContributionStep
                        : copy.alFinalDeCadaMesPrimeroSe}
                    </span>
                    <FormulaMath
                      label={copy.reglaDelSaldoMensual}
                      tex={
                        activeInflationRatePct > 0
                          ? `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)} / (1 + ${texText("inflación anual")})^{m/12}`
                          : `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)}`
                      }
                    />
                  </FormulaStep>
                  <FormulaStep>
                    <span className="formula-step-description">
                      {copy.laAppPruebaYAjustaLaTasa}
                      {returnMonthCount} {copy.mesesElSaldoCoincideConElValor}
                    </span>
                    <FormulaResult
                      name={labels.monthlyRate}
                      value={monthlyReturnDisplay ?? "0,00%"}
                    />
                  </FormulaStep>
                  <FormulaStep>
                    <span className="formula-step-description">
                      {copy.sigueElValorDeLaCarteraCada}
                    </span>
                    <MonthlyBalanceExamples
                      initialBalance={initial}
                      monthlyRate={summaryMonthlyRate}
                      monthlyRateDisplay={monthlyReturnDisplay ?? "0,00%"}
                      monthlyContribution={summaryInsights.monthlyContributionTotal}
                      inflationRatePct={activeInflationRatePct}
                      months={returnMonthCount}
                      finalLabel={projectedLabel}
                      finalValue={totalAtHorizon}
                    />
                  </FormulaStep>
                  <FormulaStep>
                    <span className="formula-step-description">
                      {copy.convierteEsaTasaMensualEnUnaTasa}
                    </span>
                    <FormulaMath
                      label={copy.formulaDeTasaAnualEquivalente}
                      tex={`(1 + ${texText(labels.monthlyRate)})^{12} - 1`}
                    />
                    <FormulaMath
                      label={copy.sustitucionDeTasaAnualEquivalente}
                      className="formula-math-substitution"
                      tex={`(1 + ${texText(monthlyReturnDisplay ?? "0,00%")})^{12} - 1`}
                    />
                    <FormulaResult
                      name={withInflation ? labels.realAnnualReturn : labels.annualReturn}
                      value={formatAbbreviatedValue(
                        summaryInsights.annualizedReturnPct ?? 0,
                        "percent",
                      )}
                    />
                  </FormulaStep>
                </>
              )}
            </ol>
          </FormulaTooltip>
        }
      />
      <Metric
        icon={<Trophy className="icon-sm" />}
        label={labels.leadingGrowth}
        value={
          summaryInsights.leadingGrowthInvestment ? (
            <AbbreviatedMoney value={summaryInsights.leadingGrowthInvestment.growth} />
          ) : (
            "—"
          )
        }
        note={
          summaryInsights.leadingGrowthInvestment?.investment.name ??
          copy.sinCrecimientoPositivoEnEstePlazo
        }
        positive={Boolean(summaryInsights.leadingGrowthInvestment)}
        tooltip={
          <LeadingGrowthFormulaTooltip
            projections={investmentProjections}
            leader={summaryInsights.leadingGrowthInvestment}
          />
        }
      />
    </section>
  );
}
