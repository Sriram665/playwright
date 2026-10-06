import { test, expect } from '@playwright/test';    

test('basic test', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic');
    await expect(page.locator('body')).toContainText('Interactive Playwright Sandbox Basic');

})