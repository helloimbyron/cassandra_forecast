import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints } from "@/design-system/styles/breakpoints.build";

export const heroCard = style({
  position: "relative",
  overflow: "hidden",
  padding: "var(--space-5)",
  paddingBottom: "calc(var(--space-5) + var(--space-2) + var(--space-075))",
  borderRadius: "var(--radius-card)",
  color: "var(--hero-text)",
  background: "var(--hero-gradient)",
  boxShadow:
    "var(--shadow-card),\n    inset 0 0 0 var(--line-thin) color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
});

// Contextual overrides for InflationControls when rendered inside the hero.
export const heroInflationControls = style({});

globalStyle(`${heroCard}::after`, {
  content: '""',
  position: "absolute",
  width: "var(--size-24)",
  height: "var(--size-24)",
  right: "var(--hero-orbit-offset)",
  top: "calc(-1 * var(--size-19))",
  border: "var(--line-thin) solid color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  borderRadius: "50%",
  boxShadow:
    "0 0 0 var(--space-55) color-mix(in srgb, var(--hero-text) var(--mix-04), transparent),\n    0 0 0 var(--size-5) color-mix(in srgb, var(--hero-text) var(--mix-04), transparent)",
  pointerEvents: "none",
});

export const heroMain = style({
  position: "relative",
  zIndex: "var(--layer-content)",
  display: "grid",
  gridTemplateColumns:
    "minmax(var(--size-12), 1.4fr)\n    minmax(var(--size-7), 0.8fr)\n    minmax(var(--size-8), 0.9fr)\n    minmax(var(--size-18), 1.8fr)\n    minmax(var(--size-16), 1.7fr)",
  alignItems: "stretch",
  columnGap: "var(--space-3)",
  padding: "0 0 var(--space-5)",
});

export const heroMainWithoutInflation = style({
  gridTemplateColumns:
    "minmax(var(--size-12), 1.5fr)\n    minmax(var(--size-8), 1fr)\n    minmax(var(--size-16-5), 2fr)\n    minmax(var(--size-15), 1.8fr)",
});

globalStyle(`${heroMainWithoutInflation} .hero-contributions-values`, {
  gridTemplateColumns: "minmax(0, 1fr)",
});

export const heroTotal = style({
  minWidth: "0",
});

globalStyle(`.hero-main-with-inflation ${heroTotal}`, {
  paddingRight: "var(--space-3)",
});

globalStyle(`${heroTotal} h3`, {
  marginBottom: "0",
});

export const heroValueLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-1)",
});

globalStyle(`${heroValueLabel} p`, {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "var(--space-2)",
  margin: "0",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-tight)",
  whiteSpace: "nowrap",
});

export const heroValueSecondary = style({
  minWidth: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  gap: "0",
  alignSelf: "stretch",
  paddingTop: "0",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-tight)",
});

globalStyle(`${heroValueSecondary} strong`, {
  color: "var(--hero-text)",
  fontSize: "var(--text-stat)",
  fontWeight: "var(--font-weight-semibold)",
  overflowWrap: "anywhere",
});

export const heroGridSubtitle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  gap: "var(--space-075)",
  minWidth: "max-content",
  whiteSpace: "nowrap",
});

export const heroGridValue = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minWidth: "0",
  minHeight: "var(--space-4)",
  whiteSpace: "nowrap",
});

export const heroComparisonInfoTrigger = style({
  color: "var(--hero-muted)",
  opacity: "var(--emphasis-opacity)",
});

globalStyle(`${heroComparisonInfoTrigger}:hover`, {
  color: "var(--hero-text)",
});

export const heroComparisonInfoCopy = style({
  display: "grid",
  gap: "var(--space-3)",
});

globalStyle(`${heroComparisonInfoCopy} p`, {
  margin: "0",
  color: "var(--text-soft)",
  lineHeight: "var(--leading-body)",
});

