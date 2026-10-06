import { test as setup, expect } from '@playwright/test';
import path from 'path';

setup('Facebook Authentication', async ({ page }) => {

    await page.goto('https://www.facebook.com/');

    await page.getByRole('textbox', {name: 'Email address or mobile number'}).fill('kumarsriram517@gmail.com');

    await page.getByRole('textbox', {name: 'Password'}).fill('October@$123');

    await page.getByRole('button', {name: /log in/i}).click();

    // Complete Facebook security/CAPTCHA manually if it appears
    await page.pause();

    // Verify that Facebook login succeeded
    await expect(page).toHaveURL(/facebook\.com/);

    const searchBox = page.getByPlaceholder('Search Facebook').first();
    await expect(searchBox).toBeVisible({ timeout: 60000 });

    // Save authenticated session
    await page.context().storageState({path: path.resolve('playwright/.auth/facebook.json')});
});