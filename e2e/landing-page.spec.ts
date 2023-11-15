import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});
test.describe('landing page renders correctly', () => {
  test('Renders heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Welcome to desk-mooovements!' })
    ).toBeVisible();
  });
  test('Renders popular cities card', async ({ page }) => {
    await expect(page.getByTestId('cities')).toBeVisible;
  });
  test('Renders popular places card', async ({ page }) => {
    await expect(page.getByTestId('places')).toBeVisible;
  });
  test('Navbar renders', async ({ page }) => {
    await expect(page.getByTestId('navbar')).toBeVisible;
  });
});

test.describe('Landing page interactivity works', () => {
  test.describe('Carousel works correctly', () => {
    test('next button on cities carousel moves to new city', async ({
      page,
    }) => {
      const firstCity = await page.getByTestId('places').locator('div').first();
      await page
        .getByTestId('places')
        .getByRole('button', { name: 'Next' })
        .click();
      const secondCity = await page
        .getByTestId('places')
        .locator('div')
        .first();
      expect(firstCity).toBeHidden;
      expect(secondCity).toBeVisible;
    });
    test('Prev button on cities carousel moves to new city', async ({
      page,
    }) => {
      const firstCity = await page.getByTestId('places').locator('div').first();
      await page
        .getByTestId('places')
        .getByRole('button', { name: 'Prev' })
        .click();
      const secondCity = await page
        .getByTestId('places')
        .locator('div')
        .first();
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
      const secondCity = await page
        .getByTestId('places')
        .locator('div')
        .first();
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
      const secondCity = await page
        .getByTestId('places')
        .locator('div')
        .first();
      await page
        .getByTestId('places')
        .getByRole('button', { name: 'Prev' })
        .click();
      expect(firstCity).toBeVisible;
      expect(secondCity).toBeHidden;
    });
  });
  test.describe('Links all lead to correct place', () => {
    test('Place carousel link leads to correct place page', async ({
      page,
    }) => {
      const place = await page
        .getByTestId('places')
        .locator('div')
        .nth(1)
        .innerText();
      await page.getByTestId('places').locator('div').nth(1).click();
      const placePage = await page.getByTestId('place-name').innerText();
      const cleanedPlacePage = placePage.replace('Name: ', '');
      expect(place).toContain(cleanedPlacePage);
    });
    test('City carousel link leads to correct city page', async ({ page }) => {
      const place = await page
        .getByTestId('cities')
        .locator('div')
        .nth(1)
        .innerText();
      await page.getByTestId('cities').locator('div').nth(1).click();
      const placePage = await page.getByTestId('city-name').innerText();
      const cleanedPlacePage = placePage.replace('Name: ', '');
      expect(place).toContain(cleanedPlacePage);
    });
  });
});
