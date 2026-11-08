import { escapeTexText } from "@/features/Dashboard/presentation/utils/escapeTexText.util";

export function texText(value: string) {
  return `\\text{${escapeTexText(value)}}`;
}
