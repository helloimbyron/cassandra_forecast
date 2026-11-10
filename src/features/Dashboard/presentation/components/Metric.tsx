import * as veMetricStyles from "./Metric.css.ts";
import { dashboardCardSurface } from "./DashboardPrimitives.css.ts";
import type { ReactNode } from "react";
import { Card } from "@/libraries/shadcn/components/cards/Card";
import { CardContent } from "@/libraries/shadcn/components/cards/CardContent";

export function Metric({
  icon,
  label,
  value,
  note,
  positive = false,
  tooltip,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  note: ReactNode;
  positive?: boolean;
  tooltip?: ReactNode;
}) {
  return (
    <Card className={[dashboardCardSurface, veMetricStyles.metricCard, "metric-card"].join(" ")}>
      <CardContent>
        <div className={veMetricStyles.metricLabel}>
          <span className={veMetricStyles.metricLabelIcon}>{icon}</span>
          <span className={veMetricStyles.metricLabelText}>{label}</span>
        </div>
        <div
          className={[veMetricStyles.metricValueRow, "metric-value-row"].filter(Boolean).join(" ")}
        >
          <strong className={positive ? veMetricStyles.metricPositive : ""}>{value}</strong>
          {tooltip}
        </div>
        <small>{note}</small>
      </CardContent>
    </Card>
  );
}
