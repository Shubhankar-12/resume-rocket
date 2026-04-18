import { test, expect } from "@playwright/test";

test.describe("pricing page currency toggle", () => {
  test("toggles between USD and INR, updating preferredCurrency cookie", async ({
    page,
    context,
  }) => {
    // Clear any pre-set preferredCurrency cookie so the page starts from a
    // clean state (middleware may set a default based on geo headers).
    await context.clearCookies();
    await page.goto("/plans");

    // The page renders a skeleton while fetching. Wait for the currency toggle
    // buttons to be visible. Allow generous time since the fetch may go to the
    // backend.
    const usdButton = page.getByRole("button", { name: "USD", exact: true });
    const inrButton = page.getByRole("button", { name: "INR", exact: true });

    await expect(usdButton).toBeVisible({ timeout: 20000 });
    await expect(inrButton).toBeVisible();

    // Click INR toggle — the page should persist the choice in a cookie and
    // refetch plans for INR. The cookie assertion is the robust signal we own;
    // the exact prices depend on the seeded backend catalog.
    await inrButton.click();
    await expect
      .poll(
        async () => {
          const cookies = await context.cookies();
          return cookies.find((c) => c.name === "preferredCurrency")?.value;
        },
        { timeout: 5000 }
      )
      .toBe("INR");

    // Toggle back to USD and verify the cookie flips.
    await usdButton.click();
    await expect
      .poll(
        async () => {
          const cookies = await context.cookies();
          return cookies.find((c) => c.name === "preferredCurrency")?.value;
        },
        { timeout: 5000 }
      )
      .toBe("USD");
  });
});
