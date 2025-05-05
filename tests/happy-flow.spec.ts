import {test} from "@playwright/test";
import {Pages} from "../libs/src/pages/pages";
import {TestData} from "../libs/src/test-data";

let pages: Pages;
let testData: TestData;
let productNumber;
let indexes: number [];
let productTitles: string [] = [];

test.describe('Add to cart and complete order', () => {
    test.beforeEach(async ({page}) => {
        pages = new Pages(page);
        testData = new TestData();
        productTitles = [];
        await pages.Landing.navigateToUrlDirectly();
    });

    test("Add several products to the cart from quick view", async () => {
        await pages.Landing.verifyLanding();
        productNumber = 3;
        indexes = await pages.Landing.getRandomIconIndexes(pages.Landing.productIcon, productNumber);
        for (let i = 0; i < indexes.length; i++) {
            const index = indexes[i];
            await pages.Landing.openQuickView(index);
            await pages.ProductProfile.saveProductName(productTitles);
            await pages.ProductProfile.addToCard();
            await pages.ProductProfile.checkProductAddedModal();
            if (i === indexes.length - 1) {
                await pages.ProductProfile.continueShopping();
                await pages.Landing.goToCart();
            } else {
                await pages.ProductProfile.continueShopping();
            }
        }
        await pages.ShoppingCart.verifyCartOverview(productTitles);
    })

    test("Add several products to the cart from product profile", async () => {
        await pages.Landing.verifyLanding();
        productNumber = 4;
        indexes = await pages.Landing.getRandomIconIndexes(pages.Landing.productIcon, productNumber);
        for (let i = 0; i < indexes.length; i++) {
            const index = indexes[i];
            await pages.Landing.openProductProfile(index);
            await pages.ProductProfile.waitForPageIsLoad();
            await pages.ProductProfile.saveProductName(productTitles);
            await pages.ProductProfile.addToCard();
            await pages.ProductProfile.checkProductAddedModal();
            if (i === indexes.length - 1) {
                await pages.ProductProfile.checkoutFromModal();
            } else {
                await pages.ProductProfile.continueShopping();
                await pages.ProductProfile.returnToStore();
            }
        }
        await pages.ShoppingCart.verifyCartOverview(productTitles);
    })

    test("Add two identical products to cart and proceed to place order", async ({page}) => {
        const index = (await pages.Landing.getRandomIconIndexes(pages.Landing.productIcon))[0];
        const quantityIncreaseNumber = 1;
        await pages.Landing.openQuickView(index);
        await pages.ProductProfile.addToCard();
        await pages.ProductProfile.checkProductAddedModal();
        await pages.ProductProfile.checkoutFromModal();
        await pages.ShoppingCart.increaseProductQuantity(quantityIncreaseNumber);
        await pages.ShoppingCart.proceedToCheckout();
        await pages.PersonalInfo.completePersonalInfoSurveyMandatory(testData.userWithCorrectData);
        await pages.PersonalInfo.continueToAddress();
        await pages.Address.completeAddressSurveyMandatory(testData.userWithCorrectData);
        await pages.Address.chooseCountryFrance();
        await pages.Address.chooseRandomUSState();
        await pages.Address.continueToShipping();
        await pages.Shipping.continueToPayment();
        await pages.Payment.selectCheckPaymentOption();
        await pages.Payment.acceptTermsOfService();
        await pages.Payment.placeOrder();
        await pages.Payment.checkOrderConfirmation();
    })
})