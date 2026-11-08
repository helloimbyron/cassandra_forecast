import { formatAbbreviatedValue } from "./formatAbbreviatedValue.util";

/** Las etiquetas del eje son texto plano y no muestran tooltips interactivos. */
export function formatAxisUsd(value: number): string {
  return formatAbbreviatedValue(value, "currency", "axis");
}
