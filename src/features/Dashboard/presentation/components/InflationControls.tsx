import * as veDashboardPrimitivesStyles from "./DashboardPrimitives.css.ts";
import * as veInflationControlsStyles from "./InflationControls.css.ts";
import * as veHeroHorizonControlStyles from "./HeroHorizonControl.css.ts";
import { useState } from "react";
import { Info, Link2 } from "lucide-react";
import { DebouncedSlider } from "@/libraries/cassandra/components/DebouncedSlider";
import { headerCopy } from "@/shared/presentation/copies/header.copy";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { formatInflationRate } from "@/features/Dashboard/presentation/utils/formatInflationRate.util";
import { formatAbbreviatedValue } from "@/features/Dashboard/presentation/formatters/formatAbbreviatedValue.util";
import { FormulaTooltip } from "@/features/Dashboard/presentation/components/FormulaTooltip";
import { sliderTooltipPosition } from "@/design-system/utils/sliderTooltipPosition.util";

// --- Constants ---

const { INFLATION_RATE_STEP_PCT, MAX_INFLATION_RATE_PCT, MIN_INFLATION_RATE_PCT } =
  PORTFOLIO_CONSTANTS;

// --- Types ---

type InflationSource = {
  url: string;
  note: string;
  initialRatePct: number;
};

// --- Components ---

export function InflationControls({
  className,
  layout,
  withInflation,
  onWithInflationChange,
  inflationRatePct,
  onInflationRateChange,
  source,
}: {
  className: string;
  layout: "card" | "inline";
  withInflation: boolean;
  onWithInflationChange: (enabled: boolean) => void;
  inflationRatePct: number;
  onInflationRateChange: (rate: number) => void;
  source?: InflationSource;
}) {
  // --- States ---

  const [draftRateState, setDraftRate] = useState({
    rate: inflationRatePct,
    committedRate: inflationRatePct,
  });

  // --- Variables ---

  const draftRate =
    draftRateState.committedRate === inflationRatePct ? draftRateState.rate : inflationRatePct;
  const displayedRate = formatInflationRate(inflationRatePct);
  const draftProgress =
    (draftRate - MIN_INFLATION_RATE_PCT) / (MAX_INFLATION_RATE_PCT - MIN_INFLATION_RATE_PCT);
  const draftThumbPosition = sliderTooltipPosition(draftProgress);

  // --- Return ---

  return (
    <div
      className={[
        veInflationControlsStyles.inflationControls,
        veInflationControlsStyles.inflationControlsLayout[layout],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          veInflationControlsStyles.inflationControlsHeading,
          "inflation-controls-heading",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {layout === "card" && (
          <div className="inflation-card-heading">
            <div
              className={[
                veInflationControlsStyles.inflationSliderHeading,
                "inflation-slider-heading",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>{headerCopy.inflationSlider}</span>
              {withInflation && (
                <strong>
                  {displayedRate}
                  {labels.percentSymbol}
                </strong>
              )}
            </div>
          </div>
        )}
        <div
          className={[
            veDashboardPrimitivesStyles.distributionModeToggle,
            "distribution-mode-toggle",
          ]
            .filter(Boolean)
            .join(" ")}
          role="group"
          aria-label={headerCopy.inflationMode}
        >
          <button
            type="button"
            aria-pressed={!withInflation}
            onClick={() => onWithInflationChange(!withInflation)}
          >
            {headerCopy.withoutInflation}
          </button>
          <button
            type="button"
            aria-pressed={withInflation}
            onClick={() => onWithInflationChange(!withInflation)}
          >
            {headerCopy.withInflation}
          </button>
        </div>
        {layout === "card" && (
          <FormulaTooltip
            label={headerCopy.inflationHelpTitle}
            intro={headerCopy.inflationHelp}
            example={headerCopy.inflationHelpExample(
              `${displayedRate}%`,
              formatAbbreviatedValue(100 / (1 + inflationRatePct / 100), "currency"),
            )}
            triggerLabel={headerCopy.inflationHelpTrigger}
            trigger={<Info className="icon-sm" aria-hidden="true" />}
          >
            {null}
          </FormulaTooltip>
        )}
        {source && (
          <a
            className={[veDashboardPrimitivesStyles.sourceIconLink, "inflation-source-icon"]
              .filter(Boolean)
              .join(" ")}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            title={source.note}
            aria-label={headerCopy.inflationSourceAriaLabel(source.initialRatePct)}
          >
            <Link2 className="icon-sm" aria-hidden="true" />
          </a>
        )}
      </div>
      {withInflation && (
        <div
          className={[veInflationControlsStyles.inflationSliderControl, "inflation-slider-control"]
            .filter(Boolean)
            .join(" ")}
        >
          {layout === "inline" && (
            <div
              className={[
                veInflationControlsStyles.inflationSliderHeading,
                "inflation-slider-heading",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>{headerCopy.inflationSlider}</span>
              <strong>
                {displayedRate}
                {labels.percentSymbol}
              </strong>
            </div>
          )}
          {layout === "card" && (
            <div
              className={[
                veDashboardPrimitivesStyles.rangeLabels,
                "range-labels inflation-range-labels",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>
                {formatInflationRate(MIN_INFLATION_RATE_PCT)}
                {labels.percentSymbol}
              </span>
              <span>
                {formatInflationRate(MAX_INFLATION_RATE_PCT)}
                {labels.percentSymbol}
              </span>
            </div>
          )}
          <div
            className={[veInflationControlsStyles.inflationSliderWrap, "inflation-slider-wrap"]
              .filter(Boolean)
              .join(" ")}
          >
            <DebouncedSlider
              aria-label={headerCopy.inflationSliderAriaLabel}
              min={MIN_INFLATION_RATE_PCT}
              max={MAX_INFLATION_RATE_PCT}
              step={INFLATION_RATE_STEP_PCT}
              value={[inflationRatePct]}
              onDraftValueChange={(value) =>
                setDraftRate({
                  rate: value[0] ?? inflationRatePct,
                  committedRate: inflationRatePct,
                })
              }
              onValueChange={(value) => onInflationRateChange(value[0] ?? inflationRatePct)}
            />
            {layout === "card" && (
              <span
                className={[
                  veHeroHorizonControlStyles.heroSliderTooltip,
                  veInflationControlsStyles.inflationSliderTooltip,
                  `hero-slider-tooltip inflation-slider-tooltip ${draftRate <= MIN_INFLATION_RATE_PCT + INFLATION_RATE_STEP_PCT ? "is-start" : ""}${draftRate >= MAX_INFLATION_RATE_PCT - INFLATION_RATE_STEP_PCT ? "is-end" : ""}`,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ left: draftThumbPosition }}
                aria-hidden="true"
              >
                {formatInflationRate(draftRate)}
                {labels.percentSymbol}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
