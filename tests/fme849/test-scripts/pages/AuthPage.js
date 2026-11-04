// @ts-check
const { expect } = require('@playwright/test');

/**
 * Page Object Model for Auth (Login & Register)
 */
class AuthPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Login Form Elements
    this.loginEmailInput = page.locator('#email');
    this.loginPasswordInput = page.locator('#password');
    this.loginSubmitBtn = page.getByRole('button', { name: 'Login' });
    this.loginErrorAlert = page.locator('#errorMessage, .error-message, .alert-error');

    // Register Form Elements
    this.regNameInput = page.locator('#name');
    this.regEmailInput = page.locator('#email');
    this.regPasswordInput = page.locator('#password');
    this.regConfirmPasswordInput = page.locator('#confirmPassword');
    this.regSubmitBtn = page.getByRole('button', { name: 'Create Account' });
    this.regErrorAlert = page.locator('#errorMessage, .error-message, .alert-error');

    // General Toast & Nav
    this.toast = page.locator('#toast');
    this.authArea = page.locator('#authArea');
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
  }

  async gotoLogin() {
    await this.page.goto('/login.html');
  }

  async gotoRegister() {
    await this.page.goto('/register.html');
  }

  async login(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginSubmitBtn.click();
  }

  async register(name, email, password, confirmPassword) {
    await this.regNameInput.fill(name);
    await this.regEmailInput.fill(email);
    await this.regPasswordInput.fill(password);
    await this.regConfirmPasswordInput.fill(confirmPassword);
    await this.regSubmitBtn.click();
  }

  async logout() {
    await this.logoutBtn.click();
  }
}

module.exports = { AuthPage };
