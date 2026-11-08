import { labels } from "@/features/Portfolio/presentation/copy/labels.constant";

export function formatYears(years: number): string {

  return `${years} ${labels.years}`;
}
