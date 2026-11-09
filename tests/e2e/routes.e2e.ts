import { expect, test } from "@playwright/test";

async function visualColors(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const tokens = getComputedStyle(document.documentElement);
    const resolveColor = (value: string) => {
      const probe = document.createElement("span");
      probe.style.color = value;
      document.body.append(probe);
      const color = getComputedStyle(probe).color;
      probe.remove();
      return color;
    };
    return {
      background: tokens.getPropertyValue("--background").trim(),
      card: tokens.getPropertyValue("--surface-raised").trim(),
      primary: tokens.getPropertyValue("--primary").trim(),
      bodyColor: getComputedStyle(document.body).backgroundColor,
      cardColor: getComputedStyle(document.querySelector('[data-testid="home-import-card"]')!)
        .backgroundColor,
      resolvedBackground: resolveColor("var(--background)"),
      resolvedCard: resolveColor("var(--surface-raised)"),
    };
  });
}

test("direct dashboard navigation loads the example and the brand returns home", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId("dashboard-hero-card")).toHaveCount(1);
  await expect(page.getByTestId("dashboard-investment-card").first()).toBeVisible();

  await page
    .getByRole("link", { name: /cassandra/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId("home-import-card")).toBeVisible();
  await expect(page.getByTestId("dashboard-hero-card")).toHaveCount(0);
});

test("the home route loads the example and browser history switches between views", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId("home-import-card")).toBeVisible();
  await expect(page.getByTestId("dashboard-hero-card")).toHaveCount(0);

  await page.getByRole("button", { name: /probar con un ejemplo/i }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId("dashboard-hero-card")).toHaveCount(1);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId("home-import-card")).toBeVisible();

  await page.goForward();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId("dashboard-hero-card")).toHaveCount(1);
});

test("reloading the dashboard returns to the home route", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByTestId("dashboard-hero-card")).toHaveCount(1);

  await page.reload();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId("home-import-card")).toBeVisible();
});

test("the initial theme follows the stored preference", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("cassandra-theme", "light"));
  await page.goto("/");

  await expect(page.locator("html")).toHaveClass(/light/);
  const colors = await visualColors(page);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    colors.background,
  );
});

test("mobile theme toggle updates surfaces and browser color in both modes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const dark = await visualColors(page);
  expect(dark.bodyColor).toBe(dark.resolvedBackground);
  expect(dark.cardColor).toBe(dark.resolvedCard);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    dark.background,
  );
  const iconHref = await page.locator('link[rel="icon"]').getAttribute("href");
  const iconSvg = decodeURIComponent(iconHref?.split(",")[1] ?? "");
  expect(iconSvg).toContain(`fill="${dark.background}"`);
  expect(iconSvg).toContain(`stroke="${dark.primary}"`);

  await page.getByTestId("theme-toggle").click();

  const light = await visualColors(page);
  expect(light.bodyColor).toBe(light.resolvedBackground);
  await expect(page.getByTestId("home-import-card")).toHaveCSS(
    "background-color",
    light.resolvedCard,
  );
  expect(light.background).not.toBe(dark.background);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    light.background,
  );
});
