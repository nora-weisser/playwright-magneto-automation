import { test } from '@/helpers/fixtures/index';
import { PATHS } from '@/helpers/datafactory/paths';
import { expect } from '@playwright/test';
import { navigationRoutes } from '@/helpers/datafactory/test.scenarios/nav.menu.test.cases';
import { getRandomNavigationRoute } from '@/helpers/datafactory/test.scenarios/nav.menu.test.cases';

/**
 * Validates menu navigation.
 * Checks that each category path navigates to the correct URL and has the correct page title.
 */
navigationRoutes.forEach(({ categories, url, title }) => {
    test(`Validate ${title} Navigation Menu`, async ({ page, navigationPage, basePage }) => {
        await basePage.navigateToURL(PATHS.HOME_PAGE);
        await navigationPage.navigateToCategory(categories);
        await expect(page).toHaveURL(new RegExp(`${url}$`), { timeout: 5000 });
        await expect(page).toHaveTitle(new RegExp(title), { timeout: 5000 });
    });
});

/**
 * Navigates to a random product category, select first product in the list and verifies the product name on product details page.
 */
test(`Navigate to product details page for first product in a random category`, async ({ navigationPage, basePage, productListingPage, productDetailPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const randomNavigationRoute = getRandomNavigationRoute()
    await navigationPage.navigateToCategory(randomNavigationRoute);
    const productName = await productListingPage.selectFirstProduct();
    await expect(productDetailPage.productTitle).toHaveText(productName);
});

/**
 * Navigates to a random product category, select random product in the list and verifies the product name on product details page.
 */
test(`Navigate to product details page for random product in a random category`, async ({ navigationPage, basePage, productListingPage, productDetailPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const randomNavigationRoute = getRandomNavigationRoute()
    await navigationPage.navigateToCategory(randomNavigationRoute);
    const productName = await productListingPage.selectRandomProduct();
    await expect(productDetailPage.productTitle).toHaveText(productName);
});
