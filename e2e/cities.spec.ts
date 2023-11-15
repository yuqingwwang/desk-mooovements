import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe('landing page renders correctly', () => {
  let expectedName = '';
  let expectedWorkplaces = '';

  test.beforeEach(async ({ page }) => {
    const inputString = await page
      .getByTestId('cities')
      .locator('div')
      .nth(1)
      .innerText();
    console.log(inputString);
    [expectedName, expectedWorkplaces] = inputString.split('\n');
    const matches = inputString.match(/\d+/);
    expectedWorkplaces = matches ? matches[0] : '0';
    console.log(expectedName, expectedWorkplaces);
    await page.getByTestId('cities').locator('div').nth(1).click();
    await page.getByTestId('city-name').innerText();
  });
  test('Renders country', async ({ page }) => {
    await page.goto('http://localhost:3000/cities/1', { timeout: 10000 });
    await page.waitForSelector('[data-testid="city-name"]');
    expect(await page.getByText('Country: United Kingdom')).toBeVisible;
  });
  test('Renders filter buttons', async ({ page }) => {
    await page.goto('http://localhost:3000/cities/1', { timeout: 10000 });
    await page.waitForSelector('[data-testid="city-name"]');
    expect(await page.getByRole('button', { name: 'All' })).toBeVisible;
    expect(await page.getByRole('button', { name: 'Pet Friendly' }))
      .toBeVisible;
    expect(await page.getByRole('button', { name: '24/7 access' })).toBeVisible;
    expect(await page.getByRole('button', { name: 'wifi' })).toBeVisible;
    expect(await page.getByRole('button', { name: 'socket' })).toBeVisible;
    expect(await page.getByRole('button', { name: 'shower' })).toBeVisible;
    expect(await page.getByRole('button', { name: 'Meeting Rooms' }))
      .toBeVisible;
    expect(await page.getByRole('button', { name: 'Phone Booth' })).toBeVisible;
    expect(await page.getByRole('button', { name: 'Locker' })).toBeVisible;
  });
  test('Renders correct heading', async ({ page }) => {
    const actualName = await page.getByTestId('city-name').innerText();
    expect(actualName).toContain(expectedName);
  });
  test('Renders correct count of workplaces', async ({ page }) => {
    const actualWorkplaces = await page
      .getByTestId('city-workspaces')
      .innerText();
    expect(actualWorkplaces).toContain(expectedWorkplaces);
  });
  test('Renders correct number of workplace cards', async ({ page }) => {
    const actualWorkplaces = await page.getByTestId('card-container').count();
    expect(parseInt(expectedWorkplaces)).toEqual(actualWorkplaces);
  });
});
