import { positionCopy } from "../copy/position";

export function projectedPositionLabel(name: string, real = false) {
  return positionCopy.projectedValueFor(name, real);
}
