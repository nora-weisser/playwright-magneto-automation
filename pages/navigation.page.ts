import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "@/pages/base.page"

export class NavigationPage extends BasePage {
    private readonly mainNavigation: Locator
    readonly menuItem: (category: string) => Locator;

    constructor(page: Page) {
        super(page)
        this.mainNavigation = page.locator("#ui-id-2");
        this.menuItem = (category: string) => {
            return page.getByRole('menuitem', { name: `${category}` });
        }
    }

    async navigateToCategory(categoryPath: string[]): Promise<void> {
        for (let i = 0; i < categoryPath.length; i++) {
            const category = categoryPath[i]

            if (i === 0) {
                const mainCategory = this.menuItem(category);
                await expect(mainCategory).toBeVisible();
                await mainCategory.hover()
            } else {
                const subCategory = this.menuItem(category);
                await expect(subCategory).toBeVisible();
                if (i === categoryPath.length - 1) {
                    await subCategory.click();
                } else {
                    await subCategory.hover();
                }
            }
        }
        await expect(this.page.getByText('Shopping Options', {exact: true})).toBeVisible();
    }
}
