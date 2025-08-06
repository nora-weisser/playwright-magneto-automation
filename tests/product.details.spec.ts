import { test } from '@/helpers/fixtures/index';
import { PATHS } from '@/helpers/datafactory/paths';
import { ClothesDetails } from '@/helpers/datafactory/random.product';
import { generateRandomClothingBottomProduct, generateRandomClothingTopProduct } from '@/helpers/datafactory/random.product';


/**
 * Validates that a randomly selected top product can be configured with given preferences (size, color, quantity),
 * and that these preferences are correctly applied and displayed on the product details page.
 */
test(`Verify top clothing product configuration and preference validation`, async ({ navigationPage, basePage, productListingPage, productDetailPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const randomTopInfo: ClothesDetails = generateRandomClothingTopProduct();
    await navigationPage.navigateToCategory(randomTopInfo.category);
    await productListingPage.applyFilters(randomTopInfo.filters);
    await productListingPage.selectFirstProduct();
    await productDetailPage.configureProductPreferencesFromProductDetails(
        {
            size: randomTopInfo.productPreferences.size,
            color: randomTopInfo.productPreferences.color,
            quantity: randomTopInfo.productPreferences.quantity,
        }
    );
    await productDetailPage.validateProductPreferencesApplied(
        {
            size: randomTopInfo.productPreferences.size,
            color: randomTopInfo.productPreferences.color,
            quantity: randomTopInfo.productPreferences.quantity,
        }
    );
});

/**
 * Validates that a randomly selected bottom product can be configured with given preferences (size, color, quantity),
 * and that these preferences are correctly applied and displayed on the product details page.
 */
test(`Verify bottom clothing product configuration and preference validation`, async ({ navigationPage, basePage, productListingPage, productDetailPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const randomTopInfo: ClothesDetails = generateRandomClothingBottomProduct();
    await navigationPage.navigateToCategory(randomTopInfo.category);
    await productListingPage.applyFilters(randomTopInfo.filters);
    await productListingPage.selectFirstProduct();
    await productDetailPage.configureProductPreferencesFromProductDetails(
        {
            size: randomTopInfo.productPreferences.size,
            color: randomTopInfo.productPreferences.color,
            quantity: randomTopInfo.productPreferences.quantity,
        }
    );
    await productDetailPage.validateProductPreferencesApplied(
        {
            size: randomTopInfo.productPreferences.size,
            color: randomTopInfo.productPreferences.color,
            quantity: randomTopInfo.productPreferences.quantity,
        }
    );
});

/**
 * Adds a randomly selected clothing top to the cart from the product details page
 * and validates that the correct quantity is reflected in the cart icon.
 */
test(`Add Clothing Top to Cart and Validate Cart Counter`, async ({ navigationPage, basePage, productListingPage, productDetailPage, cartPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const randomTopInfo: ClothesDetails = generateRandomClothingTopProduct();
    await navigationPage.navigateToCategory(randomTopInfo.category);
    await productListingPage.applyFilters(randomTopInfo.filters);
    const productName = await productListingPage.selectFirstProduct();
    await productDetailPage.configureProductPreferencesFromProductDetails(
        {
            size: randomTopInfo.productPreferences.size,
            color: randomTopInfo.productPreferences.color,
            quantity: randomTopInfo.productPreferences.quantity,
        }
    );
    await productDetailPage.addToCart();
    await productDetailPage.validateSuccessMessage(productName);
    await cartPage.validateCartItemCounter(randomTopInfo.productPreferences.quantity);
});

/**
 * Adds a randomly selected clothing top to the cart from the product details page without providing preferences.
 * and validates that error message shown
 */
test(`Adding Clothing Top to Cart without providing preferences results in error message `, async ({ navigationPage, basePage, productListingPage, productDetailPage, cartPage }) => {
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const randomTopInfo: ClothesDetails = generateRandomClothingTopProduct();
    await navigationPage.navigateToCategory(randomTopInfo.category);
    await productListingPage.applyFilters(randomTopInfo.filters);
    const productName = await productListingPage.selectFirstProduct();
    await productDetailPage.addToCart();
    await productDetailPage.validateRequiredFieldErrorVisible(productDetailPage.sizeOptions);
    await productDetailPage.validateRequiredFieldErrorVisible(productDetailPage.colorOptions);
});