globalStyle(`${heroMain} h3`, {
  margin: "0 0 var(--space-1)",
  fontSize: "var(--text-total)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-tighter)",
  lineHeight: "var(--leading-tight)",
  overflowWrap: "anywhere",
});

globalStyle(`${heroCard} .formula-tooltip-trigger`, {
  color: "var(--hero-accent)",
});

globalStyle(`${heroValueSecondary} > span`, {
  display: "flex",
  alignItems: "center",
  alignSelf: "stretch",
  minHeight: "var(--space-525)",
  color: "var(--hero-muted)",
});

export const heroCurrentStat = style({
  paddingTop: "0",
});

globalStyle(
  `${heroCurrentStat} .hero-balance-value,
.hero-contributions-stat .hero-balance-value`,
  {
    alignItems: "flex-start",
    textAlign: "left",
  },
);

globalStyle(
  `${heroCurrentStat} .hero-balance-value span,
.hero-contributions-stat .hero-balance-value span`,
  {
    justifyContent: "flex-start",
    textAlign: "left",
  },
);

export const heroBorderedStat = style({
  paddingLeft: "var(--space-3)",
  borderLeft: "var(--line-thin) solid var(--hero-track)",
});

export const heroContributionsValues = style({
  display: "grid",
  gridTemplateColumns: "minmax(var(--size-9), 1.15fr) minmax(var(--size-7), 1fr)",
  alignSelf: "stretch",
  width: "100%",
  gap: "var(--space-2)",
});

export const heroBreakdownHeading = style({
  alignSelf: "stretch",
  display: "flex",
  alignItems: "center",
  gap: "var(--space-075)",
  minHeight: "var(--space-525)",
  margin: "0",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-semibold)",
  letterSpacing: "var(--tracking-wide)",
  textAlign: "left",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
});

export const heroBreakdownHeadingSpacer = style({
  visibility: "hidden",
});

globalStyle(`${heroBreakdownHeading} .hero-contributions-info-trigger`, {
  marginLeft: "0",
});

export const heroBalanceValue = style({
  minWidth: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "var(--space-075)",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  textAlign: "left",
});

export const heroSideStat = style({
  minWidth: "0",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--space-075)",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  textAlign: "left",
});

globalStyle(`${heroSideStat} span`, {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "var(--space-075)",
  minHeight: "var(--space-525)",
  lineHeight: "var(--leading-tight)",
  textAlign: "left",
});

globalStyle(`${heroSideStat} ${heroGridSubtitle}`, {
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
});

globalStyle(
  `${heroSideStat} span svg,
.hero-result-label svg`,
  {
    flex: "none",
    color: "var(--hero-accent)",
  },
);

globalStyle(`${heroSideStat} strong`, {
  color: "var(--hero-text)",
  fontSize: "var(--text-stat)",
  fontWeight: "var(--font-weight-semibold)",
  overflowWrap: "anywhere",
  textAlign: "left",
});

export const heroGrowthValues = style({
  display: "grid",
  gridTemplateColumns: "minmax(var(--size-6), 1fr) minmax(var(--size-6), 1fr)",
  justifyContent: "center",
  alignSelf: "stretch",
  alignItems: "center",
  width: "100%",
  gap: "var(--space-2)",
});

export const heroResultMetric = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--space-075)",
});

export const heroResultLabel = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  gap: "var(--space-05)",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--font-weight-regular)",
});

export const heroResultValue = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "var(--space-075)",
  minWidth: "0",
  minHeight: "var(--space-4)",
  color: "var(--hero-text)",
  fontSize: "var(--text-stat)",
  fontWeight: "var(--font-weight-semibold)",
  whiteSpace: "nowrap",
});

export const heroControlsGrid = style({
  position: "relative",
  zIndex: "var(--layer-content)",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  alignItems: "stretch",
  gap: "var(--space-5)",
  paddingTop: "var(--space-4)",
  borderTop:
    "var(--line-thin) solid color-mix(in srgb, var(--hero-text) var(--mix-80), transparent)",
});

