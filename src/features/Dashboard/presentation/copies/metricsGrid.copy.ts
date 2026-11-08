import { t } from "@/libraries/i18n";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
export const metricsGridCopy = {
  portfolioMetrics: t("dashboard.metricsGrid.copy.indicadoresDeCartera.p1"),
  comparesGrowthOrLossToInvested: t(
    "dashboard.metricsGrid.copy.comparaElCrecimientoOLaPerdidaCon.p1",
  ),
  investedExample: (
    current: string,
    contributions: string,
    total: string,
    change: string,
    percent: string,
  ) =>
    t("dashboard.metricsGrid.copy.investedExample.p1") +
    current +
    t("dashboard.metricsGrid.copy.investedExample.p2") +
    contributions +
    t("dashboard.metricsGrid.copy.investedExample.p3") +
    total +
    t("dashboard.metricsGrid.copy.investedExample.p4") +
    change +
    t("dashboard.metricsGrid.copy.investedExample.p5") +
    percent +
    t("dashboard.metricsGrid.copy.investedExample.p6"),
  annualExample: (
    current: string,
    monthly: string,
    final: string,
    percent: string,
    real: boolean,
  ) =>
    t("dashboard.metricsGrid.copy.annualExample.p1") +
    current +
    t("dashboard.metricsGrid.copy.annualExample.p2") +
    monthly +
    t("dashboard.metricsGrid.copy.annualExample.p3") +
    (real
      ? t("dashboard.metricsGrid.copy.annualExample.p4")
      : t("dashboard.metricsGrid.copy.annualExample.p5")) +
    t("dashboard.metricsGrid.copy.annualExample.p6") +
    final +
    t("dashboard.metricsGrid.copy.annualExample.p7") +
    percent +
    t("dashboard.metricsGrid.copy.annualExample.p8") +
    (real
      ? t("dashboard.metricsGrid.copy.annualExample.p9")
      : t("dashboard.metricsGrid.copy.annualExample.p10")) +
    t("dashboard.metricsGrid.copy.annualExample.p11"),
  firstAddAllContributions: t("dashboard.metricsGrid.copy.primeroSumaTodoElDineroQueHabras.p1"),
  totalInvestedFormula:
    t("dashboard.metricsGrid.copy.totalInvertidoIgualACapitalActualMas.p1") +
    labels.totalInvested +
    t("dashboard.metricsGrid.copy.totalInvertidoIgualACapitalActualMas.p2") +
    labels.currentCapital +
    t("dashboard.metricsGrid.copy.totalInvertidoIgualACapitalActualMas.p3") +
    labels.plannedContributions +
    t("dashboard.metricsGrid.copy.totalInvertidoIgualACapitalActualMas.p4"),
  totalInvestedSubstitution: t("dashboard.metricsGrid.copy.sustitucionDelTotalInvertido.p1"),
  comparesGrowthToTotalInvested: t(
    "dashboard.metricsGrid.copy.comparaElCrecimientoConEseTotalY.p1",
  ),
  growthAsPercentOfTotalInvested:
    t("dashboard.metricsGrid.copy.crecimientoDivididoParaTotalInvertidoPorCien.p1") +
    labels.growth +
    t("dashboard.metricsGrid.copy.crecimientoDivididoParaTotalInvertidoPorCien.p2") +
    labels.totalInvested +
    t("dashboard.metricsGrid.copy.crecimientoDivididoParaTotalInvertidoPorCien.p3"),
  returnOnInvestmentValueSubstitution:
    t("dashboard.metricsGrid.copy.sustitucionDeValoresDeLaGananciaSobre.p1") +
    labels.returnOnInvestment.toLowerCase() +
    t("dashboard.metricsGrid.copy.sustitucionDeValoresDeLaGananciaSobre.p2"),
  monthlyContributionsByPosition: t(
    "dashboard.metricsGrid.copy.sumaDeAportesMensualesPorPosicion.p1",
  ),
  notCalculableYet: t("dashboard.metricsGrid.copy.noCalculableHoy.p1"),
  annualizedWithMonthlyContributions: t(
    "dashboard.metricsGrid.copy.anualizadoConAportesMensuales.p1",
  ),
  cumulativeGainOnInvested: (years: number) =>
    years === 0
      ? t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p1")
      : t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p2") +
        years +
        t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p3") +
        (years === 1
          ? t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p4")
          : t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p5")) +
        t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p6"),
  balanceMeansTotalPortfolioValue: t("dashboard.metricsGrid.copy.saldoSignificaElValorDeTodaTu.p1"),
  realBalanceMeansTotalPortfolioValue: t(
    "dashboard.metricsGrid.copy.saldoRealSignificaElValorDeTodaTu.p1",
  ),
  notEnoughMonthsToCalculateYet: t(
    "dashboard.metricsGrid.copy.hoyNoHanTranscurridoMesesParaCalcular.p1",
  ),
  expressHorizonInMonthsPerYear: t(
    "dashboard.metricsGrid.copy.expresaElHorizonteEnMesesCadaAno.p1",
  ),
  projectionMonthsEqualTotalHorizon:
    t("dashboard.metricsGrid.copy.mesesDeProyeccionIgualAPlazoTotal.p1") +
    labels.horizon +
    t("dashboard.metricsGrid.copy.mesesDeProyeccionIgualAPlazoTotal.p2"),
  months: t("dashboard.metricsGrid.copy.meses.p1"),
  horizonYearsSubstitution: t("dashboard.metricsGrid.copy.sustitucionDelPlazoEnAnos.p1"),
  monthlyGrowthBeforeContributionStep: t("dashboard.metricsGrid.copy.alFinalDeCadaMesPrimeroSe.p1"),
  realContributionStep: t("dashboard.metricsGrid.copy.realContributionStep.p1"),
  monthlyBalanceRule: t("dashboard.metricsGrid.copy.reglaDelSaldoMensual.p1"),
  appTestsAndAdjustsRate: t("dashboard.metricsGrid.copy.laAppPruebaYAjustaLaTasa.p1"),
  monthsUntilBalanceMatchesValue:
    t("dashboard.metricsGrid.copy.mesesElSaldoCoincideConElValor.p1") +
    labels.projectedValue.toLowerCase() +
    t("dashboard.metricsGrid.copy.mesesElSaldoCoincideConElValor.p2"),
  tracksPortfolioValueEvery: t("dashboard.metricsGrid.copy.sigueElValorDeLaCarteraCada.p1"),
  convertsMonthlyRateToAnnualRate: t(
    "dashboard.metricsGrid.copy.convierteEsaTasaMensualEnUnaTasa.p1",
  ),
  equivalentAnnualRateFormula:
    t("dashboard.metricsGrid.copy.formulaDeTasaAnualEquivalente.p1") +
    labels.annualReturn +
    t("dashboard.metricsGrid.copy.formulaDeTasaAnualEquivalente.p2"),
  equivalentAnnualRateSubstitution:
    t("dashboard.metricsGrid.copy.sustitucionDeTasaAnualEquivalente.p1") +
    labels.annualReturn +
    t("dashboard.metricsGrid.copy.sustitucionDeTasaAnualEquivalente.p2"),
  noPositiveGrowthWithinHorizon: t(
    "dashboard.metricsGrid.copy.sinCrecimientoPositivoEnEstePlazo.p1",
  ),
  noInvestedCapital: t("dashboard.metricsGrid.copy.noInvestedCapital.p1"),
  noRateAvailable: t("dashboard.metricsGrid.copy.noRateAvailable.p1"),
} as const;
