import { type Page, type Locator, expect } from "@playwright/test"
import { BasePage } from "@/pages/base.page"
import { ShippingInfo } from "@/helpers/datafactory/random.shipping.information"

export class CheckoutPage extends BasePage {
    readonly emailInput: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly streetAddressInput: Locator
    readonly cityInput: Locator
    readonly countrySelect: Locator
    readonly postalCodeInput: Locator
    readonly phoneInput: Locator
    readonly nextButton: Locator
    readonly shippingAmount: Locator
    readonly placeOrderButton: Locator;
    readonly confirmation: Locator;

    constructor(page: Page) {
        super(page)
        this.emailInput = page.getByRole('textbox', { name: 'Email Address' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' })
        this.streetAddressInput = page.getByRole('textbox', { name: 'Street Address: Line 1' })
        this.cityInput = page.getByRole('textbox', { name: 'City *' })
        this.countrySelect = page.locator('select[name="country_id"]')
        this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code *' })
        this.phoneInput = page.getByRole('textbox', { name: 'Phone Number *' })
        this.nextButton = page.getByRole('button', { name: 'Next' })
        this.shippingAmount = page.locator("td.col-price")
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.confirmation = page.getByText('Thank you for your purchase!', {exact: true})
    }

    async fillShippingInformation(shippingInfo: ShippingInfo): Promise<void> {
        await this.fillInput(this.emailInput, shippingInfo.email)
        await this.fillInput(this.firstNameInput, shippingInfo.firstName)
        await this.fillInput(this.lastNameInput, shippingInfo.lastName)
        await this.fillInput(this.streetAddressInput, shippingInfo.streetAddress)
        await this.fillInput(this.cityInput, shippingInfo.city)

        await this.countrySelect.selectOption({ label: shippingInfo.country })

        await this.fillInput(this.postalCodeInput, shippingInfo.postalCode)
        await this.fillInput(this.phoneInput, shippingInfo.phone)
        await this.page.waitForTimeout(4000)
        const checkedRadio = this.page.locator('input[type="radio"]:checked');
        expect(await checkedRadio.count()).toEqual(1)
    }

    async proceedToPayment(): Promise<void> {
        await this.nextButton.click({ force: true });
    }

    async getShippingCost(): Promise<string> {
        try {
            return (await this.shippingAmount.textContent()) || ""
        } catch {
            return ""
        }
    }

    async completeShippingStep(shippingInfo: ShippingInfo, checkoutPage: CheckoutPage): Promise<void> {
        await this.fillShippingInformation(shippingInfo);
        await this.proceedToPayment()
        await expect(this.page).toHaveURL(/\/checkout\/#payment/);
        await expect(this.page.getByText('Payment Method', { exact: true })).toBeVisible();
        await this.page.waitForLoadState('networkidle')
    }

    async placeOrder() {
        await this.placeOrderButton.click();
        await this.page.waitForLoadState('networkidle')
    }

    async validateConfirmationPage() {
        await expect(this.confirmation).toBeVisible();
    }
}
