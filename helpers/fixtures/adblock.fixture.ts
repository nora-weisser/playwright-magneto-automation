import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.route('**/*', (route) => {
      const url = route.request().url();
      const blockedResources = [
        'doubleclick.net',
        'googlesyndication.com',
        'adsystem.com',
        'adservice.google.com',
        'pixel.wp.com',
        'magento.reviews.io',
      ];

      if (blockedResources.some(domain => url.includes(domain))) {
        return route.abort();
      }

      return route.continue();
    });

    await use(page);
  }
});
