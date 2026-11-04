// @ts-check
const { test, expect } = require('@playwright/test');
const { CatalogPage } = require('./pages/CatalogPage');

test.describe('Edge Cases & Security Module (EDGE)', () => {
  /** @type {CatalogPage} */
  let catalog;

  test.beforeEach(async ({ page }) => {
    catalog = new CatalogPage(page);
    await catalog.goto();
  });

  test('TC-EDGE-001: Search Input Resilience Against Script Injection (XSS)', async ({ page }) => {
    // Listen for unexpected alert events
    let alertTriggered = false;
    page.on('dialog', async dialog => {
      alertTriggered = true;
      await dialog.dismiss();
    });

    // Attempt XSS payload in search input
    await catalog.search('<script>alert("xss")</script>');

    // Wait a brief window to confirm no dialog was invoked
    await page.waitForTimeout(500);
    expect(alertTriggered).toBe(false);

    // Page must remain fully interactive and render empty search results
    await expect(catalog.productCards).toHaveCount(0);
    await expect(catalog.noProductsMessage).toBeVisible();
    await expect(catalog.logo).toBeVisible();
  });

  test('TC-EDGE-002: Search Input with Whitespace Only', async () => {
    // Fill search with whitespace
    await catalog.search('    ');

    // Should handle whitespace gracefully without crashing
    const cardCount = await catalog.productCards.count();
    const emptyVisible = await catalog.noProductsMessage.isVisible();
    expect(cardCount > 0 || emptyVisible).toBe(true);
    await expect(catalog.logo).toBeVisible();
  });

  test('TC-EDGE-003: Responsive Layout and Mobile Navigation on Small Screens', async ({ page }) => {
    // Emulate small smartphone viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await catalog.goto();

    // Verify key UI elements reflow cleanly without overflow
    await expect(catalog.logo).toBeVisible();
    await expect(catalog.cartLink).toBeVisible();
    await expect(catalog.productCards).toHaveCount(6);

    // Verify no horizontal scrolling exists on document
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Add item on mobile viewport
    await catalog.addToCart();
    await expect(catalog.toast).toBeVisible();
  });
});
