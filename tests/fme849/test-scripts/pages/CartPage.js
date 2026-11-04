// @ts-check
const { expect } = require('@playwright/test');

/**
 * Page Object Model for TechMart Shopping Cart
 */
class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    this.cartItems = page.locator('#cartItems .cart-item');
    this.subtotal = page.locator('#subtotal');
    this.total = page.locator('#total');
    this.checkoutBtn = page.getByRole('link', { name: 'Proceed to Checkout' });
    this.emptyCartMessage = page.getByText('Your cart is empty');
    this.startShoppingBtn = page.getByRole('link', { name: 'Start Shopping' });
    this.navbarCartCount = page.locator('#cartCount');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  /**
   * Returns a row for a specific item
   * @param {string} productName
   */
  getItemRow(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  /**
   * Increment quantity using '+' button
   * @param {string} productName
   */
  async increaseQuantity(productName) {
    const row = this.getItemRow(productName);
    const increaseBtn = row.locator('.qty-btn', { hasText: '+' });
    await increaseBtn.click();
  }

  /**
   * Decrement quantity using '-' button
   * @param {string} productName
   */
  async decreaseQuantity(productName) {
    const row = this.getItemRow(productName);
    const decreaseBtn = row.locator('.qty-btn', { hasText: '-' });
    await decreaseBtn.click();
  }

  /**
   * Remove item using '✕' button
   * @param {string} productName
   */
  async removeItem(productName) {
    const row = this.getItemRow(productName);
    const removeBtn = row.locator('.remove-btn');
    await removeBtn.click();
  }
}

module.exports = { CartPage };
