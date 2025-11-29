import { test, expect } from '@playwright/test';

test.describe('Shop - Cart', () => {
  test('should add products to cart and persist after reload', async ({ page }) => {
    // Generate unique email
    const email = `test_${Date.now()}@example.com`;
    const password = 'Abcdef1';

    // 1. Register a user
    await page.goto('/register');
    await page.getByTestId('register-email').fill(email);
    await page.getByTestId('register-password').fill(password);
    await page.getByTestId('register-confirm-password').fill(password);
    await page.getByTestId('register-submit').click();
    await expect(page).toHaveURL(/.*login/);

    // 2. Login
    await page.goto('/login');
    await page.getByTestId('login-email').fill(email);
    await page.getByTestId('login-password').fill(password);
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/.*app\/products/);

    // 3. Get the first product's name and price before adding to cart
    const firstProduct = page.getByTestId('product-card').first();
    const productName = await firstProduct.locator('.product-name').textContent();
    const productPriceText = await firstProduct.locator('.product-price').textContent();
    const productPrice = productPriceText ? parseFloat(productPriceText.replace('$', '')) : 0;

    // 4. Add product to cart (click Add to cart on first product)
    await firstProduct.getByTestId('product-add-to-cart').click();

    // 5. Navigate to cart page via header
    await page.getByTestId('nav-cart').click();
    await expect(page).toHaveURL(/.*app\/cart/);

    // 6. Verify cart contents
    // Check that at least one cart item exists
    const cartItems = page.getByTestId('cart-item');
    await expect(cartItems.first()).toBeVisible();
    
    // Verify the product name matches
    const firstCartItemName = await page.getByTestId('cart-item-name').first().textContent();
    expect(firstCartItemName).toBe(productName);

    // Verify quantity is 1
    const quantity = await page.getByTestId('cart-item-quantity').first().textContent();
    expect(quantity).toBe('1');

    // Verify subtotal matches the product price
    const subtotalText = await page.getByTestId('cart-item-subtotal').first().textContent();
    const subtotal = subtotalText ? parseFloat(subtotalText.replace('Subtotal: $', '')) : 0;
    expect(subtotal).toBe(productPrice);

    // Verify cart summary
    const summaryItems = await page.getByTestId('cart-summary-items').textContent();
    expect(summaryItems).toContain('Items: 1');

    const summaryTotalText = await page.getByTestId('cart-summary-total').textContent();
    const summaryTotal = summaryTotalText ? parseFloat(summaryTotalText.replace('Total: $', '')) : 0;
    expect(summaryTotal).toBe(productPrice);

    // 7. Reload page
    await page.reload();

    // 8. Verify persistence after reload
    await expect(cartItems.first()).toBeVisible();
    const persistedName = await page.getByTestId('cart-item-name').first().textContent();
    expect(persistedName).toBe(productName);
    
    const persistedQuantity = await page.getByTestId('cart-item-quantity').first().textContent();
    expect(persistedQuantity).toBe('1');

    const persistedSummaryItems = await page.getByTestId('cart-summary-items').textContent();
    expect(persistedSummaryItems).toContain('Items: 1');
  });
});