globalStyle(`${heroInflationControls} .inflation-controls-heading`, {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto auto auto",
  alignItems: "center",
  justifyContent: "initial",
  gap: "var(--space-2)",
  height: "var(--space-5)",
  minHeight: "var(--space-5)",
  margin: "0 0 var(--space-1)",
});

globalStyle(`${heroInflationControls} .inflation-card-heading`, {
  minWidth: "0",
});

globalStyle(`${heroInflationControls} .inflation-slider-heading`, {
  margin: "0",
  color: "var(--hero-muted)",
});

globalStyle(`${heroInflationControls} .inflation-slider-heading strong`, {
  color: "var(--hero-text)",
});

globalStyle(`${heroInflationControls} .distribution-mode-toggle`, {
  gridColumn: "2",
  gap: "var(--space-025)",
  padding: "var(--space-025)",
  borderColor: "color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-08), transparent)",
});

globalStyle(`${heroInflationControls} .distribution-mode-toggle button`, {
  minHeight: "var(--space-5)",
  padding: "0 var(--space-1)",
  borderRadius: "var(--radius-full)",
  color: "var(--hero-muted)",
  fontSize: "var(--text-meta)",
});

globalStyle(`${heroInflationControls} .distribution-mode-toggle button[aria-pressed="true"]`, {
  color: "var(--hero-bg)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-92), var(--hero-accent))",
  boxShadow:
    "0 var(--line-thin) var(--line-focus)\n    color-mix(in srgb, var(--shadow-ink) var(--mix-20), transparent)",
});

globalStyle(
  `${heroInflationControls} .distribution-mode-toggle:has(button:not([aria-pressed="true"]):hover)`,
  {
    background: "color-mix(in srgb, var(--hero-text) var(--mix-20), transparent)",
  },
);

globalStyle(
  `${heroInflationControls} .distribution-mode-toggle button:not([aria-pressed="true"]):hover`,
  {
    color: "var(--hero-text)",
  },
);

globalStyle(`${heroInflationControls} .inflation-source-icon`, {
  gridColumn: "4",
  color: "var(--hero-muted)",
});

globalStyle(`${heroInflationControls} .inflation-slider-control`, {
  display: "contents",
});

globalStyle(`${heroInflationControls} .inflation-range-labels`, {
  minHeight: "var(--space-3)",
  margin: "0",
  color: "var(--hero-muted)",
});

globalStyle(`${heroInflationControls} .inflation-source-icon:hover`, {
  color: "var(--hero-text)",
  background: "color-mix(in srgb, var(--hero-text) var(--mix-12), transparent)",
});

globalStyle(`${heroControlsGrid} .inflation-slider-heading`, {
  color: "var(--hero-muted)",
});

globalStyle(`${heroControlsGrid} .inflation-slider-heading strong`, {
  color: "var(--hero-text)",
});

globalStyle(`${heroCard} .range-labels`, {
  color: "var(--hero-muted)",
});

globalStyle(
  `${heroMain},
${heroMainWithoutInflation}`,
  {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    alignItems: "start",
    gap: "var(--space-3)",
  },
);

globalStyle(heroTotal, {
  gridColumn: "1 / -1",
  paddingRight: "0",
});

globalStyle(
  `${heroValueSecondary},
${heroCurrentStat}`,
  {
    paddingTop: "0",
  },
);

globalStyle(`${heroValueSecondary} ${heroBreakdownHeadingSpacer}`, {
  display: "none",
});

globalStyle(`${heroCurrentStat} ${heroBreakdownHeadingSpacer}`, {
  display: "none",
});

globalStyle(heroBorderedStat, {
  gridColumn: "1 / -1",
  marginTop: "0",
  padding: "var(--space-3) 0 0",
  borderTop: "var(--line-thin) solid var(--hero-track)",
  borderLeft: "0",
});

