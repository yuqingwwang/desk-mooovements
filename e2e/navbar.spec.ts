import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/login');
});

test.describe('Navbar renders correctly on desktop', () => {
  test('Navbar renders', async ({ page }) => {
    await expect(page.getByTestId('navbar')).toBeVisible;
  });
  test('Home button renders', async ({ page }) => {
    await expect(page.getByTestId('navbar-home-link')).toBeVisible;
  });
  test('Search button renders', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Search' })).toBeVisible;
  });
  test('wishlist button renders', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Wish List' })).toBeVisible;
  });
  test('add workplace button renders', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Add Workspace' })).toBeVisible;
  });
  test('Log in button renders', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible;
  });
});

test.describe('Navbar interactivity works correctly on desktop', () => {
  test('Home button leads to home', async ({ page }) => {
    await page.getByTestId('navbar-home-link').click();
    await expect(
      page.getByRole('heading', { name: 'Welcome to desk-mooovements!' })
    ).toBeVisible;
  });
  test('Search button leads to home page', async ({ page }) => {
    await page.getByRole('link', { name: 'Search' }).click();
    await expect(
      page.getByRole('heading', { name: 'Welcome to desk-mooovements!' })
    ).toBeVisible;
  });
  test.describe('When logged out', () => {
    test('wishlist button leads to log in page', async ({ page }) => {
      await page.getByRole('link', { name: 'Wish List' }).click();
      await expect(page.getByRole('heading', { name: 'Wishlist' })).toBeVisible;
    });
    test('add workplace button leads to log in page', async ({ page }) => {
      await page.getByRole('link', { name: 'Add Workplace' }).click();
      await expect(page.getByRole('heading', { name: 'Add a place' }))
        .toBeVisible;
    });
    test('Log in button leads to log in page', async ({ page }) => {
      await page.goto('http://localhost:3000/');
      await page.getByRole('button', { name: 'Log In' }).click();
      await expect(page.getByText('Sign inSign up')).toBeVisible;
    });
  });
  //   test.describe('When logged in', () => {
  //     test.beforeEach(async ({ page }) => {
  //       await page.goto('http://localhost:3000/login');
  //       await page.getByPlaceholder('Email').click();
  //       await page.getByPlaceholder('Email').fill('testingaccount@test.com');
  //       await page.getByPlaceholder('Email').press('Tab');
  //       await page.getByPlaceholder('Password').fill('testing123');
  //       await page.getByRole('button', { name: 'Sign in' }).click();
  //       await page.getByRole('link', { name: 'Go Home' }).click();
  //     });
  //     test('wishlist button leads to correct page', async ({ page }) => {
  //       await page.getByRole('link', { name: 'wishlist' }).click();
  //       await expect(page.getByRole('heading', { name: 'Wishlist' })).toBeVisible;
  //     });
  //     test('add workplace button leads to correct page', async ({ page }) => {
  //       await page.getByRole('link', { name: 'Add Workspace' }).click();
  //       await expect(page.getByRole('heading', { name: 'Add a place' }))
  //         .toBeVisible;
  //     });
  //     test('Log in button not visible', async ({ page }) => {
  //       await page.getByRole('button', { name: 'Log Out' }).click();
  //       await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible;
  //     });
  //   });
});
