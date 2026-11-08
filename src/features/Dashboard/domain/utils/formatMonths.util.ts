import { t } from "@/libraries/i18n";

export function formatMonths(months: number): string {
  return t("dashboard.timeUnits.month", { count: months });
}
