export function withdrawalRateSliderMax(ratePct: number, standardMax = 20, step = 0.25) {

  return Math.max(standardMax, Math.ceil(ratePct / step) * step);
}
