// @ts-check
const { test, expect } = require('@playwright/test');
const { CatalogPage } = require('./pages/CatalogPage');
const { CartPage } = require('./pages/CartPage');

test.describe('Cart Module (CRT)', () => {
  /** @type {CatalogPage} */
  let catalog;
  /** @type {CartPage} */
  let cart;

  test.beforeEach(async ({ page }) => {
    // Reset cart to pristine state
    await page.request.delete('http://localhost:3000/api/cart');
    catalog = new CatalogPage(page);
    cart = new CartPage(page);
  });

  test('TC-CRT-001: Add Product to Cart from Homepage Grid', async ({ page }) => {
    await catalog.goto();
    await expect(page.locator('#cartCount').first()).toHaveText('0');

    // Add first item
    await catalog.addToCart();

    // Verify toast & badge counter increment
    await expect(catalog.toast).toContainText('Added to cart');
    await expect(page.locator('#cartCount').first()).toHaveText('1');
  });

  test('TC-CRT-002: Add Same Product Multiple Times and Verify Quantity Increment', async ({ page }) => {
    await catalog.goto();

    // Click Add to Cart 3 times
    const firstProductBtn = catalog.productCards.first().getByRole('button', { name: 'Add to Cart' });
    await firstProductBtn.click();
    await expect(page.locator('#cartCount').first()).toHaveText('1');

    await firstProductBtn.click();
    await expect(page.locator('#cartCount').first()).toHaveText('2');

    await firstProductBtn.click();
    await expect(page.locator('#cartCount').first()).toHaveText('3');

    // Verify on Cart Page that item quantity is 3
    await cart.goto();
    await expect(cart.cartItems).toHaveCount(1);
    await expect(cart.cartItems.first().locator('.qty-value')).toHaveText('3');
  });

  test('TC-CRT-003: View Cart Items and Verify Subtotal & Totals Calculation', async () => {
    await catalog.goto();

    // Add Wireless Headphones ($79.99)
    await catalog.addToCart('Wireless Headphones');
    // Add USB-C Hub ($49.99)
    await catalog.addToCart('USB-C Hub');

    // Navigate to Cart
    await cart.goto();
    await expect(cart.cartItems).toHaveCount(2);

    // Verify Subtotal & Total
    await expect(cart.subtotal).toHaveText('$129.98');
    await expect(cart.total).toHaveText('$129.98');
    await expect(cart.checkoutBtn).toBeVisible();
  });

  test('TC-CRT-004: Increase and Decrease Item Quantity on Cart Page', async ({ page }) => {
    await catalog.goto();
    await catalog.addToCart('Wireless Headphones');

    await cart.goto();
    const itemRow = cart.getItemRow('Wireless Headphones');

    // Increase quantity to 2
    await cart.increaseQuantity('Wireless Headphones');
    await expect(itemRow.locator('.qty-value')).toHaveText('2');
    await expect(cart.subtotal).toHaveText('$159.98');

    // Decrease quantity back to 1
    await cart.decreaseQuantity('Wireless Headphones');
    await expect(itemRow.locator('.qty-value')).toHaveText('1');
    await expect(cart.subtotal).toHaveText('$79.99');

    // Decrease again: should remove item and show empty cart container
    await cart.decreaseQuantity('Wireless Headphones');
    await expect(cart.emptyCartMessage).toBeVisible();
    await expect(page.locator('#cartContent')).toBeHidden();
  });

  test('TC-CRT-005: Remove Single Item from Cart Using Delete Button', async () => {
    await catalog.goto();
    await catalog.addToCart('Wireless Headphones');
    await catalog.addToCart('USB-C Hub');

    await cart.goto();
    await expect(cart.cartItems).toHaveCount(2);

    // Remove Wireless Headphones
    await cart.removeItem('Wireless Headphones');

    // Only USB-C Hub should remain
    await expect(cart.cartItems).toHaveCount(1);
    await expect(cart.getItemRow('USB-C Hub')).toBeVisible();
    await expect(cart.getItemRow('Wireless Headphones')).toHaveCount(0);
    await expect(cart.total).toHaveText('$49.99');
  });

  test('TC-CRT-006: Empty Cart Page Display and Start Shopping Redirect', async () => {
    await cart.goto();

    await expect(cart.emptyCartMessage).toBeVisible();
    await expect(cart.startShoppingBtn).toBeVisible();

    // Click Start Shopping button
    await cart.startShoppingBtn.click();

    // Verify redirected back to catalog
    await expect(catalog.heroTitle).toBeVisible();
    await expect(catalog.productCards).toHaveCount(6);
  });
});
