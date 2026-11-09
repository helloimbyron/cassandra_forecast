/** Positions a tooltip over the slider thumb without duplicating its CSS size. */
export function sliderTooltipPosition(progress: number): string {
  const style = getComputedStyle(document.documentElement);
  const token = style.getPropertyValue("--slider-thumb-size").trim();
  const rootFontSize = Number.parseFloat(style.fontSize);
  const numericSize = Number.parseFloat(token);
  if (!Number.isFinite(numericSize) || numericSize <= 0) {
    throw new Error("Invalid design token --slider-thumb-size");
  }

  let thumbSizePx: number;
  if (token.endsWith("rem")) {
    if (!Number.isFinite(rootFontSize) || rootFontSize <= 0) {
      throw new Error("Invalid root font size for --slider-thumb-size");
    }
    thumbSizePx = numericSize * rootFontSize;
  } else if (token.endsWith("px")) {
    thumbSizePx = numericSize;
  } else {
    throw new Error("Unsupported unit for --slider-thumb-size");
  }

  return `calc(${progress * 100}% + ${thumbSizePx / 2 - progress * thumbSizePx}px)`;
}
