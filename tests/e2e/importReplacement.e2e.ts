import { expect, test, type Page } from "@playwright/test";
import { fileURLToPath } from "node:url";

const alpha = fileURLToPath(new URL("./fixtures/portfolio-alpha.json", import.meta.url));
const beta = fileURLToPath(new URL("./fixtures/portfolio-beta.json", import.meta.url));

async function openHydratedHome(page: Page) {
  await page.goto("/");
  // ? Espera a que React hidrate la página antes de usar los controles de importación.
  await page.waitForFunction(() => !document.querySelector("astro-island")?.hasAttribute("ssr"));
}

async function expectSingleDashboard(page: Page) {
  for (const section of [
    "dashboard-heading",
    "hero-card",
    "metrics-grid",
    "overview-grid",
    "distribution-section",
    "investments-section",
    "table-section",
  ]) {
    await expect(page.locator(`main > .${section}`)).toHaveCount(1);
  }
}

test("each JSON import replaces the previous dashboard", async ({ page }) => {
  await openHydratedHome(page);

  await page.getByRole("button", { name: /ejemplo/i }).click();
  await expect(page.locator("main > .hero-card")).toHaveCount(1);
  await expectSingleDashboard(page);
  await expect(page.locator(".investment-card").first()).toBeVisible();

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(alpha);
  await expect(page.locator(".investment-card")).toHaveCount(1);
  await expect(page.locator(".investment-card")).toContainText("Cartera Alfa");
  await expect(page.locator(".investment-card")).not.toContainText("FTSE All-World");
  await expectSingleDashboard(page);

  await fileInput.setInputFiles(beta);
  await expect(page.locator(".investment-card")).toHaveCount(2);
  await expect(page.locator(".investment-card").first()).toContainText("Cartera Beta Uno");
  await expect(page.locator(".investment-card").last()).toContainText("Cartera Beta Dos");
  await expect(page.locator(".investment-card", { hasText: "Cartera Alfa" })).toHaveCount(0);
  await expectSingleDashboard(page);

  await fileInput.setInputFiles(beta);
  await expect(page.locator(".investment-card")).toHaveCount(2);
  await expectSingleDashboard(page);

  await fileInput.setInputFiles({
    name: "invalid.json",
    mimeType: "application/json",
    buffer: Buffer.from("{"),
  });
  await expect(page.locator(".dashboard-error")).toBeVisible();
  await expect(page.locator(".investment-card")).toHaveCount(2);
  await expect(page.locator(".investment-card").first()).toContainText("Cartera Beta Uno");
  await expectSingleDashboard(page);
});

test("importing a personal JSON first also replaces the previous dashboard", async ({ page }) => {
  await openHydratedHome(page);
  const fileInput = page.locator('input[type="file"]');

  await fileInput.setInputFiles(alpha);
  await expect(page.locator(".investment-card")).toHaveCount(1);
  await expect(page.locator(".investment-card")).toContainText("Cartera Alfa");
  await expectSingleDashboard(page);

  await fileInput.setInputFiles(beta);
  await expect(page.locator(".investment-card")).toHaveCount(2);
  await expect(page.locator(".investment-card", { hasText: "Cartera Alfa" })).toHaveCount(0);
  await expectSingleDashboard(page);
});
