import { test, expect } from '@playwright/test';

test.describe('Auth - Login', () => {
  test('should login an existing user and redirect to products page', async ({ page }) => {
    // 1. Generate a unique email
    const email = `test_${Date.now()}@example.com`;
    const password = 'Abcdef1';

    // 2. Create the user
    await page.goto('/register');
    await page.getByLabel('Email:').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#confirmPassword').fill(password);
    await page.getByRole('button', { name: /register/i }).click();
    await expect(page).toHaveURL(/.*login/);

    // 3. Perform login
    await page.goto('/login');
    await page.getByLabel('Email:').fill(email);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: /login/i }).click();

    // 4. Assertions
    await expect(page).toHaveURL(/.*app\/products/);
    
    const currentRaw = await page.evaluate(() => localStorage.getItem('currentUserEmail'));
    const current = currentRaw ? JSON.parse(currentRaw) : null;
    expect(current).toBe(email);
  });
});

