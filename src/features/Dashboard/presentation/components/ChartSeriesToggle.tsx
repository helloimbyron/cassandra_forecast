import * as veChartSeriesToggleStyles from "./ChartSeriesToggle.css.ts";
import type { ReactNode } from "react";

// --- Props ---

type ChartSeriesToggleProps = {
  checked: boolean;
  color: string;
  dashed?: boolean;
  label: ReactNode;
  onChange: () => void;
  swatch: "line" | "dot";
};

// --- Components ---

export function ChartSeriesToggle({
  checked,
  color,
  dashed = false,
  label,
  onChange,
  swatch,
}: ChartSeriesToggleProps) {
  return (
    <label className={veChartSeriesToggleStyles.seriesToggle}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <i
        className={[
          veChartSeriesToggleStyles.swatch,
          veChartSeriesToggleStyles.swatchType[swatch],
          swatch === "line" && dashed && veChartSeriesToggleStyles.dashedLine,
        ]
          .filter(Boolean)
          .join(" ")}
        style={swatch === "line" ? { borderTopColor: color } : { backgroundColor: color }}
        aria-hidden="true"
      />
      <span>{label}</span>
    </label>
  );
}
