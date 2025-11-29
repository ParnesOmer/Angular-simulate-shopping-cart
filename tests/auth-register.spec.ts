import { test, expect } from '@playwright/test';

test.describe('Auth - Register', () => {
  test('should register a new user and redirect to login', async ({ page }) => {
    // 1) Go to the register page
    await page.goto('/register');

    // 2) Generate a unique email for this run
    const email = `test_${Date.now()}@example.com`;
    const password = 'Abcdef1';

    // 3) Fill the registration form
    await page.getByLabel('Email:').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#confirmPassword').fill(password);

    // 4) Submit the form
    await page.getByRole('button', { name: /register/i }).click();

    // 5) Assert redirect to /login
    await expect(page).toHaveURL(/.*login/);

    // 6) (Bonus check) Verify that the user has been stored in localStorage
    const usersJson = await page.evaluate(() => localStorage.getItem('users'));
    const users = JSON.parse(usersJson ?? '[]');
    const found = users.some((u: any) => u.email === email);
    expect(found).toBeTruthy();
  });
});

