import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "@/pages/base.page"

export class ProductDetailPage extends BasePage {
    readonly productTitle: Locator
    readonly sizeOptions: Locator
    readonly sizeOption: Locator
    readonly colorOptions: Locator
    readonly colorOption: (color: string) => Locator;
    readonly quantityInput: Locator
    readonly sizePreferenceApplied: Locator;
    readonly colorPreferenceApplied: Locator;
    readonly quantityPreferenceApplied: Locator;
    readonly addToCartButton: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        super(page)
        this.productTitle = page.getByRole('heading').locator('span')
        this.sizeOptions = page.locator(".swatch-attribute.size")
        this.sizeOption = this.sizeOptions.locator(".swatch-option")
        this.colorOptions = page.locator(".swatch-attribute.color")
        this.colorOption = (color: string) => {
            return page.getByRole('option', { name: new RegExp(`^${color}$`, 'i') });
        };
        this.quantityInput = page.getByRole('spinbutton', { name: 'Qty' })
        this.sizePreferenceApplied = this.page.locator('.swatch-attribute.size').locator('.swatch-attribute-selected-option');
        this.colorPreferenceApplied = this.page.locator('.swatch-attribute.color').locator('.swatch-attribute-selected-option');
        this.quantityPreferenceApplied = this.page.locator('.input-text.qty');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' })
        this.successMessage = page.locator('[data-ui-id="message-success"]')
    }

    async selectSize(size: string): Promise<void> {
        await this.sizeOption.filter({ hasText: new RegExp(`^${size}$`, 'i') }).click({ force: true });
    }

    async selectColor(color: string): Promise<void> {
        await this.colorOption(color).click({ force: true });
    }

    async setQuantity(quantity: number): Promise<void> {
        await this.quantityInput.clear()
        await this.fillInput(this.quantityInput, quantity.toString())
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        await this.page.waitForLoadState('networkidle')
    }

    async validateSuccessMessage(productName: string): Promise<void> {
        await this.successMessage.waitFor({ state: "visible", timeout: 10000 })
        const successMsg = await this.successMessage.textContent();
        expect(successMsg?.trim()).toEqual(`You added ${productName} to your shopping cart.`)
    }

    async validateRequiredFieldErrorVisible(fieldLocator: Locator) {
        await expect(fieldLocator.locator('.mage-error').filter({hasText: 'This is a required field.'})).toBeVisible();
    }

    /**
     * Configures product preferences (size, color, quantity) on the product details page.
     *
     * Waits for options to be visible before selecting them. Safely applies available preferences
     * and sets the quantity field.
     *
     * @param preferences - Object containing size, color, and quantity (default is 1).
     */
    async configureProductPreferencesFromProductDetails({
        size,
        color,
        quantity = 1,
    }: {
        size?: string;
        color?: string;
        quantity?: number;
    }): Promise<void> {
        await this.sizeOptions.waitFor({ state: 'visible' });

        if (size) {
            const sizeCount = await this.sizeOption.count();
            if (sizeCount > 0) {
                await this.selectSize(size);
            } 
        }

        if (color) {
            const colorCount = await this.colorOptions.count();
            if (colorCount > 0) {
                await this.selectColor(color);
            } 
        }

        await this.setQuantity(quantity);
    }

    /**
     * Validates that the selected product preferences (size, color, quantity) are correctly applied.
     *
     * @param preferences - Object containing optional expected values for size, color, and quantity.
     * @param preferences.size - Expected size value (e.g., "M", "XL").
     * @param preferences.color - Expected color value (e.g., "Blue").
     * @param preferences.quantity - Expected quantity value (e.g., 1).
     */
    async validateProductPreferencesApplied({
        size,
        color,
        quantity,
    }: {
        size?: string;
        color?: string;
        quantity?: number;
    }): Promise<void> {
        if (size) {
            await expect(this.sizePreferenceApplied).toHaveText(size);
        }
        if (color) {
            await expect(this.colorPreferenceApplied).toHaveText(color);
        }
        if (quantity) {
            await expect(this.quantityPreferenceApplied).toHaveValue(quantity.toString());
        }
    }
}
