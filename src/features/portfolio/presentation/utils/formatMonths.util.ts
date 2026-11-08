import { labels } from "@/features/Portfolio/presentation/copy/labels.constant";

export function formatMonths(months: number): string {

  return `${months} ${labels.months}`;
}
