import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/facebook.json' }); 

test('Search Facebook - Open Recent Search', async ({ page }) => {

    await page.goto('https://www.facebook.com/');
    await page.waitForTimeout(3000);

    // Click Facebook search box
    const searchBox = page.getByPlaceholder('Search Facebook', { exact: true }).first();

    await searchBox.click();

    // Click recent search
    const recentSearch = page.getByText('ET NOW', {exact: true}).first();

    await recentSearch.click();

    await page.waitForTimeout(3000);

    // Verify ET NOW page
    await expect(page.getByText('ET NOW', { exact: true }).first()).toBeVisible();

});

test('Create Facebook Post', async ({ page }) => {

    await page.goto('https://www.facebook.com/');

    // Open Create Post
    await page.getByText("What's on your mind", { exact: false }).click();

    // Enter post content
    await page.locator('[contenteditable="true"]').fill('Hello! This post was created using Playwright automation.');

    // Click Post
    await page.getByRole('button', { name: 'Post', exact: true }).click();

});

test('Like a Facebook Post', async ({ page }) => {

    await page.goto('https://www.facebook.com/');

    // Find the Like button
    const likeButton = page.getByRole('button', {name: 'Like',exact: true}).first();

    // Click Like
    await likeButton.click();

});


test('Like Reels', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('https://www.facebook.com/reel/');
    await page.waitForTimeout(5000);

    // Like Reel
    await page.locator('[role="button"][aria-label="Like"]:visible').first().click();
});

test('Friends Tab - Add 4 Friends from Suggestions', async ({ page }) => {
    test.setTimeout(60000);

    // Navigate to Friends
    await page.goto('https://www.facebook.com/friends/');
    await page.waitForTimeout(3000);

    // Navigate to Suggestions
    await page.getByText('Suggestions', { exact: true }).click();
    await page.waitForTimeout(3000);

    // Scroll down
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(2000);

    // Click Add Friend for 4 friends
    const addFriendButtons = page.getByRole('button', {name: 'Add friend',exact: true});

    for (let i = 0; i < 4; i++) {
        await addFriendButtons.nth(i).click();
        await page.waitForTimeout(1000);
    }

    console.log('4 friend requests sent successfully');
});

test('Friends Tab - Accept and Delete Friend Requests', async ({ page }) => {

    await page.goto('https://www.facebook.com/friends/');
    await page.waitForTimeout(3000);

    // Users to accept
    const confirmUsers = ['Shavaj Khan'];

    // Users to delete
    const deleteUsers = ['Manohar Rao'];

    // Accept friend requests
    for (const user of confirmUsers) {

        const confirmButton = page.getByRole('button', {name: `Confirm ${user}`,exact: true});

        await confirmButton.click();

        await page.waitForTimeout(2000);
    }

    // Delete friend requests
    for (const user of deleteUsers) {

        const deleteButton = page.getByRole('button', {name: `Delete ${user}`,exact: true});

        await deleteButton.click();

        await page.waitForTimeout(2000);
    }
});

test('Friends Tab - Navigate to All Friends', async ({ page }) => {

    await page.goto('https://www.facebook.com/friends/');
    await page.waitForTimeout(3000);

    // Click "All friends" from the left-side menu
    await page.getByText('All friends', { exact: true }).click();

    // Verify All Friends page
    await expect(page).toHaveURL(/friends\/list/);

    await page.waitForTimeout(2000);
});

test('Marketplace - Open and Close Product', async ({ page }) => {

    // Navigate to Marketplace
    await page.goto('https://www.facebook.com/marketplace/');
    await page.waitForTimeout(3000);

    // Open the first product
    const product = page.locator('a[href*="/marketplace/item/"]').first();

    await product.click();

    await page.waitForTimeout(3000);

    // Verify product details page opened
    await expect(page).toHaveURL(/facebook\.com\/marketplace\/item\//);

    // Close the product details
    const closeButton = page.getByRole('banner').getByRole('button', { name: 'Close' }).first();

    await closeButton.click();

    await page.waitForTimeout(2000);

    // Verify returned to Marketplace
    await expect(page).toHaveURL(/facebook\.com\/marketplace/);
});

test('Notifications - Mark All as Read', async ({ page }) => {

    await page.goto('https://www.facebook.com/');
    await page.waitForTimeout(3000);

    // Click Notifications
    await page.getByRole('button', { name: /notifications/i }).click();

    await page.waitForTimeout(2000);

    // Click the 3-dot Notification actions menu
    await page.getByRole('button', { name: /notification action/i }).click();

    // Click "Mark all as read"
    await page.getByRole('menuitem', { name: 'Mark all as read' }).click();

    await page.waitForTimeout(2000);
});

test('Create Facebook Group - Public', async ({ page }) => {

    // Navigate to Groups
    await page.goto('https://www.facebook.com/groups/');
    await page.waitForTimeout(3000);

    // Click Create New Group
    await page.getByText('Create New Group', { exact: true }).click();

    await page.waitForTimeout(2000);

    // Enter Group Name
    await page.getByRole('textbox', { name: 'Group name' }).fill('Playwright Test Group 23-09-2026');

    // Open Privacy dropdown
    await page.getByText('Choose privacy', { exact: true }).locator('..').click();

    // Select Public
    await page.locator('.html-div.xdj266r.x14z9mp.xat24cr.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x2lah0s > .x15mokao').first().click();

    // Click Create
    await page.getByRole('button', { name: 'Create', exact: true }).click();

    await page.waitForTimeout(3000);

    // Close created group page
    await page.getByRole('button', { name: 'Close' }).first().click();
});