globalStyle(`${heroMainWithoutInflation} ${heroCurrentStat}`, {
  gridColumn: "1 / -1",
});

globalStyle(heroSideStat, {
  padding: "0",
});

globalStyle(
  `${heroContributionsValues},
${heroGrowthValues}`,
  {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    justifyContent: "stretch",
  },
);

globalStyle(heroControlsGrid, {
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "var(--space-4)",
});

globalStyle(`${heroInflationControls} .inflation-controls-heading`, {
  height: "auto",
  gridTemplateColumns: "minmax(0, 1fr) auto auto",
  gridTemplateRows: "auto auto",
});

globalStyle(`${heroInflationControls} .inflation-card-heading`, {
  gridColumn: "1 / -1",
  gridRow: "1",
});

globalStyle(`${heroInflationControls} .distribution-mode-toggle`, {
  gridColumn: "1",
  gridRow: "2",
  justifySelf: "start",
});

globalStyle(`${heroInflationControls} .inflation-controls-heading > .formula-tooltip-trigger`, {
  gridColumn: "2",
  gridRow: "2",
});

globalStyle(`${heroInflationControls} .inflation-source-icon`, {
  gridColumn: "3",
  gridRow: "2",
});

globalStyle(heroCard, {
  padding: "var(--space-4)",
});

globalStyle(`${heroMain} h3`, {
  fontSize: "var(--text-total-mobile)",
});

globalStyle(`${heroInflationControls} .inflation-controls-heading`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridTemplateColumns: "minmax(0, 1fr) auto auto auto",
      gridTemplateRows: "none",
    },
  },
});

globalStyle(`${heroInflationControls} .inflation-card-heading`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridColumn: "auto",
      gridRow: "auto",
    },
  },
});

globalStyle(`${heroInflationControls} .distribution-mode-toggle`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridColumn: "2",
      gridRow: "auto",
      justifySelf: "auto",
    },
  },
});

globalStyle(`${heroInflationControls} .inflation-controls-heading > .formula-tooltip-trigger`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridColumn: "auto",
      gridRow: "auto",
    },
  },
});

globalStyle(`${heroInflationControls} .inflation-source-icon`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      gridColumn: "4",
      gridRow: "auto",
    },
  },
});

globalStyle(heroCard, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      padding: "var(--space-5)",
    },
  },
});

globalStyle(`${heroMain} h3`, {
  "@media": {
    ["(width >= " + breakpoints.compact + ")"]: {
      fontSize: "var(--text-total)",
    },
  },
});

globalStyle(`${heroCurrentStat} ${heroBreakdownHeadingSpacer}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      display: "block",
    },
  },
});

globalStyle(`${heroValueSecondary} ${heroBreakdownHeadingSpacer}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      display: "block",
    },
  },
});

globalStyle(
  `${heroMain},
  ${heroMainWithoutInflation}`,
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        gridTemplateRows: "repeat(6, auto)",
        alignItems: "stretch",
        gap: "var(--space-025) var(--space-3)",
      },
    },
  },
);

globalStyle(
  `${heroMain} > ${heroTotal},
  ${heroMain} > ${heroValueSecondary},
  ${heroMain} > ${heroCurrentStat},
  ${heroMain} > .hero-contributions-stat,
  ${heroMain} > .hero-growth-stat`,
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        display: "grid",
        gridTemplateRows: "subgrid",
        alignContent: "stretch",
      },
    },
  },
);

globalStyle(heroTotal, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "1 / span 3",
      gridColumn: "span 5",
    },
  },
});

globalStyle(heroValueSecondary, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      rowGap: "var(--space-025)",
      gridRow: "1 / span 3",
      gridColumn: "span 3",
    },
  },
});

globalStyle(heroCurrentStat, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "1 / span 3",
      gridColumn: "span 4",
    },
  },
});

