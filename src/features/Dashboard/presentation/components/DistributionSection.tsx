import * as veFormulaStepStyles from "./FormulaStep.css.ts";
import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import * as veMoneyTooltipStyles from "./money/MoneyTooltip.css.ts";
import * as veRateNoteTooltipStyles from "./RateNoteTooltip.css.ts";
import * as veFormulaTooltipStyles from "./FormulaTooltip.css.ts";
import * as veFormulaMathStyles from "./FormulaMath.css.ts";
import * as veDistributionSectionStyles from "./DistributionSection.css.ts";
import { readChartVisualTokens } from "@/design-system/utils/readChartVisualTokens.util";
import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowDownToLine,
  Calculator,
  ChartNoAxesCombined,
  Clock3,
  Info,
  PiggyBank,
} from "lucide-react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { Card } from "@/libraries/shadcn/components/cards/Card";
import { CardContent } from "@/libraries/shadcn/components/cards/CardContent";
import { CardDescription } from "@/libraries/shadcn/components/cards/CardDescription";
import { CardHeader } from "@/libraries/shadcn/components/cards/CardHeader";
import { CardTitle } from "@/libraries/shadcn/components/cards/CardTitle";
import { Badge } from "@/libraries/shadcn/components/Badge";
import { NumericUnitInput } from "@/features/Dashboard/presentation/components/NumericUnitInput";
import { Label } from "@/libraries/shadcn/components/Label";
import { DebouncedSlider } from "@/libraries/cassandra/components/DebouncedSlider";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/features/Dashboard/presentation/components/money/AbbreviatedValue";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { formatNumericUnitValue } from "@/features/Dashboard/presentation/formatters/formatNumericUnitValue.util";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { estimateAdditionalPortfolioDepletionMonths } from "@/features/Dashboard/domain/utils/estimateAdditionalPortfolioDepletionMonths.util";
import { simulatePortfolioDistribution } from "@/features/Dashboard/domain/utils/simulatePortfolioDistribution.util";
import { annualRateForMonthlyWithdrawal } from "@/features/Dashboard/domain/utils/annualRateForMonthlyWithdrawal.util";
import { distributionAssetsWithReturn } from "@/features/Dashboard/domain/utils/distributionAssetsWithReturn.util";
import { monthlyWithdrawalForAnnualRate } from "@/features/Dashboard/domain/utils/monthlyWithdrawalForAnnualRate.util";
import { selectedDistributionAnnualReturnPct } from "@/features/Dashboard/domain/utils/selectedDistributionAnnualReturnPct.util";
import { withdrawalRateSliderMax } from "@/features/Dashboard/domain/utils/withdrawalRateSliderMax.util";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { distributionSectionCopy } from "@/features/Dashboard/presentation/copies/distributionSection.copy";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { adjacentStepValue } from "@/features/Dashboard/presentation/utils/adjacentStepValue.util";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";
import { Metric } from "@/features/Dashboard/presentation/components/Metric";
import { DistributionChart } from "@/features/Dashboard/presentation/components/DistributionChart";

// --- Constants ---

const {
  DEFAULT_HORIZON_YEARS,
  MAX_HORIZON_YEARS,
  MIN_HORIZON_YEARS,
  MONTHS_PER_YEAR,
  PERCENT_SCALE,
} = PORTFOLIO_CONSTANTS;

const DEFAULT_ANNUAL_WITHDRAWAL_RATE = 4;
const MAX_ANNUAL_WITHDRAWAL_RATE = 20;
const RATE_MIN = -20;
const RATE_MAX = 20;
const RATE_STEP = 0.1;
const WITHDRAWAL_SLIDER_STEP = 100;
const WITHDRAWAL_RATE_STEP = 0.1;
const DEFAULT_DISTRIBUTION_YEARS = DEFAULT_HORIZON_YEARS;

function formatDuration(months: number) {
  const years = Math.floor(months / MONTHS_PER_YEAR);
  const remainingMonths = months % MONTHS_PER_YEAR;

  return distributionSectionCopy.depletionAt(years, remainingMonths);
}

// --- Components ---

function RateFormula({
  annualReturnPct,
  label = distributionSectionCopy.annualRateLabel,
}: {
  annualReturnPct: number;
  label?: string;
}) {
  const monthlyRate = Math.pow(1 + annualReturnPct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR) - 1;

  return (
    <>
      <FormulaMath
        label={`${label}: ${distributionSectionCopy.monthlyRateLabel}`}
        tex={`${texText(distributionSectionCopy.monthlyRateLabel)} = (1 + ${texText(label)})^{1/12} - 1`}
      />
      <FormulaMath
        className={veFormulaMathStyles.formulaMathSubstitution}
        label={`${label}: ${distributionSectionCopy.monthlyRateLabel}`}
        tex={`(1 + ${texText(formatAbbreviatedValue(annualReturnPct, "percent", "precise"))})^{1/12} - 1`}
      />
      <FormulaResult
        name={`${label}: ${distributionSectionCopy.monthlyRateLabel}`}
        value={formatAbbreviatedValue(monthlyRate * PERCENT_SCALE, "percent", "precise")}
      />
    </>
  );
}

