// @ts-check
const { test, expect } = require('@playwright/test');
const { CatalogPage } = require('./pages/CatalogPage');

test.describe('Catalog Module (CAT)', () => {
  /** @type {CatalogPage} */
  let catalog;

  test.beforeEach(async ({ page }) => {
    // Clear session cart to avoid dirty state across tests
    await page.request.delete('http://localhost:3000/api/cart');
    catalog = new CatalogPage(page);
    await catalog.goto();
  });

  test('TC-CAT-001: Verify Homepage Loads and Displays Product Cards', async ({ page }) => {
    // Assert page title contains TechMart
    await expect(page).toHaveTitle(/TechMart/);

    // Assert branding & hero visibility
    await expect(catalog.logo).toBeVisible();
    await expect(catalog.heroTitle).toBeVisible();

    // Verify product grid displays 6 product cards
    await expect(catalog.productCards).toHaveCount(6);

    // Verify first card details
    const firstCard = catalog.productCards.first();
    await expect(firstCard.locator('.product-info h3')).toBeVisible();
    await expect(firstCard.locator('.product-price')).toBeVisible();
    await expect(firstCard.locator('.product-stock')).toBeVisible();
    await expect(firstCard.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });

  test('TC-CAT-002: Search Products by Valid Keyword', async () => {
    await catalog.search('Keyboard');

    // Auto-waits for DOM update
    await expect(catalog.productCards).toHaveCount(1);
    const card = catalog.productCards.first();
    await expect(card.getByRole('heading', { level: 3 })).toHaveText('Mechanical Keyboard');
    await expect(card.locator('.product-price')).toHaveText('$129.99');
  });

  test('TC-CAT-003: Search Products with Non-Existent Keyword', async () => {
    await catalog.search('xyznonexistent123');

    // Expect empty result list
    await expect(catalog.productCards).toHaveCount(0);
    await expect(catalog.noProductsMessage).toBeVisible();
    await expect(catalog.noProductsMessage).toContainText('No products found matching your criteria.');
  });

  test('TC-CAT-004: Filter Products by Category Dropdown', async () => {
    // Filter by Electronics
    await catalog.selectCategory('electronics');
    await expect(catalog.productCards).toHaveCount(4);
    
    // Verify each card belongs to electronics
    const categoryBadges = catalog.productCards.locator('.product-category');
    const count = await categoryBadges.count();
    for (let i = 0; i < count; i++) {
      await expect(categoryBadges.nth(i)).toHaveText('electronics');
    }

    // Filter by Accessories
    await catalog.selectCategory('accessories');
    await expect(catalog.productCards).toHaveCount(2);

    // Reset to All
    await catalog.selectCategory('all');
    await expect(catalog.productCards).toHaveCount(6);
  });

  test('TC-CAT-005: Filter Products by Maximum Price Slider', async () => {
    // Adjust slider to $50
    await catalog.setMaxPrice(50);
    await expect(catalog.priceDisplay).toHaveText('50');

    // Products under $50: USB-C Hub ($49.99), Mouse Pad XL ($24.99)
    await expect(catalog.productCards).toHaveCount(2);
    await expect(catalog.getProductCard('USB-C Hub')).toBeVisible();
    await expect(catalog.getProductCard('Mouse Pad XL')).toBeVisible();

    // Expensive item should not be present
    await expect(catalog.getProductCard('Mechanical Keyboard')).toHaveCount(0);
  });

  test('TC-CAT-006: Sort Products by Price (Low to High and High to Low)', async () => {
    // Sort Low to High
    await catalog.sortBy('price-low');
    const firstPriceLow = await catalog.productCards.first().locator('.product-price').textContent();
    const lastPriceLow = await catalog.productCards.last().locator('.product-price').textContent();
    expect(firstPriceLow).toBe('$24.99');
    expect(lastPriceLow).toBe('$129.99');

    // Sort High to Low
    await catalog.sortBy('price-high');
    const firstPriceHigh = await catalog.productCards.first().locator('.product-price').textContent();
    const lastPriceHigh = await catalog.productCards.last().locator('.product-price').textContent();
    expect(firstPriceHigh).toBe('$129.99');
    expect(lastPriceHigh).toBe('$24.99');
  });

  test('TC-CAT-007: Verify Stock Status Badges and Out of Stock Handling', async ({ page }) => {
    // Intercept /api/products to inject zero stock and low stock items
    await page.route('**/api/products*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Normal Item', price: 50.00, category: 'electronics', image: 'headphones.svg', stock: 10 },
          { id: 2, name: 'Low Stock Item', price: 60.00, category: 'electronics', image: 'keyboard.svg', stock: 3 },
          { id: 3, name: 'Out of Stock Item', price: 70.00, category: 'accessories', image: 'stand.svg', stock: 0 }
        ])
      });
    });

    await catalog.goto();

    // Verify low stock item badge
    const lowStockCard = catalog.getProductCard('Low Stock Item');
    await expect(lowStockCard.locator('.product-stock')).toHaveText('Only 3 left!');
    await expect(lowStockCard.locator('.product-stock')).toHaveClass(/low/);

    // Verify out of stock item badge and disabled button
    const outOfStockCard = catalog.getProductCard('Out of Stock Item');
    const disabledBtn = outOfStockCard.getByRole('button', { name: 'Out of Stock' });
    await expect(disabledBtn).toBeDisabled();
  });
});
