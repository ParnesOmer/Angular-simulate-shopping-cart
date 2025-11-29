import { test, expect } from '@playwright/test';

test.describe('App basic', () => {
  test('root page should redirect to login', async ({ page }) => {
    // Use baseURL from playwright.config if configured
    await page.goto('/');

    // Wait for redirect to login
    await page.waitForURL('**/login');

    // Assert that the login form is visible
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });
});

