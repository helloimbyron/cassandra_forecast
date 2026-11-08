import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";

export function formatYears(years: number): string {
  return `${years} ${labels.years}`;
}
