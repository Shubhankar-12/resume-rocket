import { test, expect } from "@playwright/test";

test.describe("Landing page (redesigned)", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
  });

  test("renders all landing sections", async ({ page }) => {
    // Dismiss consent banner if visible
    try {
      await page.getByRole("dialog", { name: /cookie consent/i })
        .getByRole("button", { name: /accept/i })
        .click({ timeout: 2000 });
    } catch {
      // Continue if banner not found
    }

    const sectionIds = [
      "hero",
      "problem",
      "how",
      "demo",
      "deep-dive",
      "features",
      "pricing",
      "faq",
      "final-cta",
    ];
    for (const id of sectionIds) {
      await page.locator(`#${id}`).waitFor({ state: "attached", timeout: 5000 });
    }
    await expect(page.locator("footer")).toBeAttached();
  });

  test("Hero CTA navigates to /auth", async ({ page }) => {
    try {
      await page.getByRole("dialog", { name: /cookie consent/i })
        .getByRole("button", { name: /accept/i })
        .click({ timeout: 2000 });
    } catch {
      // Continue if banner not found
    }

    await page.locator("#hero").waitFor({ state: "visible", timeout: 5000 });
    await page.locator("#hero").getByRole("link", { name: /upload resume/i }).click();
    await expect(page).toHaveURL(/\/auth/);
  });

  test("Pricing section renders its heading", async ({ page }) => {
    try {
      await page.getByRole("dialog", { name: /cookie consent/i })
        .getByRole("button", { name: /accept/i })
        .click({ timeout: 2000 });
    } catch {
      // Continue if banner not found
    }

    // Pricing fetches plans from the backend; the heading is always present
    // regardless of fetch state (loading / error / data), so it's the stable assertion.
    await page.locator("#pricing").waitFor({ state: "visible", timeout: 5000 });
    await expect(
      page.locator("#pricing").getByRole("heading", { name: /simple, transparent pricing/i })
    ).toBeVisible();
  });

  test("FAQ accordion expands", async ({ page }) => {
    try {
      await page.getByRole("dialog", { name: /cookie consent/i })
        .getByRole("button", { name: /accept/i })
        .click({ timeout: 2000 });
    } catch {
      // Continue if banner not found
    }

    await page.locator("#faq").waitFor({ state: "visible", timeout: 5000 });
    const trigger = page
      .locator("#faq")
      .getByRole("button", { name: /how is payment handled/i });
    await trigger.click();
    await expect(
      page.locator("#faq").getByText(/Razorpay for INR and Stripe for USD/i)
    ).toBeVisible();
  });
});
