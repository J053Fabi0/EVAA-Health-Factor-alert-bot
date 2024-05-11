import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import SessionPlugin from "puppeteer-extra-plugin-session";

puppeteer.use(StealthPlugin());
puppeteer.use(SessionPlugin());

export default async function getBrowser() {
  const browser = await puppeteer.launch({ headless: true });
  await browser.defaultBrowserContext().overridePermissions("https://app.evaa.finance", ["clipboard-read"]);
  return browser;
}
