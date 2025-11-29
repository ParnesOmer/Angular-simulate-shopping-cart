import { test, expect } from '@playwright/test';

test.describe('Auth - Login', () => {
  test('should login an existing user and redirect to products page', async ({ page }) => {
    // 1. Generate a unique email
    const email = `test_${Date.now()}@example.com`;
    const password = 'Abcdef1';

    // 2. Create the user
    await page.goto('/register');
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.getByTestId('register-confirm-password').fill(password);
    await page.getByTestId('register-submit').click();
    await expect(page).toHaveURL(/.*login/);

    // 3. Perform login
    await page.goto('/login');
    await page.getByTestId('login-email').fill(email);
    await page.getByTestId('login-password').fill(password);
    await page.getByTestId('login-submit').click();

    // 4. Assertions
    await expect(page).toHaveURL(/.*app\/products/);
    
    const currentRaw = await page.evaluate(() => localStorage.getItem('currentUserEmail'));
    const current = currentRaw ? JSON.parse(currentRaw) : null;
    expect(current).toBe(email);
  });
});

