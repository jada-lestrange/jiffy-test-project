import { type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './abstract-page';

export class Shipping extends AbstractPage {
    readonly clickAndCollectOption: Locator;
    readonly continueButton: Locator;
    readonly myCarrierOption: Locator;

    constructor(page: Page) {
        super(page);
        this.clickAndCollectOption = page.locator('input[id="delivery_option_1"]');
        this.continueButton = page.locator('button.continue[name="confirmDeliveryOption"]');
        this.myCarrierOption = page.locator('input[id="delivery_option_2"]');
    }

    async selectCollectShippingOption(){
        await this.clickAndCollectOption.click();
    }

    async selectCarrierShippingOption(){
        await this.myCarrierOption.click();
    }

    async continueToPayment(){
        await this.continueButton.click();
    }
}