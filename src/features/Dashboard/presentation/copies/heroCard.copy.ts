import { t } from "@/libraries/i18n";
import { FINANCIAL_TERM_VALUES } from "@/features/Dashboard/domain/enums/financialTerm.enum";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
export const heroCardCopy = {
  balances: t("dashboard.heroCard.copy.balances.p1"),
  results: t("dashboard.heroCard.copy.results.p1"),
  returnLabel: t("dashboard.heroCard.copy.returnLabel.p1"),
  nominalValue: labels.projectedValueNominal,
  realValue: FINANCIAL_TERM_VALUES.PURCHASING_POWER,
  comparisonValues: t("dashboard.heroCard.copy.comparisonValues.p1"),
  comparisonInfoTitle: t("dashboard.heroCard.copy.comparisonInfoTitle.p1"),
  comparisonInfoTrigger: t("dashboard.heroCard.copy.comparisonInfoTrigger.p1"),
  comparisonInfoIntro: t("dashboard.heroCard.copy.comparisonInfoIntro.p1"),
  contributionComparison: t("dashboard.heroCard.copy.contributionComparison.p1"),
  contributions: t("dashboard.heroCard.copy.contributions.p1"),
  contributionsInfoTitle: t("dashboard.heroCard.copy.contributionsInfoTitle.p1"),
  contributionsInfoTrigger: t("dashboard.heroCard.copy.contributionsInfoTrigger.p1"),
  contributionsInfoIntro: t("dashboard.heroCard.copy.contributionsInfoIntro.p1"),
  contributionsInfoExplanation: t("dashboard.heroCard.copy.contributionsInfoExplanation.p1"),
  balanceComparisonExample: (nominal: string, real: string) =>
    t("dashboard.heroCard.copy.balanceComparisonExample.p1") +
    nominal +
    t("dashboard.heroCard.copy.balanceComparisonExample.p2") +
    real +
    t("dashboard.heroCard.copy.balanceComparisonExample.p3"),
  contributionsComparisonExample: (nominal: string, real: string) =>
    t("dashboard.heroCard.copy.contributionsComparisonExample.p1") +
    nominal +
    t("dashboard.heroCard.copy.contributionsComparisonExample.p2") +
    real +
    t("dashboard.heroCard.copy.contributionsComparisonExample.p3"),
  nominalContributions: t("dashboard.heroCard.copy.nominalContributions.p1"),
  nominalContributionsShort: t("dashboard.heroCard.copy.nominalContributionsShort.p1"),
  realContributionsShort: t("dashboard.heroCard.copy.realContributionsShort.p1"),
  desgloseDeLaProyeccion: t("dashboard.heroCard.copy.desgloseDeLaProyeccion.p1"),
  esLaDiferenciaEntreElValorFinal: t("dashboard.heroCard.copy.esLaDiferenciaEntreElValorFinal.p1"),
  growthExample: (final: string, current: string, contributions: string, result: string) =>
    t("dashboard.heroCard.copy.growthExample.p1") +
    final +
    t("dashboard.heroCard.copy.growthExample.p2") +
    current +
    t("dashboard.heroCard.copy.growthExample.p3") +
    contributions +
    t("dashboard.heroCard.copy.growthExample.p4") +
    result +
    t("dashboard.heroCard.copy.growthExample.p5"),
  growthPercentExample: (result: string, current: string, percent: string) =>
    t("dashboard.heroCard.copy.growthPercentExample.p1") +
    result +
    t("dashboard.heroCard.copy.growthPercentExample.p2") +
    current +
    t("dashboard.heroCard.copy.growthPercentExample.p3") +
    percent +
    t("dashboard.heroCard.copy.growthPercentExample.p4"),
  separaElDineroQuePusisteDelValor: t(
    "dashboard.heroCard.copy.separaElDineroQuePusisteDelValor.p1",
  ),
  valorProyectadoMenosCapitalActualYAportes:
    t("dashboard.heroCard.copy.valorProyectadoMenosCapitalActualYAportes.p1") +
    labels.projectedValue +
    t("dashboard.heroCard.copy.valorProyectadoMenosCapitalActualYAportes.p2") +
    labels.currentCapital +
    t("dashboard.heroCard.copy.valorProyectadoMenosCapitalActualYAportes.p3"),
  restaElCapitalActualYTodosLos: t("dashboard.heroCard.copy.restaElCapitalActualYTodosLos.p1"),
  sustitucionDeValoresDelCrecimiento: t(
    "dashboard.heroCard.copy.sustitucionDeValoresDelCrecimiento.p1",
  ),
  mideElCrecimientoFrenteAlCapitalQue: t(
    "dashboard.heroCard.copy.mideElCrecimientoFrenteAlCapitalQue.p1",
  ),
  usaElCapitalActualComoReferenciaNo: t(
    "dashboard.heroCard.copy.usaElCapitalActualComoReferenciaNo.p1",
  ),
  crecimientoDivididoParaCapitalActualPor100:
    t("dashboard.heroCard.copy.crecimientoDivididoParaCapitalActualPor100.p1") +
    labels.growth +
    t("dashboard.heroCard.copy.crecimientoDivididoParaCapitalActualPor100.p2") +
    labels.currentCapital +
    t("dashboard.heroCard.copy.crecimientoDivididoParaCapitalActualPor100.p3"),
  sustituyeLosImportesYExpresaLaComparacion: t(
    "dashboard.heroCard.copy.sustituyeLosImportesYExpresaLaComparacion.p1",
  ),
  sustitucionDeValoresDelCrecimientoPorcentual: t(
    "dashboard.heroCard.copy.sustitucionDeValoresDelCrecimientoPorcentual.p1",
  ),
  anos: t("dashboard.heroCard.copy.anos.p1"),
  plazoTotalAnos: t("dashboard.heroCard.copy.plazoTotalAnos.p1"),
  noCurrentCapital: t("dashboard.heroCard.copy.noCurrentCapital.p1"),
} as const;
