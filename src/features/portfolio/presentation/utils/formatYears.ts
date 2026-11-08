import { labels } from "../copy/labels";

export function formatYears(years: number): string {
  return `${years} ${labels.years}`;
}
