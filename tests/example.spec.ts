import { test, expect } from '@playwright/test';

test.describe('App basic', () => {
  test('root page should load', async ({ page }) => {
    await page.goto('/');
    
    // Expect the URL to contain '/login' (because we redirect to login)
    await expect(page).toHaveURL(/.*login/);
    
    // Check that the page has a label for email
    await expect(page.getByLabel('Email:')).toBeVisible();
    
    // Optionally check for "Login" text in the button
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});

