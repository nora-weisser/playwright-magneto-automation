import { type Page, type Locator, expect } from "@playwright/test"
import { BasePage } from "@/pages/base.page"
import { FILTERS } from "@/helpers/datafactory/random.product";

export class ProductListingPage extends BasePage {
  private readonly filterSidebar: Locator
  private readonly filtersApplied: Locator;
  private readonly productGrid: Locator
  private readonly loadingIndicator: Locator
  readonly filterSection: (tabName: string) => Locator;
  readonly colorOption: (color: string) => Locator;
  readonly tab: (tabName: string) => Locator;

  constructor(page: Page) {
    super(page)
    this.filterSidebar = page.locator("#layered-filter-block");
    this.filtersApplied = page.locator('.filter-current .item');
    this.productGrid = page.locator(".products.wrapper.grid.products-grid");
    this.loadingIndicator = page.locator(".loading-mask")
    this.filterSection = (tabName: string) => {
        return page.locator("#layered-filter-block").filter({has: page.getByRole('tab', { name: `${tabName}` })})
    }
    this.colorOption = (color: string) => {
        return this.filterSection('Color').getByRole('tabpanel').locator(`a[aria-label*="${color}"]`)
    }
    this.tab = (tabName: string) => {
        return page.getByRole('tab', { name: `${tabName}` })
    }
  }

  async applyFilters(filters: FILTERS): Promise<void> {
    if (filters.size) {
      await this.applySizeFilter(filters.size)
    }

    if (filters.color) {
      await this.applyColorFilter(filters.color)
    }
    if (filters.activity) {
        await this.applyActivityFilter(filters.activity)
    }
    await this.page.waitForLoadState('networkidle')

  }

  private async applySizeFilter(size: string): Promise<void> {
    const sizeFilterSection = this.filterSection('Size');
    await this.tab('Size').click();
    await sizeFilterSection.getByText(`${size}`, {exact: true}).click();
  }

  private async applyColorFilter(color: string): Promise<void> {
    const colorFilterSection = this.filterSection('Color');
    await this.tab('Color').click();
    await this.colorOption(color).click({force: true});
  }

  private async applyActivityFilter(activity: string): Promise<void> {
    await this.tab('Activity ').click();
    await this.page.getByRole('link', { name: `${activity}` }).click();
  }

  async verifyFiltersApplied(filters: FILTERS) {
    const allFiltersApplied = this.filtersApplied;

    const actual_filters: { label: string; value: string }[] = [];
    const filterCount = await allFiltersApplied.count()
    for (let i = 0; i < filterCount; i++) {
        const label = await allFiltersApplied.nth(i).locator('.filter-label').innerText();
        const value = await allFiltersApplied.nth(i).locator('.filter-value').innerText();
        actual_filters.push({ label: label.trim(), value: value.trim() });
    }

    const expected_filters = Object.entries(filters).map(([key, value]) => {
        return {
          label: key.charAt(0).toUpperCase() + key.slice(1), 
          value
        };
      });

      expect(actual_filters).toEqual(expect.arrayContaining(expected_filters));

  }

  async selectRandomProduct(): Promise<string> {
    await this.productGrid.waitFor({ state: "visible" })

    const products = this.productGrid.locator(".product-item")
    const productCount = await products.count()

    expect(productCount).toBeGreaterThan(0)

    const randomIndex = Math.floor(Math.random() * productCount)
    const selectedProduct = products.nth(randomIndex)

    const productName = await selectedProduct.locator(".product-item-link").textContent()
    await selectedProduct.locator(".product-item-link").click();

    return productName?.trim() || ""
  }

  async selectFirstProduct(): Promise<string> {
    await this.productGrid.waitFor({ state: "visible" })

    const firstProduct = this.productGrid.locator(".product-item").first()
    const productName = await firstProduct.locator(".product-item-link").textContent()

    await firstProduct.locator(".product-item-link").click();

    return productName?.trim() || ""
  }
}
