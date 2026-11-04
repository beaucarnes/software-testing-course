// @ts-check
const { expect } = require('@playwright/test');

/**
 * Page Object Model for TechMart Catalog (Homepage)
 * Prioritizes resilient locators (role, user-visible text, accessible controls)
 * and leverages Playwright's built-in auto-waiting.
 */
class CatalogPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Resilient User-Visible & Semantic Locators
    this.logo = page.locator('.logo');
    this.heroTitle = page.getByRole('heading', { name: 'Welcome to TechMart' });
    this.heroSubtitle = page.locator('.hero p');
    
    // Search controls
    this.searchInput = page.getByPlaceholder('Search products...');
    this.searchBtn = page.getByRole('button', { name: 'Search' });
    
    // Filter & Sort controls
    this.categorySelect = page.locator('#categoryFilter');
    this.priceSlider = page.locator('#priceRange');
    this.priceDisplay = page.locator('#priceValue');
    this.sortSelect = page.locator('#sortBy');
    
    // Product grid & cards
    this.productGrid = page.locator('#productGrid');
    this.productCards = page.locator('.product-card');
    this.noProductsMessage = page.locator('.no-products');
    
    // Header Navigation controls
    this.cartLink = page.locator('.cart-link');
    this.cartCount = page.locator('#cartCount').first();
    this.authArea = page.locator('#authArea');
    this.loginLink = page.getByRole('link', { name: 'Sign In' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
    
    // Toast notification
    this.toast = page.locator('#toast');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.logo).toBeVisible();
  }

  async search(query) {
    await this.searchInput.fill(query);
    await this.searchBtn.click();
  }

  async selectCategory(category) {
    await this.categorySelect.selectOption(category);
  }

  async setMaxPrice(price) {
    // Fill and dispatch change event for range input
    await this.priceSlider.evaluate((el, val) => {
      // @ts-ignore
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, price);
  }

  async sortBy(sortOption) {
    await this.sortSelect.selectOption(sortOption);
  }

  /**
   * Locates a product card by title
   * @param {string} name
   */
  getProductCard(name) {
    return this.productCards.filter({ hasText: name });
  }

  /**
   * Clicks 'Add to Cart' on a specific product card or the first one
   * @param {string} [productName]
   */
  async addToCart(productName) {
    const card = productName ? this.getProductCard(productName) : this.productCards.first();
    const btn = card.getByRole('button', { name: 'Add to Cart' });
    await btn.click();
    // Auto-wait for toast notification to appear
    await expect(this.toast).toBeVisible();
  }
}

module.exports = { CatalogPage };
