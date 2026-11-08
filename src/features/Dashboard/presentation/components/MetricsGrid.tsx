import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { projectedBalanceLabel } from "@/features/Dashboard/domain/utils/projectedBalanceLabel.util";
import { signedOutcomeLabel } from "@/features/Dashboard/domain/utils/signedOutcomeLabel.util";
import { formatMonths } from "@/features/Dashboard/domain/utils/formatMonths.util";
import { metricsGridCopy } from "@/features/Dashboard/presentation/copies/metricsGrid.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { ArrowDownToLine } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { Calculator } from "lucide-react";
import { Trophy } from "lucide-react";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/features/Dashboard/presentation/components/money/AbbreviatedValue";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { MonthlyBalanceExamples } from "@/features/Dashboard/presentation/components/MonthlyBalanceExamples";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";
import { LeadingGrowthFormulaTooltip } from "@/features/Dashboard/presentation/components/LeadingGrowthFormulaTooltip";
import { Metric } from "@/features/Dashboard/presentation/components/Metric";

// --- Components ---

export function MetricsGrid({ model }: { model: LoadedDashboardModel }) {
  // --- Variables ---

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

  // --- Return ---

  return (
    <section className="metrics-grid" aria-label={metricsGridCopy.indicadoresDeCartera}>
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
        note={metricsGridCopy.gananciaAcumuladaSobreInvertido(totalYears)}
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
            intro={metricsGridCopy.comparaElCrecimientoOLaPerdidaCon}
            example={
              summaryInsights.gainPctOfInvested === null
                ? undefined
                : metricsGridCopy.investedExample(
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
                  {metricsGridCopy.primeroSumaTodoElDineroQueHabras}
                </span>
                <FormulaMath
                  label={metricsGridCopy.totalInvertidoIgualACapitalActualMas}
                  tex={`${texText(labels.totalInvested)} = ${texText(labels.currentCapital)} + ${texText(labels.plannedContributions)}`}
                />
                <FormulaMath
                  label={metricsGridCopy.sustitucionDelTotalInvertido}
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
                    ? metricsGridCopy.noInvestedCapital
                    : metricsGridCopy.comparaElCrecimientoConEseTotalY}
                </span>
                <FormulaMath
                  label={metricsGridCopy.crecimientoDivididoParaTotalInvertidoPorCien}
                  tex={`\\frac{${texText(labels.growth)}}{${texText(labels.totalInvested)}} \\times 100`}
                />
                {summaryInsights.gainPctOfInvested !== null && (
                  <FormulaMath
                    label={metricsGridCopy.sustitucionDeValoresDeLaGananciaSobre}
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
        note={metricsGridCopy.sumaDeAportesMensualesPorPosicion}
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
        note={
          totalYears === 0
            ? metricsGridCopy.noCalculableHoy
            : metricsGridCopy.anualizadoConAportesMensuales
        }
        positive={
          summaryInsights.annualizedReturnPct !== null && summaryInsights.annualizedReturnPct > 0
        }
        tooltip={
          <FormulaTooltip
            label={withInflation ? labels.realAnnualReturn : labels.annualReturn}
            intro={
              activeInflationRatePct > 0
                ? metricsGridCopy.saldoRealSignificaElValorDeTodaTu
                : metricsGridCopy.saldoSignificaElValorDeTodaTu
            }
            example={
              summaryInsights.annualizedReturnPct === null
                ? undefined
                : metricsGridCopy.annualExample(
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
                      ? metricsGridCopy.hoyNoHanTranscurridoMesesParaCalcular
                      : metricsGridCopy.noRateAvailable}
                  </span>
                </FormulaStep>
              ) : (
                <>
                  <FormulaStep>
                    <span className="formula-step-description">
                      {metricsGridCopy.expresaElHorizonteEnMesesCadaAno}
                    </span>
                    <FormulaMath
                      label={metricsGridCopy.mesesDeProyeccionIgualAPlazoTotal}
                      tex={`${texText(metricsGridCopy.meses)} = ${texText(labels.totalHorizon)} \\times 12`}
                    />
                    <FormulaMath
                      label={metricsGridCopy.sustitucionDelPlazoEnAnos}
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
                        ? metricsGridCopy.realContributionStep
                        : metricsGridCopy.alFinalDeCadaMesPrimeroSe}
                    </span>
                    <FormulaMath
                      label={metricsGridCopy.reglaDelSaldoMensual}
                      tex={
                        activeInflationRatePct > 0
                          ? `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)} / (1 + ${texText(labels.annualInflation)})^{m/12}`
                          : `${texText(labels.newBalance)} = ${texText(labels.previousBalance)} \\times (1 + ${texText(labels.monthlyRate)}) + ${texText(labels.monthlyContribution)}`
                      }
                    />
                  </FormulaStep>
                  <FormulaStep>
                    <span className="formula-step-description">
                      {metricsGridCopy.laAppPruebaYAjustaLaTasa}
                      {returnMonthCount} {metricsGridCopy.mesesElSaldoCoincideConElValor}
                    </span>
                    <FormulaResult
                      name={labels.monthlyRate}
                      value={monthlyReturnDisplay ?? "0,00%"}
                    />
                  </FormulaStep>
                  <FormulaStep>
                    <span className="formula-step-description">
                      {metricsGridCopy.sigueElValorDeLaCarteraCada}
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
                      {metricsGridCopy.convierteEsaTasaMensualEnUnaTasa}
                    </span>
                    <FormulaMath
                      label={metricsGridCopy.formulaDeTasaAnualEquivalente}
                      tex={`(1 + ${texText(labels.monthlyRate)})^{12} - 1`}
                    />
                    <FormulaMath
                      label={metricsGridCopy.sustitucionDeTasaAnualEquivalente}
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
          metricsGridCopy.sinCrecimientoPositivoEnEstePlazo
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
