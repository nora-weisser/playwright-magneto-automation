import { test } from '@/helpers/fixtures/index';
import { PATHS } from '@/helpers/datafactory/paths';
import { generateRandomClothingTopProduct, generateRandomClothingBottomProduct } from '@/helpers/datafactory/random.product';
import { generateRandomGearProduct } from '@/helpers/datafactory/random.product';

test(`Validate Clothing Top Filtering`, async ({ navigationPage, basePage, productListingPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const product = generateRandomClothingTopProduct();
    await navigationPage.navigateToCategory(product.category);
    await productListingPage.applyFilters(product.filters);
    await productListingPage.verifyFiltersApplied(product.filters);
});

test(`Validate Clothing Bottom Filtering`, async ({ navigationPage, basePage, productListingPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const product = generateRandomClothingBottomProduct();
    await navigationPage.navigateToCategory(product.category);
    await productListingPage.applyFilters(product.filters);
    await productListingPage.verifyFiltersApplied(product.filters);
});

test(`Validate Gear Product Filtering`, async ({ navigationPage, basePage, productListingPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const randomGearProduct = generateRandomGearProduct();
    console.log(randomGearProduct)
    await navigationPage.navigateToCategory(randomGearProduct.category);
    await productListingPage.applyFilters(randomGearProduct.filters);
    await productListingPage.verifyFiltersApplied(randomGearProduct.filters);
}); 