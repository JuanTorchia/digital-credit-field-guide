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
test('Apyx system trace supports pointer and keyboard selection', async ({
  page,
}) => {
  await page.goto('/');
  const treasury = page.getByRole('tab', { name: /Treasury allocates/ });
  await treasury.click();
  await expect(treasury).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText(
    'intended custody and allocation architecture',
  );

  await treasury.press('ArrowRight');
  const cashFlow = page.getByRole('tab', { name: /Cash flow crosses/ });
  await expect(cashFlow).toBeFocused();
  await expect(cashFlow).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('does not support');
});
