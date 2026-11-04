// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Accessibility Module (A11Y)', () => {

  test('TC-A11Y-001: Verify All Images Have Descriptive Alt Attributes', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      // Auto-assert non-empty alt
      expect(alt, `Image ${src} must have a non-empty alt attribute`).toBeTruthy();
      expect(alt?.trim().length).toBeGreaterThan(0);
    }
  });

  test('TC-A11Y-002: Verify Accessible Form Controls and Input Labels', async ({ page }) => {
    // Check login form inputs
    await page.goto('/login.html');
    const inputs = page.locator('input:not([type="hidden"]):not([type="submit"])');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');

      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const labelCount = await label.count();
        const hasAria = !!ariaLabel;
        const hasPlaceholder = !!placeholder;

        expect(
          labelCount > 0 || hasAria || hasPlaceholder,
          `Input #${id} lacks label or accessible text`
        ).toBeTruthy();
      }
    }
  });

  test('TC-A11Y-003: Automated WCAG 2.0 AA Accessibility Compliance Check', async ({ page }) => {
    await page.goto('/');

    // Axe Core scan targeting WCAG 2.0 Level A and AA standards
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical'
    );

    // Fail test if any critical violations are encountered
    expect(criticalViolations).toHaveLength(0);
  });
});
