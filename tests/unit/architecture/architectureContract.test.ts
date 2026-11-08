import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sourceDirectory = new URL("../../../src/", import.meta.url);
function readSourceFiles(directory: URL): Array<{ path: string; source: string }> {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryUrl = new URL(entry.name, directory);
    if (entry.isDirectory()) return readSourceFiles(new URL(`${entry.name}/`, directory));
    if (!/\.(?:astro|ts|tsx)$/.test(entry.name)) return [];
    return [{ path: entryUrl.pathname, source: readFileSync(entryUrl, "utf8") }];
  });
}

describe("architecture contract", () => {
  it("defines Home and Dashboard as the only business features", () => {
    const names = readdirSync(new URL("../../../src/features/", import.meta.url));
    expect(names).toContain("Home");
    expect(names).toContain("Dashboard");
    expect(names).not.toContain("Portfolio");
  });

  it("keeps routes and shared modules independent from feature internals", () => {
    const sources = readSourceFiles(sourceDirectory);
    const sharedFiles = sources.filter(({ path }) => path.includes("/shared/"));
    const designSystemFiles = sources.filter(({ path }) => path.includes("/design-system/"));
    expect(existsSync(new URL("../../../src/lib/", import.meta.url))).toBe(false);
    expect(sharedFiles.every(({ source }) => !/@\/features\/(?:Home|Dashboard)\//.test(source))).toBe(true);
    expect(designSystemFiles.every(({ source }) => !/@\/features\//.test(source))).toBe(true);
    expect(sources.every(({ source }) => !/\benum\s+[A-Za-z_$]/.test(source))).toBe(true);
  });

  it("exposes Home and Dashboard through distinct client entrypoints", () => {
    const dashboardPage = readFileSync(new URL("../../../src/pages/dashboard.astro", import.meta.url), "utf8");
    const homePage = readFileSync(new URL("../../../src/pages/index.astro", import.meta.url), "utf8");
    expect(dashboardPage).toContain("@/app/client");
    expect(homePage).toContain("@/app/client");
    expect(readFileSync(new URL("../../../src/features/Home/client.ts", import.meta.url), "utf8")).toContain("HomePage");
    expect(readFileSync(new URL("../../../src/features/Dashboard/client.ts", import.meta.url), "utf8")).toContain("DashboardPage");
    expect(dashboardPage).not.toContain("window.location.replace");
  });

  it("keeps generator aliases aligned with resolvable modules", () => {
    const config = JSON.parse(readFileSync(new URL("../../../components.json", import.meta.url), "utf8")) as { aliases: { lib?: string; utils: string } };
    expect(config.aliases.utils).toBe("@/shared/utils/cn.util");
    expect(existsSync(new URL("../../../src/shared/utils/cn.util.ts", import.meta.url))).toBe(true);
    expect(config.aliases).not.toHaveProperty("lib");
  });
});
