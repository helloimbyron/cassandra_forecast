import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";

export function formatMonths(months: number): string {
  return `${months} ${labels.months}`;
}
