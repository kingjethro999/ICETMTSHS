import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'tchimezie475@gmail.com';
const ADMIN_PASSWORD = 'password123';
const BASE_URL = 'http://localhost:3001';

test.describe('Admin Dashboard Comprehensive Flow', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(180000); // 3 minutes for slow dev compilation
  });

  test('full login and dashboard verification', async ({ page }) => {
    console.log('Navigating to login page...');
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'load', timeout: 60000 });
    
    console.log('Filling credentials...');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    
    console.log('Clicking verify...');
    await page.click('button:has-text("Verify Identity")');

    console.log('Waiting for dashboard redirect...');
    // Increase navigation timeout for the internal redirect
    await page.waitForURL(/.*\/admin\/dashboard/, { timeout: 60000 });
    await expect(page.getByText('Welcome back,')).toBeVisible();
    await expect(page.getByText('System Admin')).toBeVisible();

    // 3. Verify Stats are loaded (not just skeleton/loading state)
    // Looking for the "Total Registrations" stat card which should have a numeric value
    const totalRegs = page.locator('h3:has-text("Total Registrations")').locator('xpath=..').locator('p.text-4xl');
    await expect(totalRegs).toBeVisible();
    const regValue = await totalRegs.innerText();
    expect(Number(regValue)).toBeGreaterThanOrEqual(0);

    // 4. Navigation to Registrations
    await page.goto(`${BASE_URL}/admin/registrations`);
    await expect(page).toHaveURL(/.*\/admin\/registrations/);
    await expect(page.getByText('Registrations Manager')).toBeVisible();
    
    // Check if the table is visible
    await expect(page.locator('table')).toBeVisible();

    // 5. Navigation to Settings
    await page.goto(`${BASE_URL}/admin/settings`);
    await expect(page).toHaveURL(/.*\/admin\/settings/);
    await expect(page.getByText('System Settings')).toBeVisible();
  });

  test('security - unauthorized access should redirect', async ({ page }) => {
    // Attempt to access dashboard without being logged in
    await page.context().clearCookies();
    await page.goto(`${BASE_URL}/admin/dashboard`);
    await expect(page).toHaveURL(/.*\/admin\/login/);
  });
});