globalStyle(`${heroMainWithoutInflation} ${heroCurrentStat}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "span 7",
    },
  },
});

globalStyle(heroBorderedStat, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "4 / span 3",
      gridColumn: "span 6",
      marginTop: "0",
      paddingTop: "var(--space-3)",
      borderTop: "var(--line-thin) solid var(--hero-track)",
    },
  },
});

globalStyle(`${heroMainWithoutInflation} .hero-contributions-stat`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "span 4",
    },
  },
});

globalStyle(`${heroMainWithoutInflation} .hero-growth-stat`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridColumn: "span 8",
    },
  },
});

export const heroContributionsStat = style({
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      borderLeft: "0",
    },
  },
});

export const heroGrowthStat = style({
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      paddingLeft: "var(--space-3)",
      borderLeft: "var(--line-thin) solid var(--hero-track)",
    },
  },
});

globalStyle(
  `${heroTotal} ${heroValueLabel},
  ${heroContributionsStat} > ${heroBreakdownHeading},
  ${heroGrowthStat} > ${heroBreakdownHeading}`,
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "1",
      },
    },
  },
);

globalStyle(`${heroTotal} h3`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "2 / span 2",
      alignSelf: "end",
    },
  },
});

globalStyle(
  `${heroValueSecondary} ${heroBreakdownHeadingSpacer},
  ${heroCurrentStat} ${heroBreakdownHeadingSpacer}`,
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "1",
      },
    },
  },
);

globalStyle(`${heroValueSecondary} > ${heroGridSubtitle}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "2",
    },
  },
});

globalStyle(`${heroValueSecondary} > ${heroGridValue}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "3",
    },
  },
});

globalStyle(`${heroCurrentStat} ${heroBalanceValue} > ${heroGridSubtitle}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "1",
    },
  },
});

