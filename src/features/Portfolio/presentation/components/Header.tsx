import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";
import { copy } from "@/features/Portfolio/presentation/constants/Header.constant";
import { Upload } from "lucide-react";
import { BrandMark } from "@/features/Portfolio/presentation/components/BrandMark";
import { ThemeToggle } from "@/features/Portfolio/presentation/components/ThemeToggle";
import { Button } from "@/design-system/components/Button";
import type { MouseEvent } from "react";
import type { Portfolio } from "@/features/Portfolio/domain/types/Portfolio.type";
import { DebouncedSlider } from "@/design-system/components/DebouncedSlider";
import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";
import { copy as heroCopy } from "@/features/Portfolio/presentation/constants/HeroCard.constant";
import { InflationControls } from "@/features/Portfolio/presentation/components/InflationControls";

// --- Constants ---

const { MAX_HORIZON_YEARS, MIN_HORIZON_YEARS } = PORTFOLIO_CONSTANTS;

// --- Components ---

export function Header({
  onNavigateHome,
  onChangeJson,
  inflation,
  inflationRatePct,
  onInflationRateChange,
  totalYears,
  onTotalHorizonChange,
  showProjectionControls,
  withInflation,
  onWithInflationChange,
}: {
  onNavigateHome: () => void;
  onChangeJson?: () => void;
  inflation?: Portfolio["inflation"];
  inflationRatePct: number;
  onInflationRateChange: (rate: number) => void;
  totalYears: number;
  onTotalHorizonChange: (years: number) => void;
  showProjectionControls: boolean;
  withInflation: boolean;
  onWithInflationChange: (enabled: boolean) => void;
}) {
  // --- Handlers ---

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigateHome();
  }

  // --- Return ---

  return (
    <header
      className={`topbar${showProjectionControls && inflation ? "has-projection-controls" : ""}`}
    >
      <div className="brand-group">
        <a className="brand" href="/" onClick={handleBrandClick} aria-label={copy.cassandraInicio}>
          <span className="brand-mark">
            <BrandMark />
          </span>
          <span>{labels.brand}</span>
        </a>
      </div>
      {inflation && showProjectionControls && (
        <div className="sticky-controls-viewport">
          <div className="sticky-projection-controls">
            <div className="sticky-horizon-control">
              <div className="sticky-control-label">
                <span>{labels.totalHorizon}</span>
                <strong>{totalYears === 0 ? labels.today : `${totalYears} ${labels.years}`}</strong>
              </div>
              <DebouncedSlider
                aria-label={heroCopy.plazoTotalAnos}
                min={MIN_HORIZON_YEARS}
                max={MAX_HORIZON_YEARS}
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
      )}
      <div className="topbar-actions" role="group" aria-label={copy.headerActions}>
        {onChangeJson && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="change-json-toggle"
            onClick={onChangeJson}
            aria-label={copy.cambiarJson}
            title={copy.cambiarJson}
          >
            <Upload aria-hidden="true" />
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
