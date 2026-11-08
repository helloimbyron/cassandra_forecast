import { DebouncedSlider } from "@/design-system/components/sliders/DebouncedSlider";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { InflationControls } from "@/features/Dashboard/presentation/components/InflationControls";
import { labels } from "@/features/Dashboard/presentation/constants/labels.constant";
import { copy as heroCopy } from "@/features/Dashboard/presentation/constants/HeroCard.constant";

export function StickyProjectionControls({
  totalYears,
  onTotalHorizonChange,
  inflationRatePct,
  onInflationRateChange,
  withInflation,
  onWithInflationChange,
}: {
  totalYears: number;
  onTotalHorizonChange: (years: number) => void;
  inflationRatePct: number;
  onInflationRateChange: (rate: number) => void;
  withInflation: boolean;
  onWithInflationChange: (enabled: boolean) => void;
}) {
  return (
    <div className="sticky-controls-viewport">
      <div className="sticky-projection-controls">
        <div className="sticky-horizon-control">
          <div className="sticky-control-label">
            <span>{labels.totalHorizon}</span>
            <strong>{totalYears === 0 ? labels.today : `${totalYears} ${labels.years}`}</strong>
          </div>
          <DebouncedSlider
            aria-label={heroCopy.plazoTotalAnos}
            min={PORTFOLIO_CONSTANTS.MIN_HORIZON_YEARS}
            max={PORTFOLIO_CONSTANTS.MAX_HORIZON_YEARS}
            step={1}
            value={[totalYears]}
            onValueChange={(value) => onTotalHorizonChange(value[0] ?? totalYears)}
          />
        </div>
        <InflationControls
          layout="inline"
          className="sticky-inflation-controls"
          withInflation={withInflation}
          onWithInflationChange={onWithInflationChange}
          inflationRatePct={inflationRatePct}
          onInflationRateChange={onInflationRateChange}
        />
      </div>
    </div>
  );
}
