// @ts-check
const { test, expect } = require('@playwright/test');
const { AuthPage } = require('./pages/AuthPage');
const { CatalogPage } = require('./pages/CatalogPage');

test.describe('Auth Module (AUTH)', () => {
  /** @type {AuthPage} */
  let auth;
  /** @type {CatalogPage} */
  let catalog;

  test.beforeEach(async ({ page }) => {
    // Ensure logged out
    await page.request.post('http://localhost:3000/api/logout');
    auth = new AuthPage(page);
    catalog = new CatalogPage(page);
  });

  test('TC-AUTH-001: Register New Account with Valid Credentials', async ({ page }) => {
    await auth.gotoRegister();

    const uniqueEmail = `user_${Date.now()}@example.com`;
    await auth.register('Jane Smith', uniqueEmail, 'securepass123', 'securepass123');

    // Should redirect to homepage and show greeting
    await expect(page).toHaveURL(/\/(index\.html)?$/);
    await expect(catalog.authArea).toContainText('Hi, Jane Smith');
    await expect(catalog.logoutBtn).toBeVisible();
  });

  test('TC-AUTH-002: Register Account with Mismatched Passwords', async ({ page }) => {
    await auth.gotoRegister();

    await auth.register('Jane Smith', 'mismatch@example.com', 'pass123', 'diff456');

    // Should stay on register page with error
    await expect(auth.regErrorAlert).toBeVisible();
    await expect(auth.regErrorAlert).toContainText('Passwords do not match');
    await expect(page).toHaveURL(/\/register\.html/);
  });

  test('TC-AUTH-003: Register Account with Already Registered Email', async ({ page }) => {
    await auth.gotoRegister();

    // Use demo@techmart.com which already exists
    await auth.register('Demo User', 'demo@techmart.com', 'pass123', 'pass123');

    // Expect server error
    await expect(auth.regErrorAlert).toBeVisible();
    await expect(auth.regErrorAlert).toContainText('Email already registered');
  });

  test('TC-AUTH-004: Login with Valid Demo Credentials', async ({ page }) => {
    await auth.gotoLogin();

    await auth.login('demo@techmart.com', 'demo123');

    // Should redirect to homepage and show user name
    await expect(page).toHaveURL(/\/(index\.html)?$/);
    await expect(catalog.authArea).toContainText('Hi, Demo User');
    await expect(catalog.logoutBtn).toBeVisible();
  });

  test('TC-AUTH-005: Login Failure with Incorrect Password', async ({ page }) => {
    await auth.gotoLogin();

    await auth.login('demo@techmart.com', 'wrongpassword');

    // Should stay on login and show error
    await expect(auth.loginErrorAlert).toBeVisible();
    await expect(auth.loginErrorAlert).toContainText('Invalid credentials');
    await expect(page).toHaveURL(/\/login\.html/);
  });

  test('TC-AUTH-006: User Logout and Header State Reset', async ({ page }) => {
    // First log in
    await auth.gotoLogin();
    await auth.login('demo@techmart.com', 'demo123');
    await page.waitForURL('/');
    await expect(catalog.authArea).toContainText('Hi, Demo User');

    // Click logout
    await page.locator('#logoutBtn').click();

    // Header resets to Login and Sign Up
    await expect(catalog.authArea).toContainText('Login');
    await expect(catalog.authArea).not.toContainText('Hi, Demo User');
  });
});
