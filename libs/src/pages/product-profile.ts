import { expect, type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './abstract-page';

export class ProductProfile extends AbstractPage {
    readonly addToCartButton : Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly myStoreLink: Locator;
    readonly productAddedPopup: Locator;
    readonly productDescription: Locator;


    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.locator('button[data-button-action="add-to-cart"]');
        this.checkoutButton = page.locator('div.cart-content-btn a');
        this.continueShoppingButton = page.locator('div.cart-content-btn button');
        this.myStoreLink = page.locator('a img.logo');
        this.productAddedPopup = page.locator('div[id="blockcart-modal"]');
        this.productDescription = page.locator('div h1.h1');
    }

    async addToCard(){
        await this.addToCartButton.click();
    }

    async checkProductAddedModal(){
        await expect (this.productAddedPopup).toBeVisible();
    }

    async continueShopping(){
        await this.continueShoppingButton.click();
    }

    async checkoutFromModal(){
        await this.checkoutButton.click();
    }

    async saveProductName(productTitles: string[]) {
        const text = await this.productDescription.textContent();
        if (text === null) {
            throw new Error(`Product description is null`);
        }
        if (!productTitles.includes(text)) {
            productTitles.push(text);
        }
    }

    async returnToStore(){
        await this.myStoreLink.click();
        await this.page.waitForLoadState('load');
    }
}