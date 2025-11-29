import { test, expect } from '@playwright/test';

test.describe('Shop - Cart', () => {
  test('should add products to cart and persist after reload', async ({ page }) => {
    // Generate unique email
    const email = `test_${Date.now()}@example.com`;
    const password = 'Abcdef1';

    // 1. Register a user
    await page.goto('/register');
    await page.getByLabel('Email:').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#confirmPassword').fill(password);
    await page.getByRole('button', { name: /register/i }).click();
    await expect(page).toHaveURL(/.*login/);

    // 2. Login
    await page.goto('/login');
    await page.getByLabel('Email:').fill(email);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page).toHaveURL(/.*app\/products/);

    // 3. Add products to cart
    await page.getByRole('button', { name: /add/i }).first().click();
    // Optionally click add twice to test quantity increment
    await page.getByRole('button', { name: /add/i }).first().click();

    // 4. Navigate to cart page
    await page.getByRole('link', { name: /cart/i }).click();
    await expect(page).toHaveURL(/.*app\/cart/);

    // 5. Verify cart contents
    // Check that at least one product name is visible
    await expect(page.locator('text=Product A')).toBeVisible();
    
    // Check that quantity is visible (should be 2 since we clicked Add twice)
    await expect(page.locator('text=Quantity: 2')).toBeVisible();

    // 6. Reload page
    await page.reload();

    // 7. Verify persistence
    // Ensure the cart item is still visible after reload
    await expect(page.locator('text=Product A')).toBeVisible();
    await expect(page.locator('text=Quantity: 2')).toBeVisible();
  });
});

