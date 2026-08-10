import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
for (const path of ['/', '/methodology', '/sources', '/share']) {
  test(`${path} renders without serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator('main#main')).toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(
      results.violations.filter((v) =>
        ['critical', 'serious'].includes(v.impact ?? ''),
      ),
    ).toEqual([]);
  });
}
test('flow explorer supports selection', async ({ page }) => {
  await page.goto('/');
  const tab = page.getByRole('tab', { name: /Instrument/ });
  await tab.click();
  await expect(tab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('offchain treasury');
});
