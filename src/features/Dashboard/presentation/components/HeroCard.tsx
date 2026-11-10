import * as veFormulaMathStyles from "./FormulaMath.css.ts";
import * as veFormulaStepStyles from "./FormulaStep.css.ts";
import * as veFormulaTooltipStyles from "./FormulaTooltip.css.ts";
import * as veHeroCardStyles from "./HeroCard.css.ts";
import { FormulaStep } from "@/features/Dashboard/presentation/components/FormulaStep";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { signedOutcomeLabel } from "@/features/Dashboard/domain/utils/signedOutcomeLabel.util";
import { heroCardCopy } from "@/features/Dashboard/presentation/copies/heroCard.copy";
import type { LoadedDashboardModel } from "@/features/Dashboard/presentation/types/LoadedDashboardModel.type";
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
import { HeroHorizonControl } from "@/features/Dashboard/presentation/components/HeroHorizonControl";
import { sliderTooltipPosition } from "@/design-system/utils/sliderTooltipPosition.util";

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
  const thumbPosition = sliderTooltipPosition(horizonProgress);

  // --- Return ---

  return (
    <section
      ref={heroCardRef}
      className={[veHeroCardStyles.heroCard, "hero-card"].filter(Boolean).join(" ")}
      data-testid="dashboard-hero-card"
      aria-labelledby="total-title"
    >
      <div
        className={[
          veHeroCardStyles.heroMain,
          !withInflation && veHeroCardStyles.heroMainWithoutInflation,
          `hero-main ${withInflation ? "hero-main-with-inflation" : "hero-main-without-inflation"}`,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={veHeroCardStyles.heroTotal}>
          <div
            className={[veHeroCardStyles.heroValueLabel, veHeroCardStyles.heroGridSubtitle]
              .filter(Boolean)
              .join(" ")}
          >
            <p>{withInflation ? heroCardCopy.realValue : heroCardCopy.nominalValue}</p>
            {withInflation && (
              <FormulaTooltip
                label={heroCardCopy.comparisonInfoTitle}
                intro={heroCardCopy.comparisonInfoIntro}
                triggerLabel={heroCardCopy.comparisonInfoTrigger}
                className={veHeroCardStyles.heroComparisonInfoTrigger}
                trigger={<Info className="icon-sm" aria-hidden="true" />}
              >
                <div className={veHeroCardStyles.heroComparisonInfoCopy}>
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
          <div className={veHeroCardStyles.heroValueSecondary}>
            <div
              className={[
                veHeroCardStyles.heroBreakdownHeading,
                veHeroCardStyles.heroBreakdownHeadingSpacer,
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            />
            <span className={veHeroCardStyles.heroGridSubtitle}>{heroCardCopy.nominalValue}</span>
            <strong className={veHeroCardStyles.heroGridValue}>
              <AbbreviatedMoney value={model.nominalTotalAtHorizon} />
            </strong>
          </div>
        )}
        <div
          className={[veHeroCardStyles.heroCurrentStat, veHeroCardStyles.heroSideStat]
            .filter(Boolean)
            .join(" ")}
          role="group"
          aria-label={heroCardCopy.balances}
        >
          <div
            className={[
              veHeroCardStyles.heroBreakdownHeading,
              veHeroCardStyles.heroBreakdownHeadingSpacer,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          />
          <div
            className={[veHeroCardStyles.heroBalanceValue, "hero-balance-value"]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={veHeroCardStyles.heroGridSubtitle}>
              <Landmark className="icon-sm" aria-hidden="true" /> {labels.currentCapital}
            </span>
            <strong className={veHeroCardStyles.heroGridValue}>
              <AbbreviatedMoney value={initial} />
            </strong>
          </div>
        </div>
        <div
          className={[
            veHeroCardStyles.heroSideStat,
            veHeroCardStyles.heroBorderedStat,
            veHeroCardStyles.heroContributionsStat,
            "hero-contributions-stat",
          ]
            .filter(Boolean)
            .join(" ")}
          role="group"
          aria-label={heroCardCopy.contributions}
        >
          <h4 className={veHeroCardStyles.heroBreakdownHeading}>
            {heroCardCopy.contributions}
            {withInflation && (
              <FormulaTooltip
                label={heroCardCopy.contributionsInfoTitle}
                intro={heroCardCopy.contributionsInfoIntro}
                triggerLabel={heroCardCopy.contributionsInfoTrigger}
                className="hero-contributions-info-trigger"
                trigger={<Info className="icon-sm" aria-hidden="true" />}
              >
                <div className={veHeroCardStyles.heroComparisonInfoCopy}>
                  <p>{heroCardCopy.contributionsInfoExplanation}</p>
                </div>
              </FormulaTooltip>
            )}
          </h4>
          <div
            className={[veHeroCardStyles.heroContributionsValues, "hero-contributions-values"]
              .filter(Boolean)
              .join(" ")}
          >
            {withInflation ? (
              <>
                <div
                  className={[veHeroCardStyles.heroBalanceValue, "hero-balance-value"]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={veHeroCardStyles.heroGridSubtitle}>
                    <ShoppingCart className="icon-sm" aria-hidden="true" />{" "}
                    {heroCardCopy.realContributionsShort}
                  </span>
                  <strong className={veHeroCardStyles.heroGridValue}>
                    <AbbreviatedMoney value={totalContributions} />
                  </strong>
                </div>
                <div
                  className={[veHeroCardStyles.heroBalanceValue, "hero-balance-value"]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={veHeroCardStyles.heroGridSubtitle}>
                    <ChartNoAxesCombined className="icon-sm" aria-hidden="true" />{" "}
                    {heroCardCopy.nominalContributionsShort}
                  </span>
                  <strong className={veHeroCardStyles.heroGridValue}>
                    <AbbreviatedMoney value={nominalTotalContributions} />
                  </strong>
                </div>
              </>
            ) : (
              <div
                className={[veHeroCardStyles.heroBalanceValue, "hero-balance-value"]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className={veHeroCardStyles.heroGridSubtitle}>
                  <PiggyBank className="icon-sm" aria-hidden="true" />{" "}
                  {heroCardCopy.nominalContributions}
                </span>
                <strong className={veHeroCardStyles.heroGridValue}>
                  <AbbreviatedMoney value={nominalTotalContributions} />
                </strong>
              </div>
            )}
          </div>
        </div>
        <div
          className={[
            veHeroCardStyles.heroSideStat,
            veHeroCardStyles.heroBorderedStat,
            veHeroCardStyles.heroGrowthStat,
            "hero-growth-stat",
          ]
            .filter(Boolean)
            .join(" ")}
          role="group"
          aria-label={heroCardCopy.results}
        >
          <h4 className={veHeroCardStyles.heroBreakdownHeading}>{heroCardCopy.results}</h4>
          <div
            className={veHeroCardStyles.heroGrowthValues}
            role="group"
            aria-label={heroCardCopy.results}
          >
            <div className={veHeroCardStyles.heroResultMetric}>
              <span
                className={[
                  veHeroCardStyles.heroGridSubtitle,
                  veHeroCardStyles.heroResultLabel,
                  "hero-result-label",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {totalGrowth > 0 ? (
                  <ArrowUp className="icon-sm" aria-hidden="true" />
                ) : totalGrowth < 0 ? (
                  <ArrowDown className="icon-sm" aria-hidden="true" />
                ) : (
                  <Minus className="icon-sm" aria-hidden="true" />
                )}
                {signedOutcomeLabel(totalGrowth)}
              </span>
              <div
                className={[veHeroCardStyles.heroGridValue, veHeroCardStyles.heroResultValue]
                  .filter(Boolean)
                  .join(" ")}
              >
                <AbbreviatedMoney value={totalGrowth} />
                <FormulaTooltip
                  label={signedOutcomeLabel(totalGrowth)}
                  intro={heroCardCopy.finalValueDifferenceExplanation}
                  example={heroCardCopy.growthExample(
                    formatAbbreviatedValue(totalAtHorizon, "currency"),
                    formatAbbreviatedValue(initial, "currency"),
                    formatAbbreviatedValue(totalContributions, "currency"),
                    formatAbbreviatedValue(totalGrowth, "currency"),
                  )}
                  trigger={<Calculator className="icon-sm" aria-hidden="true" />}
                >
                  <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
                    <FormulaStep>
                      <span className={veFormulaStepStyles.formulaStepDescription}>
                        {heroCardCopy.distinguishesContributionsFromProjectedValue}
                      </span>
                      <FormulaMath
                        label={heroCardCopy.projectedGrowthCalculation}
                        tex={`${texText(labels.projectedValue)} - ${texText(labels.currentCapital)} - ${texText(labels.plannedContributions)}`}
                      />
                    </FormulaStep>
                    <FormulaStep>
                      <span className={veFormulaStepStyles.formulaStepDescription}>
                        {heroCardCopy.subtractCurrentCapitalAndAllContributions}
                      </span>
                      <FormulaMath
                        label={heroCardCopy.growthValueSubstitution}
                        className={veFormulaMathStyles.formulaMathSubstitution}
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
            <div className={veHeroCardStyles.heroResultMetric}>
              <span
                className={[
                  veHeroCardStyles.heroGridSubtitle,
                  veHeroCardStyles.heroResultLabel,
                  "hero-result-label",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Percent className="icon-sm" aria-hidden="true" />
                {heroCardCopy.returnLabel}
              </span>
              <div
                className={[veHeroCardStyles.heroGridValue, veHeroCardStyles.heroResultValue]
                  .filter(Boolean)
                  .join(" ")}
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
                  intro={heroCardCopy.growthRelativeToCapitalExplanation}
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
                  <ol className={veFormulaTooltipStyles.formulaTooltipCopy}>
                    <FormulaStep>
                      <span className={veFormulaStepStyles.formulaStepDescription}>
                        {heroCardCopy.usesCurrentCapitalAsReference}
                      </span>
                      <FormulaMath
                        label={heroCardCopy.growthAsPercentOfCurrentCapital}
                        tex={`\\frac{${texText(labels.growth)}}{${texText(labels.currentCapital)}} \\times 100`}
                      />
                    </FormulaStep>
                    <FormulaStep>
                      <span className={veFormulaStepStyles.formulaStepDescription}>
                        {summaryInsights.growthPctOfCurrent === null
                          ? heroCardCopy.noCurrentCapital
                          : heroCardCopy.substituteAmountsToShowComparison}
                      </span>
                      {summaryInsights.growthPctOfCurrent !== null && (
                        <FormulaMath
                          label={heroCardCopy.growthPercentValueSubstitution}
                          className={veFormulaMathStyles.formulaMathSubstitution}
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
      <div className={veHeroCardStyles.heroControlsGrid}>
        <HeroHorizonControl
          totalYears={totalYears}
          draftYears={draftYears}
          thumbPosition={thumbPosition}
          onDraftYearChange={(years) => setDraftYears({ years, committedYears: totalYears })}
          onHorizonChange={setTotalHorizon}
        />
        <InflationControls
          layout="card"
          className={[veHeroCardStyles.heroInflationControls, "hero-inflation-controls"].join(" ")}
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
