import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";
import { signedOutcomeLabel } from "@/features/Dashboard/domain/utils/signedOutcomeLabel.util";
import { heroCardCopy } from "@/features/Dashboard/presentation/copies/heroCard.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
import { DebouncedSlider } from "@/design-system/components/sliders/DebouncedSlider";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import {
  ArrowDown,
  ArrowUp,
  ChartNoAxesCombined,
  Minus,
  Percent,
  PiggyBank,
  ShoppingCart,
} from "lucide-react";
import { Landmark } from "lucide-react";
import { Calculator, Info } from "lucide-react";
import { AbbreviatedMoney } from "@/features/Dashboard/presentation/components/money/AbbreviatedMoney";
import { AbbreviatedValue } from "@/features/Dashboard/presentation/components/money/AbbreviatedValue";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { FormulaResult } from "@/features/Dashboard/presentation/components/FormulaResult";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { useState } from "react";
import { InflationControls } from "@/features/Dashboard/presentation/components/InflationControls";

// --- Constants ---

const { MAX_HORIZON_YEARS, MIN_HORIZON_YEARS } = PORTFOLIO_CONSTANTS;

// --- Components ---

export function HeroCard({
  model,
  heroCardRef,
}: {
  model: LoadedDashboardModel;
  heroCardRef?: (node: HTMLElement | null) => void;
}) {
  // --- Variables ---

  const {
    portfolio,
    totalYears,
    setTotalHorizon,
    withInflation,
    setWithInflation,
    inflationRatePct,
    setInflationRatePct,
    initial,
    totalAtHorizon,
    totalContributions,
    nominalTotalContributions,
    realTotalContributions,
    summaryInsights,
    totalGrowth,
  } = model;

  // --- States ---

  const [draftYearsState, setDraftYears] = useState({
    years: totalYears,
    committedYears: totalYears,
  });
  const draftYears =
    draftYearsState.committedYears === totalYears ? draftYearsState.years : totalYears;
  const horizonProgress =
    (draftYears - MIN_HORIZON_YEARS) / (MAX_HORIZON_YEARS - MIN_HORIZON_YEARS);
  const thumbPosition = `calc(${horizonProgress * 100}% + ${10 - horizonProgress * 20}px)`;

  // --- Return ---

  return (
    <section ref={heroCardRef} className="hero-card" aria-labelledby="total-title">
      <div
        className={`hero-main ${
          withInflation ? "hero-main-with-inflation" : "hero-main-without-inflation"
        }`}
      >
        <div className="hero-total">
          <div className="hero-value-label hero-grid-subtitle">
            <p>{withInflation ? heroCardCopy.realValue : heroCardCopy.nominalValue}</p>
            {withInflation && (
              <FormulaTooltip
                label={heroCardCopy.comparisonInfoTitle}
                intro={heroCardCopy.comparisonInfoIntro}
                triggerLabel={heroCardCopy.comparisonInfoTrigger}
                className="hero-comparison-info-trigger"
                trigger={<Info className="icon-sm" aria-hidden="true" />}
              >
                <div className="hero-comparison-info-copy">
                  <p>
                    {heroCardCopy.balanceComparisonExample(
                      formatAbbreviatedValue(model.nominalTotalAtHorizon, "currency"),
                      formatAbbreviatedValue(model.realTotalAtHorizon, "currency"),
                    )}
                  </p>
                  <p>
                    {heroCardCopy.contributionsComparisonExample(
                      formatAbbreviatedValue(nominalTotalContributions, "currency"),
                      formatAbbreviatedValue(realTotalContributions, "currency"),
                    )}
                  </p>
                </div>
              </FormulaTooltip>
            )}
          </div>
          <h3 id="total-title">
            <AbbreviatedMoney
              value={withInflation ? model.realTotalAtHorizon : model.nominalTotalAtHorizon}
            />
          </h3>
        </div>
        {withInflation && (
          <div className="hero-value-secondary">
            <div
              className="hero-breakdown-heading hero-breakdown-heading-spacer"
              aria-hidden="true"
            />
            <span className="hero-grid-subtitle">{heroCardCopy.nominalValue}</span>
            <strong className="hero-grid-value">
              <AbbreviatedMoney value={model.nominalTotalAtHorizon} />
            </strong>
          </div>
        )}
        <div
          className="hero-side-stat hero-current-stat"
          role="group"
          aria-label={heroCardCopy.balances}
        >
          <div
            className="hero-breakdown-heading hero-breakdown-heading-spacer"
            aria-hidden="true"
          />
          <div className="hero-balance-value">
            <span className="hero-grid-subtitle">
              <Landmark className="icon-sm" aria-hidden="true" /> {labels.currentCapital}
            </span>
            <strong className="hero-grid-value">
              <AbbreviatedMoney value={initial} />
            </strong>
          </div>
        </div>
        <div
          className="hero-side-stat hero-contributions-stat"
          role="group"
          aria-label={heroCardCopy.contributions}
        >
          <h4 className="hero-breakdown-heading">
            {heroCardCopy.contributions}
            {withInflation && (
              <FormulaTooltip
                label={heroCardCopy.contributionsInfoTitle}
                intro={heroCardCopy.contributionsInfoIntro}
                triggerLabel={heroCardCopy.contributionsInfoTrigger}
                className="hero-contributions-info-trigger"
                trigger={<Info className="icon-sm" aria-hidden="true" />}
              >
                <div className="hero-comparison-info-copy">
                  <p>{heroCardCopy.contributionsInfoExplanation}</p>
                </div>
              </FormulaTooltip>
            )}
          </h4>
          <div className="hero-contributions-values">
            {withInflation ? (
              <>
                <div className="hero-balance-value">
                  <span className="hero-grid-subtitle">
                    <ShoppingCart className="icon-sm" aria-hidden="true" />{" "}
                    {heroCardCopy.realContributionsShort}
                  </span>
                  <strong className="hero-grid-value">
                    <AbbreviatedMoney value={totalContributions} />
                  </strong>
                </div>
                <div className="hero-balance-value">
                  <span className="hero-grid-subtitle">
                    <ChartNoAxesCombined className="icon-sm" aria-hidden="true" />{" "}
                    {heroCardCopy.nominalContributionsShort}
                  </span>
                  <strong className="hero-grid-value">
                    <AbbreviatedMoney value={nominalTotalContributions} />
                  </strong>
                </div>
              </>
            ) : (
              <div className="hero-balance-value">
                <span className="hero-grid-subtitle">
                  <PiggyBank className="icon-sm" aria-hidden="true" />{" "}
                  {heroCardCopy.nominalContributions}
                </span>
                <strong className="hero-grid-value">
                  <AbbreviatedMoney value={nominalTotalContributions} />
                </strong>
              </div>
            )}
          </div>
        </div>
        <div
          className="hero-side-stat hero-growth-stat"
          role="group"
          aria-label={heroCardCopy.results}
        >
          <h4 className="hero-breakdown-heading">{heroCardCopy.results}</h4>
          <div className="hero-growth-values" role="group" aria-label={heroCardCopy.results}>
            <div className="hero-result-metric">
              <span className="hero-result-label hero-grid-subtitle">
                {totalGrowth > 0 ? (
                  <ArrowUp className="icon-sm" aria-hidden="true" />
                ) : totalGrowth < 0 ? (
                  <ArrowDown className="icon-sm" aria-hidden="true" />
                ) : (
                  <Minus className="icon-sm" aria-hidden="true" />
                )}
                {signedOutcomeLabel(totalGrowth)}
              </span>
              <div className="hero-result-value hero-grid-value">
                <AbbreviatedMoney value={totalGrowth} />
                <FormulaTooltip
                  label={signedOutcomeLabel(totalGrowth)}
                  intro={heroCardCopy.esLaDiferenciaEntreElValorFinal}
                  example={heroCardCopy.growthExample(
                    formatAbbreviatedValue(totalAtHorizon, "currency"),
                    formatAbbreviatedValue(initial, "currency"),
                    formatAbbreviatedValue(totalContributions, "currency"),
                    formatAbbreviatedValue(totalGrowth, "currency"),
                  )}
                  trigger={<Calculator className="icon-sm" aria-hidden="true" />}
                >
                  <ol className="formula-tooltip-copy">
                    <FormulaStep>
                      <span className="formula-step-description">
                        {heroCardCopy.separaElDineroQuePusisteDelValor}
                      </span>
                      <FormulaMath
                        label={heroCardCopy.valorProyectadoMenosCapitalActualYAportes}
                        tex={`${texText(labels.projectedValue)} - ${texText(labels.currentCapital)} - ${texText(labels.plannedContributions)}`}
                      />
                    </FormulaStep>
                    <FormulaStep>
                      <span className="formula-step-description">
                        {heroCardCopy.restaElCapitalActualYTodosLos}
                      </span>
                      <FormulaMath
                        label={heroCardCopy.sustitucionDeValoresDelCrecimiento}
                        className="formula-math-substitution"
                        tex={`${texText(formatAbbreviatedValue(totalAtHorizon, "currency"))} - ${texText(formatAbbreviatedValue(initial, "currency"))} - ${texText(formatAbbreviatedValue(totalContributions, "currency"))}`}
                      />
                      <FormulaResult
                        name={signedOutcomeLabel(totalGrowth)}
                        value={formatAbbreviatedValue(totalGrowth, "currency")}
                      />
                    </FormulaStep>
                  </ol>
                </FormulaTooltip>
              </div>
            </div>
            <div className="hero-result-metric">
              <span className="hero-result-label hero-grid-subtitle">
                <Percent className="icon-sm" aria-hidden="true" />
                {heroCardCopy.returnLabel}
              </span>
              <div
                className="hero-result-value hero-grid-value"
                role="group"
                aria-label={
                  summaryInsights.growthPctOfCurrent === null
                    ? labels.growthPercent
                    : signedOutcomeLabel(summaryInsights.growthPctOfCurrent)
                }
              >
                {summaryInsights.growthPctOfCurrent === null ? (
                  "—"
                ) : (
                  <AbbreviatedValue value={summaryInsights.growthPctOfCurrent} unit="percent" />
                )}
                <FormulaTooltip
                  label={
                    summaryInsights.growthPctOfCurrent === null
                      ? labels.growthPercent
                      : signedOutcomeLabel(summaryInsights.growthPctOfCurrent)
                  }
                  intro={heroCardCopy.mideElCrecimientoFrenteAlCapitalQue}
                  example={
                    summaryInsights.growthPctOfCurrent === null
                      ? undefined
                      : heroCardCopy.growthPercentExample(
                          formatAbbreviatedValue(totalGrowth, "currency"),
                          formatAbbreviatedValue(initial, "currency"),
                          formatAbbreviatedValue(summaryInsights.growthPctOfCurrent, "percent"),
                        )
                  }
                  trigger={<Calculator className="icon-sm" aria-hidden="true" />}
                >
                  <ol className="formula-tooltip-copy">
                    <FormulaStep>
                      <span className="formula-step-description">
                        {heroCardCopy.usaElCapitalActualComoReferenciaNo}
                      </span>
                      <FormulaMath
                        label={heroCardCopy.crecimientoDivididoParaCapitalActualPor100}
                        tex={`\\frac{${texText(labels.growth)}}{${texText(labels.currentCapital)}} \\times 100`}
                      />
                    </FormulaStep>
                    <FormulaStep>
                      <span className="formula-step-description">
                        {summaryInsights.growthPctOfCurrent === null
                          ? heroCardCopy.noCurrentCapital
                          : heroCardCopy.sustituyeLosImportesYExpresaLaComparacion}
                      </span>
                      {summaryInsights.growthPctOfCurrent !== null && (
                        <FormulaMath
                          label={heroCardCopy.sustitucionDeValoresDelCrecimientoPorcentual}
                          className="formula-math-substitution"
                          tex={`\\frac{${texText(formatAbbreviatedValue(totalGrowth, "currency"))}}{${texText(formatAbbreviatedValue(initial, "currency"))}} \\times 100`}
                        />
                      )}
                      {summaryInsights.growthPctOfCurrent !== null && (
                        <FormulaResult
                          name={signedOutcomeLabel(summaryInsights.growthPctOfCurrent, "growth")}
                          value={formatAbbreviatedValue(
                            summaryInsights.growthPctOfCurrent,
                            "percent",
                          )}
                        />
                      )}
                    </FormulaStep>
                  </ol>
                </FormulaTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-controls-grid">
        <div className="hero-horizon">
          <div className="horizon-label">
            <span>{labels.totalHorizon}</span>
            <strong>{totalYears === 0 ? labels.today : formatYears(totalYears)}</strong>
          </div>
          <div className="range-labels">
            <span>{labels.zeroToday}</span>
            <span>{labels.fortyYears}</span>
          </div>
          <div className="hero-slider-wrap">
            <DebouncedSlider
              aria-label={heroCardCopy.plazoTotalAnos}
              min={MIN_HORIZON_YEARS}
              max={MAX_HORIZON_YEARS}
              step={1}
              value={[totalYears]}
              onDraftValueChange={(value) =>
                setDraftYears({ years: value[0] ?? totalYears, committedYears: totalYears })
              }
              onValueChange={(value) => setTotalHorizon(value[0] ?? totalYears)}
            />
            <span
              className={`hero-slider-tooltip ${draftYears <= 3 ? "is-start" : draftYears >= 37 ? "is-end" : ""}`}
              style={{ left: thumbPosition }}
              aria-hidden="true"
            >
              {draftYears}
              {heroCardCopy.anos}
            </span>
          </div>
        </div>
        <InflationControls
          layout="card"
          className="hero-inflation-controls"
          withInflation={withInflation}
          onWithInflationChange={setWithInflation}
          inflationRatePct={inflationRatePct}
          onInflationRateChange={setInflationRatePct}
          source={{
            url: portfolio.inflation.source.url,
            note: portfolio.inflation.note,
            initialRatePct: portfolio.inflation.annualRatePct,
          }}
        />
      </div>
    </section>
  );
}
