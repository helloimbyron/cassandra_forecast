import { positionCopy } from "@/features/Portfolio/presentation/copy/position.constant";

export function projectedPositionLabel(name: string, real = false) {

  return positionCopy.projectedValueFor(name, real);
}
