import {test as base } from "@playwright/test";
import { BasePage } from "@/pages/base.page";
import { NavigationPage } from "@/pages/navigation.page";
import { ProductListingPage } from "@/pages/product.listing.page";
import { ProductDetailPage } from "@/pages/product.details.page";
import { CartPage } from "@/pages/cart.page";
import { CheckoutPage } from "@/pages/checkout.page";

export interface POMFixtures {
    basePage: BasePage,
    navigationPage: NavigationPage,
    productListingPage: ProductListingPage,
    productDetailPage: ProductDetailPage,
    cartPage: CartPage,
    checkoutPage: CheckoutPage
}

export const test = base.extend<POMFixtures>({
    basePage: async ({page}, use) => {
        await use(new BasePage(page));
    },
    navigationPage: async ({page}, use) => {
        await use(new NavigationPage(page));
    },
    productListingPage: async ({page}, use) => {
        await use(new ProductListingPage(page));
    },
    productDetailPage: async ({page}, use) => {
        await use(new ProductDetailPage(page));
    },
    cartPage: async ({page}, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({page}, use) => {
        await use(new CheckoutPage(page));
    }, 
})
