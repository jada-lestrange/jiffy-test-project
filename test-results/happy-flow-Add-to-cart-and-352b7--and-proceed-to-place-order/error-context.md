# Test info

- Name: Add to cart and complete order >> Add two identical products to cart and proceed to place order
- Location: /Users/mtokar/WebstormProjects/JiffyProject/tests/happy-flow.spec.ts:60:9

# Error details

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('section[id="content-hook_order_confirmation"]') to be visible

    at Payment.checkOrderConfirmation (/Users/mtokar/WebstormProjects/JiffyProject/libs/src/pages/payment.ts:36:38)
    at /Users/mtokar/WebstormProjects/JiffyProject/tests/happy-flow.spec.ts:79:29
```

# Page snapshot

```yaml
- banner:
  - heading "Bad gateway Error code 502" [level=1]
  - text: Visit
  - link "cloudflare.com":
    - /url: https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_502&utm_campaign=lousy-pocket.demo.prestashop.com
  - text: for more information. 2025-05-05 16:24:20 UTC
- text: You
- heading "Browser" [level=3]
- text: Working
- link:
  - /url: https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_502&utm_campaign=lousy-pocket.demo.prestashop.com
- text: Belgrade
- heading "Cloudflare" [level=3]:
  - link "Cloudflare":
    - /url: https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_502&utm_campaign=lousy-pocket.demo.prestashop.com
- text: Working lousy-pocket.demo.prestashop.com
- heading "Host" [level=3]
- text: Error
- heading "What happened?" [level=2]
- paragraph: The web server reported a bad gateway error.
- heading "What can I do?" [level=2]
- paragraph: Please try again in a few minutes.
- paragraph:
  - text: "Cloudflare Ray ID:"
  - strong: 93b196652a6ce291
  - text: "• Your IP:"
  - button "Click to reveal"
  - text: • Performance & security by
  - link "Cloudflare":
    - /url: https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_502&utm_campaign=lousy-pocket.demo.prestashop.com
```

# Test source

```ts
   1 | import { type Locator, type Page } from '@playwright/test';
   2 | import { AbstractPage } from './abstract-page';
   3 |
   4 | export class Payment extends AbstractPage {
   5 |     readonly orderConfirmation: Locator;
   6 |     readonly payByCash: Locator;
   7 |     readonly payByCheck: Locator;
   8 |     readonly payByWire: Locator;
   9 |     readonly placeOrderButton: Locator;
  10 |     readonly termsOfServiceCheckbox: Locator;
  11 |
  12 |     constructor(page: Page) {
  13 |         super(page);
  14 |         this.orderConfirmation = page.locator('section[id="content-hook_order_confirmation"]');
  15 |         this.payByCash = page.locator('div.payment-option input[data-module-name="ps_cashondelivery"]');
  16 |         this.payByCheck = page.locator('div.payment-option input[data-module-name="ps_checkpayment"]');
  17 |         this.payByWire = page.locator('div.payment-option input[data-module-name="ps_wirepayment"]');
  18 |         this.placeOrderButton = page.locator('div[id="payment-confirmation"] button');
  19 |         this.termsOfServiceCheckbox = page.locator('input[id="conditions_to_approve[terms-and-conditions]"]');
  20 |     }
  21 |
  22 |     async selectCheckPaymentOption(){
  23 |         await this.payByCheck.click();
  24 |     }
  25 |
  26 |     async acceptTermsOfService(){
  27 |         await this.termsOfServiceCheckbox.click();
  28 |     }
  29 |
  30 |     async placeOrder(){
  31 |         await this.placeOrderButton.click();
  32 |         await this.placeOrderButton.waitFor({state: "detached"});
  33 |     }
  34 |
  35 |     async checkOrderConfirmation(){
> 36 |         await this.orderConfirmation.waitFor({state: "visible"});
     |                                      ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  37 |     }
  38 | }
```