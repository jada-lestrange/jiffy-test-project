import {test, expect} from "@playwright/test";
import {Pages} from "../libs/src/pages/pages";
import {TestData} from "../libs/src/test-data";

let pages: Pages;
let testData: TestData;

test.describe('Negative test cases', () => {
    test.beforeEach(async ({ page }) => {
        pages = new Pages(page);
        testData = new TestData();
        await pages.Landing.navigateToUrlDirectly();
    });

    test("Invalid name error", async ({page}) => {
        const index = (await pages.Landing.getRandomIconIndexes(pages.Landing.productIcon))[0];
        const quantityIncreaseNumber = 1;
        await pages.Landing.openQuickView(index);
        await pages.ProductProfile.addToCard();
        await pages.ProductProfile.checkProductAddedModal();
        await pages.ProductProfile.checkoutFromModal();
        await pages.ShoppingCart.increaseProductQuantity(quantityIncreaseNumber);
        await pages.ShoppingCart.proceedToCheckout();
        await pages.PersonalInfo.completePersonalInfoSurveyMandatory(testData.userWithFalseName);
        await pages.PersonalInfo.continueToAddress();
        await pages.PersonalInfo.verifyValidationError();
    })
})