function DistributionAssumptionTooltip({ withInflation }: { withInflation: boolean }) {
  // --- States ---

  const [open, setOpen] = useState(false);

  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            className={[
              veFormulaTooltipStyles.formulaTooltipTrigger,
              veDistributionSectionStyles.distributionHeadingInfoTrigger,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={distributionSectionCopy.assumptionAriaLabel}
            onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "touch") {
                setOpen(true);
              }
            }}
          >
            <Info className="icon-sm" aria-hidden="true" />
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={veRateNoteTooltipStyles.rateNoteTooltipContent}
            side="top"
            sideOffset={6}
          >
            {withInflation
              ? distributionSectionCopy.realAssumption
              : distributionSectionCopy.assumption}
            <TooltipPrimitive.Arrow className={veMoneyTooltipStyles.moneyTooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

function DistributionLabelTooltip({ text, label }: { text: string; label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            className={[
              veFormulaTooltipStyles.formulaTooltipTrigger,
              veDistributionSectionStyles.distributionHeadingInfoTrigger,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={label}
            onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "touch") {
                setOpen(true);
              }
            }}
          >
            <Info className="icon-sm" aria-hidden="true" />
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={veRateNoteTooltipStyles.rateNoteTooltipContent}
            side="top"
            sideOffset={6}
          >
            {text}
            <TooltipPrimitive.Arrow className={veMoneyTooltipStyles.moneyTooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export function DistributionSection({ model }: { model: LoadedDashboardModel }) {
  const { t } = useTranslation();
  const chartVisual = readChartVisualTokens();
  const {
    totalAtHorizon,
    investmentProjections,
    withInflation,
    inflationRatePct,
    totalYears,
    summaryInsights,
  } = model;
  const modeKey = withInflation ? "real" : "nominal";
  const [years, setYears] = useState<number>(DEFAULT_DISTRIBUTION_YEARS);
  const [withdrawalMode, setWithdrawalMode] = useState<"monthly" | "percentage">("monthly");
  const [manualWithdrawalByMode, setManualWithdrawalByMode] = useState<
    Record<typeof modeKey, number | null>
  >({ nominal: null, real: null });
  const [manualWithdrawalRateByMode, setManualWithdrawalRateByMode] = useState<
    Record<typeof modeKey, number | null>
  >({ nominal: null, real: null });
  const [manualAnnualReturnByMode, setManualAnnualReturnByMode] = useState<
    Record<typeof modeKey, number | null>
  >({ nominal: null, real: null });
  const manualWithdrawal = manualWithdrawalByMode[modeKey];
  const manualWithdrawalRate = manualWithdrawalRateByMode[modeKey];
  const manualAnnualReturn = manualAnnualReturnByMode[modeKey];
  const setManualWithdrawal = (value: number | null) =>
    setManualWithdrawalByMode((current) => ({ ...current, [modeKey]: value }));
  const setManualWithdrawalRate = (value: number | null) =>
    setManualWithdrawalRateByMode((current) => ({ ...current, [modeKey]: value }));
  const setManualAnnualReturn = (value: number | null) =>
    setManualAnnualReturnByMode((current) => ({ ...current, [modeKey]: value }));
  const defaultWithdrawal = Number(
    ((totalAtHorizon * DEFAULT_ANNUAL_WITHDRAWAL_RATE) / PERCENT_SCALE / MONTHS_PER_YEAR).toFixed(
      2,
    ),
  );
  const nominalMonthlyWithdrawal = manualWithdrawal ?? defaultWithdrawal;
  const annualWithdrawalRatePct =
    manualWithdrawalRate ??
    annualRateForMonthlyWithdrawal(nominalMonthlyWithdrawal, totalAtHorizon);
  const monthlyWithdrawal =
    withdrawalMode === "percentage"
      ? monthlyWithdrawalForAnnualRate(annualWithdrawalRatePct, totalAtHorizon)
      : nominalMonthlyWithdrawal;
  const withdrawalInputLabel =
    withdrawalMode === "percentage"
      ? distributionSectionCopy.annualRate
      : withInflation
        ? distributionSectionCopy.realMonthlyWithdrawal
        : distributionSectionCopy.withdrawal;
  const portfolioAnnualizedReturnPct = summaryInsights.annualizedReturnPct;
  const annualReturnPct = selectedDistributionAnnualReturnPct(
    portfolioAnnualizedReturnPct,
    manualAnnualReturn,
  );
  const distributionAssets = distributionAssetsWithReturn(
    investmentProjections.map((projection) => ({ balance: projection.finalValue })),
    annualReturnPct,
  );
  const withdrawalStandardMax =
    (totalAtHorizon * MAX_ANNUAL_WITHDRAWAL_RATE) / PERCENT_SCALE / MONTHS_PER_YEAR;
  const withdrawalMax = Math.max(withdrawalStandardMax, monthlyWithdrawal, 0);
  const withdrawalSliderMax = Math.max(1, withdrawalMax);
  const withdrawalRateMax = withdrawalRateSliderMax(
    annualWithdrawalRatePct,
    MAX_ANNUAL_WITHDRAWAL_RATE,
    WITHDRAWAL_RATE_STEP,
  );
  const rateSliderMin = Math.floor(Math.min(RATE_MIN, annualReturnPct) / RATE_STEP) * RATE_STEP;
  const rateSliderMax = Math.ceil(Math.max(RATE_MAX, annualReturnPct) / RATE_STEP) * RATE_STEP;
  const zeroMoneyLabel = `$${formatNumericUnitValue(0)}`;
  const withdrawalMaxLabel = `$${formatNumericUnitValue(withdrawalMax)}`;
  const zeroPercentLabel = `${formatNumericUnitValue(0)}%`;
  const withdrawalRateMaxLabel = `${formatNumericUnitValue(withdrawalRateMax)}%`;
  const rateSliderMinLabel = `${formatNumericUnitValue(rateSliderMin)}%`;
  const rateSliderMaxLabel = `${formatNumericUnitValue(rateSliderMax)}%`;
  const rateWasUnavailable = manualAnnualReturn === null && portfolioAnnualizedReturnPct === null;
  const formattedAnnualReturnPct = formatAbbreviatedValue(annualReturnPct, "percent", "precise");
  const projection = simulatePortfolioDistribution(distributionAssets, monthlyWithdrawal, years);
  const additionalDepletionMonth =
    projection.depletionMonth === null && projection.finalBalance > 0
      ? estimateAdditionalPortfolioDepletionMonths(projection.finalAssets, monthlyWithdrawal)
      : null;
  const annualWithdrawal = monthlyWithdrawal * MONTHS_PER_YEAR;
  const annualWithdrawalPct =
    totalAtHorizon === 0 ? null : (annualWithdrawal / totalAtHorizon) * PERCENT_SCALE;
  const distributionMonthCount = years * MONTHS_PER_YEAR;
  const firstNominalMonthlyWithdrawal = withInflation
    ? monthlyWithdrawal * Math.pow(1 + inflationRatePct / PERCENT_SCALE, totalYears)
    : null;
  const depletionLabel =
    projection.depletionMonth === 0
      ? distributionSectionCopy.depletedAtStart
      : projection.depletionMonth !== null
        ? distributionSectionCopy.depletionDuration(formatDuration(projection.depletionMonth))
        : additionalDepletionMonth !== null
          ? distributionSectionCopy.surplusDuration(formatDuration(additionalDepletionMonth))
          : projection.finalBalance > 0
            ? distributionSectionCopy.noAdditionalDepletion
            : years === 0
              ? distributionSectionCopy.noHorizon
              : distributionSectionCopy.lastsFullHorizon(years);
  const durationNote =
    projection.depletionMonth !== null
      ? distributionSectionCopy.depletedNote
      : additionalDepletionMonth !== null
        ? distributionSectionCopy.surplusNote(years)
        : projection.finalBalance > 0
          ? distributionSectionCopy.noAdditionalDepletionNote
          : totalAtHorizon === 0
            ? distributionSectionCopy.noCapital
            : years === 0
              ? distributionSectionCopy.noHorizon
              : distributionSectionCopy.lastsAtLeast(years);
  const durationFormulaStep =
    projection.depletionMonth !== null
      ? distributionSectionCopy.durationDepletedFormulaStep
      : additionalDepletionMonth !== null
        ? distributionSectionCopy.additionalDurationFormulaStep
        : projection.finalBalance > 0
          ? distributionSectionCopy.noAdditionalDepletionFormulaStep
          : years === 0
            ? distributionSectionCopy.durationNoHorizonFormulaStep
            : distributionSectionCopy.durationLastsFormulaStep;

  // --- Handlers ---

  function changeWithdrawalMode(nextMode: "monthly" | "percentage") {
    if (nextMode === withdrawalMode) {
      return;
    }
    if (nextMode === "percentage") {
      const equivalentRate = annualRateForMonthlyWithdrawal(monthlyWithdrawal, totalAtHorizon);
      setManualWithdrawalRate(Math.max(0, equivalentRate));
    } else {
      setManualWithdrawal(monthlyWithdrawal);
    }
    setWithdrawalMode(nextMode);
  }

  function toggleWithdrawalMode() {
    changeWithdrawalMode(withdrawalMode === "monthly" ? "percentage" : "monthly");
  }

  function handleRateKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const upward = event.key === "ArrowRight" || event.key === "ArrowUp";
    const downward = event.key === "ArrowLeft" || event.key === "ArrowDown";
    if (!upward && !downward) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const value = adjacentStepValue(annualReturnPct, RATE_STEP, upward ? 1 : -1);
    setManualAnnualReturn(Math.min(rateSliderMax, Math.max(rateSliderMin, value)));
  }

  return (
    <section
      className={veDistributionSectionStyles.distributionSection}
      data-testid="dashboard-distribution-section"
      aria-labelledby="distribution-title"
    >
      <div
        className={[
          veDashboardPrimitivesStyles.sectionHeading,
          [veDistributionSectionStyles.distributionHeading, "section-heading distribution-heading"]
            .filter(Boolean)
            .join(" "),
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div>
          <div className={veDistributionSectionStyles.distributionTitleRow}>
            <h2
              id="distribution-title"
              className={[veDashboardPrimitivesStyles.eyebrow, "eyebrow"].filter(Boolean).join(" ")}
            >
              <span className={veDashboardPrimitivesStyles.eyebrowLine} />{" "}
              {t("dashboard.distributionSection.copy.title.p1")}
            </h2>
            <DistributionAssumptionTooltip withInflation={withInflation} />
          </div>
        </div>
      </div>

      <Card
        className={[
          veDashboardPrimitivesStyles.dashboardCardSurface,
          veDistributionSectionStyles.distributionPanel,
          "panel-card distribution-panel",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <CardHeader
          className={[veDashboardPrimitivesStyles.panelHeader, "panel-header"]
            .filter(Boolean)
            .join(" ")}
        >
          <div>
            <CardTitle>{distributionSectionCopy.chartTitle(withInflation)}</CardTitle>
            <CardDescription>
              {distributionSectionCopy.chartDescription(withInflation)}
            </CardDescription>
          </div>
          <Badge variant="outline">{years === 0 ? labels.today : formatYears(years)}</Badge>
        </CardHeader>
        <CardContent>
          <DistributionChart
            points={projection.points}
            chartVisual={chartVisual}
            years={years}
            withInflation={withInflation}
          />

          <div
            className={veDistributionSectionStyles.distributionControls}
            role="group"
            aria-label={distributionSectionCopy.controls}
          >
            <div
              className={[veDistributionSectionStyles.distributionControl, "distribution-control"]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={veDistributionSectionStyles.distributionControlHeading}>
                <Label htmlFor="distribution-years">{distributionSectionCopy.horizon}</Label>
                <strong>{distributionSectionCopy.yearCount(years)}</strong>
              </div>
              <DebouncedSlider
                id="distribution-years"
                aria-label={distributionSectionCopy.horizon}
                min={MIN_HORIZON_YEARS}
                max={MAX_HORIZON_YEARS}
                step={1}
                value={[years]}
                onValueChange={(value) => setYears(value[0] ?? DEFAULT_DISTRIBUTION_YEARS)}
              />
              <div
                className={[veDashboardPrimitivesStyles.rangeLabels, "range-labels"]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span>{distributionSectionCopy.zeroYears}</span>
                <span>{distributionSectionCopy.fortyYears}</span>
              </div>
            </div>

            <div
              className={[veDistributionSectionStyles.distributionControl, "distribution-control"]
                .filter(Boolean)
                .join(" ")}
            >
              <div
                className={[
                  veDistributionSectionStyles.distributionControlHeading,
                  veDistributionSectionStyles.distributionWithdrawalHeading,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={veDistributionSectionStyles.distributionLabelGroup}>
                  <Label
                    htmlFor={
                      withdrawalMode === "monthly"
                        ? "distribution-withdrawal"
                        : "distribution-withdrawal-rate"
                    }
                  >
                    {withdrawalInputLabel}
                  </Label>
                  {withdrawalMode === "monthly" && firstNominalMonthlyWithdrawal !== null && (
                    <DistributionLabelTooltip
                      label={distributionSectionCopy.realMonthlyWithdrawal}
                      text={distributionSectionCopy.realWithdrawalNominalEquivalent(
                        formatAbbreviatedValue(firstNominalMonthlyWithdrawal, "currency"),
                        totalYears,
                      )}
                    />
                  )}
                </div>
                <div
                  className={[
                    veDashboardPrimitivesStyles.distributionModeToggle,
                    "distribution-mode-toggle",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  role="group"
                  aria-label={distributionSectionCopy.withdrawalMode}
                >
                  <button
                    type="button"
                    aria-label={distributionSectionCopy.monthlyMode}
                    title={distributionSectionCopy.monthlyMode}
                    aria-pressed={withdrawalMode === "monthly"}
                    onClick={toggleWithdrawalMode}
                  >
                    {"$"}
                  </button>
                  <button
                    type="button"
                    aria-label={distributionSectionCopy.percentageMode}
                    title={distributionSectionCopy.percentageMode}
                    aria-pressed={withdrawalMode === "percentage"}
                    onClick={toggleWithdrawalMode}
                  >
                    {"%"}
                  </button>
                </div>
                {withdrawalMode === "monthly" ? (
                  <NumericUnitInput
                    id="distribution-withdrawal"
                    label={withdrawalInputLabel}
                    value={monthlyWithdrawal}
                    min={0}
                    max={withdrawalMax}
                    step={10}
                    unit="money"
                    onChange={setManualWithdrawal}
                  />
                ) : (
                  <NumericUnitInput
                    id="distribution-withdrawal-rate"
                    label={withdrawalInputLabel}
                    value={annualWithdrawalRatePct}
                    min={0}
                    max={withdrawalRateMax}
                    step={WITHDRAWAL_RATE_STEP}
                    unit="percent"
                    onChange={setManualWithdrawalRate}
                  />
                )}
              </div>
              {withdrawalMode === "monthly" ? (
                <>
                  <DebouncedSlider
                    aria-label={withdrawalInputLabel}
                    min={0}
                    max={withdrawalSliderMax}
                    step={WITHDRAWAL_SLIDER_STEP}
                    value={[monthlyWithdrawal]}
                    disabled={withdrawalMax === 0}
                    onValueChange={(value) => setManualWithdrawal(value[0] ?? 0)}
                  />
                  <div
                    className={[veDashboardPrimitivesStyles.rangeLabels, "range-labels"]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span>{zeroMoneyLabel}</span>
                    <span>{withdrawalMaxLabel}</span>
                  </div>
                </>
              ) : (
                <>
                  <DebouncedSlider
                    aria-label={withdrawalInputLabel}
                    min={0}
                    max={withdrawalRateMax}
                    step={WITHDRAWAL_RATE_STEP}
                    value={[annualWithdrawalRatePct]}
                    onValueChange={(value) => setManualWithdrawalRate(value[0] ?? 0)}
                  />
                  <div
                    className={[veDashboardPrimitivesStyles.rangeLabels, "range-labels"]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span>{zeroPercentLabel}</span>
                    <span>{withdrawalRateMaxLabel}</span>
                  </div>
                </>
              )}
            </div>

            <div
              className={[veDistributionSectionStyles.distributionControl, "distribution-control"]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={veDistributionSectionStyles.distributionControlHeading}>
                <div className={veDistributionSectionStyles.distributionLabelGroup}>
                  <Label htmlFor="distribution-return">
                    {withInflation
                      ? distributionSectionCopy.realAnnualReturn
                      : distributionSectionCopy.annualReturn}
                  </Label>
                  <DistributionLabelTooltip
                    label={
                      withInflation
                        ? distributionSectionCopy.realAnnualReturn
                        : distributionSectionCopy.annualReturn
                    }
                    text={
                      rateWasUnavailable
                        ? distributionSectionCopy.noCalculatedReturn
                        : manualAnnualReturn === null
                          ? distributionSectionCopy.portfolioReturnExplanation(
                              formattedAnnualReturnPct,
                              totalYears,
                              withInflation,
                            )
                          : distributionSectionCopy.manualReturnExplanation(
                              formattedAnnualReturnPct,
                            )
                    }
                  />
                </div>
                <NumericUnitInput
                  id="distribution-return"
                  label={
                    withInflation
                      ? distributionSectionCopy.realAnnualReturn
                      : distributionSectionCopy.annualReturn
                  }
                  value={annualReturnPct}
                  min={rateSliderMin}
                  max={rateSliderMax}
                  step={RATE_STEP}
                  unit="percent"
                  onChange={setManualAnnualReturn}
                />
              </div>
              <div onKeyDownCapture={handleRateKeyDown}>
                <DebouncedSlider
                  aria-label={
                    withInflation
                      ? distributionSectionCopy.realAnnualReturn
                      : distributionSectionCopy.annualReturn
                  }
                  min={rateSliderMin}
                  max={rateSliderMax}
                  step={RATE_STEP}
                  value={[annualReturnPct]}
                  onValueChange={(value) =>
                    setManualAnnualReturn(Math.round((value[0] ?? 0) / RATE_STEP) * RATE_STEP)
                  }
                />
              </div>
              <div
                className={[veDashboardPrimitivesStyles.rangeLabels, "range-labels"]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span>{rateSliderMinLabel}</span>
                <span>{rateSliderMaxLabel}</span>
              </div>
            </div>
          </div>
          {rateWasUnavailable && (
            <p className={veDistributionSectionStyles.distributionNote} role="status">
              {distributionSectionCopy.noCalculatedReturn}
            </p>
          )}
        </CardContent>
      </Card>

      <section
        className={veDistributionSectionStyles.distributionInsights}
        aria-label={distributionSectionCopy.insightsAriaLabel}
      >
        <Metric
          icon={<ArrowDownToLine className="icon-sm" />}
          label={distributionSectionCopy.annualWithdrawal}
          value={<AbbreviatedMoney value={annualWithdrawal} />}
          note={distributionSectionCopy.planned}
          tooltip={
            <FormulaTooltip
              label={distributionSectionCopy.annualWithdrawal}
              intro={distributionSectionCopy.annualFormulaIntro}
              example={distributionSectionCopy.annualExample(
                formatAbbreviatedValue(monthlyWithdrawal, "currency"),
                formatAbbreviatedValue(annualWithdrawal, "currency"),
              )}
              trigger={<Calculator className="icon-sm" aria-hidden="true" />}
            >
              <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
                <FormulaStep>
                  <span className={veFormulaStepStyles.formulaStepDescription}>
                    {distributionSectionCopy.annualFormulaStep}
                  </span>
                  <FormulaMath
                    label={`${distributionSectionCopy.annualWithdrawalLabel} = ${distributionSectionCopy.monthlyWithdrawalLabel} × 12`}
                    tex={`${texText(distributionSectionCopy.annualWithdrawalLabel)} = ${texText(distributionSectionCopy.monthlyWithdrawalLabel)} \\times 12`}
                  />
                  <FormulaMath
                    label={distributionSectionCopy.annualWithdrawalLabel}
                    className={veFormulaMathStyles.formulaMathSubstitution}
                    tex={`${texText(formatAbbreviatedValue(monthlyWithdrawal, "currency"))} \\times 12`}
                  />
                  <FormulaResult
                    name={distributionSectionCopy.annualWithdrawalLabel}
                    value={formatAbbreviatedValue(annualWithdrawal, "currency")}
                  />
                </FormulaStep>
              </ol>
            </FormulaTooltip>
          }
        />
        <Metric
          icon={<ChartNoAxesCombined className="icon-sm" />}
          label={
            withdrawalMode === "monthly"
              ? distributionSectionCopy.annualRate
              : distributionSectionCopy.equivalentMonthlyWithdrawal
          }
          value={
            withdrawalMode === "monthly" ? (
              annualWithdrawalPct === null ? (
                "—"
              ) : (
                <AbbreviatedValue value={annualWithdrawalPct} unit="percent" />
              )
            ) : (
              <AbbreviatedMoney value={monthlyWithdrawal} />
            )
          }
          note={
            withdrawalMode === "monthly"
              ? distributionSectionCopy.percentNote
              : distributionSectionCopy.equivalentMonthlyNote
          }
          tooltip={
            <FormulaTooltip
              label={
                withdrawalMode === "monthly"
                  ? distributionSectionCopy.annualRate
                  : distributionSectionCopy.equivalentMonthlyWithdrawal
              }
              intro={
                withdrawalMode === "monthly"
                  ? distributionSectionCopy.percentFormulaIntro
                  : distributionSectionCopy.equivalentMonthlyFormulaIntro
              }
              example={
                withdrawalMode === "monthly"
                  ? annualWithdrawalPct === null
                    ? undefined
                    : distributionSectionCopy.percentExample(
                        formatAbbreviatedValue(annualWithdrawal, "currency"),
                        formatAbbreviatedValue(totalAtHorizon, "currency"),
                        formatAbbreviatedValue(annualWithdrawalPct, "percent"),
                      )
                  : distributionSectionCopy.monthlyExample(
                      formatAbbreviatedValue(totalAtHorizon, "currency"),
                      formatAbbreviatedValue(annualWithdrawalRatePct, "percent"),
                      formatAbbreviatedValue(monthlyWithdrawal, "currency"),
                    )
              }
              trigger={<Calculator className="icon-sm" aria-hidden="true" />}
            >
              {withdrawalMode === "percentage" ? (
                <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
                  <FormulaStep>
                    <span className={veFormulaStepStyles.formulaStepDescription}>
                      {distributionSectionCopy.equivalentMonthlyFormulaStep}
                    </span>
                    <FormulaMath
                      label={
                        distributionSectionCopy.monthlyWithdrawalLabel +
                        " = (" +
                        distributionSectionCopy.initialTotalLabel +
                        " × " +
                        distributionSectionCopy.annualWithdrawalRateLabel +
                        ") ÷ 12"
                      }
                      tex={
                        texText(distributionSectionCopy.monthlyWithdrawalLabel) +
                        " = \\frac{" +
                        texText(distributionSectionCopy.initialTotalLabel) +
                        " \\times " +
                        texText(distributionSectionCopy.annualWithdrawalRateLabel) +
                        "}{12}"
                      }
                    />
                    <FormulaMath
                      label={distributionSectionCopy.equivalentMonthlyFormulaStep}
                      className={veFormulaMathStyles.formulaMathSubstitution}
                      tex={
                        "\\frac{" +
                        texText(formatAbbreviatedValue(totalAtHorizon, "currency")) +
                        " \\times " +
                        texText(formatAbbreviatedValue(annualWithdrawalRatePct, "percent")) +
                        "}{12}"
                      }
                    />
                    <FormulaResult
                      name={distributionSectionCopy.equivalentMonthlyWithdrawal}
                      value={formatAbbreviatedValue(monthlyWithdrawal, "currency")}
                    />
                  </FormulaStep>
                </ol>
              ) : (
                <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
                  <FormulaStep>
                    <span className={veFormulaStepStyles.formulaStepDescription}>
                      {distributionSectionCopy.percentFormulaStep}
                    </span>
                    <FormulaMath
                      label={`${distributionSectionCopy.annualWithdrawalLabel} ÷ ${distributionSectionCopy.initialTotalLabel} × 100`}
                      tex={`\\frac{${texText(distributionSectionCopy.annualWithdrawalLabel)}}{${texText(distributionSectionCopy.initialTotalLabel)}} \\times 100`}
                    />
                    {annualWithdrawalPct === null ? (
                      <p className={veFormulaMathStyles.formulaNoResult}>
                        {distributionSectionCopy.noCapitalForPercent}
                      </p>
                    ) : (
                      <>
                        <FormulaMath
                          label={distributionSectionCopy.percentFormulaStep}
                          className={veFormulaMathStyles.formulaMathSubstitution}
                          tex={`\\frac{${texText(formatAbbreviatedValue(annualWithdrawal, "currency"))}}{${texText(formatAbbreviatedValue(totalAtHorizon, "currency"))}} \\times 100`}
                        />
                        <FormulaResult
                          name={distributionSectionCopy.annualRate}
                          value={formatAbbreviatedValue(annualWithdrawalPct, "percent")}
                        />
                      </>
                    )}
                  </FormulaStep>
                </ol>
              )}
            </FormulaTooltip>
          }
        />
        <Metric
          icon={<PiggyBank className="icon-sm" />}
          label={distributionSectionCopy.endingBalance}
          value={<AbbreviatedMoney value={projection.finalBalance} />}
          note={distributionSectionCopy.endingNote(years)}
          tooltip={
            <FormulaTooltip
              label={distributionSectionCopy.endingBalance}
              intro={distributionSectionCopy.endingFormulaIntro}
              example={distributionSectionCopy.endingExample(
                formatAbbreviatedValue(totalAtHorizon, "currency"),
                formatAbbreviatedValue(monthlyWithdrawal, "currency"),
                years,
                formatAbbreviatedValue(projection.finalBalance, "currency"),
              )}
              trigger={<Calculator className="icon-sm" aria-hidden="true" />}
            >
              <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
                <FormulaStep>
                  <span className={veFormulaStepStyles.formulaStepDescription}>
                    {distributionSectionCopy.balanceFormulaStep}
                  </span>
                  <FormulaMath
                    label={`${distributionSectionCopy.balanceLabel} inicial = ${distributionSectionCopy.initialTotalLabel}`}
                    tex={`B_0 = ${texText(distributionSectionCopy.initialTotalLabel)}`}
                  />
                  <FormulaMath
                    className={veFormulaMathStyles.formulaMathSubstitution}
                    label={`${distributionSectionCopy.balanceLabel} inicial`}
                    tex={`B_0 = ${texText(formatAbbreviatedValue(totalAtHorizon, "currency"))}`}
                  />
                  <span className={veFormulaStepStyles.formulaStepDescription}>
                    {manualAnnualReturn === null
                      ? distributionSectionCopy.individualReturnsStep
                      : distributionSectionCopy.manualReturnStep}
                  </span>
                  {investmentProjections.map((investmentProjection, index) => (
                    <div
                      className="formula-investment-rate"
                      key={investmentProjection.investment.id}
                    >
                      <RateFormula
                        annualReturnPct={distributionAssets[index]!.annualReturnPct}
                        label={investmentProjection.investment.name}
                      />
                    </div>
                  ))}
                  <FormulaMath
                    label={distributionSectionCopy.grownBalanceFormulaLabel}
                    tex={`B_{j,m}^{+} = B_{j,m-1} \\times (1 + r_{j,m})`}
                  />
                  <FormulaMath
                    label={distributionSectionCopy.proRataWithdrawalFormulaLabel}
                    tex={`R_{j,m} = R_m \\times \\frac{B_{j,m}^{+}}{\\sum_i B_{i,m}^{+}}`}
                  />
                  <FormulaMath
                    label={distributionSectionCopy.balanceAfterWithdrawalFormulaLabel}
                    tex={`B_{j,m} = \\max(0, B_{j,m}^{+} - R_{j,m})`}
                  />
                  <FormulaMath
                    className={veFormulaMathStyles.formulaMathSubstitution}
                    label={distributionSectionCopy.withdrawalSubstitutionLabel}
                    tex={`${texText(formatAbbreviatedValue(monthlyWithdrawal, "currency"))} \\text{ USD/mes}`}
                  />
                  <FormulaResult
                    name={distributionSectionCopy.finalBalanceLabel}
                    value={formatAbbreviatedValue(projection.finalBalance, "currency")}
                  />
                </FormulaStep>
              </ol>
            </FormulaTooltip>
          }
        />
        <Metric
          icon={<Clock3 className="icon-sm" />}
          label={distributionSectionCopy.duration}
          value={depletionLabel}
          note={durationNote}
          tooltip={
            <FormulaTooltip
              label={distributionSectionCopy.duration}
              intro={distributionSectionCopy.durationFormulaIntro}
              example={distributionSectionCopy.durationExample(
                formatAbbreviatedValue(monthlyWithdrawal, "currency"),
                depletionLabel,
              )}
              trigger={<Calculator className="icon-sm" aria-hidden="true" />}
            >
              <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
                <FormulaStep>
                  <span className={veFormulaStepStyles.formulaStepDescription}>
                    {durationFormulaStep}
                  </span>
                  {projection.depletionMonth === 0 ? (
                    <FormulaMath
                      label={distributionSectionCopy.depletionCalculationLabel}
                      tex="B_0 = 0"
                    />
                  ) : projection.depletionMonth !== null ? (
                    <FormulaMath
                      label={distributionSectionCopy.depletionCalculationLabel}
                      tex={`\\min(m: 1 \\leq m \\leq ${texText(String(distributionMonthCount))}, B_m = 0) = ${texText(String(projection.depletionMonth))}`}
                    />
                  ) : additionalDepletionMonth !== null ? (
                    <>
                      {projection.finalAssets.map((asset, index) => (
                        <FormulaMath
                          key={investmentProjections[index]?.investment.id ?? index}
                          label={
                            investmentProjections[index]?.investment.name ??
                            distributionSectionCopy.balanceLabel
                          }
                          tex={`B_{j,0} = ${texText(formatAbbreviatedValue(asset.balance, "currency"))}`}
                        />
                      ))}
                      <FormulaMath
                        label={distributionSectionCopy.grownBalanceFormulaLabel}
                        tex={`B_{j,k}^{+} = B_{j,k-1} \\times (1 + r_{j,k})`}
                      />
                      <FormulaMath
                        label={distributionSectionCopy.proRataWithdrawalFormulaLabel}
                        tex={`R_{j,k} = R_k \\times \\frac{B_{j,k}^{+}}{\\sum_i B_{i,k}^{+}}`}
                      />
                      <FormulaMath
                        label={distributionSectionCopy.balanceAfterWithdrawalFormulaLabel}
                        tex={`B_{j,k} = \\max(0, B_{j,k}^{+} - R_{j,k})`}
                      />
                      <FormulaMath
                        label={distributionSectionCopy.additionalDurationResultLabel}
                        tex={`\\min(k: k \\geq 1, S_k = 0) = ${texText(String(additionalDepletionMonth))} \\text{${distributionSectionCopy.additionalDepletionMonthsUnit}}`}
                      />
                    </>
                  ) : projection.finalBalance > 0 ? (
                    <>
                      <FormulaMath
                        label={distributionSectionCopy.balanceAtSelectedHorizonLabel}
                        tex={`S_0 = ${texText(formatAbbreviatedValue(projection.finalBalance, "currency"))}`}
                      />
                      <FormulaMath
                        label={distributionSectionCopy.durationLabel}
                        tex={`S_k > 0, \\quad k \\geq 1`}
                      />
                    </>
                  ) : years === 0 ? (
                    <FormulaMath
                      label={distributionSectionCopy.yearsLabel}
                      tex={`N = ${texText(String(distributionMonthCount))}`}
                    />
                  ) : (
                    <FormulaMath
                      label={distributionSectionCopy.durationLabel}
                      tex={`B_m > 0, \\quad 1 \\leq m \\leq ${texText(String(distributionMonthCount))}`}
                    />
                  )}
                  <FormulaResult
                    name={distributionSectionCopy.durationLabel}
                    value={depletionLabel}
                  />
                </FormulaStep>
              </ol>
            </FormulaTooltip>
          }
        />
      </section>
    </section>
  );
}
