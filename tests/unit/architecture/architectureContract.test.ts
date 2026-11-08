import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sourceDirectory = new URL("../../../src/", import.meta.url);
function readSourceFiles(directory: URL): Array<{ path: string; source: string }> {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryUrl = new URL(entry.name, directory);
    if (entry.isDirectory()) return readSourceFiles(new URL(`${entry.name}/`, directory));
    if (!/\.(?:ts|tsx)$/.test(entry.name)) return [];
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
    expect(
      sharedFiles.every(({ source }) => !/@\/features\/(?:Home|Dashboard)\//.test(source)),
    ).toBe(true);
    expect(designSystemFiles.every(({ source }) => !/@\/features\//.test(source))).toBe(true);
    expect(sources.every(({ source }) => !/\benum\s+[A-Za-z_$]/.test(source))).toBe(true);
  });

  it("centralizes route paths and renders public feature pages directly", () => {
    const app = readFileSync(
      new URL("../../../src/app/bootstrap/App.tsx", import.meta.url),
      "utf8",
    );
    const appEntry = readFileSync(
      new URL("../../../src/app/bootstrap/index.tsx", import.meta.url),
      "utf8",
    );
    const header = readFileSync(
      new URL("../../../src/shared/presentation/components/Header.tsx", import.meta.url),
      "utf8",
    );
    const paths = readFileSync(
      new URL("../../../src/app/routes/appPaths.ts", import.meta.url),
      "utf8",
    );
    const dashboardPage = readFileSync(
      new URL(
        "../../../src/features/Dashboard/presentation/pages/Dashboard.page.tsx",
        import.meta.url,
      ),
      "utf8",
    );
    const homeApi = readFileSync(
      new URL("../../../src/features/Home/index.ts", import.meta.url),
      "utf8",
    );
    const dashboardApi = readFileSync(
      new URL("../../../src/features/Dashboard/index.ts", import.meta.url),
      "utf8",
    );

    expect(appEntry).toContain("<BrowserRouter>");
    expect(appEntry).toContain("./App");
    expect(appEntry).toContain("APP_PATHS.DASHBOARD");
    expect(appEntry).toContain("APP_PATHS.HOME");
    expect(paths).toContain('HOME: "/"');
    expect(paths).toContain('DASHBOARD: "/dashboard"');
    expect(app).toContain("APP_PATHS.HOME");
    expect(app).toContain("APP_PATHS.DASHBOARD");
    expect(app).toContain('from "@/features/Dashboard"');
    expect(app).toContain('from "@/features/Home"');
    expect(app).toContain("homeHref={APP_PATHS.HOME}");
    expect(header).toContain("homeHref: string");
    expect(header).toContain("href={homeHref}");
    expect(dashboardPage).toContain("LoadedDashboardModel | null");
    expect(
      existsSync(new URL("../../../src/app/routes/dashboard.route.tsx", import.meta.url)),
    ).toBe(false);
    expect(existsSync(new URL("../../../src/app/routes/home.route.tsx", import.meta.url))).toBe(
      false,
    );
    expect(homeApi).toContain("HomePage");
    expect(dashboardApi).toContain("DashboardPage");
    expect(dashboardApi).toContain("StickyProjectionControls");
    expect(dashboardApi).toContain("useDashboardModel");
    expect(dashboardApi).toContain("LoadedDashboardModel");
    expect(existsSync(new URL("../../../src/features/Home/client.ts", import.meta.url))).toBe(
      false,
    );
    expect(existsSync(new URL("../../../src/features/Dashboard/client.ts", import.meta.url))).toBe(
      false,
    );
    expect(app).toContain("<Routes>");
    expect(existsSync(new URL("../../../src/app/components/App.tsx", import.meta.url))).toBe(false);
    expect(existsSync(new URL("../../../src/main.tsx", import.meta.url))).toBe(false);
  });

  it("keeps generator aliases aligned with resolvable modules", () => {
    const config = JSON.parse(
      readFileSync(new URL("../../../components.json", import.meta.url), "utf8"),
    ) as { aliases: { lib?: string; utils: string } };
    expect(config.aliases.utils).toBe("@/shared/utils/cn.util");
    expect(existsSync(new URL("../../../src/shared/utils/cn.util.ts", import.meta.url))).toBe(true);
    expect(config.aliases).not.toHaveProperty("lib");
  });
});
