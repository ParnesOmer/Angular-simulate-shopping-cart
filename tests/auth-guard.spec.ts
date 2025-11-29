import { test, expect } from '@playwright/test';

test.describe('Auth - Guard', () => {
  test('should redirect unauthenticated user from /app/products to /login', async ({ page }) => {
    // 1. Ensure we start from a clean state - clear localStorage before navigation
    await page.addInitScript(() => window.localStorage.clear());

    // 2. Try to access a protected route
    await page.goto('/app/products');

    // 3. Expectation: should be redirected to /login
    await page.waitForURL('**/login');
    await expect(page).toHaveURL(/.*login/);
  });
});

