import { positionCopy } from "@/features/Dashboard/presentation/constants/position.constant";

export function projectedPositionLabel(name: string, real = false) {
  return positionCopy.projectedValueFor(name, real);
}
