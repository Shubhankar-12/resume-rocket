import { test, expect } from "@playwright/test";

test.describe("Consent banner", () => {
  test("appears on first visit", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: /cookie consent/i });
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("button", { name: /accept/i })).toBeVisible();
    await expect(banner.getByRole("button", { name: /decline/i })).toBeVisible();
  });

  test("Accept persists choice across reloads", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
    await page.getByRole("button", { name: /accept/i }).click();
    await expect(page.getByRole("dialog", { name: /cookie consent/i })).toBeHidden();
    await page.reload();
    await expect(page.getByRole("dialog", { name: /cookie consent/i })).toBeHidden();
  });

  test("Decline persists choice across reloads", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
    await page.getByRole("button", { name: /decline/i }).click();
    await expect(page.getByRole("dialog", { name: /cookie consent/i })).toBeHidden();
    await page.reload();
    await expect(page.getByRole("dialog", { name: /cookie consent/i })).toBeHidden();
  });
});
