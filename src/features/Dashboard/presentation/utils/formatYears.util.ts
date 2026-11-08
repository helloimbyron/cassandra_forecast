import { labels } from "@/features/Dashboard/presentation/constants/labels.constant";

export function formatYears(years: number): string {
  return `${years} ${labels.years}`;
}
