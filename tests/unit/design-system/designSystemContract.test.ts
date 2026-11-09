import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

const tokens = readFileSync(
  new URL("../../../src/design-system/styles/tokens.css", import.meta.url),
  "utf8",
);
function styleSources(directory: URL): Array<{ name: string; source: string }> {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) return styleSources(url);
    if (!/\.css(?:\.ts)?$/.test(entry.name) || entry.name === "tokens.css") return [];
    return [
      {
        name: url.pathname,
        source: readFileSync(url, "utf8").replace(/\/\*[\s\S]*?\*\//g, ""),
      },
    ];
  });
}
const styles = styleSources(new URL("../../../src/", import.meta.url));

function colorMixFunctions(source: string): string[] {
  const functions: string[] = [];
  let start = source.indexOf("color-mix(");
  while (start !== -1) {
    let depth = 0;
    let end = start;
    for (; end < source.length; end += 1) {
      if (source[end] === "(") depth += 1;
      if (source[end] === ")") depth -= 1;
      if (depth === 0) break;
    }
    functions.push(source.slice(start, end + 1));
    start = source.indexOf("color-mix(", end + 1);
  }
  return functions;
}

describe("design-system contract", () => {
  it("keeps dark as the base palette and one font family", () => {
    expect(tokens.indexOf(":root {")).toBeLessThan(tokens.indexOf(":root.light {"));
    expect(tokens).toContain('--font-body: "Geist Variable"');
    expect(tokens).toContain("--font-display: var(--font-body)");
    expect(readFileSync(new URL("../../../index.html", import.meta.url), "utf8")).toContain(
      '<html lang="es" class="dark">',
    );
  });

  it("keeps visual literals in the token sheet", () => {
    for (const { name, source } of styles) {
      const declarations = source
        .split("\n")
        .filter((line) => !line.trim().startsWith("@media"))
        .join("\n");
      expect(declarations, name).not.toMatch(/#[\da-f]{3,8}\b|\brgb\(/i);
      expect(declarations, name).not.toMatch(/(?<![\w-])-?\d+(?:\.\d+)?(?:px|rem|em|ms|s|ch)\b/);
      for (const colorMix of colorMixFunctions(declarations)) {
        expect(colorMix, name).not.toMatch(/\b\d+%/);
      }
      expect(declarations, name).not.toMatch(/color-mix\([^;]*\b(?:white|black)\b/i);
    }
    const sourceRoots = [
      new URL("../../../src/", import.meta.url),
      new URL("../../../public/", import.meta.url),
    ];
    function sourceFiles(directory: URL): URL[] {
      return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
        return entry.isDirectory()
          ? sourceFiles(url)
          : /\.(?:css|ts|tsx|svg|html)$/.test(entry.name) &&
              url.pathname !==
                new URL("../../../src/design-system/styles/tokens.css", import.meta.url).pathname
            ? [url]
            : [];
      });
    }
    for (const file of sourceRoots.flatMap(sourceFiles)) {
      expect(readFileSync(file, "utf8"), file.pathname).not.toMatch(/#[\da-f]{3,8}\b|\brgb\(/i);
    }
    expect(readFileSync(new URL("../../../index.html", import.meta.url), "utf8")).not.toMatch(
      /#[\da-f]{3,8}\b|\brgb\(/i,
    );
  });

  it("uses only the named mobile-first breakpoints", () => {
    const breakpoints = ["30rem", "46rem", "66rem", "74rem"];
    for (const [name, value] of [
      ["compact", breakpoints[0]],
      ["tablet", breakpoints[1]],
      ["wide", breakpoints[2]],
      ["extra-wide", breakpoints[3]],
    ]) {
      expect(tokens).toContain(`--breakpoint-${name}: ${value};`);
    }
    for (const { name, source } of styles) {
      expect(source, name).not.toMatch(/@media\s*\(width\s*>=/);
      for (const match of source.matchAll(/@variant\s+([\w-]+)/g)) {
        expect(["compact", "tablet", "wide", "extra-wide"], name).toContain(match[1]);
      }
    }
  });

  it("does not size presentation icons individually", () => {
    const components = new URL(
      "../../../src/features/Dashboard/presentation/components/",
      import.meta.url,
    );
    for (const name of readdirSync(components).filter((file) => file.endsWith(".tsx"))) {
      const source = readFileSync(new URL(name, components), "utf8");
      expect(source, name).not.toMatch(/\b(?:size|strokeWidth)=\{\d+(?:\.\d+)?\}/);
    }
  });
});
