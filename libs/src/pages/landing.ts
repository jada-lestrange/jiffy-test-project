import {expect, type Locator, type Page} from '@playwright/test';
import { AbstractPage } from './abstract-page';

export class Landing extends AbstractPage {
    readonly accessoriesSection: Locator;
    readonly artSection: Locator;
    readonly cartButton: Locator;
    readonly clothesSection: Locator;
    readonly landingCarousel: Locator;
    readonly loadingMessage: Locator;
    readonly productIcon: Locator;
    readonly quickViewButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accessoriesSection = page.locator('li[id="category-6"]');
        this.artSection = page.locator('li[id="category-9"]');
        this.cartButton = page.locator('div[id="_desktop_cart"]');
        this.clothesSection = page.locator('li[id="category-3"]');
        this.landingCarousel = page.locator('div[id="carousel"]');
        this.loadingMessage = page.locator('div.loadingMessageWrapper');
        this.productIcon = page.locator('article.product-miniature');
        this.quickViewButton = page.locator('a.quick-view');
    }

    async verifyLanding() {
        await expect(this.landingCarousel).toBeVisible({ timeout: 10000 });
    }

    async openProductProfile(index: number){
        await this.productIcon.nth(index).click();
    }

    async openQuickView(index: number){
        await this.productIcon.nth(index).hover();
        await this.quickViewButton.nth(index).click();
    }

    async goToCart(){
        await this.cartButton.click();
    }


}