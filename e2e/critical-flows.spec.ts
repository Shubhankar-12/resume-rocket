import { test, expect } from "@playwright/test";

test.describe("Critical User Flows", () => {
  test("landing page loads with CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ResumeRocket/i);
    const cta = page.getByRole("link", { name: /grade|upload|get started/i });
    await expect(cta.first()).toBeVisible();
  });

  test("auth page renders login form", async ({ page }) => {
    await page.goto("/auth");
    const emailInput = page.getByPlaceholder(/email/i);
    const passwordInput = page.getByPlaceholder(/password/i);
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test("dashboard redirects unauthenticated users to auth", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await page.waitForURL(/\/auth/);
    expect(page.url()).toContain("/auth");
  });
});
