import { escapeTexText } from "./escapeTexText";

export function texText(value: string) {
  return `\\text{${escapeTexText(value)}}`;
}
