function readToken(style: CSSStyleDeclaration, name: string): string {
  const value = style.getPropertyValue(name).trim();
  if (!value) throw new Error(`Missing design token ${name}`);
  return value;
}

function readNumber(style: CSSStyleDeclaration, name: string): number {
  const value = Number(readToken(style, name));
  if (!Number.isFinite(value)) throw new Error(`Invalid numeric design token ${name}`);
  return value;
}

export function readChartVisualTokens() {
  const style = getComputedStyle(document.documentElement);
  return {
    margin: {
      top: readNumber(style, "--chart-margin-top"),
      right: readNumber(style, "--chart-margin-right"),
      left: readNumber(style, "--chart-margin-left"),
      bottom: readNumber(style, "--chart-margin-bottom"),
    },
    yAxisWidth: readNumber(style, "--chart-y-axis-width"),
    distributionYAxisWidth: readNumber(style, "--chart-distribution-y-axis-width"),
    xMinTickGap: readNumber(style, "--chart-x-min-tick-gap"),
    gridDasharray: readToken(style, "--chart-grid-dasharray"),
    investedDasharray: readToken(style, "--chart-invested-dasharray"),
    activeDotRadius: readNumber(style, "--chart-active-dot-radius"),
    activeDotStrokeWidth: readNumber(style, "--chart-active-dot-stroke-width"),
    areaFillOpacity: readNumber(style, "--chart-area-fill-opacity"),
    distributionFillOpacity: readNumber(style, "--chart-distribution-fill-opacity"),
    gradientStartOffset: readToken(style, "--chart-gradient-start-offset"),
    gradientEndOffset: readToken(style, "--chart-gradient-end-offset"),
    gradientStartOpacity: readNumber(style, "--chart-gradient-start-opacity"),
    gradientEndOpacity: readNumber(style, "--chart-gradient-end-opacity"),
  };
}
