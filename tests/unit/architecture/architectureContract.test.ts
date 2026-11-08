import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sourceDirectory = new URL("../../../src/", import.meta.url);
function readSourceFiles(directory: URL): Array<{ path: string; source: string }> {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryUrl = new URL(entry.name, directory);
    if (entry.isDirectory()) {
      return readSourceFiles(new URL(`${entry.name}/`, directory));
    }
    if (!/\.(?:astro|ts|tsx)$/.test(entry.name)) {
      return [];
    }

    return [{ path: entryUrl.pathname, source: readFileSync(entryUrl, "utf8") }];
  });
}

describe("architecture contract", () => {
  it("keeps routes and feature layers within their ownership boundaries", () => {
    const sourceFiles = readSourceFiles(sourceDirectory);
    const domainFiles = sourceFiles.filter(({ path }) => path.includes("/Portfolio/domain/"));
    const sharedFiles = sourceFiles.filter(({ path }) => path.includes("/shared/"));
    const designSystemFiles = sourceFiles.filter(({ path }) => path.includes("/design-system/"));

    expect(existsSync(new URL("../../../src/lib/", import.meta.url))).toBe(false);
    expect(
      domainFiles.every(
        ({ source }) => !/@\/features\/Portfolio\/(?:infrastructure|presentation)/.test(source),
      ),
    ).toBe(true);
    expect(sharedFiles.every(({ source }) => !/@\/features\//.test(source))).toBe(true);
    expect(designSystemFiles.every(({ source }) => !/@\/features\//.test(source))).toBe(true);
    expect(sourceFiles.every(({ source }) => !/\benum\s+[A-Za-z_$]/.test(source))).toBe(true);
  });

  it("exposes the dashboard through the public client entrypoint", () => {
    const dashboardPage = readFileSync(
      new URL("../../../src/pages/dashboard.astro", import.meta.url),
      "utf8",
    );
    const homePage = readFileSync(
      new URL("../../../src/pages/index.astro", import.meta.url),
      "utf8",
    );

    expect(dashboardPage).toContain("@/features/Portfolio/client");
    expect(homePage).toContain("@/features/Portfolio/client");
    expect(
      readFileSync(new URL("../../../src/features/Portfolio/client.ts", import.meta.url), "utf8"),
    ).toContain("Dashboard");
    expect(
      readFileSync(new URL("../../../src/features/Portfolio/index.ts", import.meta.url), "utf8"),
    ).not.toContain("presentation/pages");
  });

  it("keeps generator aliases aligned with resolvable modules", () => {
    const componentsConfig = JSON.parse(
      readFileSync(new URL("../../../components.json", import.meta.url), "utf8"),
    ) as { aliases: { lib?: string; utils: string } };

    expect(componentsConfig.aliases.utils).toBe("@/shared/utils/cn.util");
    expect(existsSync(new URL("../../../src/shared/utils/cn.util.ts", import.meta.url))).toBe(true);
    expect(componentsConfig.aliases).not.toHaveProperty("lib");
  });
});
