import { Page } from '@playwright/test';

export async function dismissDemoModal(page: Page): Promise<void> {
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    document.querySelectorAll('#demoWarningModal').forEach((node) => node.remove());
  });
}
