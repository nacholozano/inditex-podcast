import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('button', { name: 'run' })).toBeVisible();
});
