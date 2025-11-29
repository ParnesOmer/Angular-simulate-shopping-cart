import { test, expect } from '@playwright/test';

test.describe('Auth - Guard', () => {
  test('should redirect unauthenticated user from /app/products to /login', async ({ page }) => {
    // 1. Ensure we start from a clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // 2. Try to access a protected route
    await page.goto('/app/products');

    // 3. Expectation: should be redirected to /login
    await expect(page).toHaveURL(/.*login/);

    // Optionally: Check that the login form is visible
    await expect(page.getByLabel('Email:')).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });
});

