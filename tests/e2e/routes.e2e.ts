import { expect, test } from "@playwright/test";

test("direct dashboard navigation loads the example and the brand returns home", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.locator("main > .hero-card")).toHaveCount(1);
  await expect(page.locator(".investment-card").first()).toBeVisible();

  await page
    .getByRole("link", { name: /cassandra/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("main > .import-section")).toBeVisible();
  await expect(page.locator("main > .hero-card")).toHaveCount(0);
});

test("the home route loads the example and browser history switches between views", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("main > .import-section")).toBeVisible();
  await expect(page.locator("main > .hero-card")).toHaveCount(0);

  await page.getByRole("button", { name: /probar con un ejemplo/i }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.locator("main > .hero-card")).toHaveCount(1);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("main > .import-section")).toBeVisible();

  await page.goForward();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.locator("main > .hero-card")).toHaveCount(1);
});

test("reloading the dashboard returns to the home route", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.locator("main > .hero-card")).toHaveCount(1);

  await page.reload();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("main > .import-section")).toBeVisible();
});

test("the initial theme follows the stored preference", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("cassandra-theme", "light"));
  await page.goto("/");

  await expect(page.locator("html")).toHaveClass(/light/);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#f5f7fa");
});
