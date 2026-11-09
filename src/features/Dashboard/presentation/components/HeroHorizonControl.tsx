import "./HeroHorizonControl.css.ts";
import { heroCardCopy } from "@/features/Dashboard/presentation/copies/heroCard.copy";
import { DebouncedSlider } from "@/libraries/cassandra/components/DebouncedSlider";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";

const { MAX_HORIZON_YEARS, MIN_HORIZON_YEARS } = PORTFOLIO_CONSTANTS;

export function HeroHorizonControl({
  totalYears,
  draftYears,
  thumbPosition,
  onDraftYearChange,
  onHorizonChange,
}: {
  totalYears: number;
  draftYears: number;
  thumbPosition: string;
  onDraftYearChange: (years: number) => void;
  onHorizonChange: (years: number) => void;
}) {
  return (
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
          aria-label={heroCardCopy.totalHorizonYears}
          min={MIN_HORIZON_YEARS}
          max={MAX_HORIZON_YEARS}
          step={1}
          value={[totalYears]}
          onDraftValueChange={(value) => onDraftYearChange(value[0] ?? totalYears)}
          onValueChange={(value) => onHorizonChange(value[0] ?? totalYears)}
        />
        <span
          className={`hero-slider-tooltip ${draftYears <= 3 ? "is-start" : draftYears >= 37 ? "is-end" : ""}`}
          style={{ left: thumbPosition }}
          aria-hidden="true"
        >
          {draftYears}
          {heroCardCopy.years}
        </span>
      </div>
    </div>
  );
}
