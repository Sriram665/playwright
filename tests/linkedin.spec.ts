import { test, expect } from '@playwright/test';

// ============================================================
// Authentication Handling
// ============================================================

test.use({storageState: 'playwright\\.auth\\linkedin.json'});

// ============================================================
// Test Case 1 - LinkedIn Search
// Topics: Authentication Handling, Input Handling, Assertions,
// Advanced Wait, Wait Commands
// ============================================================

test('LinkedIn - Search', async ({ page }) => {

    // Command 1: Navigate to LinkedIn
    await page.goto('https://www.linkedin.com/feed/');

    //await page.getByRole('button', { name: 'Dismiss' }).click();

    // Command 2: Locate Search Input
    const searchBox = page.getByPlaceholder('Search').first();

    // Command 3: Enter Search Keyword
    await searchBox.fill('Playwright');

    // Command 4: Perform Search
    await searchBox.press('Enter');

    // Command 5: Advanced Wait - Wait for Search Results URL
    await page.waitForURL(/linkedin\.com\/search\/results/, {timeout: 30000});

    // Command 6: Assertion - Verify Search Results URL
    await expect(page).toHaveURL(/linkedin\.com\/search\/results/);

    // Command 7: Log Test Success
    console.log('Search completed successfully.');

});

// ============================================================
// Test Case 2 - LinkedIn Jobs Search @jobs
// Topics: Authentication Handling, Multiple Inputs,
// Dynamic Dropdown, Checkboxes, Assertions, Wait Commands,
// Advanced Wait, Force Action
// ============================================================

test('LinkedIn - Jobs Search @jobs', async ({ page }) => {

    // Command 1: Set Test Timeout
    test.setTimeout(60000);

    // ========================================================
    // Command 2: Navigate to LinkedIn Jobs
    // Topics: Navigation, Wait Commands
    // ========================================================

    await page.goto('https://www.linkedin.com/jobs/');

    // Command 3: Wait for DOM Content to Load
    await page.waitForLoadState('domcontentloaded');

    // ========================================================
    // Command 4: Job Title / Keyword Input
    // Topics: Multiple Inputs, Input Handling, Wait Commands
    // ========================================================

    const jobInput = page.getByTestId('typeahead-input').first();

    // Enter Job Title
    await jobInput.fill('Software Engineer');

    // Wait for Dynamic Suggestions
    await page.waitForTimeout(2000);

    // Submit Job Search
    await jobInput.press('Enter');

    // Wait for Job Search Results
    await page.waitForTimeout(2000);

    // ========================================================
    // Command 5: Open Experience Level Dropdown
    // Topics: Dynamic Dropdown, Dropdown Handling,
    // Wait Commands
    // ========================================================

    await page.getByRole('button', {name: 'Filter by Experience level'}).click();

    // Wait for Dropdown Options
    await page.waitForTimeout(1000);

    // ========================================================
    // Command 6: Select Experience Level Checkboxes
    // Topics: Checkboxes, Custom Locators, Force Action
    // ========================================================

    // Select Entry-level
    await page.locator('.bghmu5').first().click();

    // Select Senior
    await page.locator('div:nth-child(2) > .bghip7.bgha1x.bghipj > .bgha1x.bghipj > .bgha49 > .bghjz7.bghhqg > .bghmu5').click();

    // Select Manager
    await page.locator('div:nth-child(3) > .bghip7.bgha1x.bghipj > .bgha1x.bghipj > .bgha49 > .bghjz7.bghhqg > .bghmu5').click();

    // Select Director
    await page.locator('div:nth-child(4) > .bghip7.bgha1x.bghipj > .bgha1x.bghipj > .bgha49 > .bghjz7.bghhqg > .bghmu5').click();

    // Executive remains unchecked
    // Do not click the Executive checkbox.

    // ========================================================
    // Command 7: Apply Experience Level Filters
    // Topics: Link Locator, Click Action, Wait Commands
    // ========================================================

    await page.getByRole('link', {name: 'Show results', exact: true}).click();

    // Wait for Filtered Results URL
    await page.waitForURL(/jobs\/search-results/);

    // ========================================================
    // Command 8: Advanced Wait
    // Topics: Advanced Wait, URL Handling, Timeout
    // ========================================================

    await page.waitForURL(/linkedin\.com\/jobs\/search/, {timeout: 30000});

    // ========================================================
    // Command 9: Verify Jobs Search Results
    // Topics: Assertions, URL Verification
    // ========================================================

    await expect(page).toHaveURL(/linkedin\.com\/jobs\/search/);

    // Command 10: Log Test Success
    console.log('Jobs search completed successfully.');

});


