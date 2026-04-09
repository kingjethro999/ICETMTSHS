# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Admin Dashboard Comprehensive Flow >> full login and dashboard verification
- Location: tests\admin.spec.ts:12:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 60000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link "C ConferenceOS Admin Panel v1.0" [ref=e5] [cursor=pointer]:
        - /url: /admin/dashboard
        - generic [ref=e7]: C
        - generic [ref=e8]:
          - heading "ConferenceOS" [level=1] [ref=e9]
          - paragraph [ref=e10]: Admin Panel v1.0
      - navigation [ref=e11]:
        - link "Dashboard" [ref=e12] [cursor=pointer]:
          - /url: /admin/dashboard
          - generic [ref=e13]:
            - img [ref=e14]
            - generic [ref=e19]: Dashboard
        - link "Content Manager" [ref=e20] [cursor=pointer]:
          - /url: /admin/content-manager
          - generic [ref=e21]:
            - img [ref=e22]
            - generic [ref=e25]: Content Manager
        - link "Registrations" [ref=e26] [cursor=pointer]:
          - /url: /admin/registrations
          - generic [ref=e27]:
            - img [ref=e28]
            - generic [ref=e33]: Registrations
        - link "Gallery Manager" [ref=e34] [cursor=pointer]:
          - /url: /admin/gallery
          - generic [ref=e35]:
            - img [ref=e36]
            - generic [ref=e40]: Gallery Manager
        - link "Settings" [ref=e41] [cursor=pointer]:
          - /url: /admin/settings
          - generic [ref=e42]:
            - img [ref=e43]
            - generic [ref=e46]: Settings
      - button "Admin Administrator Management" [ref=e48]:
        - generic [ref=e49]:
          - generic [ref=e50]: Admin
          - generic [ref=e51]:
            - paragraph [ref=e52]: Administrator
            - paragraph [ref=e53]: Management
        - img [ref=e54]
    - generic [ref=e57]:
      - banner [ref=e58]:
        - generic [ref=e59]:
          - generic [ref=e60]:
            - img [ref=e62]
            - generic [ref=e64]:
              - generic [ref=e65]:
                - generic [ref=e66]: ICETMTSHS 2026 Panel
                - generic [ref=e68]: Official Admin Control
              - heading "Login" [level=2] [ref=e69]: Login
          - generic [ref=e71]:
            - generic:
              - img
            - textbox "Search documents, IDs, tags..." [ref=e72]
        - generic [ref=e73]:
          - generic [ref=e74]:
            - button [ref=e75]:
              - img [ref=e76]
            - button [ref=e80]:
              - img [ref=e81]
          - button "AD Super Admin Main Server" [ref=e84]:
            - generic [ref=e86]:
              - img [ref=e87]
              - text: AD
            - generic [ref=e91]:
              - paragraph [ref=e92]: Super Admin
              - paragraph [ref=e93]: Main Server
            - img [ref=e94]
      - main [ref=e96]:
        - generic [ref=e97]:
          - generic [ref=e98]:
            - generic [ref=e99]:
              - generic:
                - img
              - link "C ConferenceOS Official Control Center" [ref=e101] [cursor=pointer]:
                - /url: /
                - generic [ref=e103]: C
                - generic [ref=e104]:
                  - heading "ConferenceOS" [level=1] [ref=e105]
                  - paragraph [ref=e106]: Official Control Center
              - generic [ref=e107]:
                - generic [ref=e108]:
                  - paragraph [ref=e110]: Admin Portal v2026
                  - heading "Managing the Future of Global Engineering" [level=2] [ref=e111]
                - paragraph [ref=e112]: Secure gateway for authorized administrative staff only. Manage ICETMTSHS 2026 registrations, gallery, and core content settings.
              - generic [ref=e113]:
                - img [ref=e115]
                - generic [ref=e118]:
                  - paragraph [ref=e119]: End-to-End Encrypted
                  - paragraph [ref=e120]: Session validation enabled
            - generic [ref=e121]:
              - generic [ref=e122]:
                - heading "System Authentication" [level=3] [ref=e124]
                - paragraph [ref=e125]: Authorized Personnel Only — Enter Credentials
              - generic [ref=e126]:
                - generic [ref=e127]:
                  - generic [ref=e128]:
                    - text: Administrative Email Identity
                    - generic [ref=e129]:
                      - generic:
                        - img
                      - textbox "admin@conference.com" [ref=e130]: tchimezie475@gmail.com
                  - generic [ref=e131]:
                    - generic [ref=e132]:
                      - generic [ref=e133]: Secret Access Key phrase
                      - link "Recover Access" [ref=e134] [cursor=pointer]:
                        - /url: "#"
                    - generic [ref=e135]:
                      - generic:
                        - img
                      - textbox "••••••••" [ref=e136]: password123
                - button [disabled] [ref=e137]:
                  - img [ref=e138]
                - button "No authorization code? Request Enrollment" [ref=e141]:
                  - img [ref=e142]
                  - text: No authorization code?
                  - generic [ref=e145]: Request Enrollment
          - generic [ref=e146]:
            - img "Lincoln" [ref=e147]
            - paragraph [ref=e149]: © 2026 Conference Hub • Lincoln University College
  - button "Open Next.js Dev Tools" [ref=e155] [cursor=pointer]:
    - generic [ref=e158]:
      - text: Rendering
      - generic [ref=e159]:
        - generic [ref=e160]: .
        - generic [ref=e161]: .
        - generic [ref=e162]: .
  - alert [ref=e163]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const ADMIN_EMAIL = 'tchimezie475@gmail.com';
  4  | const ADMIN_PASSWORD = 'password123';
  5  | const BASE_URL = 'http://localhost:3001';
  6  | 
  7  | test.describe('Admin Dashboard Comprehensive Flow', () => {
  8  |   test.beforeEach(async ({ page }) => {
  9  |     test.setTimeout(180000); // 3 minutes for slow dev compilation
  10 |   });
  11 | 
  12 |   test('full login and dashboard verification', async ({ page }) => {
  13 |     console.log('Navigating to login page...');
  14 |     await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'load', timeout: 60000 });
  15 |     
  16 |     console.log('Filling credentials...');
  17 |     await page.fill('input[name="email"]', ADMIN_EMAIL);
  18 |     await page.fill('input[name="password"]', ADMIN_PASSWORD);
  19 |     
  20 |     console.log('Clicking verify...');
  21 |     await page.click('button:has-text("Verify Identity")');
  22 | 
  23 |     console.log('Waiting for dashboard redirect...');
  24 |     // Increase navigation timeout for the internal redirect
> 25 |     await page.waitForURL(/.*\/admin\/dashboard/, { timeout: 60000 });
     |                ^ TimeoutError: page.waitForURL: Timeout 60000ms exceeded.
  26 |     await expect(page.getByText('Welcome back,')).toBeVisible();
  27 |     await expect(page.getByText('System Admin')).toBeVisible();
  28 | 
  29 |     // 3. Verify Stats are loaded (not just skeleton/loading state)
  30 |     // Looking for the "Total Registrations" stat card which should have a numeric value
  31 |     const totalRegs = page.locator('h3:has-text("Total Registrations")').locator('xpath=..').locator('p.text-4xl');
  32 |     await expect(totalRegs).toBeVisible();
  33 |     const regValue = await totalRegs.innerText();
  34 |     expect(Number(regValue)).toBeGreaterThanOrEqual(0);
  35 | 
  36 |     // 4. Navigation to Registrations
  37 |     await page.goto(`${BASE_URL}/admin/registrations`);
  38 |     await expect(page).toHaveURL(/.*\/admin\/registrations/);
  39 |     await expect(page.getByText('Registrations Manager')).toBeVisible();
  40 |     
  41 |     // Check if the table is visible
  42 |     await expect(page.locator('table')).toBeVisible();
  43 | 
  44 |     // 5. Navigation to Settings
  45 |     await page.goto(`${BASE_URL}/admin/settings`);
  46 |     await expect(page).toHaveURL(/.*\/admin\/settings/);
  47 |     await expect(page.getByText('System Settings')).toBeVisible();
  48 |   });
  49 | 
  50 |   test('security - unauthorized access should redirect', async ({ page }) => {
  51 |     // Attempt to access dashboard without being logged in
  52 |     await page.context().clearCookies();
  53 |     await page.goto(`${BASE_URL}/admin/dashboard`);
  54 |     await expect(page).toHaveURL(/.*\/admin\/login/);
  55 |   });
  56 | });
  57 | 
```