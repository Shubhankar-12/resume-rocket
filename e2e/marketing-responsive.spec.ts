import { test, expect } from "@playwright/test";

// Responsive smoke for the five public marketing pages after the rr redesign.
// Verifies each renders the SHARED header + footer (consistency requirement)
// and does not overflow horizontally at both a mobile and a desktop width.
test.setTimeout(60_000);

const PAGES = [
  "/plans",
  "/terms-and-conditions",
  "/privacy-policy",
  "/contact-us",
  "/refund-policy",
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const path of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`${path} renders shared chrome with no overflow (${vp.name})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(path, { waitUntil: "domcontentloaded" });

      // Shared Header + Footer present on every page.
      await expect(page.locator("header").first()).toBeVisible({ timeout: 20000 });
      await expect(page.locator("footer").first()).toBeVisible();

      // No horizontal overflow (allow 1px rounding).
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
}
