import { ElementHandle, Page } from "puppeteer";

/** Checks if an element exists and clicks on it */
export default async function clickElement(page: Page, query: string, timeout = 10000): Promise<ElementHandle> {
  if (timeout > 0) await page.waitForSelector(query, { timeout });
  const element: ElementHandle<Element> | null = await page.$(query).catch(() => null);
  if (!element) throw new Error(`Element not found for query ${query}`);

  await element.click();
  return element;
}
