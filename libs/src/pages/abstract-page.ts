import { expect, type Locator, type Page } from '@playwright/test';
export const ELEMENT_TIMEOUT = 30000;

export abstract class AbstractPage {

    protected constructor(public page: Page) {
    }

    async isMobile(): Promise<boolean> {
        return await this.page.evaluate(() => window.innerWidth <= 768);
    }

    async getRandomIconIndexes(icon: Locator, number?: number): Promise<number[]> {
        const count = await icon.count();
        if (count === 0) {
            throw new Error('No elements found for the provided locator.');
        }
        const requested = number ?? 1;
        if (requested > count) {
            throw new Error(`Requested ${requested} indices, but only ${count} elements are available.`);
        }
        const indices = Array.from({ length: count }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return indices.slice(0, requested);
    }

    async waitForPageIsLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateToUrlDirectly(){
        await this.page.goto('https://demo.prestashop.com', { waitUntil: 'domcontentloaded' });
        const iframeElement = await this.page.waitForSelector('iframe#framelive', { timeout: 15000 });
        let frameUrl: string | null = null;
        while (true) {
            const frame = await iframeElement.contentFrame();
            if (frame) {
                frameUrl = frame.url();
                if (frameUrl && frameUrl !== 'about:blank') break;
            }
        }
        await this.page.goto(frameUrl!, { waitUntil: 'domcontentloaded' });
    }

    async checkFieldColor(
        element: Locator,
        cssProperty: string,
        rgbColor: string,
    ) {
        await expect(element).toHaveCSS(cssProperty, rgbColor);
    }
}
