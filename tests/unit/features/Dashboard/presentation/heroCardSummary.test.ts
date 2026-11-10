import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { heroCardCopy } from "@/features/Dashboard/presentation/copies/heroCard.copy";

const heroCardSource = readFileSync(
  new URL(
    "../../../../../src/features/Dashboard/presentation/components/HeroCard.tsx",
    import.meta.url,
  ),
  "utf8",
);
const heroStyles = readFileSync(
  new URL(
    "../../../../../src/features/Dashboard/presentation/components/HeroCard.css.ts",
    import.meta.url,
  ),
  "utf8",
);
const responsiveStyles = heroStyles;
const horizonControlStyles = readFileSync(
  new URL(
    "../../../../../src/features/Dashboard/presentation/components/HeroHorizonControl.css.ts",
    import.meta.url,
  ),
  "utf8",
);

describe("HeroCard balance and purchasing-power summary", () => {
  it("orders the summary metrics and makes the active inflation mode primary", () => {
    expect(heroCardSource).toContain(
      "<p>{withInflation ? heroCardCopy.realValue : heroCardCopy.nominalValue}</p>",
    );
    expect(heroCardSource).toContain(
      "withInflation ? model.realTotalAtHorizon : model.nominalTotalAtHorizon",
    );
    expect(heroCardSource).toContain("{withInflation && (");
    expect(heroCardSource).toContain("<AbbreviatedMoney value={model.nominalTotalAtHorizon} />");
    expect(heroCardSource).toContain("hero-main-with-inflation");
    expect(heroCardSource).toContain("hero-main-without-inflation");
    expect(heroCardSource).toContain("withInflation ? (");
    expect(heroCardSource).toContain("{heroCardCopy.realContributionsShort}");
    expect(heroCardSource).toContain("{heroCardCopy.nominalContributionsShort}");
    expect(heroCardSource).toContain("{heroCardCopy.nominalContributions}");
    expect(heroCardSource).toContain('<ShoppingCart className="icon-sm" aria-hidden="true" />');
    expect(heroCardSource).toContain(
      '<ChartNoAxesCombined className="icon-sm" aria-hidden="true" />',
    );
    expect(heroCardSource).toContain('<PiggyBank className="icon-sm" aria-hidden="true" />');
    expect(heroCardSource).toContain('<Percent className="icon-sm" aria-hidden="true" />');
    expect(heroCardSource).toContain('<Info className="icon-sm" aria-hidden="true" />');
    expect(heroCardSource.match(/label={heroCardCopy\.contributionsInfoTitle}/g)).toHaveLength(1);
    expect(heroCardSource).toContain('className="hero-contributions-info-trigger"');
    expect(heroCardSource).toContain("{heroCardCopy.contributionsInfoExplanation}");
    expect(heroCardCopy.contributionsInfoExplanation).toContain("No son aportes adicionales");
    expect(heroCardSource.indexOf("veHeroCardStyles.heroBreakdownHeading")).toBeLessThan(
      heroCardSource.indexOf('className="hero-contributions-info-trigger"'),
    );
    expect(heroCardSource.indexOf('className="hero-contributions-info-trigger"')).toBeLessThan(
      heroCardSource.indexOf("{heroCardCopy.nominalContributionsShort}"),
    );
    expect(heroCardSource).toContain("veHeroCardStyles.heroCurrentStat");
    expect(heroCardSource).toContain("veHeroCardStyles.heroContributionsStat");
    expect(heroCardSource).toContain("veHeroCardStyles.heroGrowthStat");
    expect(heroCardSource).toContain("veHeroCardStyles.heroResultValue");
    expect(heroCardSource).toContain("veHeroCardStyles.heroValueLabel");
    expect(heroCardSource).toContain("{heroCardCopy.balances}");
    expect(heroCardSource).toContain("{heroCardCopy.results}");
    expect(heroCardSource).toContain("{heroCardCopy.returnLabel}");
    const metricOrder = [
      "veHeroCardStyles.heroTotal",
      "veHeroCardStyles.heroValueSecondary",
      "veHeroCardStyles.heroCurrentStat",
      "veHeroCardStyles.heroContributionsStat",
      "veHeroCardStyles.heroGrowthStat",
    ].map((marker) => heroCardSource.indexOf(marker));
    expect(metricOrder.every((index) => index >= 0)).toBe(true);
    expect(metricOrder).toEqual([...metricOrder].sort((left, right) => left - right));

    const secondaryStyles =
      heroStyles.split("export const heroValueSecondary = style(")[1]?.split("});")[0] ?? "";
    expect(secondaryStyles).not.toContain("borderLeft");
    expect(heroStyles).toContain("export const heroContributionsStat = style(");
    expect(heroStyles).toContain("export const heroGrowthStat = style(");
    expect(heroStyles).toContain('borderLeft: "var(--line-thin) solid var(--hero-track)"');
    expect(heroStyles).toContain("export const heroMainWithoutInflation = style(");
    expect(heroStyles).toContain(".hero-main-with-inflation ${heroTotal}");
    expect(heroStyles).toContain('whiteSpace: "nowrap"');
    expect(heroStyles).toContain('alignItems: "center"');
    expect(responsiveStyles).toContain('gridTemplateRows: "subgrid"');
    expect(responsiveStyles).toContain('gridRow: "2 / span 2"');
    expect(responsiveStyles).toContain('gridTemplateColumns: "repeat(2, minmax(0, 1fr))"');
    expect(responsiveStyles).toContain('gridTemplateColumns: "repeat(12, minmax(0, 1fr))"');
    expect(responsiveStyles).toContain('gridTemplateRows: "repeat(3, auto)"');
    expect(responsiveStyles).toContain("${heroCurrentStat} ${heroBreakdownHeadingSpacer}");
    expect(horizonControlStyles).toContain("export const heroSliderTooltip = style(");
  });

  it("explains the balance and contribution comparison with current formatted amounts", () => {
    const balanceExample = heroCardCopy.balanceComparisonExample("$189,98K", "$20,82K");
    const contributionExample = heroCardCopy.contributionsComparisonExample("$91,2K", "$36,59K");

    expect(balanceExample).toContain("$189,98K al final");
    expect(balanceExample).toContain("$20,82K");
    expect(balanceExample).toContain("no una promesa");
    expect(contributionExample).toContain("$91,2K");
    expect(contributionExample).toContain("poder de compra actual");
    expect(contributionExample).toContain("$36,59K");
    expect(heroCardCopy.comparisonInfoIntro).toContain("No sumes ambas cifras");
    expect(balanceExample).not.toMatch(/2026/i);
    expect(contributionExample).not.toMatch(/2026|inflación/i);
  });
});
