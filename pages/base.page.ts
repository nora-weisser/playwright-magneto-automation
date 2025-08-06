import type { Page, Locator } from "@playwright/test"

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigateToURL(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle')
  }

  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: "visible" })
    await locator.fill(text)
  }
}
