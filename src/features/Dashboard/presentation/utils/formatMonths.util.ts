import { labels } from "@/features/Dashboard/presentation/constants/labels.constant";

export function formatMonths(months: number): string {
  return `${months} ${labels.months}`;
}
