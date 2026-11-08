import { labels } from "../copy/labels";

export function formatMonths(months: number): string {
  return `${months} ${labels.months}`;
}
