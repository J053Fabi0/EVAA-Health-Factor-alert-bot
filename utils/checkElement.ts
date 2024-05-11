import sleep from "./sleep";
import { ElementHandle, Page } from "puppeteer";

export interface CheckElementOptions {
  /** In ms. Default is `0`. */
  timeout?: number;
  /** Check if the element is visible. Defaults to `true` */
  isVisible?: boolean;
}

/** Checks if an element exists */
export default async function checkElement(
  page: Page,
  query: string,
  { timeout = 0, isVisible = true }: CheckElementOptions = {}
): Promise<boolean> {
  const timeoutDate = Date.now() + timeout;
  const hasTimeout = () => Date.now() > timeoutDate;

  do {
    const elements: ElementHandle<Element>[] = await page.$$(query).catch(() => []);

    for (const element of elements)
      if (element && (isVisible ? (await element.boundingBox()) !== null : true)) {
        return true;
      }
  } while (!hasTimeout() && (await sleep(0.2), true)); // It sleeps only if it hasn't timed out yet

  return false;
}
