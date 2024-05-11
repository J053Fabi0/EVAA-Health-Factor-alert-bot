import { Page } from "puppeteer";
import findInParents from "./findInParents";

export default async function getHealthScore(page: Page): Promise<number> {
  const healthFactorText = await page.$("::-p-xpath(//span[contains(., 'Health Factor')])");
  if (!healthFactorText) throw new Error("Health Factor not found");

  const percentage = await findInParents("span:nth-child(2)", healthFactorText, 3);
  const percentageText = await page.evaluate((el) => el.textContent, percentage);

  if (!percentageText) throw new Error("Health Factor percentage not found");

  return +percentageText.slice(0, -1);
}
