import { t } from "@/libraries/i18n";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
// --- Constants ---
const withdrawalRateLabel = t("dashboard.distributionSection.labels.withdrawalRate");
const annualWithdrawalLabel = t("dashboard.distributionSection.labels.annualWithdrawal");
const durationLabel = t("dashboard.distributionSection.labels.duration");
export const distributionSectionCopy = {
  title: t("dashboard.distributionSection.copy.title.p1"),
  additionalDepletionMonthsUnit: t(
    "dashboard.distributionSection.labels.additionalDepletionMonthsUnit",
  ),
  chartTitle: (adjusted: boolean) =>
    adjusted
      ? t("dashboard.distributionSection.copy.chartTitle.p1")
      : t("dashboard.distributionSection.copy.chartTitle.p2"),
  chartDescription: (adjusted: boolean) =>
    adjusted
      ? t("dashboard.distributionSection.copy.chartDescription.p1")
      : t("dashboard.distributionSection.copy.chartDescription.p2"),
  insightsAriaLabel: t("dashboard.distributionSection.copy.insightsAriaLabel.p1"),
  balance: t("dashboard.distributionSection.copy.balance.p1"),
  year: (year: number) =>
    year === 0
      ? t("dashboard.distributionSection.copy.year.p1")
      : t("dashboard.distributionSection.copy.year.p2") +
        year +
        t("dashboard.distributionSection.copy.year.p3"),
  yearCount: (count: number) => t("dashboard.distributionSection.copy.yearCount", { count }),
  controls: t("dashboard.distributionSection.copy.controls.p1"),
  horizon: t("dashboard.distributionSection.copy.horizon.p1"),
  withdrawal: t("dashboard.distributionSection.copy.withdrawal.p1"),
  withdrawalMode: t("dashboard.distributionSection.copy.withdrawalMode.p1"),
  monthlyMode: t("dashboard.distributionSection.copy.monthlyMode.p1"),
  percentageMode: withdrawalRateLabel,
  assumptionAriaLabel: t("dashboard.distributionSection.copy.assumptionAriaLabel.p1"),
  annualReturn: labels.annualRate,
  realAnnualReturn: labels.realAnnualRate,
  realMonthlyWithdrawal: t("dashboard.distributionSection.copy.realMonthlyWithdrawal.p1"),
  zeroYears: t("dashboard.distributionSection.copy.zeroYears.p1"),
  fortyYears: t("dashboard.distributionSection.copy.fortyYears.p1"),
  noCalculatedReturn: t("dashboard.distributionSection.copy.noCalculatedReturn.p1"),
  assumption: t("dashboard.distributionSection.copy.assumption.p1"),
  realWithdrawalNominalEquivalent: (amount: string, years: number) =>
    t("dashboard.distributionSection.copy.realWithdrawalNominalEquivalent.p1") +
    years +
    t("dashboard.distributionSection.copy.realWithdrawalNominalEquivalent.p2") +
    (years === 1
      ? t("dashboard.distributionSection.copy.realWithdrawalNominalEquivalent.p3")
      : t("dashboard.distributionSection.copy.realWithdrawalNominalEquivalent.p4")) +
    t("dashboard.distributionSection.copy.realWithdrawalNominalEquivalent.p5") +
    amount +
    t("dashboard.distributionSection.copy.realWithdrawalNominalEquivalent.p6"),
  realAssumption: t("dashboard.distributionSection.copy.realAssumption.p1"),
  portfolioReturnExplanation: (rate: string, years: number, adjusted: boolean) =>
    t("dashboard.distributionSection.copy.portfolioReturnExplanation.p1") +
    rate +
    t("dashboard.distributionSection.copy.portfolioReturnExplanation.p2") +
    years +
    t("dashboard.distributionSection.copy.portfolioReturnExplanation.p3") +
    (years === 1
      ? t("dashboard.distributionSection.copy.portfolioReturnExplanation.p4")
      : t("dashboard.distributionSection.copy.portfolioReturnExplanation.p5")) +
    t("dashboard.distributionSection.copy.portfolioReturnExplanation.p6") +
    (adjusted
      ? t("dashboard.distributionSection.copy.portfolioReturnExplanation.p7")
      : t("dashboard.distributionSection.copy.portfolioReturnExplanation.p8")) +
    t("dashboard.distributionSection.copy.portfolioReturnExplanation.p9"),
  manualReturnExplanation: (rate: string) =>
    t("dashboard.distributionSection.copy.manualReturnExplanation.p1") +
    rate +
    t("dashboard.distributionSection.copy.manualReturnExplanation.p2"),
  annualWithdrawal: annualWithdrawalLabel,
  annualRate: withdrawalRateLabel,
  equivalentMonthlyWithdrawal: t(
    "dashboard.distributionSection.copy.equivalentMonthlyWithdrawal.p1",
  ),
  equivalentMonthlyNote: t("dashboard.distributionSection.copy.equivalentMonthlyNote.p1"),
  endingBalance: t("dashboard.distributionSection.copy.endingBalance.p1"),
  duration: durationLabel,
  planned: t("dashboard.distributionSection.copy.planned.p1"),
  percentNote: t("dashboard.distributionSection.copy.percentNote.p1"),
  endingNote: (years: number) =>
    years === 0
      ? t("dashboard.distributionSection.copy.endingNote.p1")
      : t("dashboard.distributionSection.copy.endingNote.p2") +
        years +
        t("dashboard.distributionSection.copy.endingNote.p3") +
        (years === 1
          ? t("dashboard.distributionSection.copy.endingNote.p4")
          : t("dashboard.distributionSection.copy.endingNote.p5")) +
        t("dashboard.distributionSection.copy.endingNote.p6"),
  depletedAtStart: t("dashboard.distributionSection.copy.depletedAtStart.p1"),
  noCapital: t("dashboard.distributionSection.copy.noCapital.p1"),
  noHorizon: t("dashboard.distributionSection.copy.noHorizon.p1"),
  lastsFullHorizon: (years: number) =>
    t("dashboard.distributionSection.copy.lastsFullHorizon.p1") +
    years +
    t("dashboard.distributionSection.copy.lastsFullHorizon.p2") +
    (years === 1
      ? t("dashboard.distributionSection.copy.lastsFullHorizon.p3")
      : t("dashboard.distributionSection.copy.lastsFullHorizon.p4")) +
    t("dashboard.distributionSection.copy.lastsFullHorizon.p5"),
  lastsAtLeast: (years: number) =>
    t("dashboard.distributionSection.copy.lastsAtLeast.p1") +
    years +
    t("dashboard.distributionSection.copy.lastsAtLeast.p2") +
    (years === 1
      ? t("dashboard.distributionSection.copy.lastsAtLeast.p3")
      : t("dashboard.distributionSection.copy.lastsAtLeast.p4")) +
    t("dashboard.distributionSection.copy.lastsAtLeast.p5"),
  surplusDuration: (duration: string) =>
    t("dashboard.distributionSection.copy.surplusDuration.p1") +
    duration +
    t("dashboard.distributionSection.copy.surplusDuration.p2"),
  surplusNote: (years: number) =>
    t("dashboard.distributionSection.copy.surplusNote.p1") +
    years +
    t("dashboard.distributionSection.copy.surplusNote.p2") +
    (years === 1
      ? t("dashboard.distributionSection.copy.surplusNote.p3")
      : t("dashboard.distributionSection.copy.surplusNote.p4")) +
    t("dashboard.distributionSection.copy.surplusNote.p5"),
  noAdditionalDepletion: t("dashboard.distributionSection.copy.noAdditionalDepletion.p1"),
  noAdditionalDepletionNote: t("dashboard.distributionSection.copy.noAdditionalDepletionNote.p1"),
  depletionDuration: (duration: string) =>
    t("dashboard.distributionSection.copy.depletionDuration.p1") +
    duration +
    t("dashboard.distributionSection.copy.depletionDuration.p2"),
  depletionAt: (years: number, months: number) => {
    if (years === 0) {
      return (
        t("dashboard.distributionSection.copy.depletionAt.p1") +
        months +
        t("dashboard.distributionSection.copy.depletionAt.p2") +
        (months === 1
          ? t("dashboard.distributionSection.copy.depletionAt.p3")
          : t("dashboard.distributionSection.copy.depletionAt.p4")) +
        t("dashboard.distributionSection.copy.depletionAt.p5")
      );
    }
    return months === 0
      ? t("dashboard.distributionSection.copy.depletionAt.p6") +
          years +
          t("dashboard.distributionSection.copy.depletionAt.p7") +
          (years === 1
            ? t("dashboard.distributionSection.copy.depletionAt.p8")
            : t("dashboard.distributionSection.copy.depletionAt.p9")) +
          t("dashboard.distributionSection.copy.depletionAt.p10")
      : t("dashboard.distributionSection.copy.depletionAt.p11") +
          years +
          t("dashboard.distributionSection.copy.depletionAt.p12") +
          (years === 1
            ? t("dashboard.distributionSection.copy.depletionAt.p13")
            : t("dashboard.distributionSection.copy.depletionAt.p14")) +
          t("dashboard.distributionSection.copy.depletionAt.p15") +
          months +
          t("dashboard.distributionSection.copy.depletionAt.p16") +
          (months === 1
            ? t("dashboard.distributionSection.copy.depletionAt.p17")
            : t("dashboard.distributionSection.copy.depletionAt.p18")) +
          t("dashboard.distributionSection.copy.depletionAt.p19");
  },
  depletedNote: t("dashboard.distributionSection.copy.depletedNote.p1"),
  annualFormulaIntro: t("dashboard.distributionSection.copy.annualFormulaIntro.p1"),
  annualExample: (monthly: string, annual: string) =>
    t("dashboard.distributionSection.copy.annualExample.p1") +
    monthly +
    t("dashboard.distributionSection.copy.annualExample.p2") +
    annual +
    t("dashboard.distributionSection.copy.annualExample.p3"),
  percentExample: (annual: string, initial: string, percent: string) =>
    t("dashboard.distributionSection.copy.percentExample.p1") +
    annual +
    t("dashboard.distributionSection.copy.percentExample.p2") +
    percent +
    t("dashboard.distributionSection.copy.percentExample.p3") +
    initial +
    t("dashboard.distributionSection.copy.percentExample.p4"),
  monthlyExample: (initial: string, percent: string, monthly: string) =>
    t("dashboard.distributionSection.copy.monthlyExample.p1") +
    initial +
    t("dashboard.distributionSection.copy.monthlyExample.p2") +
    percent +
    t("dashboard.distributionSection.copy.monthlyExample.p3") +
    monthly +
    t("dashboard.distributionSection.copy.monthlyExample.p4"),
  endingExample: (initial: string, withdrawal: string, years: number, final: string) =>
    t("dashboard.distributionSection.copy.endingExample.p1") +
    initial +
    t("dashboard.distributionSection.copy.endingExample.p2") +
    withdrawal +
    t("dashboard.distributionSection.copy.endingExample.p3") +
    years +
    t("dashboard.distributionSection.copy.endingExample.p4") +
    (years === 1
      ? t("dashboard.distributionSection.copy.endingExample.p5")
      : t("dashboard.distributionSection.copy.endingExample.p6")) +
    t("dashboard.distributionSection.copy.endingExample.p7") +
    final +
    t("dashboard.distributionSection.copy.endingExample.p8"),
  durationExample: (withdrawal: string, duration: string) =>
    t("dashboard.distributionSection.copy.durationExample.p1") +
    withdrawal +
    t("dashboard.distributionSection.copy.durationExample.p2") +
    duration +
    t("dashboard.distributionSection.copy.durationExample.p3"),
  percentFormulaIntro: t("dashboard.distributionSection.copy.percentFormulaIntro.p1"),
  endingFormulaIntro: t("dashboard.distributionSection.copy.endingFormulaIntro.p1"),
  durationFormulaIntro: t("dashboard.distributionSection.copy.durationFormulaIntro.p1"),
  annualFormulaStep: t("dashboard.distributionSection.copy.annualFormulaStep.p1"),
  percentFormulaStep:
    t("dashboard.distributionSection.copy.percentFormulaStep.p1") +
    labels.projectedValue.toLowerCase() +
    t("dashboard.distributionSection.copy.percentFormulaStep.p2"),
  equivalentMonthlyFormulaIntro: t(
    "dashboard.distributionSection.copy.equivalentMonthlyFormulaIntro.p1",
  ),
  equivalentMonthlyFormulaStep:
    t("dashboard.distributionSection.copy.equivalentMonthlyFormulaStep.p1") +
    labels.projectedValue.toLowerCase() +
    t("dashboard.distributionSection.copy.equivalentMonthlyFormulaStep.p2"),
  balanceFormulaStep:
    t("dashboard.distributionSection.copy.balanceFormulaStep.p1") +
    labels.annualRate.toLowerCase() +
    t("dashboard.distributionSection.copy.balanceFormulaStep.p2"),
  individualReturnsStep: t("dashboard.distributionSection.copy.individualReturnsStep.p1"),
  manualReturnStep: t("dashboard.distributionSection.copy.manualReturnStep.p1"),
  grownBalanceFormulaLabel: t("dashboard.distributionSection.copy.grownBalanceFormulaLabel.p1"),
  proRataWithdrawalFormulaLabel: t(
    "dashboard.distributionSection.copy.proRataWithdrawalFormulaLabel.p1",
  ),
  balanceAfterWithdrawalFormulaLabel: t(
    "dashboard.distributionSection.copy.balanceAfterWithdrawalFormulaLabel.p1",
  ),
  withdrawalSubstitutionLabel: t(
    "dashboard.distributionSection.copy.withdrawalSubstitutionLabel.p1",
  ),
  durationDepletedFormulaStep: t(
    "dashboard.distributionSection.copy.durationDepletedFormulaStep.p1",
  ),
  additionalDurationFormulaStep: t(
    "dashboard.distributionSection.copy.additionalDurationFormulaStep.p1",
  ),
  noAdditionalDepletionFormulaStep: t(
    "dashboard.distributionSection.copy.noAdditionalDepletionFormulaStep.p1",
  ),
  balanceAtSelectedHorizonLabel: t(
    "dashboard.distributionSection.copy.balanceAtSelectedHorizonLabel.p1",
  ),
  additionalDurationResultLabel: t(
    "dashboard.distributionSection.copy.additionalDurationResultLabel.p1",
  ),
  durationLastsFormulaStep: t("dashboard.distributionSection.copy.durationLastsFormulaStep.p1"),
  durationNoHorizonFormulaStep: t(
    "dashboard.distributionSection.copy.durationNoHorizonFormulaStep.p1",
  ),
  noCapitalForPercent:
    t("dashboard.distributionSection.copy.noCapitalForPercent.p1") +
    labels.projectedValue.toLowerCase() +
    t("dashboard.distributionSection.copy.noCapitalForPercent.p2"),
  yearsLabel: t("dashboard.distributionSection.copy.yearsLabel.p1"),
  annualWithdrawalLabel: t("dashboard.distributionSection.copy.annualWithdrawalLabel.p1"),
  initialTotalLabel: labels.projectedValue,
  annualRateLabel: labels.annualRate,
  monthlyRateLabel: t("dashboard.distributionSection.copy.monthlyRateLabel.p1"),
  balanceLabel: t("dashboard.distributionSection.copy.balanceLabel.p1"),
  depletionCalculationLabel: t("dashboard.distributionSection.copy.depletionCalculationLabel.p1"),
  monthlyWithdrawalLabel: t("dashboard.distributionSection.copy.monthlyWithdrawalLabel.p1"),
  annualWithdrawalRateLabel: withdrawalRateLabel,
  finalBalanceLabel: t("dashboard.distributionSection.copy.finalBalanceLabel.p1"),
  durationLabel,
} as const;
