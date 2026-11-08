import { t } from "@/libraries/i18n";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
export const projectedValueFormulaTooltipCopy = {
  positionsLabel: (projectedLabel: string) =>
    t("dashboard.projectedValueFormulaTooltip.dynamic.positionsLabel", { projectedLabel }),
  thisPosition: t("dashboard.projectedValueFormulaTooltip.copy.estaPosicion.p1"),
  positionExample: (
    current: string,
    contribution: string,
    years: number,
    final: string,
    real: boolean,
  ) =>
    t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p1") +
    current +
    t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p2") +
    contribution +
    t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p3") +
    years +
    t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p4") +
    (years === 1
      ? t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p5")
      : t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p6")) +
    t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p7") +
    final +
    t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p8") +
    (real
      ? t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p9")
      : t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p10")) +
    t("dashboard.projectedValueFormulaTooltip.copy.positionExample.p11"),
  partsExample: (parts: string, total: string) =>
    t("dashboard.projectedValueFormulaTooltip.copy.partsExample.p1") +
    parts +
    t("dashboard.projectedValueFormulaTooltip.copy.partsExample.p2") +
    total +
    t("dashboard.projectedValueFormulaTooltip.copy.partsExample.p3"),
  singlePositionInvestmentExplanation:
    t("dashboard.projectedValueFormulaTooltip.copy.singlePositionInvestmentExplanation.p1") +
    labels.projectedValue.toLowerCase() +
    t("dashboard.projectedValueFormulaTooltip.copy.singlePositionInvestmentExplanation.p2"),
  noOtherPositionsToAdd: t(
    "dashboard.projectedValueFormulaTooltip.copy.noHayOtrasPosicionesQueSumar.p1",
  ),
  investmentTotalCombinesPositionValues: t(
    "dashboard.projectedValueFormulaTooltip.copy.investmentTotalCombinesPositionValues.p1",
  ),
  sumProjectedValueForEachPosition: t(
    "dashboard.projectedValueFormulaTooltip.copy.sumaElValorProyectadoDeCadaPosicion.p1",
  ),
  useDisplayedAmountsForTotal: t(
    "dashboard.projectedValueFormulaTooltip.copy.sustituyeLosImportesMostradosElTotalUsa.p1",
  ),
  replaceEachPositionWithProjectedAmount: t(
    "dashboard.projectedValueFormulaTooltip.copy.sustituyeCadaPosicionPorSuImporteProyectado.p1",
  ),
  balanceMeansPositionValue: t(
    "dashboard.projectedValueFormulaTooltip.copy.saldoSignificaElValorDeEstaPosicion.p1",
  ),
  realBalanceMeansPositionValue:
    t("dashboard.projectedValueFormulaTooltip.copy.saldoRealSignificaElValorDeEstaPosicion.p1") +
    labels.projectedValueReal.toLowerCase() +
    t("dashboard.projectedValueFormulaTooltip.copy.saldoRealSignificaElValorDeEstaPosicion.p2"),
  findMonthlyRateAppliedOver: t(
    "dashboard.projectedValueFormulaTooltip.copy.buscaLaTasaMensualQueAplicadaDurante.p1",
  ),
  equivalentMonthlyRateFromAnnualRate:
    t("dashboard.projectedValueFormulaTooltip.copy.tasaMensualEquivalenteAPartirDeLa.p1") +
    labels.annualRate.toLowerCase() +
    t("dashboard.projectedValueFormulaTooltip.copy.tasaMensualEquivalenteAPartirDeLa.p2"),
  equivalentMonthlyRate: t("dashboard.projectedValueFormulaTooltip.copy.tasaMensualEquivalente.p1"),
  annualRateSubstitutionForMonthlyRate:
    t("dashboard.projectedValueFormulaTooltip.copy.sustitucionDeLaTasaAnualParaObtener.p1") +
    labels.annualRate.toLowerCase() +
    t("dashboard.projectedValueFormulaTooltip.copy.sustitucionDeLaTasaAnualParaObtener.p2"),
  convertHorizonToMonths: t(
    "dashboard.projectedValueFormulaTooltip.copy.convierteElPlazoEnMesesParaSaber.p1",
  ),
  projectionMonthsFromHorizon: t(
    "dashboard.projectedValueFormulaTooltip.copy.mesesDeProyeccionAPartirDelPlazo.p1",
  ),
  horizonToMonthsSubstitution: t(
    "dashboard.projectedValueFormulaTooltip.copy.sustitucionDelPlazoParaObtenerLosMeses.p1",
  ),
  realAnnualRate: labels.realAnnualRate,
  fisherSubstitution: t("dashboard.projectedValueFormulaTooltip.copy.fisherSubstitution.p1"),
  nominalContributionRule: t(
    "dashboard.projectedValueFormulaTooltip.copy.nominalContributionRule.p1",
  ),
  realContributionRule: t("dashboard.projectedValueFormulaTooltip.copy.realContributionRule.p1"),
  inflationAdjustedMonthlyContribution: t(
    "dashboard.projectedValueFormulaTooltip.copy.inflationAdjustedMonthlyContribution.p1",
  ),
  nominalMonthlyContribution: t(
    "dashboard.projectedValueFormulaTooltip.copy.nominalMonthlyContribution.p1",
  ),
  seeHowOneMonthChangesTheBalance: t(
    "dashboard.projectedValueFormulaTooltip.copy.miraComoElResultadoDeUnMes.p1",
  ),
} as const;
