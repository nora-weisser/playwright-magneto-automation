import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "@/pages/base.page"

export class CartPage extends BasePage {
    readonly cartIcon: Locator
    readonly cartCounter: Locator
    readonly viewCartLink: Locator
    readonly shoppingCartTitle: Locator
    readonly productTitleInTheCart: Locator
    readonly productAdditionalDataInCart: Locator
    readonly proceedToCheckoutButton: Locator
    readonly discountSection: Locator;
    readonly discountCodeInput: Locator
    readonly applyDiscountButton: Locator
    readonly discountApplied: Locator;
    readonly successMessage: Locator

    constructor(page: Page) {
        super(page)
        this.cartIcon = page.locator(".minicart-wrapper")
        this.cartCounter = page.locator(".counter-number")
        this.viewCartLink = page.getByRole('link', { name: 'View and Edit Cart' })
        this.shoppingCartTitle = page.getByText('Shopping Cart', { exact: true })
        this.productTitleInTheCart = page.locator('.cart .product-item-details .product-item-name')
        this.productAdditionalDataInCart = page.locator('.cart .item .product-item-details .item-options dd');
        this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to Checkout' })
        this.discountSection = page.getByRole('heading', { name: 'Apply Discount Code' })
        this.discountCodeInput = page.getByRole('textbox', { name: 'Enter discount code' })
        this.applyDiscountButton = page.getByRole('button', { name: 'Apply Discount' })
        this.discountApplied = page.locator('.totals').getByText('Discount (Get flat 20% off on all products)');
        this.successMessage = page.locator('[data-ui-id="message-success"]')
    }

    async openCart(): Promise<void> {
        await this.cartCounter.waitFor({ state: 'visible' });
        await this.cartIcon.click();
    }

    async viewCart(): Promise<void> {
        await this.openCart()
        await this.viewCartLink.click();
        await this.page.waitForLoadState('networkidle')
        await expect(this.shoppingCartTitle).toBeVisible()
    }

    async getCartItemCount(): Promise<number> {
        try {
            const countText = await this.cartCounter.textContent()
            return Number.parseInt(countText || "0")
        } catch {
            return 0
        }
    }

    async validateCartItemCounter(expectedQuantity: number): Promise<void> {
        const actualNumerOfItems = await this.getCartItemCount();
        expect(actualNumerOfItems).toEqual(expectedQuantity);
    }

    async validateProductDetailsInTheCart(expectedProductName: string, expectedAdditionalData: string[]) {
        const actualProductName = (await this.productTitleInTheCart.textContent())!.trim();
        const actualAdditionalData = (await this.productAdditionalDataInCart.allTextContents()).map(t => t.trim());
        expect(actualProductName).toEqual(expectedProductName);
        expect(actualAdditionalData).toEqual(expectedAdditionalData);
    }

    async applyDiscountCode(code: string): Promise<void> {
        await this.discountSection.click();

        await this.fillInput(this.discountCodeInput, code)
        await this.applyDiscountButton.click();
    }

    async validateSuccessfulMessage(code: string) {
        const successMsg = await this.successMessage.textContent();
        expect(successMsg?.trim()).toEqual(`You used coupon code "${code}".`)
    }

    async validateDiscountApplied(code: string) {
        await this.validateSuccessfulMessage(code);
        await expect(this.discountApplied).toBeVisible();
    }

    async proceedToCheckout(): Promise<void> {
        await this.page.waitForLoadState('networkidle')
        await this.proceedToCheckoutButton.click({force: true})
        await this.page.waitForLoadState('networkidle')
    }
}
