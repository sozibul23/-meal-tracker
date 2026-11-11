const { test, expect } = require('@playwright/test');

test.describe('Meal Tracker Automated QA Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Prevent tests from mutating live Firestore or hitting external Google Sheets/Apps Script unless explicitly mocked
    await page.route('**/*firestore.googleapis.com/**', route => route.abort());
    await page.route('**/*docs.google.com/**', route => route.fulfill({ status: 204, body: '' }));
    await page.route('**/*script.google.com/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));

    // Navigate to local test instance
    await page.goto('/');
    // Wait for core UI header to hydrate
    await expect(page.locator('.brand-title')).toBeVisible();
    await expect(page.locator('#currentMonthLabel')).toBeVisible();
  });

  test('TC01: Initial Load & Core Dashboard Elements', async ({ page }) => {
    // 1. Verify Header & App branding
    await expect(page.locator('.brand-title')).toBeVisible();
    await expect(page.locator('#currentMonthLabel')).toBeVisible();

    // 2. Verify Tab Navigation Elements
    await expect(page.locator('[data-tab="dashboard"]:visible').first()).toBeVisible();
    await expect(page.locator('[data-tab="meals"]:visible').first()).toBeVisible();
    await expect(page.locator('[data-tab="bazar"]:visible').first()).toBeVisible();

    // 3. Verify KPI Stat Cards on Dashboard
    await expect(page.locator('#kpiTotalDeposit')).toBeVisible();
    await expect(page.locator('#kpiTotalBazar')).toBeVisible();
    await expect(page.locator('#kpiRemainingFund')).toBeVisible();
    await expect(page.locator('#kpiMealRate')).toBeVisible();
  });

  test('TC02: Admin Login Security Flow', async ({ page }) => {
    // 1. Open Admin modal via Admin Toggle Button
    const adminToggle = page.locator('#adminToggleBtn');
    await expect(adminToggle).toBeVisible();
    await adminToggle.click();

    const adminModal = page.locator('#adminLoginModal');
    await expect(adminModal).toHaveClass(/open/);

    const pinInput = page.locator('#adminPinInput');
    await expect(pinInput).toBeVisible();

    // 2. Try Incorrect PIN (Triggers browser alert dialog)
    page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await pinInput.fill('0000');
    await page.locator('#adminLoginForm button[type="submit"]').click();

    // 3. Enter Correct PIN: 1357
    await pinInput.fill('1357');
    await page.locator('#adminLoginForm button[type="submit"]').click();

    // Modal should close and admin state should be activated
    await expect(adminModal).not.toHaveClass(/open/);
    await expect(page.locator('#adminBanner')).toBeVisible();
    const isAdmin = await page.evaluate(() => window.isAdmin);
    expect(isAdmin).toBe(true);
  });

  test('TC03: Meal Update (+ / -) and Instant Realtime UI Sync', async ({ page }) => {
    // 1. Authenticate as Admin
    await page.evaluate(() => {
      sessionStorage.setItem('MESS_ADMIN_LOGGED_IN', 'true');
      window.isAdmin = true;
      if (typeof updateAdminUI === 'function') updateAdminUI();
      if (typeof renderAll === 'function') renderAll();
    });

    // 2. Switch to Daily Meals tab
    await page.evaluate(() => {
      if (typeof switchTab === 'function') switchTab('meals');
    });
    const mealsTable = page.locator('#mealsTable');
    await expect(mealsTable).toBeVisible();

    // 3. Target the first member's stepper on Day 1
    const firstStepper = page.locator('#mealsBody tr .meal-stepper').first();
    await expect(firstStepper).toBeVisible();

    const countSpan = firstStepper.locator('.meal-count');
    const initialCount = parseInt(await countSpan.textContent() || '0', 10);

    // 4. Click "+" button
    const plusBtn = firstStepper.locator('button.step-btn', { hasText: '+' });
    await plusBtn.click();

    // Verify it updates IMMEDIATELY without page reload
    await expect(countSpan).toHaveText(String(initialCount + 1));

    // 5. Click "-" button
    const minusBtn = firstStepper.locator('button.step-btn', { hasText: '-' });
    await minusBtn.click();

    // Verify it decrements immediately back to initialCount
    await expect(countSpan).toHaveText(String(initialCount));
  });

  test('TC04: Add Bazar with Calendar Datepicker & Verify Live Calculations', async ({ page }) => {
    // 1. Authenticate as Admin
    await page.evaluate(() => {
      sessionStorage.setItem('MESS_ADMIN_LOGGED_IN', 'true');
      window.isAdmin = true;
      if (typeof updateAdminUI === 'function') updateAdminUI();
      if (typeof renderAll === 'function') renderAll();
    });

    // 2. Switch to Bazar tab
    await page.evaluate(() => {
      if (typeof switchTab === 'function') switchTab('bazar');
    });
    await expect(page.locator('#bazarTableBody')).toBeVisible();

    // 3. Open Add Bazar Modal
    await page.locator('#openAddBazarBtn').click();
    const modal = page.locator('#bazarModal');
    await expect(modal).toHaveClass(/open/);

    // 4. Verify Calendar Datepicker input exists and has value
    const dateInput = page.locator('#modalBazarDateInput');
    await expect(dateInput).toHaveAttribute('type', 'date');
    await expect(dateInput).not.toBeEmpty();

    // 5. Fill item name and amount
    const uniqueItem = 'QA Test Item ' + Date.now();
    await page.locator('#bazarItemsRowsContainer .bazar-item-name').first().fill(uniqueItem);
    await page.locator('#bazarItemsRowsContainer .bazar-item-price').first().fill('120');

    // 6. Submit form
    await page.locator('#bazarForm button[type="submit"]').click();

    // Verify modal closes and item appears in Bazar Table
    await expect(modal).not.toHaveClass(/open/);
    await expect(page.locator('#bazarTableBody')).toContainText(uniqueItem);
    await expect(page.locator('#bazarTableBody')).toContainText('120');
  });

  test('TC05: Add Deposit with Datepicker & Verify Deposit History', async ({ page }) => {
    // 1. Authenticate as Admin
    await page.evaluate(() => {
      sessionStorage.setItem('MESS_ADMIN_LOGGED_IN', 'true');
      window.isAdmin = true;
      if (typeof updateAdminUI === 'function') updateAdminUI();
      if (typeof renderAll === 'function') renderAll();
    });

    // 2. Open Deposit modal
    await page.evaluate(() => {
      if (window.openDepositModalGlobal) window.openDepositModalGlobal();
    });

    const modal = page.locator('#depositModal');
    await expect(modal).toHaveClass(/open/);

    // 3. Set today date via helper button & verify datepicker
    await page.locator('#setTodayDepositDateBtn').click();
    const dateInput = page.locator('#depositDateInput');
    await expect(dateInput).toHaveAttribute('type', 'date');
    await expect(dateInput).not.toBeEmpty();

    // 4. Fill deposit details
    await page.locator('#depositAmountInput').fill('500');
    await page.locator('#depositNoteInput').fill('QA Automated Deposit');

    // 5. Submit
    await page.locator('#depositForm button[type="submit"]').click();

    // 6. Verify modal closed and toast displayed
    await expect(modal).not.toHaveClass(/open/);
    await expect(page.locator('#toast')).toBeVisible();
  });

  test('TC06: Theme Switcher Toggle (Dark / Light Mode)', async ({ page }) => {
    const themeBtn = page.locator('#themeToggleBtn');
    await expect(themeBtn).toBeVisible();

    // Initial theme check
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'dark');

    // Click toggle
    await themeBtn.click();
    const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(newTheme).not.toBe(initialTheme);

    // Click toggle again to revert
    await themeBtn.click();
    const revertedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(revertedTheme).toBe(initialTheme);
  });

  test('TC07: Responsive Mobile Viewport Layout', async ({ page }) => {
    // Resize to mobile screen (Pixel 7 dimension)
    await page.setViewportSize({ width: 412, height: 915 });

    // Floating bottom navigation dock should be sticky and visible on mobile
    const dock = page.locator('#floatingDock');
    await expect(dock).toBeVisible();

    // Quick Action FAB should be accessible
    const fab = page.locator('#quickActionFab');
    await expect(fab).toBeVisible();

    // Tap Quick Action FAB to ensure bottom sheet opens smoothly
    await fab.click();
    const sheet = page.locator('#quickActionSheet');
    await expect(sheet).toHaveClass(/open/);
  });

  test('TC08: Google Sheet (gid=113477995) Live Sync Updates App State & UI', async ({ page }) => {
    const sampleCsv = [
      '"Date","Item type","Name ","Meal Expend","Other Expend","Other paid by","","","","Sadhin","Meal - Cost 2026 Tanzid","Akhirul","Tusher","Imam","","","","Deposit","Cost","Remain","","",""',
      '"1","Meals","Mach, fulkopi","880","","","","","1October","2","1","2","","","","Sadhin","","2000","","","","",""',
      '"2","Meals","murgi","590","","","","","2October","2","1","2","","","","Tanzid","","1500","","","","",""',
      '"","","","","","","","","","","","","","","","Tusher","","0","","","","",""',
      '"3","Others","vim","","30","Sadhin","","","3October","1","1","1","","","","Akhirul","","2000","","","","",""',
      '"","","","","","","","","","","","","","","","Imam","","0","","","","",""',
      '"","","","","","","","","","","","","","","","Others Cost","","","","","","",""',
      '"","","","","","","","","","","","","","","","Item","","","","","Akhirul","Imam","Tusher"',
      '"","","","","","","","","","","","","","","","House Rent","16000","4000","","","Paid","Paid",""',
      '"","","","","","","","","","","","","","","","Wifi","690","172.5","","","Paid","Paid",""',
      '"","","","","","","","","","","","","","","","Bua","700","233.3333333","","","Paid","",""'
    ].join('\n');

    await page.route('**/*docs.google.com/**', route => route.fulfill({
      status: 200,
      contentType: 'text/csv',
      body: sampleCsv
    }));

    await page.locator('#quickSheetSyncBtn').click();

    // Verify members (5 including Tusher), meals (13), meal bazar (1470), shared (30)
    await expect(page.locator('#memberCardsGrid')).toContainText('Tusher');
    await expect(page.locator('#kpiRateFormula')).toContainText('13 মিল');
    await expect(page.locator('#kpiTotalBazar')).toContainText('1,500');
    await expect(page.locator('#dashboardRecentBazar')).toContainText('vim');
  });

  test('TC09: Mobile Responsiveness Across Small & Standard Phones (No Horizontal Overflow)', async ({ page }) => {
    for (const vp of [{ width: 360, height: 740 }, { width: 412, height: 915 }]) {
      await page.setViewportSize(vp);
      await expect(page.locator('#gsheetSyncIndicator')).toBeVisible();
      await expect(page.locator('#sheetSyncBar')).toBeVisible();
      await expect(page.locator('#floatingDock')).toBeVisible();

      // Ensure no duplicate member dock button
      await expect(page.locator('#floatingDock .dock-btn[data-tab="users"]')).toHaveCount(1);

      // Ensure zero horizontal page overflow
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth
      }));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth);
    }
  });

  test('TC10: Two-Way Sync (App -> Google Sheet Apps Script Webhook)', async ({ page }) => {
    let capturedPayload = null;
    await page.route('**/*script.google.com/**', async route => {
      capturedPayload = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });

    // Configure Webhook URL via Google Sheet Settings Modal
    await page.locator('#openGsheetModalBtn').click();
    await expect(page.locator('#gsheetModal')).toHaveClass(/open/);
    await page.locator('#gsheetWebhookInput').fill('https://script.google.com/macros/s/test-webhook-id/exec');
    await page.locator('#gsheetForm button[type="submit"]').click();
    await expect(page.locator('#gsheetModal')).not.toHaveClass(/open/);
    await expect(page.locator('#gsheetStatusText')).toHaveText('2-Way লাইভ');

    // Authenticate as Admin and increment Day 1 meal
    await page.evaluate(() => {
      sessionStorage.setItem('MESS_ADMIN_LOGGED_IN', 'true');
      window.isAdmin = true;
      if (typeof updateAdminUI === 'function') updateAdminUI();
      if (typeof renderAll === 'function') renderAll();
      if (typeof switchTab === 'function') switchTab('meals');
    });

    const firstPlusBtn = page.locator('#mealsBody tr .meal-stepper button.step-btn', { hasText: '+' }).first();
    await firstPlusBtn.click();

    // Wait for 1200ms debounce push to fire
    await expect.poll(() => capturedPayload, { timeout: 5000 }).not.toBeNull();
    expect(capturedPayload.gid).toBe('113477995');
    expect(capturedPayload.meals['1'].Sadhin).toBeGreaterThanOrEqual(1);
  });

});
