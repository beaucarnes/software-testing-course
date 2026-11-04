// @ts-check
const { expect } = require('@playwright/test');

/**
 * Page Object Model for Checkout Page
 */
class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Shipping Fields
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.addressInput = page.locator('#address');
    this.address2Input = page.locator('#address2');
    this.cityInput = page.locator('#city');
    this.stateSelect = page.locator('#state');
    this.zipInput = page.locator('#zip');
    this.phoneInput = page.locator('#phone');

    // Payment Fields
    this.cardNameInput = page.locator('#cardName');
    this.cardNumberInput = page.locator('#cardNumber');
    this.expiryInput = page.locator('#expiry');
    this.cvvInput = page.locator('#cvv');

    // Submission & Confirmation
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    this.orderConfirmationModal = page.locator('#orderConfirmation');
    this.orderIdSpan = page.locator('#orderId');
    this.errorMessage = page.locator('#errorMessage');

    // Summary elements
    this.subtotal = page.locator('#subtotal');
    this.total = page.locator('#total');
  }

  async goto() {
    await this.page.goto('/checkout.html');
  }

  /**
   * Fills shipping info
   * @param {Object} shipping
   */
  async fillShipping(shipping) {
    if (shipping.firstName !== undefined) await this.firstNameInput.fill(shipping.firstName);
    if (shipping.lastName !== undefined) await this.lastNameInput.fill(shipping.lastName);
    if (shipping.address !== undefined) await this.addressInput.fill(shipping.address);
    if (shipping.address2) await this.address2Input.fill(shipping.address2);
    if (shipping.city !== undefined) await this.cityInput.fill(shipping.city);
    if (shipping.state !== undefined) await this.stateSelect.selectOption(shipping.state);
    if (shipping.zip !== undefined) await this.zipInput.fill(shipping.zip);
    if (shipping.phone !== undefined) await this.phoneInput.fill(shipping.phone);
  }

  /**
   * Fills payment info
   * @param {Object} payment
   */
  async fillPayment(payment) {
    if (payment.cardName) await this.cardNameInput.fill(payment.cardName);
    if (payment.cardNumber) await this.cardNumberInput.fill(payment.cardNumber);
    if (payment.expiry) await this.expiryInput.fill(payment.expiry);
    if (payment.cvv) await this.cvvInput.fill(payment.cvv);
  }

  async submitOrder() {
    await this.placeOrderBtn.click();
  }
}

module.exports = { CheckoutPage };
