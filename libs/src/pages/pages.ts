import { Page } from '@playwright/test';
import {
    Landing,
    PersonalInfo,
    ProductProfile,
    ShoppingCart,
    Address,
    Shipping,
    Payment,
} from './index';

export class Pages {
    readonly Address: Address;
    readonly Landing: Landing;
    readonly Payment: Payment;
    readonly PersonalInfo: PersonalInfo;
    readonly ProductProfile : ProductProfile;
    readonly Shipping: Shipping;
    readonly ShoppingCart: ShoppingCart;

    constructor(page: Page) {
        this.Address = new Address(page);
        this.Landing = new Landing (page);
        this.Payment = new Payment (page);
        this.PersonalInfo = new PersonalInfo (page);
        this.ProductProfile = new ProductProfile (page);
        this.Shipping = new Shipping (page);
        this.ShoppingCart = new ShoppingCart (page);
    }
}