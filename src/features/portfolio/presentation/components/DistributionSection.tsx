import { FormulaStep } from "@/features/Portfolio/presentation/components/FormulaStep";
import { useState, type KeyboardEvent, type PointerEvent } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownToLine,
  Calculator,
  ChartNoAxesCombined,
  Clock3,
  Info,
  PiggyBank,
} from "lucide-react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/Card";
import { Badge } from "@/design-system/components/Badge";
import { NumericUnitInput } from "@/features/Portfolio/presentation/components/NumericUnitInput";
import { Label } from "@/design-system/components/Label";
import { DebouncedSlider } from "@/design-system/components/DebouncedSlider";
import { AbbreviatedMoney } from "@/features/Portfolio/presentation/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/features/Portfolio/presentation/components/money/AbbreviatedValue";
import { formatAbbreviatedValue } from "@/features/Portfolio/presentation/format/formatAbbreviatedValue.util";
import { formatNumericUnitValue } from "@/features/Portfolio/presentation/format/formatNumericUnitValue.util";
import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";
import { estimateAdditionalPortfolioDepletionMonths } from "@/features/Portfolio/domain/utils/estimateAdditionalPortfolioDepletionMonths.util";
import { simulatePortfolioDistribution } from "@/features/Portfolio/domain/utils/simulatePortfolioDistribution.util";
import type { DistributionPoint } from "@/features/Portfolio/domain/types/DistributionPoint.type";
import { annualRateForMonthlyWithdrawal } from "@/features/Portfolio/domain/utils/annualRateForMonthlyWithdrawal.util";
import { distributionAssetsWithReturn } from "@/features/Portfolio/domain/utils/distributionAssetsWithReturn.util";
import { monthlyWithdrawalForAnnualRate } from "@/features/Portfolio/domain/utils/monthlyWithdrawalForAnnualRate.util";
import { selectedDistributionAnnualReturnPct } from "@/features/Portfolio/domain/utils/selectedDistributionAnnualReturnPct.util";
import { withdrawalRateSliderMax } from "@/features/Portfolio/domain/utils/withdrawalRateSliderMax.util";
import type { LoadedDashboardModel } from "@/features/Portfolio/presentation/hooks/usePortfolioDashboard";
import { copy } from "@/features/Portfolio/presentation/constants/DistributionSection.constant";
import { texText } from "@/features/Portfolio/presentation/utils/texText.util";
import { compactMoney } from "@/features/Portfolio/presentation/utils/compactMoney.util";
import { adjacentStepValue } from "@/features/Portfolio/presentation/utils/adjacentStepValue.util";
import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";
import { formatYears } from "@/features/Portfolio/presentation/utils/formatYears.util";
import { FormulaMath } from "@/features/Portfolio/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Portfolio/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Portfolio/presentation/components/FormulaTooltip";
import { Metric } from "@/features/Portfolio/presentation/components/Metric";

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

  return copy.depletionAt(years, remainingMonths);
}

// --- Components ---

function DistributionTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number; color?: string; payload?: DistributionPoint }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) {

    return null;
  }

  // --- Variables ---

  const balance = payload[0]?.value ?? 0;
  const year = Number(label ?? payload[0]?.payload?.year ?? 0);

  // --- Return ---

  return (
    <div className="chart-tooltip">
      <span>{copy.year(year)}</span>
      <div style={{ color: payload[0]?.color }}>
        <i style={{ background: payload[0]?.color }} />
        {copy.balance}
        <strong>
          <AbbreviatedMoney value={balance} interaction="text" />
        </strong>
      </div>
    </div>
  );
}

