export function adjacentStepValue(value: number, step: number, direction: -1 | 1): number {
  const scaled = value / step;
  const index = direction > 0 ? Math.floor(scaled + 1e-10) + 1 : Math.ceil(scaled - 1e-10) - 1;
  return Number((index * step).toFixed(10));
}
