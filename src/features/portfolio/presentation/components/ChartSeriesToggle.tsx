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
    <label className={checked ? "series-toggle" : "series-toggle is-hidden"}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <i
        className={
          swatch === "dot"
            ? "series-toggle-swatch"
            : dashed
              ? "series-toggle-swatch is-line is-dashed"
              : "series-toggle-swatch is-line"
        }
        style={swatch === "line" ? { borderTopColor: color } : { backgroundColor: color }}
        aria-hidden="true"
      />
      <span>{label}</span>
    </label>
  );
}
