import { test, expect } from '@playwright/test';
import path from 'path';

test('LinkedIn - Login', async ({ page }) => {

    // Open LinkedIn
    await page.goto('https://www.linkedin.com/home');

    // Verify that Sign in button is visible
    await expect(page.getByRole('link', {name: 'Sign in', exact: true})).toBeVisible();

    // click on the Sign in button
    await page.getByRole('link', { name: 'Sign in', exact: true }).click();

    // Wait for the login page to load
    await page.waitForTimeout(3000);

    // Enter username and password
    await page.getByRole('textbox', { name: 'Email or phone' }).fill('sriramtest9@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('October@$123');

    // Click on the Sign in button
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Wait for the login page to load
    await page.waitForTimeout(3000);

    await expect(page.getByText('Start a post', { exact: true })).toBeVisible();

    // Save LinkedIn cookies/session
    await page.context().storageState({path: path.resolve('playwright/.auth/linkedin.json')});

});