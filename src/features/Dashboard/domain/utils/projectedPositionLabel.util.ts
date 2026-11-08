import { positionCopy } from "@/features/Dashboard/presentation/copies/position.copy";

export function projectedPositionLabel(name: string, real = false) {
  return positionCopy.projectedValueFor(name, real);
}
