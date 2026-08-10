import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
for (const path of ['/', '/methodology', '/sources', '/share']) {
  test(`${path} renders without serious accessibility violations`, async ({
    page,
  }) => {
    const runtimeErrors: string[] = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') runtimeErrors.push(message.text());
    });
    await page.goto(path);
    await expect(page.locator('main#main')).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(
      results.violations.filter((v) =>
        ['critical', 'serious'].includes(v.impact ?? ''),
      ),
    ).toEqual([]);
    expect(runtimeErrors).toEqual([]);
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

test('waterfall loads the documented stress exercise', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Stress exercise' }).click();
  const section = page
    .getByRole('heading', { name: 'Yield is a waterfall, not a headline.' })
    .locator('..');
  await expect(section.getByText('70 units')).toBeVisible();
  await expect(section.getByText('28', { exact: true })).toBeVisible();
});

test('all seven social cards load at their export dimensions', async ({
  page,
}) => {
  await page.goto('/share');
  const cards = page.locator('figure img');
  await expect(cards).toHaveCount(7);
  for (let index = 0; index < 7; index += 1) {
    const card = cards.nth(index);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    expect(
      await card.evaluate((image: HTMLImageElement) => [
        image.naturalWidth,
        image.naturalHeight,
      ]),
    ).toEqual([1600, 900]);
  }
});
