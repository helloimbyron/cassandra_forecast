import { t } from "@/libraries/i18n";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
export const metricsGridCopy = {
  indicadoresDeCartera: t("dashboard.metricsGrid.copy.indicadoresDeCartera.p1"),
  comparaElCrecimientoOLaPerdidaCon: t(
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
  primeroSumaTodoElDineroQueHabras: t(
    "dashboard.metricsGrid.copy.primeroSumaTodoElDineroQueHabras.p1",
  ),
  totalInvertidoIgualACapitalActualMas:
    t("dashboard.metricsGrid.copy.totalInvertidoIgualACapitalActualMas.p1") +
    labels.totalInvested +
    t("dashboard.metricsGrid.copy.totalInvertidoIgualACapitalActualMas.p2") +
    labels.currentCapital +
    t("dashboard.metricsGrid.copy.totalInvertidoIgualACapitalActualMas.p3") +
    labels.plannedContributions +
    t("dashboard.metricsGrid.copy.totalInvertidoIgualACapitalActualMas.p4"),
  sustitucionDelTotalInvertido: t("dashboard.metricsGrid.copy.sustitucionDelTotalInvertido.p1"),
  comparaElCrecimientoConEseTotalY: t(
    "dashboard.metricsGrid.copy.comparaElCrecimientoConEseTotalY.p1",
  ),
  crecimientoDivididoParaTotalInvertidoPorCien:
    t("dashboard.metricsGrid.copy.crecimientoDivididoParaTotalInvertidoPorCien.p1") +
    labels.growth +
    t("dashboard.metricsGrid.copy.crecimientoDivididoParaTotalInvertidoPorCien.p2") +
    labels.totalInvested +
    t("dashboard.metricsGrid.copy.crecimientoDivididoParaTotalInvertidoPorCien.p3"),
  sustitucionDeValoresDeLaGananciaSobre:
    t("dashboard.metricsGrid.copy.sustitucionDeValoresDeLaGananciaSobre.p1") +
    labels.returnOnInvestment.toLowerCase() +
    t("dashboard.metricsGrid.copy.sustitucionDeValoresDeLaGananciaSobre.p2"),
  sumaDeAportesMensualesPorPosicion: t(
    "dashboard.metricsGrid.copy.sumaDeAportesMensualesPorPosicion.p1",
  ),
  noCalculableHoy: t("dashboard.metricsGrid.copy.noCalculableHoy.p1"),
  anualizadoConAportesMensuales: t("dashboard.metricsGrid.copy.anualizadoConAportesMensuales.p1"),
  gananciaAcumuladaSobreInvertido: (years: number) =>
    years === 0
      ? t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p1")
      : t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p2") +
        years +
        t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p3") +
        (years === 1
          ? t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p4")
          : t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p5")) +
        t("dashboard.metricsGrid.copy.gananciaAcumuladaSobreInvertido.p6"),
  saldoSignificaElValorDeTodaTu: t("dashboard.metricsGrid.copy.saldoSignificaElValorDeTodaTu.p1"),
  saldoRealSignificaElValorDeTodaTu: t(
    "dashboard.metricsGrid.copy.saldoRealSignificaElValorDeTodaTu.p1",
  ),
  hoyNoHanTranscurridoMesesParaCalcular: t(
    "dashboard.metricsGrid.copy.hoyNoHanTranscurridoMesesParaCalcular.p1",
  ),
  expresaElHorizonteEnMesesCadaAno: t(
    "dashboard.metricsGrid.copy.expresaElHorizonteEnMesesCadaAno.p1",
  ),
  mesesDeProyeccionIgualAPlazoTotal:
    t("dashboard.metricsGrid.copy.mesesDeProyeccionIgualAPlazoTotal.p1") +
    labels.horizon +
    t("dashboard.metricsGrid.copy.mesesDeProyeccionIgualAPlazoTotal.p2"),
  meses: t("dashboard.metricsGrid.copy.meses.p1"),
  sustitucionDelPlazoEnAnos: t("dashboard.metricsGrid.copy.sustitucionDelPlazoEnAnos.p1"),
  alFinalDeCadaMesPrimeroSe: t("dashboard.metricsGrid.copy.alFinalDeCadaMesPrimeroSe.p1"),
  realContributionStep: t("dashboard.metricsGrid.copy.realContributionStep.p1"),
  reglaDelSaldoMensual: t("dashboard.metricsGrid.copy.reglaDelSaldoMensual.p1"),
  laAppPruebaYAjustaLaTasa: t("dashboard.metricsGrid.copy.laAppPruebaYAjustaLaTasa.p1"),
  mesesElSaldoCoincideConElValor:
    t("dashboard.metricsGrid.copy.mesesElSaldoCoincideConElValor.p1") +
    labels.projectedValue.toLowerCase() +
    t("dashboard.metricsGrid.copy.mesesElSaldoCoincideConElValor.p2"),
  sigueElValorDeLaCarteraCada: t("dashboard.metricsGrid.copy.sigueElValorDeLaCarteraCada.p1"),
  convierteEsaTasaMensualEnUnaTasa: t(
    "dashboard.metricsGrid.copy.convierteEsaTasaMensualEnUnaTasa.p1",
  ),
  formulaDeTasaAnualEquivalente:
    t("dashboard.metricsGrid.copy.formulaDeTasaAnualEquivalente.p1") +
    labels.annualReturn +
    t("dashboard.metricsGrid.copy.formulaDeTasaAnualEquivalente.p2"),
  sustitucionDeTasaAnualEquivalente:
    t("dashboard.metricsGrid.copy.sustitucionDeTasaAnualEquivalente.p1") +
    labels.annualReturn +
    t("dashboard.metricsGrid.copy.sustitucionDeTasaAnualEquivalente.p2"),
  sinCrecimientoPositivoEnEstePlazo: t(
    "dashboard.metricsGrid.copy.sinCrecimientoPositivoEnEstePlazo.p1",
  ),
  noInvestedCapital: t("dashboard.metricsGrid.copy.noInvestedCapital.p1"),
  noRateAvailable: t("dashboard.metricsGrid.copy.noRateAvailable.p1"),
} as const;
