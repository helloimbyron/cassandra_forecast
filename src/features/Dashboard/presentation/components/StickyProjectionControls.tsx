import * as veStickyProjectionControlsStyles from "./StickyProjectionControls.css.ts";
import { DebouncedSlider } from "@/libraries/cassandra/components/DebouncedSlider";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { InflationControls } from "@/features/Dashboard/presentation/components/InflationControls";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";
import { heroCardCopy } from "@/features/Dashboard/presentation/copies/heroCard.copy";

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
    <div className={veStickyProjectionControlsStyles.stickyControlsViewport}>
      <div className={veStickyProjectionControlsStyles.stickyProjectionControls}>
        <div className={veStickyProjectionControlsStyles.stickyHorizonControl}>
          <div
            className={[veStickyProjectionControlsStyles.stickyControlLabel, "sticky-control-label"]
              .filter(Boolean)
              .join(" ")}
          >
            <span>{labels.totalHorizon}</span>
            <strong>{totalYears === 0 ? labels.today : formatYears(totalYears)}</strong>
          </div>
          <DebouncedSlider
            aria-label={heroCardCopy.totalHorizonYears}
            min={PORTFOLIO_CONSTANTS.MIN_HORIZON_YEARS}
            max={PORTFOLIO_CONSTANTS.MAX_HORIZON_YEARS}
            step={1}
            value={[totalYears]}
            onValueChange={(value) => onTotalHorizonChange(value[0] ?? totalYears)}
          />
        </div>
        <InflationControls
          layout="inline"
          className={[
            veStickyProjectionControlsStyles.stickyInflationControls,
            "sticky-inflation-controls",
          ]
            .filter(Boolean)
            .join(" ")}
          withInflation={withInflation}
          onWithInflationChange={onWithInflationChange}
          inflationRatePct={inflationRatePct}
          onInflationRateChange={onInflationRateChange}
        />
      </div>
    </div>
  );
}
