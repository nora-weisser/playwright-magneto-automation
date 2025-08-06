import { test } from '@/helpers/fixtures/index';
import { PATHS } from '@/helpers/datafactory/paths';
import { ClothesDetails } from '@/helpers/datafactory/random.product';
import { generateRandomClothingTopProduct } from '@/helpers/datafactory/random.product';
import { ShippingInfo } from '@/helpers/datafactory/random.shipping.information';
import { generateRandomShippingInfoNL } from '@/helpers/datafactory/random.shipping.information';

const VALID_DISCOUNT = '20poff';

/**
 * Adds a product to the cart and validates that the "View and Edit Cart" functionality works correctly.
 * Ensures product details (name, size, color) are shown correctly in the cart.
 */
test(`View and Edit Cart After Adding Product`, async ({ page, navigationPage, basePage, productListingPage, productDetailPage, cartPage }) => {
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
    await cartPage.viewCart();
    await cartPage.validateProductDetailsInTheCart(productName, [randomTopInfo.productPreferences.size, randomTopInfo.productPreferences.color])
});

/**
 * Applies a discount code in the cart and verifies the success message and discount label.
 */
test(`Apply Discount Code and Validate Discount`, async ({ page, navigationPage, basePage, productListingPage, productDetailPage, cartPage }) => {
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
    await cartPage.viewCart();
    await cartPage.applyDiscountCode(VALID_DISCOUNT);
    await cartPage.validateDiscountApplied(VALID_DISCOUNT);
});

/**
 * Proceeds from cart to checkout and verifies that the shipping page is displayed properly.
 */
test(`Proceed to Checkout and Validate Shipping Step`, async ({ page, navigationPage, basePage, productListingPage, productDetailPage, cartPage }) => {
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
    await productDetailPage.addToCart();
    await cartPage.viewCart();
    await cartPage.proceedToCheckout();
});

/**
 * Completes the shipping form using randomly generated valid information for the Netherlands
 * and verifies that the page transitions to the payment step.
 */
test(`Fill Out Shipping Form, Proceed to Payment and Place an Order`, async ({ page, navigationPage, basePage, productListingPage, productDetailPage, cartPage, checkoutPage }) => {
    test.setTimeout(60_000); 
    await basePage.navigateToURL(PATHS.HOME_PAGE);
    const randomTopInfo: ClothesDetails = generateRandomClothingTopProduct();
    const randomShippingInfo: ShippingInfo = generateRandomShippingInfoNL();
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
    await cartPage.viewCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeShippingStep(randomShippingInfo, checkoutPage);
    await checkoutPage.placeOrder();
    await checkoutPage.validateConfirmationPage();
});