// ============================================================
// Test Case 3 - LinkedIn People Search @people @newtab
// Topics: New Tab, Dynamic Locators, Mouse Actions,
// Hard Assertions, Soft Assertions, Hooks,
// Annotations, Tagging
// ============================================================

// Command 1: Hooks - Before Each and After Each

test.beforeEach(async ({ page }) => {
    console.log('Starting LinkedIn People Search test.');
});

test.afterEach(async ({ page }) => {
    console.log('LinkedIn People Search test completed.');
});

// ============================================================
// Command 2: People Search and Open Profile in New Tab
// ============================================================

test('LinkedIn - People Search and New Tab @people @newtab', async ({ page, context }) => {

    test.setTimeout(60000);

    // Command 3: Add Test Annotation
    test.info().annotations.push({type: '@smoke', description: 'People Search and New Tab'});

    // Command 4: Navigate to LinkedIn
    await page.goto('https://www.linkedin.com/feed/');

    // Command 5: Search for People
    const searchBox = page.getByPlaceholder('Search').first();

    await searchBox.fill('Vishudha Menon');

    await searchBox.press('Enter');

    // Command 6: Advanced Wait - Wait for Search Results
    await page.waitForURL(/linkedin\.com\/search\/results/, {timeout: 30000});

    // Command 7: Navigate to People Search Results
    await page.goto('https://www.linkedin.com/search/results/people/?keywords=Vishudha%20Menon');

    await page.waitForLoadState('domcontentloaded');

    // Command 8: Hard Assertion - Verify People Search Results URL
    await expect(page).toHaveURL(/search\/results\/people/);

    // Command 9: Locate the First Profile Link Dynamically
    const profileLink = page.locator('a[href*="/in/"]').first();

    await expect(profileLink).toBeVisible();

    // Command 10: Retrieve Profile URL
    const profileURL = await profileLink.getAttribute('href');

    // Command 11: Verify Profile URL Exists
    expect(profileURL).not.toBeNull();

    // ========================================================
    // Command 12: Open Profile in a New Tab
    // Topics: New Tab, Multiple Pages, Page Handling
    // ========================================================

    const newTab = await context.newPage();

    await newTab.goto(new URL(profileURL!, 'https://www.linkedin.com').toString());

    // Command 13: Advanced Wait - Wait for Profile Page
    await newTab.waitForLoadState('domcontentloaded');

    // Command 14: Hard Assertion - Verify Profile URL
    await expect(newTab).toHaveURL(/linkedin\.com\/in\//);

    // ========================================================
    // Command 15: Soft Assertion - Verify Profile Content
    // Topics: Soft Assertions
    // ========================================================

    await expect.soft(newTab.locator('main')).toBeVisible();

    // Command 16: Mouse Action - Move Mouse to Profile Page
    await newTab.mouse.move(500, 300);

    // Command 17: Verify Original Search Tab Remains Open
    await expect(page).toHaveURL(/search\/results\/people/);

    // Command 18: Close New Tab
    await newTab.close();

    // Command 19: Log Test Success
    console.log('People search and new tab test completed successfully.');

});

// ============================================================
// Test Case 4 - LinkedIn Send Message
// Topics: Multiple Inputs, Dynamic Dropdown, Keyboard Actions,
// Authentication Handling, Assertions, Wait Commands
// ============================================================

test('LinkedIn - Send Message @forms', async ({ page }) => {

    test.setTimeout(60000);

    // Command 1: Open LinkedIn Messaging
    await page.goto('https://www.linkedin.com/messaging/');

    // Command 2: Wait for Messaging Page
    await page.waitForLoadState('domcontentloaded');

    // Command 3: Verify Messaging Page
    await expect(page).toHaveURL(/linkedin\.com\/messaging/);

    await page.getByRole('button', { name: 'Compose a new message' }).click();

    // Command 4: Locate Recipient Input
    const recipientInput = page.getByPlaceholder('Type a name or multiple names').first();

    await expect(recipientInput).toBeVisible();

    // Command 5: Enter Recipient Name
    await recipientInput.fill('Sriram Kumar');

    // Command 6: Wait for Dynamic Recipient Suggestions
    await page.waitForTimeout(2000);

    // Command 7: Select Sriram Kumar from Suggestions
    await page.getByText('SRIRAM KUMAR', {exact: false}).first().click();

    // Command 8: Verify Message Input Box
    await expect(page.getByRole('textbox', {name: 'Write a message…'})).toBeVisible();

    // Command 9: Enter Message
    await page.getByRole('textbox', {name: 'Write a message…'}).fill('Playwright automation message.');

    // Command 10: Send Message
    await page.getByRole('button', {name: 'Send', exact: true}).click();

    console.log('LinkedIn message sent successfully.');

});

// ============================================================
// Test Case 5 - LinkedIn Messaging - Negative Testing
// Topics: Negative Testing, Hard Assertions, Input Validation
// ============================================================

test('LinkedIn - Negative Testing for Empty Message', async ({ page }) => {

    test.setTimeout(60000);

    // Command 1: Open LinkedIn Messaging
    await page.goto('https://www.linkedin.com/messaging/thread/new/');

    // Command 2: Verify Send Button is Disabled Without Recipient
    const sendButton = page.getByRole('button', {name: 'Send', exact: true});

    await expect(sendButton).toBeDisabled();

    // Command 3: Enter Recipient Name
    const recipientInput = page.getByPlaceholder('Type a name or multiple names');

    await recipientInput.fill('Sriram Kumar');

    // Command 4: Select Recipient
    await page.getByText('SRIRAM KUMAR', {exact: true}).first().click();

    // Command 5: Verify Empty Message Input
    const messageInput = page.getByRole('textbox', {name: /Write a message/});

    await expect(messageInput).toBeVisible();

    // Command 6: Add & clear the message input
    await page.getByRole('textbox', {name: /Write a message/}).fill('Playwright automation message.');

    await page.getByRole('textbox', {name: /Write a message/}).clear();

    // Command 7: Verify Send Button is Disabled for Empty Message
    await expect(sendButton).toBeDisabled();

    console.log('Negative testing completed successfully.');

});

// LinkedIn - Update Profile and Contact Information
test('LinkedIn - Update Profile and Contact Information', async ({ page }) => {
    test.setTimeout(120000);

    // 1. Open LinkedIn Homepage
    await page.goto('https://www.linkedin.com/feed/');

    // 2. Click Me Profile Icon
    await page.getByRole('button', { name: 'Me', exact: true }).click();

    // 3. Pause to inspect Me dropdown
    await page.pause();

    // 4. Click View Profile
    await page.getByRole('link', { name: 'View profile', exact: true }).click();

    // 5. Verify Profile URL
    await expect(page).toHaveURL(/linkedin\.com\/in\//);

    // 6. Click Edit Profile
    await page.getByTestId('lazy-column').getByRole('link', { name: 'Edit profile' }).click();

    // 7. Multiple Inputs - Additional Name
    await page.getByRole('textbox', { name: 'Additional name' }).fill('Vishli');

    // 8. Dynamic Dropdown - Pronouns
    await page.getByLabel('Pronouns').selectOption('StandardizedPronoun_THEY_THEM');

    // 9. Multiple Inputs - Headline
    await page.getByTestId('ui-core-tiptap-text-editor-wrapper').getByRole('textbox').fill('Playwright Automation Writing');

    // 10. Dynamic Dropdown - Industry
    await page.getByRole('textbox', { name: 'Industry' }).fill('Environmental Quality Programs');

    await page.getByRole('button', { name: 'Environmental Quality Programs', exact: true }).click();

    // 11. Save Profile
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // 12. Edit Contact Information
    await page.getByRole('link', { name: 'Edit contact info' }).click();

    // 13. Multiple Inputs - Phone Number
    await page.getByRole('textbox', { name: 'Phone number' }).fill('1234');

    // 14. Dynamic Dropdown - Phone Type
    await page.getByLabel('Phone type').selectOption('ProfilePhoneNumberType_HOME');

    // 15. Multiple Inputs - Address
    await page.getByRole('textbox', { name: 'Address' }).fill('Playwright automation test');

    // 16. Save Contact Information
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // 17. Verify Profile Page
    await expect(page).toHaveURL(/linkedin\.com\/in\//);

});