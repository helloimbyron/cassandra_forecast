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
    "../../../../../src/features/Dashboard/presentation/styles/dashboard-heading-hero.css",
    import.meta.url,
  ),
  "utf8",
);
const responsiveStyles = readFileSync(
  new URL(
    "../../../../../src/features/Dashboard/presentation/styles/responsive.css",
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
    expect(heroCardSource.indexOf('<h4 className="hero-breakdown-heading">')).toBeLessThan(
      heroCardSource.indexOf('className="hero-contributions-info-trigger"'),
    );
    expect(heroCardSource.indexOf('className="hero-contributions-info-trigger"')).toBeLessThan(
      heroCardSource.indexOf("{heroCardCopy.nominalContributionsShort}"),
    );
    expect(heroCardSource).toContain('className="hero-side-stat hero-current-stat"');
    expect(heroCardSource).toContain('className="hero-side-stat hero-contributions-stat"');
    expect(heroCardSource).toContain('className="hero-side-stat hero-growth-stat"');
    expect(heroCardSource).toContain('className="hero-result-value hero-grid-value"');
    expect(heroCardSource).toContain('className="hero-value-label hero-grid-subtitle"');
    expect(heroCardSource).toContain("{heroCardCopy.balances}");
    expect(heroCardSource).toContain("{heroCardCopy.results}");
    expect(heroCardSource).toContain("{heroCardCopy.returnLabel}");
    const metricOrder = [
      'className="hero-total"',
      'className="hero-value-secondary"',
      'className="hero-side-stat hero-current-stat"',
      'className="hero-side-stat hero-contributions-stat"',
      'className="hero-side-stat hero-growth-stat"',
    ].map((marker) => heroCardSource.indexOf(marker));
    expect(metricOrder.every((index) => index >= 0)).toBe(true);
    expect(metricOrder).toEqual([...metricOrder].sort((left, right) => left - right));

    const secondaryStyles = heroStyles.match(/\.hero-value-secondary\s*\{([^}]+)\}/)?.[1] ?? "";
    const dividerStyles =
      heroStyles.match(/\.hero-contributions-stat,\s*\.hero-growth-stat\s*\{([^}]+)\}/)?.[1] ?? "";
    expect(secondaryStyles).not.toContain("border-left");
    expect(dividerStyles).toContain("border-left");
    expect(heroStyles).toContain("hero-main-without-inflation");
    expect(heroStyles).toContain("hero-main-with-inflation .hero-total");
    expect(heroStyles).toContain("white-space: nowrap;");
    expect(heroStyles).toContain("align-items: center;");
    expect(responsiveStyles).toContain("grid-template-rows: subgrid;");
    expect(responsiveStyles.match(/\.hero-total h3\s*\{\s*grid-row: 2 \/ span 2;/g)).toHaveLength(
      1,
    );
    expect(responsiveStyles).toMatch(
      /\.hero-main,\s*\.hero-main-without-inflation\s*\{[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/s,
    );
    expect(responsiveStyles).toMatch(
      /@variant tablet[\s\S]*?\.hero-main,\s*\.hero-main-without-inflation\s*\{[^}]*grid-template-columns: repeat\(12, minmax\(0, 1fr\)\);/,
    );
    expect(responsiveStyles).toMatch(
      /@variant extra-wide[\s\S]*?\.hero-main,\s*\.hero-main-without-inflation\s*\{[^}]*grid-template-rows: repeat\(3, auto\);/,
    );
    expect(responsiveStyles).toContain(".hero-current-stat .hero-breakdown-heading-spacer");
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
