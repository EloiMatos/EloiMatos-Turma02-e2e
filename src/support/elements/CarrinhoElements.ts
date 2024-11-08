import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class CarrinhoElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getLinkSamsungGalaxyS6(): Locator {
    return this.page.locator('a.hrefch', { hasText: 'Samsung galaxy s6' });
  }
}
