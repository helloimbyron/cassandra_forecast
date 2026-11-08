import { escapeTexText } from "@/features/Portfolio/presentation/utils/escapeTexText.util";

export function texText(value: string) {

  return `\\text{${escapeTexText(value)}}`;
}
