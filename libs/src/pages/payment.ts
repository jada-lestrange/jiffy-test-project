import { type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './abstract-page';

export class Payment extends AbstractPage {
    readonly orderConfirmation: Locator;
    readonly payByCash: Locator;
    readonly payByCheck: Locator;
    readonly payByWire: Locator;
    readonly placeOrderButton: Locator;
    readonly termsOfServiceCheckbox: Locator;

    constructor(page: Page) {
        super(page);
        this.orderConfirmation = page.locator('section[id="content-hook_order_confirmation"]');
        this.payByCash = page.locator('div.payment-option input[data-module-name="ps_cashondelivery"]');
        this.payByCheck = page.locator('div.payment-option input[data-module-name="ps_checkpayment"]');
        this.payByWire = page.locator('div.payment-option input[data-module-name="ps_wirepayment"]');
        this.placeOrderButton = page.locator('div[id="payment-confirmation"] button');
        this.termsOfServiceCheckbox = page.locator('input[id="conditions_to_approve[terms-and-conditions]"]');
    }

    async selectCheckPaymentOption(){
        await this.payByCheck.click();
    }

    async acceptTermsOfService(){
        await this.termsOfServiceCheckbox.click();
    }

    async placeOrder(){
        await this.placeOrderButton.click();
        await this.placeOrderButton.waitFor({state: "detached"});
    }

    async checkOrderConfirmation(){
        await this.orderConfirmation.waitFor({state: "visible"});
    }
}