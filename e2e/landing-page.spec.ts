import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});
test.describe('landing page renders correctly', () => {
  test('Renders heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Welcome to desk-mooovements!' })
    ).toBeVisible();
  });
  test('Renders add workplace button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Add Workplace' })
    ).toBeVisible();
  });
  test('Renders login button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
  test('Renders popular cities card', async ({ page }) => {
    await expect(page.getByTestId('cities')).toBeVisible;
  });
  test('Renders popular places card', async ({ page }) => {
    await expect(page.getByTestId('places')).toBeVisible;
  });
});

test.describe('Landing page interactivity works', () => {
  test('next button on cities carousel moves to new city', async ({ page }) => {
    const firstCity = await page.getByTestId('places').locator('div').first();
    await page
      .getByTestId('places')
      .getByRole('button', { name: 'Next' })
      .click();
    const secondCity = await page.getByTestId('places').locator('div').first();
    expect(firstCity).toBeHidden;
    expect(secondCity).toBeVisible;
  });
  test('Prev button on cities carousel moves to new city', async ({ page }) => {
    const firstCity = await page.getByTestId('places').locator('div').first();
    await page
      .getByTestId('places')
      .getByRole('button', { name: 'Prev' })
      .click();
    const secondCity = await page.getByTestId('places').locator('div').first();
    expect(firstCity).toBeHidden;
    expect(secondCity).toBeVisible;
  });
  test('next button on cities carousel moves to Prev city', async ({
    page,
  }) => {
    const firstCity = await page.getByTestId('places').locator('div').first();
    await page
      .getByTestId('places')
      .getByRole('button', { name: 'Prev' })
      .click();
    const secondCity = await page.getByTestId('places').locator('div').first();
    await page
      .getByTestId('places')
      .getByRole('button', { name: 'Next' })
      .click();
    expect(firstCity).toBeVisible;
    expect(secondCity).toBeHidden;
  });
  test('Prev button on cities carousel moves to Prev city', async ({
    page,
  }) => {
    const firstCity = await page.getByTestId('places').locator('div').first();
    await page
      .getByTestId('places')
      .getByRole('button', { name: 'Next' })
      .click();
    const secondCity = await page.getByTestId('places').locator('div').first();
    await page
      .getByTestId('places')
      .getByRole('button', { name: 'Prev' })
      .click();
    expect(firstCity).toBeVisible;
    expect(secondCity).toBeHidden;
  });
});
