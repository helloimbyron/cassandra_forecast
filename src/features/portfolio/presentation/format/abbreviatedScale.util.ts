import type { ValuePrecision } from "@/features/Portfolio/presentation/format/ValuePrecision.type";
import { SCIENTIFIC_THRESHOLD } from "@/features/Portfolio/presentation/format/scientificThreshold.constant";

// --- Constants ---

const SUFFIXES = ["", "K", "M", "G", "T", "P", "E", "Z", "Y", "R", "Q"] as const;

// --- Utils ---

/** Potencias de 1000 con sufijos de visualización en mayúscula desde K=10³ hasta Q=10³⁰. */
export function abbreviatedScale(value: number, precision: ValuePrecision = "standard") {
  const magnitude = Math.abs(value);

  if (!Number.isFinite(magnitude) || magnitude >= SCIENTIFIC_THRESHOLD) {

    return { scale: 1, suffix: "" };
  }

  const factor = precision === "axis" ? 1 : 100;
  let group = 0;

  while (group < SUFFIXES.length - 1 && magnitude >= 10 ** ((group + 1) * 3)) {
    group += 1;
  }

  let scale = 10 ** (group * 3);

  if (Math.round((magnitude / scale) * factor) / factor >= 1000 && group < SUFFIXES.length - 1) {
    group += 1;
    scale = 10 ** (group * 3);
  }

  return { scale, suffix: SUFFIXES[group] };
}