function RateFormula({
  annualReturnPct,
  label = copy.annualRateLabel,
}: {
  annualReturnPct: number;
  label?: string;
}) {
  const monthlyRate = Math.pow(1 + annualReturnPct / PERCENT_SCALE, 1 / MONTHS_PER_YEAR) - 1;

  return (
    <>
      <FormulaMath
        label={`${label}: ${copy.monthlyRateLabel}`}
        tex={`${texText(copy.monthlyRateLabel)} = (1 + ${texText(label)})^{1/12} - 1`}
      />
      <FormulaMath
        className="formula-math-substitution"
        label={`${label}: ${copy.monthlyRateLabel}`}
        tex={`(1 + ${texText(formatAbbreviatedValue(annualReturnPct, "percent", "precise"))})^{1/12} - 1`}
      />
      <FormulaResult
        name={`${label}: ${copy.monthlyRateLabel}`}
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
            className="formula-tooltip-trigger distribution-heading-info-trigger"
            aria-label={copy.assumptionAriaLabel}
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
          <TooltipPrimitive.Content className="rate-note-tooltip-content" side="top" sideOffset={6}>
            {withInflation ? copy.realAssumption : copy.assumption}
            <TooltipPrimitive.Arrow className="money-tooltip-arrow" />
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
            className="formula-tooltip-trigger distribution-heading-info-trigger"
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
          <TooltipPrimitive.Content className="rate-note-tooltip-content" side="top" sideOffset={6}>
            {text}
            <TooltipPrimitive.Arrow className="money-tooltip-arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export function DistributionSection({ model }: { model: LoadedDashboardModel }) {
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
      ? copy.annualRate
      : withInflation
        ? copy.realMonthlyWithdrawal
        : copy.withdrawal;
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
      ? copy.depletedAtStart
      : projection.depletionMonth !== null
        ? copy.depletionDuration(formatDuration(projection.depletionMonth))
        : additionalDepletionMonth !== null
          ? copy.surplusDuration(formatDuration(additionalDepletionMonth))
          : projection.finalBalance > 0
            ? copy.noAdditionalDepletion
            : years === 0
              ? copy.noHorizon
              : copy.lastsFullHorizon(years);
  const durationNote =
    projection.depletionMonth !== null
      ? copy.depletedNote
      : additionalDepletionMonth !== null
        ? copy.surplusNote(years)
        : projection.finalBalance > 0
          ? copy.noAdditionalDepletionNote
          : totalAtHorizon === 0
            ? copy.noCapital
            : years === 0
              ? copy.noHorizon
              : copy.lastsAtLeast(years);
  const durationFormulaStep =
    projection.depletionMonth !== null
      ? copy.durationDepletedFormulaStep
      : additionalDepletionMonth !== null
        ? copy.additionalDurationFormulaStep
        : projection.finalBalance > 0
          ? copy.noAdditionalDepletionFormulaStep
          : years === 0
            ? copy.durationNoHorizonFormulaStep
            : copy.durationLastsFormulaStep;

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
    <section className="distribution-section" aria-labelledby="distribution-title">
      <div className="section-heading distribution-heading">
        <div>
          <div className="distribution-title-row">
            <h2 id="distribution-title" className="eyebrow">
              <span className="eyebrow-line" /> {copy.title}
            </h2>
            <DistributionAssumptionTooltip withInflation={withInflation} />
          </div>
        </div>
      </div>

      <Card className="panel-card distribution-panel">
        <CardHeader className="panel-header">
          <div>
            <CardTitle>{copy.chartTitle(withInflation)}</CardTitle>
            <CardDescription>{copy.chartDescription(withInflation)}</CardDescription>
          </div>
          <Badge variant="outline">{years === 0 ? labels.today : formatYears(years)}</Badge>
        </CardHeader>
        <CardContent>
          <div
            className="chart-wrap distribution-chart"
            role="img"
            aria-label={`${copy.chartTitle(withInflation)}, ${years} ${years === 1 ? "año" : "años"}`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                accessibilityLayer
                data={projection.points}
                margin={{ top: 14, right: 8, left: 2, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="4 5" />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--chart-axis)", fontSize: "var(--text-meta)" }}
                  minTickGap={22}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--chart-axis)", fontSize: "var(--text-meta)" }}
                  tickFormatter={compactMoney}
                  width={62}
                />
                <Tooltip content={<DistributionTooltip />} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  name={copy.balance}
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.1}
                  strokeWidth="var(--line-chart-highlight)"
                  activeDot={{
                    r: 5,
                    fill: "var(--chart-1)",
                    stroke: "var(--card)",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="distribution-controls" role="group" aria-label={copy.controls}>
            <div className="distribution-control">
              <div className="distribution-control-heading">
                <Label htmlFor="distribution-years">{copy.horizon}</Label>
                <strong>
                  {years} {years === 1 ? "año" : "años"}
                </strong>
              </div>
              <DebouncedSlider
                id="distribution-years"
                aria-label={copy.horizon}
                min={MIN_HORIZON_YEARS}
                max={MAX_HORIZON_YEARS}
                step={1}
                value={[years]}
                onValueChange={(value) => setYears(value[0] ?? DEFAULT_DISTRIBUTION_YEARS)}
              />
              <div className="range-labels">
                <span>{copy.zeroYears}</span>
                <span>{copy.fortyYears}</span>
              </div>
            </div>

            <div className="distribution-control">
              <div className="distribution-control-heading distribution-withdrawal-heading">
                <div className="distribution-label-group">
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
                      label={copy.realMonthlyWithdrawal}
                      text={copy.realWithdrawalNominalEquivalent(
                        formatAbbreviatedValue(firstNominalMonthlyWithdrawal, "currency"),
                        totalYears,
                      )}
                    />
                  )}
                </div>
                <div
                  className="distribution-mode-toggle"
                  role="group"
                  aria-label={copy.withdrawalMode}
                >
                  <button
                    type="button"
                    aria-label={copy.monthlyMode}
                    title={copy.monthlyMode}
                    aria-pressed={withdrawalMode === "monthly"}
                    onClick={toggleWithdrawalMode}
                  >
                    {"$"}
                  </button>
                  <button
                    type="button"
                    aria-label={copy.percentageMode}
                    title={copy.percentageMode}
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
                  <div className="range-labels">
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
                  <div className="range-labels">
                    <span>{zeroPercentLabel}</span>
                    <span>{withdrawalRateMaxLabel}</span>
                  </div>
                </>
              )}
            </div>

            <div className="distribution-control">
              <div className="distribution-control-heading">
                <div className="distribution-label-group">
                  <Label htmlFor="distribution-return">
                    {withInflation ? copy.realAnnualReturn : copy.annualReturn}
                  </Label>
                  <DistributionLabelTooltip
                    label={withInflation ? copy.realAnnualReturn : copy.annualReturn}
                    text={
                      rateWasUnavailable
                        ? copy.noCalculatedReturn
                        : manualAnnualReturn === null
                          ? copy.portfolioReturnExplanation(
                              formattedAnnualReturnPct,
                              totalYears,
                              withInflation,
                            )
                          : copy.manualReturnExplanation(formattedAnnualReturnPct)
                    }
                  />
                </div>
                <NumericUnitInput
                  id="distribution-return"
                  label={withInflation ? copy.realAnnualReturn : copy.annualReturn}
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
                  aria-label={withInflation ? copy.realAnnualReturn : copy.annualReturn}
                  min={rateSliderMin}
                  max={rateSliderMax}
                  step={RATE_STEP}
                  value={[annualReturnPct]}
                  onValueChange={(value) =>
                    setManualAnnualReturn(Math.round((value[0] ?? 0) / RATE_STEP) * RATE_STEP)
                  }
                />
              </div>
              <div className="range-labels">
                <span>{rateSliderMinLabel}</span>
                <span>{rateSliderMaxLabel}</span>
              </div>
            </div>
          </div>
          {rateWasUnavailable && (
            <p className="distribution-note" role="status">
              {copy.noCalculatedReturn}
            </p>
          )}
        </CardContent>
      </Card>

      <section className="distribution-insights" aria-label={copy.insightsAriaLabel}>
        <Metric
          icon={<ArrowDownToLine className="icon-sm" />}
          label={copy.annualWithdrawal}
          value={<AbbreviatedMoney value={annualWithdrawal} />}
          note={copy.planned}
          tooltip={
            <FormulaTooltip
              label={copy.annualWithdrawal}
              intro={copy.annualFormulaIntro}
              example={copy.annualExample(
                formatAbbreviatedValue(monthlyWithdrawal, "currency"),
                formatAbbreviatedValue(annualWithdrawal, "currency"),
              )}
              trigger={<Calculator className="icon-sm" aria-hidden="true" />}
            >
              <ol className="formula-tooltip-copy">
                <FormulaStep>
                  <span className="formula-step-description">{copy.annualFormulaStep}</span>
                  <FormulaMath
                    label={`${copy.annualWithdrawalLabel} = ${copy.monthlyWithdrawalLabel} × 12`}
                    tex={`${texText(copy.annualWithdrawalLabel)} = ${texText(copy.monthlyWithdrawalLabel)} \\times 12`}
                  />
                  <FormulaMath
                    label={copy.annualWithdrawalLabel}
                    className="formula-math-substitution"
                    tex={`${texText(formatAbbreviatedValue(monthlyWithdrawal, "currency"))} \\times 12`}
                  />
                  <FormulaResult
                    name={copy.annualWithdrawalLabel}
                    value={formatAbbreviatedValue(annualWithdrawal, "currency")}
                  />
                </FormulaStep>
              </ol>
            </FormulaTooltip>
          }
        />
        <Metric
          icon={<ChartNoAxesCombined className="icon-sm" />}
          label={withdrawalMode === "monthly" ? copy.annualRate : copy.equivalentMonthlyWithdrawal}
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
          note={withdrawalMode === "monthly" ? copy.percentNote : copy.equivalentMonthlyNote}
          tooltip={
            <FormulaTooltip
              label={
                withdrawalMode === "monthly" ? copy.annualRate : copy.equivalentMonthlyWithdrawal
              }
              intro={
                withdrawalMode === "monthly"
                  ? copy.percentFormulaIntro
                  : copy.equivalentMonthlyFormulaIntro
              }
              example={
                withdrawalMode === "monthly"
                  ? annualWithdrawalPct === null
                    ? undefined
                    : copy.percentExample(
                        formatAbbreviatedValue(annualWithdrawal, "currency"),
                        formatAbbreviatedValue(totalAtHorizon, "currency"),
                        formatAbbreviatedValue(annualWithdrawalPct, "percent"),
                      )
                  : copy.monthlyExample(
                      formatAbbreviatedValue(totalAtHorizon, "currency"),
                      formatAbbreviatedValue(annualWithdrawalRatePct, "percent"),
                      formatAbbreviatedValue(monthlyWithdrawal, "currency"),
                    )
              }
              trigger={<Calculator className="icon-sm" aria-hidden="true" />}
            >
              {withdrawalMode === "percentage" ? (
                <ol className="formula-tooltip-copy">
                  <FormulaStep>
                    <span className="formula-step-description">
                      {copy.equivalentMonthlyFormulaStep}
                    </span>
                    <FormulaMath
                      label={
                        copy.monthlyWithdrawalLabel +
                        " = (" +
                        copy.initialTotalLabel +
                        " × " +
                        copy.annualWithdrawalRateLabel +
                        ") ÷ 12"
                      }
                      tex={
                        texText(copy.monthlyWithdrawalLabel) +
                        " = \\frac{" +
                        texText(copy.initialTotalLabel) +
                        " \\times " +
                        texText(copy.annualWithdrawalRateLabel) +
                        "}{12}"
                      }
                    />
                    <FormulaMath
                      label={copy.equivalentMonthlyFormulaStep}
                      className="formula-math-substitution"
                      tex={
                        "\\frac{" +
                        texText(formatAbbreviatedValue(totalAtHorizon, "currency")) +
                        " \\times " +
                        texText(formatAbbreviatedValue(annualWithdrawalRatePct, "percent")) +
                        "}{12}"
                      }
                    />
                    <FormulaResult
                      name={copy.equivalentMonthlyWithdrawal}
                      value={formatAbbreviatedValue(monthlyWithdrawal, "currency")}
                    />
                  </FormulaStep>
                </ol>
              ) : (
                <ol className="formula-tooltip-copy">
                  <FormulaStep>
                    <span className="formula-step-description">{copy.percentFormulaStep}</span>
                    <FormulaMath
                      label={`${copy.annualWithdrawalLabel} ÷ ${copy.initialTotalLabel} × 100`}
                      tex={`\\frac{${texText(copy.annualWithdrawalLabel)}}{${texText(copy.initialTotalLabel)}} \\times 100`}
                    />
                    {annualWithdrawalPct === null ? (
                      <p className="formula-no-result">{copy.noCapitalForPercent}</p>
                    ) : (
                      <>
                        <FormulaMath
                          label={copy.percentFormulaStep}
                          className="formula-math-substitution"
                          tex={`\\frac{${texText(formatAbbreviatedValue(annualWithdrawal, "currency"))}}{${texText(formatAbbreviatedValue(totalAtHorizon, "currency"))}} \\times 100`}
                        />
                        <FormulaResult
                          name={copy.annualRate}
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
          label={copy.endingBalance}
          value={<AbbreviatedMoney value={projection.finalBalance} />}
          note={copy.endingNote(years)}
          tooltip={
            <FormulaTooltip
              label={copy.endingBalance}
              intro={copy.endingFormulaIntro}
              example={copy.endingExample(
                formatAbbreviatedValue(totalAtHorizon, "currency"),
                formatAbbreviatedValue(monthlyWithdrawal, "currency"),
                years,
                formatAbbreviatedValue(projection.finalBalance, "currency"),
              )}
              trigger={<Calculator className="icon-sm" aria-hidden="true" />}
            >
              <ol className="formula-tooltip-copy">
                <FormulaStep>
                  <span className="formula-step-description">{copy.balanceFormulaStep}</span>
                  <FormulaMath
                    label={`${copy.balanceLabel} inicial = ${copy.initialTotalLabel}`}
                    tex={`B_0 = ${texText(copy.initialTotalLabel)}`}
                  />
                  <FormulaMath
                    className="formula-math-substitution"
                    label={`${copy.balanceLabel} inicial`}
                    tex={`B_0 = ${texText(formatAbbreviatedValue(totalAtHorizon, "currency"))}`}
                  />
                  <span className="formula-step-description">
                    {manualAnnualReturn === null
                      ? copy.individualReturnsStep
                      : copy.manualReturnStep}
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
                    label={copy.grownBalanceFormulaLabel}
                    tex={`B_{j,m}^{+} = B_{j,m-1} \\times (1 + r_{j,m})`}
                  />
                  <FormulaMath
                    label={copy.proRataWithdrawalFormulaLabel}
                    tex={`R_{j,m} = R_m \\times \\frac{B_{j,m}^{+}}{\\sum_i B_{i,m}^{+}}`}
                  />
                  <FormulaMath
                    label={copy.balanceAfterWithdrawalFormulaLabel}
                    tex={`B_{j,m} = \\max(0, B_{j,m}^{+} - R_{j,m})`}
                  />
                  <FormulaMath
                    className="formula-math-substitution"
                    label={copy.withdrawalSubstitutionLabel}
                    tex={`${texText(formatAbbreviatedValue(monthlyWithdrawal, "currency"))} \\text{ USD/mes}`}
                  />
                  <FormulaResult
                    name={copy.finalBalanceLabel}
                    value={formatAbbreviatedValue(projection.finalBalance, "currency")}
                  />
                </FormulaStep>
              </ol>
            </FormulaTooltip>
          }
        />
        <Metric
          icon={<Clock3 className="icon-sm" />}
          label={copy.duration}
          value={depletionLabel}
          note={durationNote}
          tooltip={
            <FormulaTooltip
              label={copy.duration}
              intro={copy.durationFormulaIntro}
              example={copy.durationExample(
                formatAbbreviatedValue(monthlyWithdrawal, "currency"),
                depletionLabel,
              )}
              trigger={<Calculator className="icon-sm" aria-hidden="true" />}
            >
              <ol className="formula-tooltip-copy">
                <FormulaStep>
                  <span className="formula-step-description">{durationFormulaStep}</span>
                  {projection.depletionMonth === 0 ? (
                    <FormulaMath label={copy.depletionCalculationLabel} tex="B_0 = 0" />
                  ) : projection.depletionMonth !== null ? (
                    <FormulaMath
                      label={copy.depletionCalculationLabel}
                      tex={`\\min(m: 1 \\leq m \\leq ${texText(String(distributionMonthCount))}, B_m = 0) = ${texText(String(projection.depletionMonth))}`}
                    />
                  ) : additionalDepletionMonth !== null ? (
                    <>
                      {projection.finalAssets.map((asset, index) => (
                        <FormulaMath
                          key={investmentProjections[index]?.investment.id ?? index}
                          label={investmentProjections[index]?.investment.name ?? copy.balanceLabel}
                          tex={`B_{j,0} = ${texText(formatAbbreviatedValue(asset.balance, "currency"))}`}
                        />
                      ))}
                      <FormulaMath
                        label={copy.grownBalanceFormulaLabel}
                        tex={`B_{j,k}^{+} = B_{j,k-1} \\times (1 + r_{j,k})`}
                      />
                      <FormulaMath
                        label={copy.proRataWithdrawalFormulaLabel}
                        tex={`R_{j,k} = R_k \\times \\frac{B_{j,k}^{+}}{\\sum_i B_{i,k}^{+}}`}
                      />
                      <FormulaMath
                        label={copy.balanceAfterWithdrawalFormulaLabel}
                        tex={`B_{j,k} = \\max(0, B_{j,k}^{+} - R_{j,k})`}
                      />
                      <FormulaMath
                        label={copy.additionalDurationResultLabel}
                        tex={`\\min(k: k \\geq 1, S_k = 0) = ${texText(String(additionalDepletionMonth))} \\text{ meses}`}
                      />
                    </>
                  ) : projection.finalBalance > 0 ? (
                    <>
                      <FormulaMath
                        label={copy.balanceAtSelectedHorizonLabel}
                        tex={`S_0 = ${texText(formatAbbreviatedValue(projection.finalBalance, "currency"))}`}
                      />
                      <FormulaMath label={copy.durationLabel} tex={`S_k > 0, \\quad k \\geq 1`} />
                    </>
                  ) : years === 0 ? (
                    <FormulaMath
                      label={copy.yearsLabel}
                      tex={`N = ${texText(String(distributionMonthCount))}`}
                    />
                  ) : (
                    <FormulaMath
                      label={copy.durationLabel}
                      tex={`B_m > 0, \\quad 1 \\leq m \\leq ${texText(String(distributionMonthCount))}`}
                    />
                  )}
                  <FormulaResult name={copy.durationLabel} value={depletionLabel} />
                </FormulaStep>
              </ol>
            </FormulaTooltip>
          }
        />
      </section>
    </section>
  );
}
