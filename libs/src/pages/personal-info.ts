import {expect, type Locator, type Page} from '@playwright/test';
import { AbstractPage } from './abstract-page';
import { UserData, Colors } from '../test-data';

const formatErrorText = 'Invalid format.';
let colors: Colors

export class PersonalInfo extends AbstractPage {
    readonly continueButton: Locator;
    readonly dataPrivacyCheckbox: Locator;
    readonly genderInput: Locator;
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly surnameInput: Locator;
    readonly personalInfoSurvey: Locator;
    readonly termsAndConditionsCheckbox: Locator;
    readonly validationError: Locator;
    readonly validationWarning: Locator;

    constructor(page: Page) {
        super(page);
        colors = new Colors ();
        this.continueButton = page.locator('button.continue[data-link-action="register-new-customer"]');
        this.dataPrivacyCheckbox = page.locator('span.custom-checkbox span').nth(3);
        this.genderInput = page.locator('input[name="id_gender"]');
        this.emailInput = page.locator('form[id="customer-form"] input[id="field-email"]');
        this.nameInput = page.locator('input[id="field-firstname"]');
        this.surnameInput = page.locator('input[id="field-lastname"]');
        this.personalInfoSurvey = page.locator('section[id="checkout-personal-information-step"]');
        this.termsAndConditionsCheckbox = page.locator('span.custom-checkbox span').nth(1);
        this.validationError = page.locator('div.help-block');
        this.validationWarning = page.locator('div.help-block li');
    }

    async completePersonalInfoSurveyMandatory(userData: UserData){
        await this.personalInfoSurvey.waitFor({state: "visible"});
        const randomGenderIndex = Math.floor(Math.random() * 2);
        await this.genderInput.nth(randomGenderIndex).click();
        await this.nameInput.fill(userData.firstName);
        await this.surnameInput.fill(userData.lastName);
        await this.emailInput.fill(userData.email);
        await this.termsAndConditionsCheckbox.click({ force: true });
        await this.dataPrivacyCheckbox.click({force: true});
    }

    async verifyValidationError(){
        await this.checkFieldColor(this.nameInput, 'outline-color', colors.red)
        await expect (this.validationError).toBeVisible();
        await expect (this.validationWarning).toContainText(formatErrorText);
    }

    async continueToAddress(){
        await this.continueButton.click();
        }
}