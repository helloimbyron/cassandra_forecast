import { t } from "@/libraries/i18n";

export function formatYears(years: number): string {
  return t("dashboard.timeUnits.year", { count: years });
}
