import { expect, type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './abstract-page';
import {UserData} from "../test-data";

export class Address extends AbstractPage {
    readonly addressSurvey: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly countryDropdown: Locator;
    readonly continueButton: Locator;
    readonly postalCodeInput: Locator;
    readonly stateDropdown: Locator;
    readonly stateOption: Locator;

    constructor(page: Page) {
        super(page);
        this.addressSurvey = page.locator('section[id="checkout-addresses-step"]');
        this.addressInput = page.locator('input[id="field-address1"]');
        this.cityInput = page.locator('input[id="field-city"]');
        this.countryDropdown = page.locator('select[id="field-id_country"]');
        this.continueButton = page.locator('button.continue[name="confirm-addresses"]');
        this.postalCodeInput = page.locator('input[id="field-postcode"]');
        this.stateDropdown = page.locator('select[id="field-id_state"]');
        this.stateOption = page.locator('select[id="field-id_state"] option');
    }

    async completeAddressSurveyMandatory(userData: UserData){
        await this.addressSurvey.waitFor({state: "visible", timeout: 5000});
        await this.addressInput.fill(userData.address);
        await this.cityInput.fill(userData.city);
        await this.postalCodeInput.fill(userData.postalCode);
    }

    async chooseCountryUS(){
        await this.countryDropdown.click();
        await this.countryDropdown.selectOption('United States');
    }

    async chooseCountryFrance(){
        await this.countryDropdown.click();
        await this.countryDropdown.selectOption('France');
    }

    async chooseRandomUSState() {
        const optionCount = await this.stateOption.count();
        if (optionCount === 0) {
            throw new Error('No state options found');
        }
        const randomIndex = Math.floor(Math.random() * optionCount);
        const value = await this.stateOption.nth(randomIndex).getAttribute('value');
        if (!value) {
            throw new Error('Selected option has no value attribute');
        }
        await this.stateDropdown.selectOption(value);
    }

    async continueToShipping(){
        await this.continueButton.click();
    }
}