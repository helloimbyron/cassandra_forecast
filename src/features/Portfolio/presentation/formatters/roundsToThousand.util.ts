export function roundsToThousand(value: number): boolean {
  return Math.round((value + Number.EPSILON) * 100) / 100 >= 1000;
}
