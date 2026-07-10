import { test, expect } from "@playwright/test";

test.setTimeout(60_000);

// The plans page was redesigned onto the landing (rr) system: the old
// Subscriptions/Credit-packs TABS were removed in favor of a single stacked
// layout (plans grid, then a "#credit-packs" section). `?tab=credits` now
// scrolls to that section instead of switching a tab, and credit-pack CTAs are
// labelled "Buy credits".
test.describe("plans page credit packs (stacked layout)", () => {
  test.beforeEach(async ({ context, page }) => {
    await context.clearCookies();
    await context.addCookies([
      {
        name: "preferredCurrency",
        value: "USD",
        domain: "localhost",
        path: "/",
      },
    ]);

    // Mock both endpoints the page hits on load.
    await page.route("**/api/v1/plans**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          body: [
            {
              plan_id: "FREE",
              region: "GLOBAL",
              provider: "stripe",
              provider_price_id: "price_free",
              amount: 0,
              currency: "USD",
              monthly_credits: 10,
              features: { grading: true },
              active: true,
            },
            {
              plan_id: "PRO",
              region: "GLOBAL",
              provider: "stripe",
              provider_price_id: "price_pro",
              amount: 1900,
              currency: "USD",
              monthly_credits: 200,
              features: { grading: true, priority: true },
              active: true,
            },
          ],
        }),
      });
    });

    await page.route("**/api/v1/billing/credits/packs**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          body: [
            {
              pack_id: "PACK_10",
              credits: 10,
              region: "GLOBAL",
              provider: "stripe",
              provider_price_id: "price_pack_10_usd",
              amount: 499,
              currency: "USD",
              active: true,
            },
            {
              pack_id: "PACK_25",
              credits: 25,
              region: "GLOBAL",
              provider: "stripe",
              provider_price_id: "price_pack_25_usd",
              amount: 999,
              currency: "USD",
              active: true,
            },
            {
              pack_id: "PACK_60",
              credits: 60,
              region: "GLOBAL",
              provider: "stripe",
              provider_price_id: "price_pack_60_usd",
              amount: 1999,
              currency: "USD",
              active: true,
            },
          ],
        }),
      });
    });
  });

  test("renders all 3 credit packs stacked below the plans", async ({ page }) => {
    await page.goto("/plans");

    // No tabs anymore — the currency toggle and packs are on one page.
    await expect(page.getByRole("button", { name: "USD", exact: true })).toBeVisible({
      timeout: 20000,
    });

    await expect(page.getByText("10 credits").first()).toBeVisible();
    await expect(page.getByText("25 credits")).toBeVisible();
    await expect(page.getByText("60 credits")).toBeVisible();
    await expect(page.getByText("$4.99")).toBeVisible();
    await expect(page.getByText("$9.99")).toBeVisible();
    await expect(page.getByText("$19.99")).toBeVisible();
  });

  test("unauthenticated Buy click redirects to login with pack in next param", async ({ page }) => {
    await page.goto("/plans?tab=credits");

    const buyButtons = page.getByRole("button", { name: "Buy credits" });
    await expect(buyButtons.first()).toBeVisible({ timeout: 20000 });
    await buyButtons.first().click();

    // Unauthenticated — should land on /auth with ?next= pointing at the credits page.
    await page.waitForURL(/\/auth\?next=/, { timeout: 10000 });
    const url = new URL(page.url());
    const next = url.searchParams.get("next");
    expect(next).not.toBeNull();
    expect(next).toContain("/dashboard/billing/credits");
    expect(next).toContain("pack=PACK_10");
  });
});
