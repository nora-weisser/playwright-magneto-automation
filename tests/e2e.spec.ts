import { test } from '@/helpers/fixtures/index';
import { PATHS } from '@/helpers/datafactory/paths';
import { generateRandomClothingTopProduct } from '@/helpers/datafactory/random.product';
import { generateRandomShippingInfoNL } from '@/helpers/datafactory/random.shipping.information';

const VALID_DISCOUNT = '20poff';

test('Full E2E user journey: navigation, product selection, cart, discount, checkout, and shipping', async ({
  navigationPage,
  basePage,
  productListingPage,
  productDetailPage,
  cartPage,
  checkoutPage,
}) => {
  test.setTimeout(60_000); 
  await basePage.navigateToURL(PATHS.HOME_PAGE);

  const productInfo = generateRandomClothingTopProduct();
  await navigationPage.navigateToCategory(productInfo.category);
  await productListingPage.applyFilters(productInfo.filters)

  const productName = await productListingPage.selectRandomProduct();

  await productDetailPage.configureProductPreferencesFromProductDetails({
    size: productInfo.productPreferences.size,
    color: productInfo.productPreferences.color,
    quantity: productInfo.productPreferences.quantity,
  });

  await productDetailPage.validateProductPreferencesApplied({
    size: productInfo.productPreferences.size,
    color: productInfo.productPreferences.color,
    quantity: productInfo.productPreferences.quantity,
  });

  await productDetailPage.addToCart();
  await productDetailPage.validateSuccessMessage(productName);
  await cartPage.validateCartItemCounter(productInfo.productPreferences.quantity);

  await cartPage.viewCart();
  await cartPage.validateProductDetailsInTheCart(productName, [
    productInfo.productPreferences.size,
    productInfo.productPreferences.color,
  ]);

  await cartPage.applyDiscountCode(VALID_DISCOUNT);
  await cartPage.validateDiscountApplied(VALID_DISCOUNT);

  await cartPage.proceedToCheckout();

  const randomShippingInfo = generateRandomShippingInfoNL();
  await checkoutPage.completeShippingStep(randomShippingInfo, checkoutPage);

  await checkoutPage.placeOrder();
  await checkoutPage.validateConfirmationPage();
});

