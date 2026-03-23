// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Homepage Tests
 * Tests for the main landing page of TechMart
 */

test.describe('Homepage', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear cart before each test for consistent state
    await page.request.delete('http://localhost:3000/api/cart');
    // Navigate to homepage before each test
    await page.goto('/');
  });

  test('should display the page title', async ({ page }) => {
    // Verify the page title contains TechMart
    await expect(page).toHaveTitle(/TechMart/);
  });

  test('should display the logo in the navbar', async ({ page }) => {
    // Check that the logo is visible
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText(/TechMart/);
  });

  test('should display the hero section', async ({ page }) => {
    // Verify hero section content
    const heroTitle = page.locator('.hero h1');
    await expect(heroTitle).toHaveText('Welcome to TechMart');
    
    const heroSubtitle = page.locator('.hero p');
    await expect(heroSubtitle).toContainText('best tech accessories');
  });

  test('should display product cards', async ({ page }) => {
    // Wait for products to load
    const productGrid = page.locator('#productGrid');
    await expect(productGrid).toBeVisible();
    
    // Check that at least one product card exists
    const productCards = page.locator('.product-card');
    await expect(productCards).toHaveCount(6); // We have 6 products
  });

  test('should display product information correctly', async ({ page }) => {
    // Check first product card has required elements
    const firstProduct = page.locator('.product-card').first();
    
    await expect(firstProduct.locator('.product-info h3')).toBeVisible();
    await expect(firstProduct.locator('.product-price')).toBeVisible();
    await expect(firstProduct.locator('.product-stock')).toBeVisible();
    await expect(firstProduct.locator('.add-to-cart-btn')).toBeVisible();
  });

  test('should have a working search bar', async ({ page }) => {
    const searchInput = page.locator('#searchInput');
    const searchBtn = page.locator('#searchBtn');
    
    await expect(searchInput).toBeVisible();
    await expect(searchBtn).toBeVisible();
    
    // Type in search bar
    await searchInput.fill('Keyboard');
    await searchBtn.click();
    
    // Wait for filtered results
    await page.waitForTimeout(500);
    
    // Should show only keyboard product
    const productCards = page.locator('.product-card');
    await expect(productCards).toHaveCount(1);
  });

  test('should filter products by category', async ({ page }) => {
    const categoryFilter = page.locator('#categoryFilter');
    
    // Select electronics category
    await categoryFilter.selectOption('electronics');
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
    // Check that all visible products are electronics
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(6); // Not all products
  });

  test('should display cart count in navbar', async ({ page }) => {
    const cartCount = page.locator('#cartCount');
    await expect(cartCount).toBeVisible();
    await expect(cartCount).toHaveText('0');
  });

  test('should have login and signup buttons', async ({ page }) => {
    const authArea = page.locator('#authArea');
    
    await expect(authArea.locator('text=Login')).toBeVisible();
    await expect(authArea.locator('text=Sign Up')).toBeVisible();
  });

 runTestCasesFollowingTheVideoGuid(test) 
});

/**
 * Run the test cases following the video guide
 * @param {typeof import('@playwright/test').test} test - Playwright test object
 */
function runTestCasesFollowingTheVideoGuid(test) {
  test(`Should filter products when searching`, async ({ page }) => {
    const searchInput = page.locator(`#searchInput`)
    await searchInput.fill('Keyboard')
    await page.locator(`#searchBtn`).click()
    await page.waitForTimeout(500)

    const products = page.locator('.product-card')
    await expect(products).toHaveCount(1)
    await expect(page.locator('.product-info h3')).toContainText('Keyboard')
    /**
     * 
     * Usual locators types
     */
    // By ID
    page.locator('#searchInput')
    // By class
    page.locator('.product-card')
    // By text content
    page.locator('text=Add to Cart')
    // By role (accessibility)
    page.locator('role=button[name="Login"]')
    // By placeholder
    page.locator('[placeholder="Search products..."]')
    // Combining selectors
    page.locator('.product-card >> text=Add to Cart')
    /**
     * Recommendation: prefer locators that stable and meaningful
     */
  })
}