globalStyle(`${heroCurrentStat} ${heroBalanceValue} > ${heroGridValue}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      gridRow: "2",
    },
  },
});

globalStyle(`${heroCurrentStat} ${heroBalanceValue}`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      display: "grid",
      gridRow: "2 / span 2",
      gridTemplateRows: "subgrid",
    },
  },
});

globalStyle(
  `${heroContributionsValues},
  ${heroGrowthValues}`,
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "2 / span 2",
        gridTemplateRows: "subgrid",
        gridTemplateColumns: "max-content max-content",
        gap: "var(--space-025) var(--space-5)",
      },
    },
  },
);

globalStyle(
  `${heroContributionsValues} > ${heroBalanceValue},
  ${heroGrowthValues} > ${heroResultMetric}`,
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        display: "grid",
        gridRow: "span 2",
        gridTemplateRows: "subgrid",
      },
    },
  },
);

globalStyle(
  `${heroContributionsValues} > ${heroBalanceValue} > ${heroGridSubtitle},
  ${heroGrowthValues} > ${heroResultMetric} > ${heroGridSubtitle}`,
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "1",
      },
    },
  },
);

globalStyle(
  `${heroContributionsValues} > ${heroBalanceValue} > ${heroGridValue},
  ${heroGrowthValues} > ${heroResultMetric} > ${heroGridValue}`,
  {
    "@media": {
      ["(width >= " + breakpoints.tablet + ")"]: {
        gridRow: "2",
      },
    },
  },
);

globalStyle(`${heroInflationControls} .inflation-controls-heading`, {
  "@media": {
    ["(width >= " + breakpoints.tablet + ")"]: {
      height: "var(--space-5)",
    },
  },
});

globalStyle(heroControlsGrid, {
  "@media": {
    ["(width >= " + breakpoints.wide + ")"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "var(--space-5)",
    },
  },
});

globalStyle(
  `${heroMain},
  ${heroMainWithoutInflation}`,
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        gridTemplateRows: "repeat(3, auto)",
        rowGap: "var(--space-025)",
      },
    },
  },
);

globalStyle(heroMain, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      gridTemplateColumns:
        "minmax(var(--size-12), 1.4fr)\n      minmax(var(--size-7), 0.8fr)\n      max-content\n      max-content\n      var(--size-18)",
    },
  },
});

globalStyle(heroMainWithoutInflation, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      gridTemplateColumns:
        "minmax(var(--size-12), 1.5fr)\n      max-content\n      max-content\n      var(--size-18)",
    },
  },
});

globalStyle(
  `${heroCurrentStat},
  ${heroContributionsStat},
  ${heroGrowthStat}`,
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        transform: "translate(var(--space-45), var(--space-2))",
      },
    },
  },
);

globalStyle(
  `${heroMainWithoutInflation} ${heroContributionsStat},
  ${heroMainWithoutInflation} ${heroGrowthStat}`,
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        gridColumn: "auto",
      },
    },
  },
);

globalStyle(
  `${heroMain} > ${heroTotal},
  ${heroMain} > ${heroValueSecondary},
  ${heroMain} > ${heroCurrentStat},
  ${heroMain} > ${heroContributionsStat},
  ${heroMain} > ${heroGrowthStat}`,
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        gridRow: "1 / span 3",
        gridColumn: "auto",
      },
    },
  },
);

globalStyle(`${heroTotal} ${heroValueLabel}`, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      transform: "translateY(var(--space-2))",
      gridRow: "1",
    },
  },
});

globalStyle(`.hero-main-with-inflation > ${heroTotal}`, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      paddingRight: "var(--space-4)",
    },
  },
});

globalStyle(`${heroValueSecondary} > ${heroGridSubtitle}`, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      transform: "translateY(var(--space-1))",
    },
  },
});

globalStyle(`.hero-main-with-inflation > ${heroValueSecondary}`, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      justifySelf: "start",
      transform: "translate(calc(-1 * var(--space-55)), calc(-1 * var(--space-05)))",
    },
  },
});

globalStyle(
  `${heroCurrentStat} ${heroBalanceValue},
  ${heroContributionsValues},
  ${heroGrowthValues}`,
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        transform: "translateY(calc(-1 * var(--space-2)))",
      },
    },
  },
);

globalStyle(`.hero-main-with-inflation ${heroCurrentStat} ${heroBalanceValue}`, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      justifySelf: "end",
    },
  },
});

globalStyle(`${heroMainWithoutInflation} ${heroCurrentStat} ${heroBalanceValue}`, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      justifySelf: "end",
    },
  },
});

globalStyle(
  `${heroCurrentStat} ${heroBalanceValue} > ${heroGridSubtitle},
  ${heroContributionsValues} > ${heroBalanceValue} > ${heroGridSubtitle},
  ${heroGrowthValues} > ${heroResultMetric} > ${heroGridSubtitle}`,
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        transform: "translateY(var(--space-05))",
      },
    },
  },
);

globalStyle(
  `${heroValueSecondary} > ${heroGridValue},
  ${heroCurrentStat} ${heroBalanceValue} > ${heroGridValue},
  ${heroContributionsValues} > ${heroBalanceValue} > ${heroGridValue},
  ${heroGrowthValues} > ${heroResultMetric} > ${heroGridValue}`,
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        transform: "translateY(calc(-1 * var(--space-05)))",
      },
    },
  },
);

globalStyle(`${heroGrowthValues} > ${heroResultMetric}:last-child > ${heroResultValue}`, {
  "@media": {
    ["(width >= " + breakpoints["extra-wide"] + ")"]: {
      transform: "translateY(calc(-1 * var(--space-1)))",
    },
  },
});

globalStyle(
  `${heroContributionsStat},
  ${heroGrowthStat}`,
  {
    "@media": {
      ["(width >= " + breakpoints["extra-wide"] + ")"]: {
        paddingTop: "0",
        paddingLeft: "var(--space-3)",
        borderTop: "0",
        borderLeft:
          "var(--line-thin) solid\n      color-mix(in srgb, var(--hero-text) var(--mix-80), transparent)",
      },
    },
  },
);
