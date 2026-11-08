import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

const stylesDirectory = new URL("../src/styles/", import.meta.url);
const tokens = readFileSync(new URL("tokens.css", stylesDirectory), "utf8");
const styles = readdirSync(stylesDirectory)
  .filter((name) => name.endsWith(".css") && name !== "tokens.css")
  .map((name) => ({
    name,
    source: readFileSync(new URL(name, stylesDirectory), "utf8").replace(/\/\*[\s\S]*?\*\//g, ""),
  }));

describe("design-system contract", () => {
  it("keeps dark as the base palette and one font family", () => {
    expect(tokens.indexOf(":root {")).toBeLessThan(tokens.indexOf(":root.light {"));
    expect(tokens).toContain('--font-body: "Geist Variable"');
    expect(tokens).toContain("--font-display: var(--font-body)");
    expect(
      readFileSync(new URL("../src/layouts/SiteLayout.astro", import.meta.url), "utf8"),
    ).toContain('<html lang="es" class={THEME_DARK}>');
  });

  it("keeps visual literals in the token sheet", () => {
    for (const { name, source } of styles) {
      const declarations = source
        .split("\n")
        .filter((line) => !line.trim().startsWith("@media"))
        .join("\n");
      expect(declarations, name).not.toMatch(/#[\da-f]{3,8}\b|\brgb\(/i);
      expect(declarations, name).not.toMatch(/(?<![\w-])-?\d+(?:\.\d+)?(?:px|rem|em|ms|s|ch)\b/);
      expect(declarations, name).not.toMatch(/color-mix\([^;]*\b\d+%/);
    }
  });

  it("uses only the named mobile-first breakpoints", () => {
    const breakpoints = ["30rem", "46rem", "66rem"];
    for (const [name, value] of [
      ["compact", breakpoints[0]],
      ["tablet", breakpoints[1]],
      ["wide", breakpoints[2]],
    ]) {
      expect(tokens).toContain(`--breakpoint-${name}: ${value};`);
    }
    for (const { name, source } of styles) {
      const conditions = [...source.matchAll(/@media\s*\((?:width\s*[^)]*)\)/g)].map(
        (match) => match[0],
      );
      for (const condition of conditions) {
        expect(condition, name).toMatch(/^@media \(width >= (?:30|46|66)rem\)$/);
      }
    }
  });

  it("does not size presentation icons individually", () => {
    const components = new URL(
      "../src/features/portfolio/presentation/components/",
      import.meta.url,
    );
    for (const name of readdirSync(components).filter((file) => file.endsWith(".tsx"))) {
      const source = readFileSync(new URL(name, components), "utf8");
      expect(source, name).not.toMatch(/\b(?:size|strokeWidth)=\{\d+(?:\.\d+)?\}/);
    }
  });
});
