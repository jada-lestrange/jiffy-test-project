import { expect, type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './abstract-page';

export class ShoppingCart extends AbstractPage {

    readonly cartOverview: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly productNameInCart: Locator;
    readonly addQuantityButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartOverview = page.locator('div.cart-overview');
        this.proceedToCheckoutButton = page.locator('div.checkout');
        this.productNameInCart = page.locator('div.product-line-info a');
        this.addQuantityButton = page.locator('div.input-group button.js-increase-product-quantity');
    }

    async verifyCartOverview(productTitles: string []){
        await expect (this.cartOverview).toBeVisible();
        for (let i =0; i < productTitles.length;  i++){
            const textInCart = await this.productNameInCart.nth(i).textContent();
            expect(productTitles[i]).toContain(textInCart);
        }
    }

    async increaseProductQuantity(number: number){
        await this.addQuantityButton.click({clickCount: number});
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}