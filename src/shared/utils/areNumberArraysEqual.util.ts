export function areNumberArraysEqual(left: number[], right: number[]) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
